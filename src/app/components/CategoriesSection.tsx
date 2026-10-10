"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CookingPot,
  Cpu,
  Headphones,
  Laptop,
  Smartphone,
  Tv,
  WashingMachine,
  type LucideIcon,
} from "lucide-react";
import { DEPARTMENTS } from "@/lib/site";
import type { ApiCategory } from "@/types/api";

const ICONS: Record<string, LucideIcon> = {
  televisions: Tv,
  "laptops-computers": Laptop,
  "mobile-phones-accessories": Smartphone,
  "home-appliances": WashingMachine,
  "kitchen-appliances": CookingPot,
  gadgets: Headphones,
};

const CategoriesSection = () => {
  const [categories, setCategories] = useState<
    { slug: string; name: string; image?: string | null }[]
  >([]);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        const top = ((data.categories ?? []) as ApiCategory[]).filter((c) => c.parent_id === null);
        setCategories(top.map((c) => ({ slug: c.slug, name: c.name, image: c.image })));
      })
      .catch(() => {
        if (!cancelled) setCategories([]);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Fall back to the flyer's departments until the catalogue loads.
  const departments = categories.length > 0 ? categories : [...DEPARTMENTS];

  return (
    <section className="px-4 pt-12 md:px-10 md:pt-16">
      <h2 className="text-2xl font-normal text-ink md:text-[26px]">Categories</h2>

      <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5 lg:gap-[14px]">
        {departments.map((department) => {
          const Icon = ICONS[department.slug] ?? Cpu;
          const image = "image" in department ? department.image : null;
          return (
            <Link
              key={department.slug}
              href={`/shop?category=${department.slug}`}
              className="group relative flex h-36 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-tint to-brand-light/40 md:h-44"
            >
              {image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition group-hover:scale-105"
                />
              ) : (
                <Icon className="h-14 w-14 text-brand/60" aria-hidden />
              )}
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3 pt-8 pb-2 text-right text-sm font-semibold text-white">
                {department.name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default CategoriesSection;
