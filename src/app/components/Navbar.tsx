"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, Heart, ShoppingCart, User, Menu } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";
import { DEPARTMENTS } from "@/lib/site";
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
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3 md:flex-nowrap md:gap-x-8 md:px-10 xl:px-[8%]">
        <Logo />

        <form
          onSubmit={submitSearch}
          role="search"
          className="order-last flex w-full min-w-0 items-center overflow-hidden rounded-full bg-[#eeeeee] focus-within:ring-2 focus-within:ring-brand md:order-none md:flex-1"
        >
          <Search className="ml-5 h-5 w-5 shrink-0 text-ink/70" aria-hidden />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products"
            aria-label="Search products"
            className="min-w-0 flex-1 bg-transparent px-3 py-3.5 text-sm placeholder:text-ink/40 focus:outline-none"
          />
          <button type="submit" className="sr-only">
            Search
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
            <Link href="/login" className="px-3 text-sm font-medium whitespace-nowrap transition hover:text-brand">
              Login/Register
            </Link>
          )}

          <Link href="/wishlist" aria-label={`Wishlist, ${wishlistCount} items`} className={iconLink}>
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && <span className={badge}>{wishlistCount}</span>}
          </Link>

          <Link
            href="/cart"
            aria-label={`Cart, ${itemCount} items`}
            className="relative flex items-center gap-2 px-3 text-sm font-medium transition hover:text-brand"
          >
            <span className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2.5 -left-2.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-white">
                {itemCount}
              </span>
            </span>
            <span className="hidden sm:inline">Cart</span>
          </Link>
        </div>
      </div>

      <nav aria-label="Departments" className="border-t border-ink/10 bg-[#f7f7f7]">
        <ul className="flex items-center gap-2 overflow-x-auto px-4 text-sm whitespace-nowrap md:px-10 xl:px-[8%] [&::-webkit-scrollbar]:hidden">
          <li>
            <Link
              href="/shop"
              className={`block px-3 py-4 transition hover:text-brand ${
                pathname === "/shop" && !activeCategory ? "text-brand" : "text-ink"
              }`}
            >
              <span className="flex items-center gap-3 text-base">
                <Menu className="h-5 w-5" aria-hidden />
                All Categories
              </span>
            </Link>
          </li>
          <li>
            <Link href="/#promotions" className="block px-3 py-4 text-ink transition hover:text-brand">
              Promotions
            </Link>
          </li>
          {departments.map((department) => (
            <li key={department.slug}>
              <Link
                href={`/shop?category=${department.slug}`}
                className={`block px-3 py-4 transition hover:text-brand ${
                  activeCategory === department.slug ? "text-brand" : "text-ink"
                }`}
              >
                {department.name}
              </Link>
            </li>
          ))}
          <li className="ml-auto">
            <Link
              href="/contact"
              className={`block px-3 py-4 transition hover:text-brand ${
                pathname === "/contact" ? "text-brand" : "text-ink"
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
