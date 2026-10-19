import { createFileRoute } from "@tanstack/react-router";
import { FinalCTA, PageHero } from "@/components/site/Layout";
import { CountryGrid } from "@/components/site/CountryGrid";
import { SchengenAll } from "@/components/site/SchengenAll";

export const Route = createFileRoute("/destinations")({
  head: () => ({
    meta: [
      { title: "Destinations — Prime Travel LTD" },
      { name: "description", content: "Visa guidance for all 29 Schengen countries, including France, Italy, Germany, Spain, the Netherlands and Switzerland." },
      { property: "og:title", content: "Destinations — Prime Travel LTD" },
      { property: "og:description", content: "Visa guidance and appointment support for all 29 Schengen countries." },
    ],
  }),
  component: Destinations,
});

function Destinations() {
  return (
    <>
      <PageHero eyebrow="Destinations" title="Every Schengen destination." text="We cover all 29 Schengen countries. Choose yours to start an assessment." image="/destinations/switzerland.webp" />
      <section className="bg-navy py-24 text-ivory md:py-32">
        <div className="container-x"><CountryGrid /><div className="mt-24 border-t border-ivory/10 pt-20"><SchengenAll /></div></div>
      </section>
      <FinalCTA />
    </>
  );
}
