"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DEPARTMENTS, SITE, whatsappUrl } from "@/lib/site";

const helpLinks = [
  { name: "Contact us", href: "/contact" },
  { name: "My account", href: "/account" },
  { name: "Wishlist", href: "/wishlist" },
  { name: "Cart", href: "/cart" },
  { name: "Photo credits", href: "/credits" },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [error, setError] = useState("");

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setError("");
    setStatus("submitting");
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }).catch(() => null);

    if (!res?.ok) {
      const data = await res?.json().catch(() => null);
      setError(data?.error ?? "We couldn't sign you up. Please try again.");
      setStatus("idle");
      return;
    }
    setStatus("done");
    setEmail("");
  };

  return (
    <footer className="mt-14 bg-brand-dark text-white md:mt-20">
      <div className="grid grid-cols-1 gap-12 px-4 pt-14 pb-10 md:px-10 xl:px-[8%] lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="display-type text-3xl">{SITE.name}</p>
          <p className="mt-1 text-sm text-white/70">{SITE.tagline}</p>

          <h2 className="mt-8 text-sm font-semibold">Hear about new arrivals and deals</h2>
          {status === "done" ? (
            <p className="mt-3 text-sm text-white/80">You are on the list. Thank you.</p>
          ) : (
            <form onSubmit={handleSubscribe} className="mt-3 flex max-w-md overflow-hidden rounded-full bg-white/10 focus-within:bg-white/15">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                aria-label="Email address"
                className="w-full bg-transparent px-5 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="flex shrink-0 items-center gap-2 bg-brand px-5 text-sm font-semibold text-white transition hover:bg-brand-light disabled:opacity-60"
              >
                {status === "submitting" ? "Signing up" : "Sign up"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}
          {error && <p className="mt-2 text-sm text-red-200">{error}</p>}
        </div>

        <nav aria-label="Departments" className="lg:col-span-3 lg:col-start-7">
          <h3 className="text-sm font-semibold">Shop</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            <li>
              <Link href="/shop" className="transition hover:text-white">
                All products
              </Link>
            </li>
            {DEPARTMENTS.map((department) => (
              <li key={department.slug}>
                <Link href={`/shop?category=${department.slug}`} className="transition hover:text-white">
                  {department.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-10 lg:col-span-3">
          <nav aria-label="Help">
            <h3 className="text-sm font-semibold">Help</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              {helpLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="transition hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <address className="text-sm leading-relaxed text-white/70 not-italic">
            <h3 className="text-sm font-semibold text-white">Call or WhatsApp</h3>
            <p className="mt-4">
              <a href={`tel:${SITE.phoneDisplay.replace(/\s/g, "")}`} className="transition hover:text-white">
                {SITE.phoneDisplay}
              </a>
            </p>
            <p>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
                Chat on WhatsApp
              </a>
            </p>
            <p>
              <a href={`mailto:${SITE.email}`} className="break-all transition hover:text-white">
                {SITE.email}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/15 px-4 py-6 text-xs text-white/60 md:px-10 xl:px-[8%]">
        © {new Date().getFullYear()} {SITE.name}. Quality products. Flexible payment. Total satisfaction.
      </div>
    </footer>
  );
};

export default Footer;
