import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Sample products so the storefront isn't empty while you set up. Names are
// generic and prices are illustrative: edit them (and add photos) from the
// admin panel, or delete them. Safe to re-run: products are matched by slug.
//   npm run db:seed-products
const PRODUCTS = [
  { category: "televisions", name: "43-inch Full HD Smart LED TV", price: 235000, old: 265000, stock: 12, description: "43-inch Full HD smart television with built-in Wi-Fi, streaming apps and HDMI/USB ports." },
  { category: "televisions", name: "55-inch 4K UHD Smart TV", price: 395000, old: 440000, stock: 8, description: "55-inch 4K Ultra HD smart television with HDR, streaming apps and three HDMI ports." },
  { category: "televisions", name: "32-inch HD LED Television", price: 125000, old: null, stock: 15, description: "Compact 32-inch HD LED television, ideal for bedrooms and small living rooms." },
  { category: "laptops-computers", name: "15.6-inch Laptop, Core i5, 8GB RAM, 512GB SSD", price: 520000, old: 560000, stock: 6, description: "Everyday 15.6-inch laptop with an Intel Core i5 processor, 8GB RAM and a 512GB SSD." },
  { category: "laptops-computers", name: "14-inch Laptop, Core i3, 4GB RAM, 256GB SSD", price: 310000, old: null, stock: 9, description: "Light 14-inch laptop for school and office work, with a 256GB SSD." },
  { category: "mobile-phones-accessories", name: "6.5-inch Smartphone, 128GB, Dual SIM", price: 145000, old: 160000, stock: 20, description: "Dual SIM smartphone with a 6.5-inch display, 128GB storage and a long-lasting battery." },
  { category: "mobile-phones-accessories", name: "20,000mAh Power Bank", price: 18500, old: null, stock: 40, description: "High-capacity 20,000mAh power bank with fast charging and dual USB output." },
  { category: "home-appliances", name: "Double Door Refrigerator, 300L", price: 480000, old: 520000, stock: 5, description: "300-litre double door refrigerator with frost-free cooling and energy saving mode." },
  { category: "home-appliances", name: "1.5HP Split Air Conditioner", price: 415000, old: null, stock: 7, description: "1.5HP split air conditioner with fast cooling and low noise operation." },
  { category: "home-appliances", name: "7kg Top Load Washing Machine", price: 285000, old: 310000, stock: 6, description: "7kg top load automatic washing machine with multiple wash programmes." },
  { category: "kitchen-appliances", name: "20L Microwave Oven", price: 78000, old: null, stock: 14, description: "20-litre microwave oven with six power levels and a defrost function." },
  { category: "kitchen-appliances", name: "1.7L Electric Kettle", price: 14500, old: 17000, stock: 30, description: "1.7-litre stainless steel electric kettle with auto shut-off." },
  { category: "kitchen-appliances", name: "Blender with Grinder, 1.5L", price: 32000, old: null, stock: 18, description: "1.5-litre blender with a dry grinder attachment and stainless steel blades." },
  { category: "gadgets", name: "Wireless Bluetooth Earbuds", price: 16500, old: 20000, stock: 35, description: "True wireless earbuds with a charging case and up to 20 hours of playback." },
  { category: "gadgets", name: "Portable Bluetooth Speaker", price: 24000, old: null, stock: 25, description: "Water-resistant portable Bluetooth speaker with deep bass and 12-hour battery." },
  { category: "gadgets", name: "Smart Watch with Heart Rate Monitor", price: 29000, old: 35000, stock: 22, description: "Smart watch with heart rate, step tracking and phone notifications." },
];

const slugify = (s) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

async function nextId(db, name) {
  const ref = db.collection("counters").doc(name);
  return db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const next = (snap.exists ? snap.data().value : 0) + 1;
    tx.set(ref, { value: next });
    return next;
  });
}

async function main() {
  const { FIREBASE_PROJECT_ID: projectId, FIREBASE_CLIENT_EMAIL: clientEmail } = process.env;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\n/g, "\n");
  if (!projectId || !clientEmail || !privateKey) {
    throw new Error("FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY are not set");
  }
  initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
  const db = getFirestore();

  const cats = {};
  (await db.collection("categories").get()).forEach((d) => (cats[d.data().slug] = d.data().id));

  const now = new Date().toISOString();
  for (const p of PRODUCTS) {
    const categoryId = cats[p.category];
    if (!categoryId) {
      console.log(`Category "${p.category}" missing (run db:seed-catalog first), skipping ${p.name}.`);
      continue;
    }
    const slug = slugify(p.name);
    const existing = await db.collection("products").where("slug", "==", slug).limit(1).get();
    if (!existing.empty) {
      console.log(`"${p.name}" already exists, skipping.`);
      continue;
    }
    const id = await nextId(db, "products");
    await db.collection("products").doc(String(id)).set({
      id,
      category_id: categoryId,
      name: p.name,
      slug,
      description: p.description,
      images: [],
      image: null,
      price: p.price,
      old_price: p.old,
      rating: 0,
      reviews_count: 0,
      stock: p.stock,
      is_active: true,
      created_at: now,
      updated_at: now,
    });
    console.log(`Created "${p.name}" (id ${id}).`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
