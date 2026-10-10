import Link from "next/link";
import { BRANDS } from "@/lib/site";

// Tiles cycle through the brand blues, since there are no partner logos.
const TILES = [
  "from-brand-dark to-[#06214f]",
  "from-brand to-brand-dark",
  "from-brand-light to-brand",
  "from-[#0f1b33] to-brand-dark",
];

const BrandsRow = () => (
  <section className="px-4 pt-12 md:px-10 md:pt-16">
    <h2 className="text-2xl font-normal text-ink md:text-[26px]">Shop by Brand</h2>
    <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-[14px]">
      {BRANDS.slice(0, 5).map((brand, i) => (
        <li key={brand}>
          <Link
            href={`/shop?search=${encodeURIComponent(brand)}`}
            className={`relative flex h-40 items-center justify-center overflow-hidden rounded-t-lg bg-gradient-to-br ${TILES[i % TILES.length]} text-white transition hover:opacity-90 md:h-48`}
          >
            <span className="display-type text-3xl tracking-tight md:text-4xl">{brand}</span>
            <span className="absolute right-2 bottom-1 text-xs font-semibold">{brand}</span>
          </Link>
        </li>
      ))}
    </ul>
  </section>
);

export default BrandsRow;
