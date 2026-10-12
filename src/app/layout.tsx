import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Suspense } from "react";
import Script from "next/script";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Providers from "./components/Providers";
import { SITE } from "@/lib/site";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | Top quality electronics, ${SITE.tagline.toLowerCase()}`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Televisions, laptops, phones, home and kitchen appliances and gadgets. Genuine products, reliable warranty, fast and safe delivery, flexible payment.",
  icons: { icon: "/brand/icon.png", apple: "/brand/icon.png" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body suppressHydrationWarning className="flex min-h-screen flex-col font-sans antialiased">
        {/* Required by the Klump SDK, which caches this container on load to mount its checkout iframe into. */}
        <div id="klump__checkout" className="hidden" />
        <Script src="https://js.useklump.com/klump.js" strategy="afterInteractive" />
        <Providers>
          <Suspense fallback={<div className="h-[9.5rem]" aria-hidden />}>
            <Navbar />
          </Suspense>
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
