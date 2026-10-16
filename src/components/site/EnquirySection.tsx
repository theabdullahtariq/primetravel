import { useState, type FormEvent } from "react";
import { z } from "zod";
import { MessageCircle, Send, ShieldCheck, UserCheck } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/site";
import { countryOptions } from "@/lib/countries";
import { Reveal, WhatsAppIcon } from "@/components/site/Layout";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255).or(z.literal("")),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(25).regex(/^[+\d\s()-]+$/, "Digits, spaces and + only"),
  destination: z.string().min(1, "Please choose a destination"),
  message: z.string().trim().max(1000, "Keep it under 1000 characters"),
});
type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const points = [
  { Icon: MessageCircle, t: "Straight to WhatsApp", s: "Your details arrive pre-written, ready to send." },
  { Icon: ShieldCheck, t: "Deposit, protected", s: "£30 deposit, with a full refund if no appointment date within 2 weeks." },
  { Icon: UserCheck, t: "A real person", s: "Personal guidance for your destination and purpose." },
];

const input = "mt-2 w-full border border-ivory/15 bg-ivory/5 px-4 py-3.5 text-ivory outline-none transition-colors placeholder:text-ivory/35 focus:border-gold [color-scheme:dark]";
const label = "block text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-ivory/60";

export function EnquirySection() {
  const [errors, setErrors] = useState<Errors>({});
  const [opened, setOpened] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const r = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!r.success) {
      const errs: Errors = {};
      r.error.issues.forEach((i) => { errs[i.path[0] as keyof Errors] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    const v = r.data;
    const text = [
      "Hello Prime Travel LTD, I'd like a free assessment.",
      `Name: ${v.name}`,
      `Phone: ${v.phone}`,
      v.email && `Email: ${v.email}`,
      `Destination: ${v.destination}`,
      v.message && `Details: ${v.message}`,
    ].filter(Boolean).join("\n");
    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setOpened(true);
  }

  const Err = ({ k }: { k: keyof Errors }) => errors[k] ? <p role="alert" className="mt-1.5 text-xs text-red-300">{errors[k]}</p> : null;

  return (
    <section id="enquiry" className="grain relative overflow-hidden bg-navy-deep py-28 text-ivory md:py-36">
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="container-x relative grid items-center gap-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow">Get In Touch</p>
          <h2 className="mt-5 text-4xl leading-[1.05] md:text-6xl">Start your visa application <span className="text-gold-soft">today.</span></h2>
          <p className="mt-6 max-w-md text-lg text-ivory/70">Fill in the form and your enquiry opens in WhatsApp, ready to send to our team for a personalised assessment.</p>
          <ul className="mt-10 space-y-6">
            {points.map(({ Icon, t, s }) => (
              <li key={t} className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold/40 bg-ivory/5 text-gold-soft"><Icon className="h-5 w-5" /></span>
                <span><span className="block text-sm font-semibold uppercase tracking-[0.14em]">{t}</span><span className="mt-1 block text-sm text-ivory/60">{s}</span></span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-7">
          <form onSubmit={onSubmit} noValidate className="relative overflow-hidden border border-ivory/15 bg-navy/60 p-6 backdrop-blur md:p-10">
            <Send className="pointer-events-none absolute -right-4 -top-4 h-28 w-28 rotate-12 text-gold/10" aria-hidden="true" />
            <div className="relative grid gap-6 sm:grid-cols-2">
              <label className={label}>Full name<input name="name" autoComplete="name" placeholder="John Doe" className={input} /><Err k="name" /></label>
              <label className={label}>Email address<input name="email" type="email" autoComplete="email" placeholder="john@example.com" className={input} /><Err k="email" /></label>
              <label className={label}>Phone number<input name="phone" type="tel" autoComplete="tel" placeholder="+44 7000 000000" className={input} /><Err k="phone" /></label>
              <label className={label}>Destination country
                <select name="destination" defaultValue="" className={input}>
                  <option value="" disabled>Select country</option>
                  {countryOptions.map((n) => <option key={n} className="text-navy-deep">{n}</option>)}
                  <option className="text-navy-deep">Not sure yet</option>
                </select><Err k="destination" />
              </label>
              <label className={`${label} sm:col-span-2`}>Message (optional)<textarea name="message" rows={4} placeholder="Tell us about your travel plans…" className={input} /><Err k="message" /></label>
              <div className="sm:col-span-2">
                <button type="submit" className="btn btn-gold w-full justify-center"><WhatsAppIcon className="h-4 w-4" /> Send enquiry on WhatsApp</button>
                <p className="mt-4 text-center text-xs text-ivory/50">Your message is only received once you press send in WhatsApp.</p>
                {opened && <p role="status" className="mt-3 text-center text-sm text-gold-soft">WhatsApp has opened with your message. Please press send to reach our team.</p>}
              </div>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
