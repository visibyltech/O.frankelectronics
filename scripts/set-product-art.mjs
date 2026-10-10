import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Points products that have no photo at the illustrations in public/products.
// Products that already have a photo are left alone.  npm run db:set-art
const RULES = [
  [/4k/i, "tv-4k"],
  [/television|\btv\b/i, "tv"],
  [/laptop/i, "laptop"],
  [/power bank/i, "powerbank"],
  [/smartphone|phone/i, "phone"],
  [/refrigerator|fridge/i, "fridge"],
  [/air conditioner|\bac\b/i, "ac"],
  [/washing/i, "washer"],
  [/microwave/i, "microwave"],
  [/kettle/i, "kettle"],
  [/blender/i, "blender"],
  [/earbud|earphone/i, "earbuds"],
  [/speaker/i, "speaker"],
  [/watch/i, "watch"],
];

async function main() {
  const { FIREBASE_PROJECT_ID: projectId, FIREBASE_CLIENT_EMAIL: clientEmail } = process.env;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\n/g, "\n");
  if (!projectId || !clientEmail || !privateKey) throw new Error("Firebase env vars are not set");
  initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
  const db = getFirestore();

  const snap = await db.collection("products").get();
  for (const doc of snap.docs) {
    const p = doc.data();
    if (p.image) continue;
    const rule = RULES.find(([re]) => re.test(p.name));
    if (!rule) {
      console.log(`No art for "${p.name}", skipping.`);
      continue;
    }
    const url = `/products/${rule[1]}.svg`;
    await doc.ref.update({ image: url, images: [url], updated_at: new Date().toISOString() });
    console.log(`"${p.name}" -> ${url}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
