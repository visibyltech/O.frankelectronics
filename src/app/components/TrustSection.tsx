import { Headset, ShieldCheck, Truck, Wrench } from "lucide-react";

const promises = [
  { icon: ShieldCheck, title: "Genuine products", body: "Authentic electronics from trusted brands." },
  { icon: Wrench, title: "Reliable warranty", body: "Backed by a warranty you can count on." },
  { icon: Truck, title: "Fast and safe delivery", body: "Your order arrives quickly and in one piece." },
  { icon: Headset, title: "Excellent support", body: "Call or WhatsApp us whenever you need help." },
];

const TrustSection = () => {
  return (
    <section className="mt-14 bg-tint px-4 py-10 md:mt-20 md:px-10 xl:px-[8%] md:py-12">
      <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {promises.map(({ icon: Icon, title, body }) => (
          <li key={title} className="flex items-start gap-4">
            <Icon className="mt-0.5 h-7 w-7 shrink-0 text-brand" aria-hidden />
            <div>
              <h3 className="text-sm font-bold text-brand-dark">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink/70">{body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TrustSection;
