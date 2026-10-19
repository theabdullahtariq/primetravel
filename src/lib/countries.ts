export type Country = { slug: string; name: string; blurb: string };

/* Photos live in /public/destinations/<slug>.webp */
export const countries: Country[] = [
  { slug: "france", name: "France", blurb: "Professional assistance for France visa appointments from the UK." },
  { slug: "italy", name: "Italy", blurb: "Expert Italy visa appointment monitoring and support." },
  { slug: "germany", name: "Germany", blurb: "Germany visa assistance with meticulous documentation." },
  { slug: "netherlands", name: "Netherlands", blurb: "Netherlands visa slot booking and application support." },
  { slug: "switzerland", name: "Switzerland", blurb: "Swiss visa application guidance and premium support." },
  { slug: "greece", name: "Greece", blurb: "Reliable Greece Schengen visa appointment assistance." },
  { slug: "austria", name: "Austria", blurb: "Austria visa expertise and appointment monitoring." },
  { slug: "portugal", name: "Portugal", blurb: "Portugal visa assistance for travel and residence." },
  { slug: "sweden", name: "Sweden", blurb: "Sweden visa processing support and consultation." },
];

/* Every member of the Schengen Area (29, as of 2026), alphabetical. */
export const allSchengen: { slug: string; name: string }[] = [
  ["austria", "Austria"], ["belgium", "Belgium"], ["bulgaria", "Bulgaria"], ["croatia", "Croatia"], ["czechia", "Czechia"],
  ["denmark", "Denmark"], ["estonia", "Estonia"], ["finland", "Finland"], ["france", "France"], ["germany", "Germany"],
  ["greece", "Greece"], ["hungary", "Hungary"], ["iceland", "Iceland"], ["italy", "Italy"], ["latvia", "Latvia"],
  ["liechtenstein", "Liechtenstein"], ["lithuania", "Lithuania"], ["luxembourg", "Luxembourg"], ["malta", "Malta"],
  ["netherlands", "Netherlands"], ["norway", "Norway"], ["poland", "Poland"], ["portugal", "Portugal"], ["romania", "Romania"],
  ["slovakia", "Slovakia"], ["slovenia", "Slovenia"], ["spain", "Spain"], ["sweden", "Sweden"], ["switzerland", "Switzerland"],
].map(([slug, name]) => ({ slug: slug!, name: name! }));

export const countryOptions = allSchengen.map((c) => c.name);
