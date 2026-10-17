import { useState } from "react";
import { BedDouble, BookOpen, Briefcase, Camera, Check, ClipboardList, Landmark, PenLine, Plane, ShieldCheck } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/site";
import { WhatsAppIcon } from "@/components/site/Layout";

const groups = [
  { name: "Identity", items: [
    { id: "passport", t: "Valid passport", n: "Usually 6+ months validity", Icon: BookOpen },
    { id: "photos", t: "Passport photographs", n: "To the destination's spec", Icon: Camera },
  ] },
  { name: "Application", items: [
    { id: "form", t: "Completed application form", n: "Consistent with your documents", Icon: ClipboardList },
    { id: "letter", t: "Cover letter", n: "Purpose and itinerary", Icon: PenLine },
  ] },
  { name: "Proof", items: [
    { id: "bank", t: "Bank statements", n: "Recent, with a clear history", Icon: Landmark },
    { id: "work", t: "Employment / business proof", n: "Letter, NOC or registration", Icon: Briefcase },
  ] },
  { name: "Travel", items: [
    { id: "booking", t: "Flight & hotel reservations", n: "Aligned with your dates", Icon: Plane },
    { id: "insurance", t: "Travel insurance", n: "Where the destination requires it", Icon: ShieldCheck },
  ] },
];
const all = groups.flatMap((g) => g.items);
const R = 92, C = 2 * Math.PI * R, TICKS = 60;

