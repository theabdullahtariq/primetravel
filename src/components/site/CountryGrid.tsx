import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Flag } from "@/components/site/Flags";
import { WHATSAPP_URL } from "@/lib/site";
import { countries, type Country } from "@/lib/countries";

const h = (c: string[], dir: "v" | "h") =>
  c.map((f, i) => (dir === "v" ? `<rect x="${i * (60 / c.length)}" width="${60 / c.length + 0.5}" height="40" fill="${f}"/>` : `<rect y="${i * (40 / c.length)}" width="60" height="${40 / c.length + 0.5}" fill="${f}"/>`)).join("");

const extra: Record<string, string> = {
  france: h(["#0055A4", "#fff", "#EF4135"], "v"),
  italy: h(["#009246", "#fff", "#CE2B37"], "v"),
  germany: h(["#000", "#DD0000", "#FFCE00"], "h"),
  netherlands: h(["#AE1C28", "#fff", "#21468B"], "h"),
  austria: h(["#ED2939", "#fff", "#ED2939"], "h"),
  sweden: `<rect width="60" height="40" fill="#006AA7"/><rect x="16" width="8" height="40" fill="#FECC00"/><rect y="16" width="60" height="8" fill="#FECC00"/>`,
  switzerland: `<rect width="60" height="40" fill="#D52B1E"/><rect x="26" y="9" width="8" height="22" fill="#fff"/><rect x="19" y="16" width="22" height="8" fill="#fff"/>`,
  greece: `<rect width="60" height="40" fill="#0D5EAF"/>${[1, 3, 5, 7].map((i) => `<rect y="${i * 4.44}" width="60" height="4.44" fill="#fff"/>`).join("")}<rect width="22.2" height="22.2" fill="#0D5EAF"/><rect x="8.9" width="4.4" height="22.2" fill="#fff"/><rect y="8.9" width="22.2" height="4.4" fill="#fff"/>`,
  portugal: `<rect width="24" height="40" fill="#006600"/><rect x="24" width="36" height="40" fill="#FF0000"/><circle cx="24" cy="20" r="6" fill="#FFE000"/>`,
};

function CountryFlag({ slug, className }: { slug: string; className?: string }) {
  if (!extra[slug]) return <Flag slug={slug} className={className ?? ""} />;
  return <svg viewBox="0 0 60 40" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className={className} dangerouslySetInnerHTML={{ __html: extra[slug] }} />;
}

function usePhoto(c: Country) {
  const [src, setSrc] = useState<string | undefined>(c.photo);
  useEffect(() => {
    if (c.photo) return;
    const p = new Image();
    p.onload = () => setSrc(`/destinations/${c.slug}.webp`);
    p.src = `/destinations/${c.slug}.webp`;
  }, [c.slug, c.photo]);
  return src;
}

function Card({ c, i }: { c: Country; i: number }) {
  const photo = usePhoto(c);
  const href = `${WHATSAPP_URL}?text=${encodeURIComponent(`Hello Prime Travel LTD, I'd like a free assessment for ${c.name}.`)}`;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ animationDelay: `${i * 35}ms` }}
      className="animate-rise group relative flex w-[78%] shrink-0 snap-start flex-col overflow-hidden sm:w-auto sm:shrink border border-ivory/10 bg-navy-deep transition-all duration-500 hover:-translate-y-1 hover:border-gold">
      <div className="relative h-60 overflow-hidden bg-navy">
        <CountryFlag slug={c.slug} className="absolute inset-0 h-full w-full scale-150 opacity-30 blur-2xl" />
        {photo && <img src={photo} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" />}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/30 to-transparent" />
        <CountryFlag slug={c.slug} className="absolute left-5 top-5 h-7 w-10 border border-ivory/40 shadow-lg" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="text-3xl text-ivory">{c.name}</h3>
          <p className="mt-1.5 text-sm text-ivory/75">{c.blurb}</p>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-ivory/10 px-5 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.16em]">
        <span className="text-ivory/45">{c.group === "schengen" ? "Schengen" : "Worldwide"}</span>
        <span className="inline-flex items-center gap-2 text-gold-soft">Start assessment <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
      </div>
    </a>
  );
}

export function CountryGrid() {
  const [tab, setTab] = useState<"all" | "schengen" | "world">("all");
  const list = countries.filter((c) => tab === "all" || c.group === tab);
  const tabs = [["all", "All", countries.length], ["schengen", "Schengen", countries.filter((c) => c.group === "schengen").length], ["world", "Worldwide", countries.filter((c) => c.group === "world").length]] as const;
  return (
    <div>
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">Every Country We Cover</p>
          <h3 className="mt-3 text-3xl text-ivory md:text-5xl">{countries.length} destinations, one clear process.</h3>
        </div>
        <div className="flex flex-wrap gap-2" role="tablist">
          {tabs.map(([k, l, n]) => (
            <button key={k} type="button" role="tab" aria-selected={tab === k} onClick={() => setTab(k)}
              className={`border px-4 py-3 text-xs md:py-2 font-semibold uppercase tracking-[0.14em] transition-colors ${tab === k ? "border-gold bg-gold text-navy-deep" : "border-ivory/20 text-ivory/70 hover:border-ivory/50"}`}>{l} <span className="opacity-60">{n}</span></button>
          ))}
        </div>
      </div>
      <div key={tab} className="-mx-6 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
        {list.map((c, i) => <Card key={c.slug} c={c} i={i} />)}
      </div>
    </div>
  );
}
