"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { Plug } from "lucide-react";

type ProductImageProps = Omit<ImageProps, "src"> & { src: string | null | undefined };

// next/image with a fallback: a missing or failing image (for example a cart
// item saved before a product photo was replaced) renders a plain placeholder
// instead of the browser's broken-image icon.
const ProductImage = ({ src, alt, className = "", ...props }: ProductImageProps) => {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!src || failedSrc === src) {
    return (
      <span role="img" aria-label={alt} className="absolute inset-0 flex items-center justify-center bg-tint">
        <Plug className="h-1/4 w-1/4 min-h-5 min-w-5 text-brand/30" aria-hidden />
      </span>
    );
  }

  return <Image src={src} alt={alt} className={className} onError={() => setFailedSrc(src)} {...props} />;
};

export default ProductImage;
