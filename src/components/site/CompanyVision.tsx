import { Quote } from "lucide-react";
import vision from "@/assets/schengen.webp";
import { Reveal } from "@/components/site/Layout";

const values = [
  ["Clarity first", "Plain-language guidance, so you always know what is needed and why."],
  ["Honest by design", "No guarantees we can't keep, and a refund promise we can."],
  ["Personal, always", "A growing range of destinations, each handled with the same individual care."],
];

export function CompanyVision() {
  return (
    <section className="grain relative overflow-hidden bg-navy-deep py-24 text-ivory md:py-32">
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="container-x relative grid items-center gap-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <div className="relative mx-auto max-w-md lg:mx-0">
            <div className="absolute -bottom-4 -right-4 h-full w-full border border-gold/60" aria-hidden="true" />
            <img src={vision} alt="A sunlit European square at golden hour" loading="lazy" width={800} height={1000} className="relative aspect-[4/5] w-full object-cover" />
            <div className="glass absolute -left-3 bottom-6 px-5 py-4 sm:-left-6">
              <p className="font-serif text-xl">Prime Travel LTD</p>
              <p className="eyebrow mt-1">Our Vision</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-7">
          <p className="eyebrow">Company Vision</p>
          <h2 className="mt-5 text-4xl leading-[1.08] md:text-5xl">A visa journey should feel <span className="text-gold-soft">organised, not overwhelming.</span></h2>
          <p className="mt-6 max-w-xl text-ivory/75">
            Prime Travel LTD was founded on that simple idea. We take a hands-on approach, so every client understands what is required, prepares a complete file and knows the next step at every stage.
          </p>
          <p className="mt-4 max-w-xl text-ivory/75">
            We believe in honest guidance over empty promises. That is why we never guarantee outcomes, back our deposit with a full refund if no appointment date is found within two weeks, and keep you informed from your first message to passport collection.
          </p>

          <figure className="relative mt-10 max-w-xl border-l-2 border-gold pl-6">
            <Quote className="absolute -top-3 right-0 h-10 w-10 text-gold/25" aria-hidden="true" />
            <blockquote className="font-serif text-xl leading-snug md:text-2xl">
              “Our vision is simple: every traveller should approach a visa application with confidence, not confusion. We succeed when our clients feel prepared, informed and looked after.”
            </blockquote>
            <figcaption className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold-soft">Prime Travel LTD</figcaption>
          </figure>

          <ul className="mt-12 grid gap-px bg-ivory/10 sm:grid-cols-3">
            {values.map(([t, s], i) => (
              <li key={t} className="bg-navy-deep p-5">
                <span className="font-serif text-2xl text-gold">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em]">{t}</p>
                <p className="mt-2 text-sm text-ivory/60">{s}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
