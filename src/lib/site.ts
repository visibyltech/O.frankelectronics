// Store contact and payment details, shown in the header, footer, contact
// page, hero and checkout. Edit them here only.
export const SITE = {
  name: "O Frank Electronics",
  shortName: "O Frank",
  tagline: "Quality You Can Trust",
  domain: "www.ofrankelectronics.com.ng",
  email: "o.frankelectronics@gmail.com",
  phoneDisplay: "+234 814 846 7208",
  whatsappNumber: "2348148467208",
  bankAccounts: [
    { bank: "Zenith Bank", accountName: "O.Frank Electronics", accountNumber: "1012881236" },
  ],
};

export const whatsappUrl = (message?: string) =>
  `https://wa.me/${SITE.whatsappNumber}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

// The six departments from the flyer. The slugs match scripts/seed-catalog.mjs.
export const DEPARTMENTS = [
  { slug: "televisions", name: "Televisions" },
  { slug: "laptops-computers", name: "Laptops & Computers" },
  { slug: "mobile-phones-accessories", name: "Mobile Phones & Accessories" },
  { slug: "home-appliances", name: "Home Appliances" },
  { slug: "kitchen-appliances", name: "Kitchen Appliances" },
  { slug: "gadgets", name: "Gadgets & More" },
] as const;
