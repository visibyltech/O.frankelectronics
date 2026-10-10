import Link from "next/link";
import { BRANDS } from "@/lib/site";
import SectionHeading from "./SectionHeading";

const BrandsRow = () => (
  <section className="px-4 pt-14 md:px-10 md:pt-20">
    <SectionHeading title="Shop by brand" />
    <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
      {BRANDS.map((brand) => (
        <li key={brand}>
          <Link
            href={`/shop?search=${encodeURIComponent(brand)}`}
            className="flex h-16 items-center justify-center rounded-xl border border-ink/10 bg-white text-base font-extrabold tracking-wide text-brand-dark transition hover:border-brand hover:bg-tint"
          >
            {brand}
          </Link>
        </li>
      ))}
    </ul>
  </section>
);

export default BrandsRow;
