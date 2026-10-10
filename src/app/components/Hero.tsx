"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarCheck, ChevronLeft, ChevronRight, PiggyBank } from "lucide-react";
import { whatsappUrl } from "@/lib/site";

const SLIDES = [
  {
    kicker: "O Frank Electronics",
    title: "Top quality electronics for better living.",
    text: "Televisions, laptops, phones, home and kitchen appliances and gadgets. Genuine products with a reliable warranty.",
    cta: "Shop now",
    href: "/shop",
    bg: "bg-brand-dark",
  },
  {
    kicker: "Hot deals",
    title: "Marked-down prices on selected products.",
    text: "Grab a bargain on televisions, appliances and more while stocks last.",
    cta: "See all products",
    href: "/shop",
    bg: "bg-brand",
  },
  {
    kicker: "Buy now, pay later",
    title: "Pay in flexible weekly instalments.",
    text: "Start with a 30% initial deposit and your order ships once payment is completed.",
    cta: "Start shopping",
    href: "/shop",
    bg: "bg-brand-dark",
  },
];

const Hero = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % SLIDES.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section>
      <div className="px-4 pt-4 md:px-10">
        <div className="relative overflow-hidden rounded-3xl">
          {SLIDES.map((slide, i) => (
            <div
              key={slide.title}
              aria-hidden={i !== active}
              className={`${i === active ? "relative opacity-100" : "pointer-events-none absolute inset-0 opacity-0"} grid grid-cols-1 items-center gap-6 px-6 py-10 transition-opacity duration-700 md:px-12 md:py-14 lg:grid-cols-2 ${slide.bg}`}
            >
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-brand-light">{slide.kicker}</p>
                <h1 className="display-type mt-3 text-3xl text-white md:text-5xl">{slide.title}</h1>
                <p className="mt-4 max-w-md leading-relaxed text-white/80">{slide.text}</p>
                <Link
                  href={slide.href}
                  tabIndex={i === active ? 0 : -1}
                  className="group mt-7 inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand-dark transition hover:bg-tint"
                >
                  {slide.cta}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </Link>
              </div>
              <div className="overflow-hidden rounded-2xl bg-white">
                <Image
                  src="/brand/hero-products.jpg"
                  alt="Television, laptop, phones, refrigerator, washing machine, air conditioner and microwave"
                  width={720}
                  height={272}
                  priority={i === 0}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="h-auto w-full"
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            aria-label="Previous banner"
            onClick={() => setActive((a) => (a - 1 + SLIDES.length) % SLIDES.length)}
            className="absolute top-1/2 left-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-brand-dark/80 text-white transition hover:bg-brand-dark"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next banner"
            onClick={() => setActive((a) => (a + 1) % SLIDES.length)}
            className="absolute top-1/2 right-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-white transition hover:bg-brand-dark"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute right-0 bottom-4 left-0 flex justify-center gap-2">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.title}
                type="button"
                aria-label={`Show banner ${i + 1}`}
                onClick={() => setActive(i)}
                className={`h-2.5 rounded-full transition-all ${i === active ? "w-7 bg-white" : "w-2.5 bg-white/40"}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 px-4 pt-4 md:grid-cols-2 md:gap-4 md:px-10">
        <div className="flex items-start gap-4 rounded-2xl bg-brand-dark p-5 text-white md:p-6">
          <CalendarCheck className="mt-1 h-8 w-8 shrink-0 text-brand-light" aria-hidden />
          <div>
            <h2 className="display-type text-xl">Buy now, pay later</h2>
            <p className="mt-1 text-sm leading-relaxed text-white/80">
              Pay in flexible weekly instalments. Start with a 30% initial deposit, and your order
              ships once payment is completed.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 rounded-2xl bg-brand p-5 text-white md:p-6">
          <PiggyBank className="mt-1 h-8 w-8 shrink-0 text-white" aria-hidden />
          <div>
            <h2 className="display-type text-xl">Save to buy</h2>
            <p className="mt-1 text-sm leading-relaxed text-white/90">
              Plan today, own tomorrow. Build your dream with ease.{" "}
              <a
                href={whatsappUrl("Hi, I'd like to know how Save to Buy works.")}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline underline-offset-2"
              >
                Ask us how on WhatsApp
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
