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
import SectionHeading from "./SectionHeading";

const ICONS: Record<string, LucideIcon> = {
  televisions: Tv,
  "laptops-computers": Laptop,
  "mobile-phones-accessories": Smartphone,
  "home-appliances": WashingMachine,
  "kitchen-appliances": CookingPot,
  gadgets: Headphones,
};

const CategoriesSection = () => {
  const [categories, setCategories] = useState<{ slug: string; name: string }[]>([]);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        const top = ((data.categories ?? []) as ApiCategory[]).filter((c) => c.parent_id === null);
        setCategories(top.map((c) => ({ slug: c.slug, name: c.name })));
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
    <section className="px-4 pt-14 md:px-10 md:pt-20">
      <SectionHeading title="Shop by department" href="/shop" linkLabel="All products" />

      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-6">
        {departments.map((department) => {
          const Icon = ICONS[department.slug] ?? Cpu;
          return (
            <Link
              key={department.slug}
              href={`/shop?category=${department.slug}`}
              className="group flex flex-col items-center gap-4 rounded-2xl bg-tint px-4 py-7 text-center transition hover:bg-brand hover:text-white"
            >
              <Icon className="h-9 w-9 text-brand transition group-hover:text-white" aria-hidden />
              <span className="text-sm font-semibold">{department.name}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default CategoriesSection;
