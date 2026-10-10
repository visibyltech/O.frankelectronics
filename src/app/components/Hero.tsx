import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarCheck, PiggyBank } from "lucide-react";
import { whatsappUrl } from "@/lib/site";

const Hero = () => {
  return (
    <section>
      <div className="grid grid-cols-1 items-center gap-8 bg-tint px-4 py-10 md:px-10 md:py-14 lg:grid-cols-2 lg:gap-12">
        <div>
          <h1 className="display-type text-4xl text-brand-dark md:text-5xl xl:text-6xl">
            Top quality electronics for <span className="text-brand">better living.</span>
          </h1>
          <p className="mt-5 max-w-md leading-relaxed text-ink/70">
            Your one-stop shop for televisions, laptops, phones, home and kitchen appliances and
            gadgets. Genuine products with a reliable warranty.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/shop"
              className="group flex items-center gap-3 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              Shop now
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <a
              href={whatsappUrl("Hi, I'd like to place an order.")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-brand-dark underline decoration-brand-dark/30 underline-offset-4 transition hover:decoration-brand"
            >
              Order on WhatsApp
            </a>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-white">
          <Image
            src="/brand/hero-products.jpg"
            alt="Television, laptop, phones, refrigerator, washing machine, air conditioner and microwave"
            width={720}
            height={272}
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="h-auto w-full"
          />
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
