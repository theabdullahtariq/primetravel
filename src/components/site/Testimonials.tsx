import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { Reveal } from "@/components/site/Layout";

type Review = { name: string; meta: string; quote: string; rating?: number };

/* ⚠ SAMPLE REVIEWS: these are invented examples so the design can be seen in context.
   Before launch, replace each entry with a REAL review from a real client (with their permission),
   then set SAMPLE to false. Publishing invented reviews as genuine is prohibited under UK consumer law.
   While SAMPLE is true, a small "sample reviews" note is shown to visitors. */
const SAMPLE = true;

const reviews: Review[] = [
  { name: "Aisha K.", meta: "Schengen · Appointment Assistance", rating: 5, quote: "The refund promise made starting easy. My appointment was secured quickly, and I knew exactly what to bring on the day." },
  { name: "Daniel R.", meta: "Canada · Document Preparation", rating: 5, quote: "Every document was checked against the embassy list before submission. Having my cover letter and itinerary organised took the stress out." },
  { name: "Sara M.", meta: "Turkey · Visa Application Assistance", rating: 5, quote: "Quick replies on WhatsApp and no confusing jargon. I always knew what the next step was and what was expected of me." },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);
  useEffect(() => {
    if (hold || reviews.length < 2) return;
    const t = setInterval(() => setI((x) => (x + 1) % reviews.length), 8000);
    return () => clearInterval(t);
  }, [hold]);
  if (!reviews.length) return null;
  const r = reviews[i]!;
  const go = (d: number) => setI((x) => (x + d + reviews.length) % reviews.length);
  const initials = r.name.split(" ").map((w) => w[0]).slice(0, 2).join("");

  return (
    <section className="relative overflow-hidden bg-card py-28 md:py-36">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow">Client Stories</p>
          <h2 className="mt-5 text-4xl md:text-5xl">What our clients say.</h2>
          <p className="mt-5 max-w-sm text-muted-foreground">Honest words from people we've guided through the process.</p>
          {reviews.length > 1 && (
            <div className="mt-10 flex items-center gap-5">
              <button type="button" aria-label="Previous review" onClick={() => go(-1)} className="grid h-12 w-12 place-items-center border border-border transition-colors hover:border-gold hover:text-gold"><ArrowLeft className="h-4 w-4" /></button>
              <button type="button" aria-label="Next review" onClick={() => go(1)} className="grid h-12 w-12 place-items-center border border-border transition-colors hover:border-gold hover:text-gold"><ArrowRight className="h-4 w-4" /></button>
              <span className="font-serif text-2xl text-gold">{String(i + 1).padStart(2, "0")}<span className="text-muted-foreground"> / {String(reviews.length).padStart(2, "0")}</span></span>
            </div>
          )}
        </Reveal>

        <Reveal delay={120} className="lg:col-span-8">
          <figure onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)} onFocus={() => setHold(true)} onBlur={() => setHold(false)}
            className="relative overflow-hidden border border-border bg-background p-8 shadow-[0_40px_80px_-50px_color-mix(in_oklab,var(--navy)_50%,transparent)] md:p-14">
            <Quote className="pointer-events-none absolute -right-2 -top-2 h-32 w-32 text-gold/15" aria-hidden="true" />
            <div key={i} className="animate-rise relative">
              <div className="flex gap-1 text-gold" aria-label={`${r.rating ?? 5} out of 5 stars`}>
                {Array.from({ length: r.rating ?? 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
              </div>
              <blockquote className="mt-6 font-serif text-2xl leading-snug md:text-4xl">“{r.quote}”</blockquote>
              <figcaption className="mt-10 flex items-center gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-navy font-serif text-xl text-gold-soft">{initials}</span>
                <span><span className="block font-semibold">{r.name}</span><span className="text-sm text-muted-foreground">{r.meta}</span></span>
              </figcaption>
            </div>
            {reviews.length > 1 && (
              <div className="relative mt-10 flex gap-2">
                {reviews.map((_, k) => <button key={k} type="button" aria-label={`Show review ${k + 1}`} onClick={() => setI(k)} className="flex-1 py-3"><span className={`block h-1 transition-colors ${k === i ? "bg-gold" : "bg-border"}`} /></button>)}
              </div>
            )}
          </figure>
          {SAMPLE && <p className="mt-4 text-xs text-muted-foreground">Sample reviews shown for illustration.</p>}
        </Reveal>
      </div>
    </section>
  );
}
