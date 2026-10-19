import { useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { Flag } from "@/components/site/Flags";
import { WHATSAPP_URL } from "@/lib/site";
import { allSchengen } from "@/lib/countries";

export function SchengenAll() {
  const [q, setQ] = useState("");
  const list = allSchengen.filter((c) => c.name.toLowerCase().includes(q.trim().toLowerCase()));
  const link = (name: string) => `${WHATSAPP_URL}?text=${encodeURIComponent(`Hello Prime Travel LTD, I'd like a free assessment for ${name}.`)}`;
  return (
    <div>
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">The Full Schengen Area</p>
          <h3 className="mt-3 text-3xl text-ivory md:text-5xl"><span className="text-gold-soft">{allSchengen.length}</span> countries, one visa partner.</h3>
        </div>
        <label className="relative block w-full md:w-80">
          <span className="sr-only">Search countries</span>
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ivory/50" aria-hidden="true" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Find your country" className="w-full border border-ivory/20 bg-ivory/5 py-3.5 pl-11 pr-4 text-base text-ivory outline-none placeholder:text-ivory/40 focus:border-gold" />
        </label>
      </div>
      <ul className="mt-10 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
        {list.map((c) => (
          <li key={c.slug}>
            <a href={link(c.name)} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 border border-ivory/10 bg-ivory/[0.04] p-3 transition-all hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10">
              <Flag slug={c.slug} className="h-5 w-8 shrink-0 border border-ivory/30" />
              <span className="min-w-0 flex-1 truncate text-sm font-medium text-ivory">{c.name}</span>
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-gold-soft opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
      {list.length === 0 && <p className="mt-8 text-ivory/70">No match in the list. Message us and we will confirm whether we can help.</p>}
      <p className="mt-8 text-xs text-ivory/45">Ireland and Cyprus are not part of the Schengen Area.</p>
    </div>
  );
}
