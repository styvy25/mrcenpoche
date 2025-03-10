
import { News, type NewsArticle } from "@/components/ui/sidebar-news";

const DEMO_ARTICLES: NewsArticle[] = [
  {
    href: "https://example.com/news/1",
    title: "Formations politiques disponibles",
    summary: "Découvrez les nouvelles formations disponibles pour les militants",
    image: "https://assets.example.com/news/formations.jpg",
  },
  {
    href: "https://example.com/news/2",
    title: "Mise à jour des modules de formation",
    summary:
      "Nous avons amélioré nos modules de formation avec de nouveaux contenus interactifs.",
    image: "https://assets.example.com/news/modules.jpg",
  },
  {
    href: "https://example.com/news/3",
    title: "Nouveaux badges de progression",
    summary:
      "Gagnez des badges en complétant vos modules de formation pour suivre votre progression.",
    image: "https://assets.example.com/news/badges.jpg",
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
