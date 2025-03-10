
import { News, type NewsArticle } from "./News";

const DEMO_ARTICLES: NewsArticle[] = [
  {
    href: "https://dub.co/changelog/regions-support",
    title: "Regions support in analytics",
    summary: "You can now filter your analytics by regions",
    image: "https://assets.dub.co/changelog/regions-support.png",
  },
  {
    href: "https://dub.co/blog/soc2",
    title: "Dub is now SOC 2 Type II Compliant",
    summary:
      "We're excited to announce that Dub has successfully completed a SOC 2 Type II audit to further demonstrate our commitment to security.",
    image: "https://assets.dub.co/blog/soc2.jpg",
  },
  {
    href: "https://dub.co/changelog/utm-templates",
    title: "UTM Templates",
    summary:
      "You can now create UTM templates to streamline UTM campaign management across your team.",
    image: "https://assets.dub.co/changelog/utm-templates.jpg",
  },
];

export function NewsDemo() {
  return (
    <div className="h-[600px] w-56 relative bg-gradient-to-br from-background to-muted">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56">
        <News articles={DEMO_ARTICLES} />
      </div>
    </div>
  );
}
