import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { extname, basename, join } from "node:path";
import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Bulk-attach photos to products and categories.
//
//   product-photos/<product-slug>.jpg      -> that product's cover image
//   product-photos/<product-slug>-2.jpg    -> extra gallery images (-2, -3, ...)
//   public/categories/<category-slug>.jpg  -> that category's tile image
//
// Product slugs are the product name lowercased with dashes, e.g.
// "55-inch-4k-uhd-smart-tv". Category slugs: televisions, laptops-computers,
// mobile-phones-accessories, home-appliances, kitchen-appliances, gadgets.
// Keep each photo under ~700KB (Firestore's 1 MiB document limit).
//   npm run db:upload-photos
const MAX_BYTES = 700 * 1024;
const MIME = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" };

async function nextId(db, name) {
  const ref = db.collection("counters").doc(name);
  return db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const next = (snap.exists ? snap.data().value : 0) + 1;
    tx.set(ref, { value: next });
    return next;
  });
}

const listImages = (dir) =>
  existsSync(dir) ? readdirSync(dir).filter((f) => MIME[extname(f).toLowerCase()]) : [];

async function main() {
  const { FIREBASE_PROJECT_ID: projectId, FIREBASE_CLIENT_EMAIL: clientEmail } = process.env;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!projectId || !clientEmail || !privateKey) {
    throw new Error("FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY are not set");
  }
  initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
  const db = getFirestore();
  const now = new Date().toISOString();

  // Products: group files by slug (strip a trailing -2, -3 ...).
  const groups = new Map();
  for (const file of listImages("product-photos")) {
    const stem = basename(file, extname(file)).toLowerCase();
    const m = stem.match(/^(.*?)(?:-(\d))?$/);
    // A trailing "-<digit>" is a gallery index only if the bare slug exists as a product.
    const slugs = [stem, m[1]];
    groups.set(stem, { file, slugs });
  }

  const byProduct = new Map();
  for (const [stem, { file, slugs }] of groups) {
    for (const slug of slugs) {
      const snap = await db.collection("products").where("slug", "==", slug).limit(1).get();
      if (snap.empty) continue;
      const order = slug === stem ? 0 : Number(stem.slice(slug.length + 1)) || 1;
      const list = byProduct.get(snap.docs[0].id) ?? [];
      list.push({ file, order, name: snap.docs[0].data().name });
      byProduct.set(snap.docs[0].id, list);
      break;
    }
    if (![...byProduct.values()].some((l) => l.some((x) => x.file === file))) {
      console.log(`No product matches "${file}", skipping.`);
    }
  }

  for (const [productId, files] of byProduct) {
    files.sort((a, b) => a.order - b.order);
    const urls = [];
    for (const { file } of files) {
      const path = join("product-photos", file);
      if (statSync(path).size > MAX_BYTES) {
        console.log(`"${file}" is over 700KB, skipping. Resize it and re-run.`);
        continue;
      }
      const id = await nextId(db, "product_images");
      await db.collection("product_images").doc(String(id)).set({
        id,
        product_id: Number(productId),
        data: readFileSync(path).toString("base64"),
        mime_type: MIME[extname(file).toLowerCase()],
        created_at: now,
      });
      urls.push(`/api/product-images/${id}`);
    }
    if (urls.length === 0) continue;
    await db.collection("products").doc(productId).update({
      images: urls,
      image: urls[0],
      updated_at: now,
    });
    console.log(`"${files[0].name}": attached ${urls.length} photo(s).`);
  }

  // Categories: files in public/categories are served by the site itself.
  for (const file of listImages(join("public", "categories"))) {
    const slug = basename(file, extname(file)).toLowerCase();
    const snap = await db.collection("categories").where("slug", "==", slug).limit(1).get();
    if (snap.empty) {
      console.log(`No category "${slug}", skipping ${file}.`);
      continue;
    }
    await snap.docs[0].ref.update({ image: `/categories/${file}` });
    console.log(`Category "${slug}": image set to /categories/${file}.`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
