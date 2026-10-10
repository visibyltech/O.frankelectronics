import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Points products and categories at the openly licensed photos in
// public/products/photos (credited on /credits). Only replaces placeholder
// illustrations (/products/*.svg) or empty images, never an uploaded photo.
//   npm run db:set-photos
const PRODUCT_RULES = [
  [/14-inch laptop/i, "laptop-2"],
  [/television|\btv\b/i, "tv"],
  [/laptop/i, "laptop"],
  [/power bank/i, "powerbank"],
  [/smartphone|phone/i, "phone"],
  [/refrigerator|fridge/i, "fridge"],
  [/air conditioner/i, "ac"],
  [/washing/i, "washer"],
  [/microwave/i, "microwave"],
  [/kettle/i, "kettle"],
  [/blender/i, "blender"],
  [/earbud|earphone/i, "earbuds"],
  [/speaker/i, "speaker"],
  [/watch/i, "watch"],
];

const CATEGORY_PHOTOS = {
  televisions: "tv",
  "laptops-computers": "laptop",
  "mobile-phones-accessories": "phone",
  "home-appliances": "washer",
  "kitchen-appliances": "microwave",
  gadgets: "speaker",
};

const isPlaceholder = (image) => !image || /^\/products\/[^/]+\.svg$/.test(image);
const photo = (name) => `/products/photos/${name}.jpg`;

async function main() {
  const { FIREBASE_PROJECT_ID: projectId, FIREBASE_CLIENT_EMAIL: clientEmail } = process.env;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!projectId || !clientEmail || !privateKey) throw new Error("Firebase env vars are not set");
  initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
  const db = getFirestore();
  const now = new Date().toISOString();

  for (const doc of (await db.collection("products").get()).docs) {
    const p = doc.data();
    if (!isPlaceholder(p.image)) continue;
    const rule = PRODUCT_RULES.find(([re]) => re.test(p.name));
    if (!rule) continue;
    const url = photo(rule[1]);
    await doc.ref.update({ image: url, images: [url], updated_at: now });
    console.log(`"${p.name}" -> ${url}`);
  }

  for (const doc of (await db.collection("categories").get()).docs) {
    const c = doc.data();
    const name = CATEGORY_PHOTOS[c.slug];
    if (!name || !isPlaceholder(c.image)) continue;
    await doc.ref.update({ image: photo(name) });
    console.log(`Category "${c.slug}" -> ${photo(name)}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
