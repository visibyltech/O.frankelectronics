import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// One-time seed for a fresh O Frank Electronics Firestore project: creates the
// six departments from the flyer. Products are not seeded; add them (with real
// names, prices and photos) from the admin panel. Run directly against
// Firestore with server-side env vars:  npm run db:seed-catalog
const CATEGORIES = [
  { name: "Televisions", slug: "televisions" },
  { name: "Laptops & Computers", slug: "laptops-computers" },
  { name: "Mobile Phones & Accessories", slug: "mobile-phones-accessories" },
  { name: "Home Appliances", slug: "home-appliances" },
  { name: "Kitchen Appliances", slug: "kitchen-appliances" },
  { name: "Gadgets & More", slug: "gadgets" },
];

async function nextId(db, collectionName) {
  const counterRef = db.collection("counters").doc(collectionName);
  return db.runTransaction(async (tx) => {
    const snap = await tx.get(counterRef);
    const next = (snap.exists ? snap.data().value : 0) + 1;
    tx.set(counterRef, { value: next });
    return next;
  });
}

async function main() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY environment variables are not set"
    );
  }

  initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
  const db = getFirestore();
  const now = new Date().toISOString();

  for (const cat of CATEGORIES) {
    const existing = await db.collection("categories").where("slug", "==", cat.slug).limit(1).get();
    if (!existing.empty) {
      console.log(`Category "${cat.name}" already exists, skipping.`);
      continue;
    }
    const id = await nextId(db, "categories");
    await db.collection("categories").doc(String(id)).set({
      id,
      name: cat.name,
      slug: cat.slug,
      image: null,
      parent_id: null,
      created_at: now,
    });
    console.log(`Created category "${cat.name}" (id ${id}).`);
  }

  console.log("Done. Add products from the admin panel.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
