import type { Metadata } from "next";
import { PHOTO_CREDITS } from "@/lib/photo-credits";

export const metadata: Metadata = {
  title: "Photo credits",
  description: "Credits for openly licensed product photos used on this site.",
};

export default function CreditsPage() {
  return (
    <div className="px-4 py-14 md:px-10 md:py-20 xl:px-[8%]">
      <h1 className="display-type text-4xl text-brand-dark md:text-5xl">Photo credits</h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-ink/70">
        Some product photos on this site are openly licensed images from Wikimedia Commons, used
        under the licences below. Photos are illustrative; the product you receive may differ in
        appearance.
      </p>

      <ul className="mt-10 divide-y divide-ink/10 border-y border-ink/10 text-sm">
        {PHOTO_CREDITS.map((credit) => (
          <li key={credit.file} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4">
            <a href={credit.source} target="_blank" rel="noopener noreferrer" className="font-medium hover:text-brand">
              {credit.title}
            </a>
            <span className="text-ink/60">
              {credit.author ? `${credit.author}, ` : ""}
              {credit.licenseUrl ? (
                <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand">
                  {credit.license}
                </a>
              ) : (
                credit.license
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
