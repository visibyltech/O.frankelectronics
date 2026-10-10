import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse televisions, laptops, phones, home and kitchen appliances and gadgets from O Frank Electronics.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
