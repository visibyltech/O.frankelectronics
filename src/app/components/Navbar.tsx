"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, Heart, ShoppingCart, User } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";
import { DEPARTMENTS, SITE, whatsappUrl } from "@/lib/site";
import type { ApiCategory } from "@/types/api";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { itemCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
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

  const submitSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  // Until the catalogue loads (or if it's empty) show the flyer's departments.
  const departments = categories.length > 0 ? categories : [...DEPARTMENTS];
  const activeCategory = pathname === "/shop" ? searchParams.get("category") : null;

  const iconLink =
    "relative flex h-10 w-10 items-center justify-center rounded-full text-ink transition hover:bg-tint hover:text-brand";
  const badge =
    "absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-white";

  return (
    <header className="sticky top-0 z-30 bg-white shadow-[0_1px_0_0_rgba(15,27,51,0.08)]">
      <div className="bg-brand-dark px-4 py-2 text-xs text-white md:px-10">
        <div className="flex items-center justify-between gap-4">
          <p className="truncate">
            Call or WhatsApp{" "}
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="font-semibold underline-offset-2 hover:underline">
              {SITE.phoneDisplay}
            </a>
          </p>
          <p className="hidden shrink-0 sm:block">Buy now, pay later in flexible instalments</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3 md:flex-nowrap md:gap-x-8 md:px-10">
        <Logo />

        <form
          onSubmit={submitSearch}
          role="search"
          className="order-last flex w-full min-w-0 overflow-hidden rounded-full border border-ink/15 bg-white focus-within:border-brand md:order-none md:flex-1"
        >
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search TVs, laptops, phones, appliances"
            aria-label="Search products"
            className="min-w-0 flex-1 bg-transparent px-5 py-3 text-sm placeholder:text-ink/40 focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Search"
            className="flex shrink-0 items-center gap-2 bg-brand px-5 text-sm font-semibold text-white transition hover:bg-brand-dark"
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">Search</span>
          </button>
        </form>

        <div className="ml-auto flex items-center gap-1 md:ml-0">
          {user ? (
            <div className="group relative">
              <Link href="/account" aria-label="My account" className={iconLink}>
                <User className="h-5 w-5" />
              </Link>
              <div className="invisible absolute top-full right-0 z-20 pt-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <div className="flex w-48 flex-col gap-3 rounded-xl border border-ink/10 bg-white p-4 text-sm shadow-lg">
                  <p className="font-semibold">Hi, {user.name.split(" ")[0]}</p>
                  {user.role === "admin" && (
                    <Link href="/admin" className="hover:text-brand">
                      Admin panel
                    </Link>
                  )}
                  <Link href="/account" className="hover:text-brand">
                    My account
                  </Link>
                  <button onClick={() => logout()} className="text-left hover:text-brand">
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link href="/login" aria-label="Sign in" className={iconLink}>
              <User className="h-5 w-5" />
            </Link>
          )}

          <Link href="/wishlist" aria-label={`Wishlist, ${wishlistCount} items`} className={iconLink}>
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && <span className={badge}>{wishlistCount}</span>}
          </Link>

          <Link href="/cart" aria-label={`Cart, ${itemCount} items`} className={iconLink}>
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && <span className={badge}>{itemCount}</span>}
          </Link>
        </div>
      </div>

      <nav aria-label="Departments" className="bg-brand">
        <ul className="flex gap-1 overflow-x-auto px-4 text-sm font-medium whitespace-nowrap md:px-10 [&::-webkit-scrollbar]:hidden">
          <li>
            <Link
              href="/shop"
              className={`block px-3 py-3 transition hover:bg-brand-dark ${
                pathname === "/shop" && !activeCategory ? "bg-brand-dark text-white" : "text-white/90"
              }`}
            >
              All products
            </Link>
          </li>
          {departments.map((department) => (
            <li key={department.slug}>
              <Link
                href={`/shop?category=${department.slug}`}
                className={`block px-3 py-3 transition hover:bg-brand-dark ${
                  activeCategory === department.slug ? "bg-brand-dark text-white" : "text-white/90"
                }`}
              >
                {department.name}
              </Link>
            </li>
          ))}
          <li className="ml-auto">
            <Link
              href="/contact"
              className={`block px-3 py-3 transition hover:bg-brand-dark ${
                pathname === "/contact" ? "bg-brand-dark text-white" : "text-white/90"
              }`}
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
