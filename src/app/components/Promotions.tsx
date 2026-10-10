"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductImage from "./ProductImage";
import type { ApiProduct } from "@/types/api";

// Marked-down products shown as large promo cards.
const Promotions = () => {
  const [products, setProducts] = useState<ApiProduct[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/products?onSale=true&limit=6")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setProducts(data.products ?? []);
      })
      .catch(() => {
        if (!cancelled) setProducts([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (products.length === 0) return null;

  return (
    <section id="promotions" className="px-4 pt-12 md:px-10 md:pt-16">
      <h2 className="text-2xl font-normal text-ink md:text-[26px]">Promotions</h2>

      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const save =
            product.old_price && product.old_price > product.price
              ? product.old_price - product.price
              : 0;
          return (
            <article key={product.id}>
              <Link
                href={`/product/${product.id}`}
                className="relative block aspect-[16/9] overflow-hidden rounded-2xl bg-gradient-to-br from-brand-dark to-brand"
              >
                <ProductImage
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-contain p-4"
                />
                {save > 0 && (
                  <span className="absolute top-3 left-3 rounded-full bg-white px-3 py-1 text-xs font-bold text-brand-dark">
                    Save ₦{save.toLocaleString()}
                  </span>
                )}
              </Link>
              <h3 className="mt-4 text-xl font-normal text-ink">{product.name}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-ink/70">
                Now ₦{product.price.toLocaleString()}
              </p>
              <Link
                href={`/product/${product.id}`}
                className="mt-4 inline-block rounded-full bg-ink px-7 py-2.5 text-sm font-semibold text-white transition hover:bg-brand"
              >
                View Product
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Promotions;
