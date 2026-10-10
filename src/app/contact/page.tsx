import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SITE, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact us",
  description: `Call, WhatsApp or email ${SITE.name}.`,
};

const channels = [
  {
    label: "WhatsApp",
    value: "The fastest way to reach us and place an order",
    href: whatsappUrl(),
    external: true,
  },
  { label: "Call", value: SITE.phoneDisplay, href: `tel:${SITE.phoneDisplay.replace(/\s/g, "")}` },
  { label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
];

export default function ContactPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="bg-tint px-4 py-14 md:px-10 md:py-20">
        <h1 className="display-type text-4xl text-brand-dark md:text-6xl">
          Talk to <span className="text-brand">us.</span>
        </h1>
        <p className="mt-6 max-w-sm leading-relaxed text-ink/70">
          Questions about a product, an order or paying in instalments? Reach us however suits you
          and we will get back to you as soon as we can.
        </p>
      </div>

      <ul className="px-4 py-6 md:px-10 lg:py-20">
        {channels.map((channel) => (
          <li key={channel.label} className="border-b border-ink/10">
            <a
              href={channel.href}
              {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group flex items-center justify-between gap-6 py-8"
            >
              <span>
                <span className="display-type block text-3xl text-ink transition group-hover:text-brand md:text-4xl">
                  {channel.label}
                </span>
                <span className="mt-2 block text-sm break-all text-ink/60">{channel.value}</span>
              </span>
              <ArrowUpRight className="h-6 w-6 shrink-0 text-ink/40 transition group-hover:text-brand" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
