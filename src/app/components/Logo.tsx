import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";

type LogoProps = {
  className?: string;
  size?: "md" | "lg";
};

// The logo artwork has a white background, so it sits on white surfaces
// (header, footer panel). Dark surfaces use the text wordmark instead.
const Logo = ({ className = "", size = "md" }: LogoProps) => {
  return (
    <Link href="/" aria-label={`${SITE.name} home`} className={`block shrink-0 ${className}`}>
      <Image
        src="/brand/logo.png"
        alt={SITE.name}
        width={700}
        height={559}
        priority
        className={size === "lg" ? "h-24 w-auto" : "h-12 w-auto md:h-14"}
      />
    </Link>
  );
};

export default Logo;