export function ReadinessChecker() {
  const [on, setOn] = useState<Set<string>>(new Set());
  const pct = on.size / all.length;
  const toggle = (id: string) => setOn((s) => { const n = new Set(s); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  const status = pct === 0 ? "Starting" : pct < 0.5 ? "Getting there" : pct < 1 ? "Almost there" : "Ready for review";
  const have = all.filter((i) => on.has(i.id)).map((i) => i.t);
  const need = all.filter((i) => !on.has(i.id)).map((i) => i.t);
  const text = on.size === 0
    ? "Hello Prime Travel LTD, I'd like help preparing my visa file."
    : `Hello Prime Travel LTD, I'd like help with my visa file.\nFile readiness: ${Math.round(pct * 100)}%\nI have: ${have.join(", ") || "-"}\nStill needed: ${need.join(", ") || "nothing, please review"}`;
  const href = `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
  const miles = [["Starting", 0], ["Halfway", 0.5], ["Ready", 1]] as const;

  return (
    <div className="relative mt-16">
      <div className="pointer-events-none absolute inset-0 -z-0 opacity-25" style={{ backgroundImage: "radial-gradient(var(--ivory) .6px, transparent .7px)", backgroundSize: "22px 22px", maskImage: "radial-gradient(ellipse at 30% 40%, black, transparent 70%)" }} />
      <div className="relative grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="relative mx-auto aspect-square max-w-sm">
            <div className="absolute inset-6 rounded-full bg-gold blur-3xl transition-opacity duration-700" style={{ opacity: 0.08 + pct * 0.3 }} />
            <svg viewBox="0 0 240 240" className="relative h-full w-full" aria-hidden="true">
              <defs><linearGradient id="rg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" style={{ stopColor: "var(--gold-soft)" }} /><stop offset="1" style={{ stopColor: "var(--gold)" }} /></linearGradient>
                <path id="stampArc" d="M120,120 m-68,0 a68,68 0 1,1 136,0 a68,68 0 1,1 -136,0" /></defs>
              {Array.from({ length: TICKS }).map((_, i) => {
                const a = (i / TICKS) * 2 * Math.PI - Math.PI / 2, r2 = i % 5 === 0 ? 119 : 115;
                return <line key={i} x1={120 + 108 * Math.cos(a)} y1={120 + 108 * Math.sin(a)} x2={120 + r2 * Math.cos(a)} y2={120 + r2 * Math.sin(a)}
                  stroke={i / TICKS < pct ? "var(--gold)" : "var(--ivory)"} strokeOpacity={i / TICKS < pct ? 1 : 0.18} strokeWidth={i % 5 === 0 ? 1.6 : 1} style={{ transition: "stroke .4s, stroke-opacity .4s" }} />;
              })}
              <circle cx="120" cy="120" r={R} fill="none" stroke="var(--ivory)" strokeOpacity=".1" strokeWidth="10" />
              <circle cx="120" cy="120" r={R} fill="none" stroke="url(#rg)" strokeWidth="10" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - pct)} transform="rotate(-90 120 120)" className="ring-arc" style={{ filter: "drop-shadow(0 0 6px color-mix(in oklab, var(--gold) 70%, transparent))" }} />
              <g style={{ transformOrigin: "120px 120px", animation: "seal-spin 50s linear infinite" }}>
                <text fontSize="7" letterSpacing="3.2" fill="var(--ivory)" fillOpacity=".4"><textPath href="#stampArc">PRIME TRAVEL LTD · FILE READINESS · VISA GUIDANCE · </textPath></text>
              </g>
            </svg>
            <div className="absolute inset-0 grid place-items-center text-center" aria-live="polite">
              <div>
                <p className="font-serif text-7xl leading-none text-gold-soft">{Math.round(pct * 100)}<span className="text-3xl">%</span></p>
                <p className="eyebrow mt-3 !text-ivory">{status}</p>
                <p className="mt-1 text-xs text-ivory/50">{on.size} of {all.length} documents</p>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-8 flex max-w-sm justify-between">
            {miles.map(([l, v]) => (
              <span key={l} className={`flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] transition-colors ${pct >= v ? "text-gold-soft" : "text-ivory/35"}`}>
                <span className={`h-2 w-2 rotate-45 transition-colors ${pct >= v ? "bg-gold" : "bg-ivory/25"}`} />{l}
              </span>
            ))}
          </div>
        </div>

        <div className="border border-ivory/10 bg-ivory/[0.04] p-5 backdrop-blur-sm md:p-8 lg:col-span-7">
          <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
            {groups.map((g) => (
              <div key={g.name}>
                <p className="mb-3 flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold-soft">{g.name}<span className="h-px flex-1 bg-ivory/15" /></p>
                <ul className="space-y-2">
                  {g.items.map(({ id, t, n, Icon }) => {
                    const d = on.has(id);
                    return (
                      <li key={id}>
                        <button type="button" aria-pressed={d} onClick={() => toggle(id)}
                          className={`group flex w-full items-center gap-3 border p-3 text-left transition-all duration-300 ${d ? "-translate-y-0.5 border-gold bg-gold/10 shadow-[0_14px_30px_-18px_var(--gold)]" : "border-ivory/12 hover:border-ivory/40"}`}>
                          <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full transition-colors duration-300 ${d ? "bg-gold text-navy-deep" : "bg-gold/15 text-gold-soft group-hover:bg-gold/25"}`}><Icon className="h-5 w-5" /></span>
                          <span className="min-w-0 flex-1"><span className="block text-sm font-semibold leading-tight">{t}</span><span className="mt-0.5 block text-xs text-ivory/50">{n}</span></span>
                          <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-all duration-300 ${d ? "border-gold bg-gold text-navy-deep" : "border-ivory/30"}`}><Check className={`h-3 w-3 transition-transform duration-300 ${d ? "scale-100" : "scale-0"}`} /></span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-ivory/10 pt-6 sm:flex-row sm:items-center">
            <p className="max-w-xs text-sm text-ivory/70">{on.size === 0 ? "Not sure where to start? Tell us and we'll map it out." : `Send your list to our team: ${need.length} item${need.length === 1 ? "" : "s"} still to go.`}</p>
            <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-gold shrink-0"><WhatsAppIcon className="h-4 w-4" /> {on.size === 0 ? "Chat on WhatsApp" : "Send my checklist"}</a>
          </div>
          <p className="mt-5 text-xs text-ivory/40">Illustrative only. Requirements differ by destination and purpose; we provide a personalised checklist.</p>
        </div>
      </div>
    </div>
  );
}
