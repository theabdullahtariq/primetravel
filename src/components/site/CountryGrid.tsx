import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Flag } from "@/components/site/Flags";
import { WHATSAPP_URL } from "@/lib/site";
import { countries, type Country } from "@/lib/countries";

function usePhoto(c: Country) {
  const [src, setSrc] = useState<string | undefined>(undefined);
  useEffect(() => {
    const p = new Image();
    p.onload = () => setSrc(`/destinations/${c.slug}.webp`);
    p.src = `/destinations/${c.slug}.webp`;
  }, [c.slug]);
  return src;
}

function Card({ c, i }: { c: Country; i: number }) {
  const photo = usePhoto(c);
  const href = `${WHATSAPP_URL}?text=${encodeURIComponent(`Hello Prime Travel LTD, I'd like a free assessment for ${c.name}.`)}`;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ animationDelay: `${i * 35}ms` }}
      className="animate-rise group relative flex w-[78%] shrink-0 snap-start flex-col overflow-hidden sm:w-auto sm:shrink border border-ivory/10 bg-navy-deep transition-all duration-500 hover:-translate-y-1 hover:border-gold">
      <div className="relative h-60 overflow-hidden bg-navy">
        <Flag slug={c.slug} className="absolute inset-0 h-full w-full scale-150 opacity-30 blur-2xl" />
        {photo && <img src={photo} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" />}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/30 to-transparent" />
        <Flag slug={c.slug} className="absolute left-5 top-5 h-7 w-10 border border-ivory/40 shadow-lg" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="text-3xl text-ivory">{c.name}</h3>
          <p className="mt-1.5 text-sm text-ivory/75">{c.blurb}</p>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-ivory/10 px-5 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.16em]">
        <span className="text-ivory/45">Schengen</span>
        <span className="inline-flex items-center gap-2 text-gold-soft">Start assessment <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
      </div>
    </a>
  );
}

export function CountryGrid() {
  return (
    <div>
      <p className="eyebrow">Featured Destinations</p>
      <h3 className="mt-3 text-3xl text-ivory md:text-5xl">Where would you like to go?</h3>
      <div className="-mx-6 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
        {countries.map((c, i) => <Card key={c.slug} c={c} i={i} />)}
      </div>
    </div>
  );
}
