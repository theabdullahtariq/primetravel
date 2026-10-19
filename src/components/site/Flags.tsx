import { flagMarkup } from "@/components/site/flag-markup";
import { extraFlags } from "@/components/site/flag-extra";

export function Flag({ slug, className = "" }: { slug: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 60 40"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={className}
      dangerouslySetInnerHTML={{ __html: extraFlags[slug] ?? flagMarkup[slug] ?? "" }}
    />
  );
}
