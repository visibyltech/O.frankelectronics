import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";

type LogoProps = {
  className?: string;
  size?: "md" | "lg";
};

// Transparent cut-out of the 3D logo (source: public/brand/logo-source.jpg).
// Its red and blue read best on white surfaces such as the header.
const Logo = ({ className = "", size = "md" }: LogoProps) => {
  return (
    <Link href="/" aria-label={`${SITE.name} home`} className={`block shrink-0 ${className}`}>
      <Image
        src="/brand/logo.png"
        alt={SITE.name}
        width={981}
        height={322}
        priority
        className={size === "lg" ? "h-20 w-auto" : "h-11 w-auto md:h-14"}
      />
    </Link>
  );
};

export default Logo;
