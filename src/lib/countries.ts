import usa from "@/assets/usa.webp";
import canada from "@/assets/canada.webp";
import turkey from "@/assets/turkey.webp";
import morocco from "@/assets/morocco.webp";

export type Country = { slug: string; name: string; blurb: string; group: "schengen" | "world"; photo?: string };

/* Photos: drop /public/destinations/<slug>.webp for any country without one; it appears automatically. */
export const countries: Country[] = [
  { slug: "france", name: "France", group: "schengen", blurb: "Professional assistance for France visa appointments from the UK." },
  { slug: "italy", name: "Italy", group: "schengen", blurb: "Expert Italy visa appointment monitoring and support." },
  { slug: "germany", name: "Germany", group: "schengen", blurb: "Germany visa assistance with meticulous documentation." },
  { slug: "netherlands", name: "Netherlands", group: "schengen", blurb: "Netherlands visa slot booking and application support." },
  { slug: "switzerland", name: "Switzerland", group: "schengen", blurb: "Swiss visa application guidance and premium support." },
  { slug: "greece", name: "Greece", group: "schengen", blurb: "Reliable Greece Schengen visa appointment assistance." },
  { slug: "usa", name: "United States", group: "world", photo: usa, blurb: "B1/B2 visa consultation and renewal assistance." },
  { slug: "canada", name: "Canada", group: "world", photo: canada, blurb: "Professional guidance for Canadian visitor visas." },
  { slug: "turkey", name: "Turkey", group: "world", photo: turkey, blurb: "E-visa and traditional Turkey visa consultation." },
  { slug: "morocco", name: "Morocco", group: "world", photo: morocco, blurb: "Specialised support for Morocco travel visa processing." },
  { slug: "austria", name: "Austria", group: "schengen", blurb: "Austria visa expertise and appointment monitoring." },
  { slug: "portugal", name: "Portugal", group: "schengen", blurb: "Portugal visa assistance for travel and residence." },
  { slug: "sweden", name: "Sweden", group: "schengen", blurb: "Sweden visa processing support and consultation." },
];

export const countryOptions = countries.map((c) => c.name);
