import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Book, Star, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
interface BookType {
  id: string;
  title: string;
  url: string;
  imageUrl?: string;
}

// Liste des livres Amazon recommandés
const amazonBooks: BookType[] = [{
  id: "1",
  title: "La Politique Camerounaise Expliquée",
  url: "https://amzn.to/41cNzp3",
  imageUrl: "https://m.media-amazon.com/images/I/61o2ifkI7rL._SL1360_.jpg"
}, {
  id: "2",
  title: "Histoire et Traditions Africaines",
  url: "https://amzn.to/4i6cq4O",
  imageUrl: "https://m.media-amazon.com/images/I/71LV8VBmFML._SL1500_.jpg"
}, {
  id: "3",
  title: "Le Guide du Militant Engagé",
  url: "https://amzn.to/4id5wuv",
  imageUrl: "https://m.media-amazon.com/images/I/61vPJI46hCL._SL1500_.jpg"
}, {
  id: "4",
  title: "Mobilisation Politique Moderne",
  url: "https://amzn.to/3EN9hbI",
  imageUrl: "https://m.media-amazon.com/images/I/71ipA2GAk2L._SL1500_.jpg"
}, {
  id: "5",
  title: "Les Enjeux Démocratiques Africains",
  url: "https://amzn.to/3D79s19",
  imageUrl: "https://m.media-amazon.com/images/I/715zBc9uEAL._SL1500_.jpg"
}, {
  id: "6",
  title: "Communication Politique Efficace",
  url: "https://amzn.to/3QQAsFD",
  imageUrl: "https://m.media-amazon.com/images/I/61P18kFOZTL._SL1200_.jpg"
}, {
  id: "7",
  title: "Droits et Libertés en Afrique",
  url: "https://amzn.to/3QuY4PL",
  imageUrl: "https://m.media-amazon.com/images/I/81GkkJdLpqL._SL1500_.jpg"
}, {
  id: "8",
  title: "Gouvernance et Transparence",
  url: "https://amzn.to/4gSGKyL",
  imageUrl: "https://m.media-amazon.com/images/I/51X5DYQMz1L._SL1360_.jpg"
}, {
  id: "9",
  title: "Leadership en Temps de Crise",
  url: "https://amzn.to/4hUnXEU",
  imageUrl: "https://m.media-amazon.com/images/I/71jvFw1Q-CL._SL1500_.jpg"
}, {
  id: "10",
  title: "Stratégies de Campagne Moderne",
  url: "https://amzn.to/4iaLfpo",
  imageUrl: "https://m.media-amazon.com/images/I/61JtKjJwDdL._SL1500_.jpg"
}, {
  id: "11",
  title: "Le Manuel du Changement Social",
  url: "https://amzn.to/41anffp",
  imageUrl: "https://m.media-amazon.com/images/I/71QpxN3oPdL._SL1500_.jpg"
}];
interface AmazonBooksAdProps {
  className?: string;
  compact?: boolean;
}
const AmazonBooksAd: React.FC<AmazonBooksAdProps> = ({
  className = "",
  compact = false
}) => {
  const [books, setBooks] = useState<BookType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sélectionner 3 livres aléatoires à afficher
  useEffect(() => {
    const shuffled = [...amazonBooks].sort(() => 0.5 - Math.random());
    setBooks(shuffled.slice(0, compact ? 1 : 3));
  }, [compact]);

  // Rotation automatique des livres
  useEffect(() => {
    const interval = setInterval(() => {
      const shuffled = [...amazonBooks].sort(() => 0.5 - Math.random());
      setBooks(shuffled.slice(0, compact ? 1 : 3));
    }, 30000); // Changer toutes les 30 secondes

    return () => clearInterval(interval);
  }, [compact]);
  return <div className={`${className} rounded-lg overflow-hidden`}>
      <div className="p-2 bg-gradient-to-r from-blue-950/80 to-purple-950/80 backdrop-blur-md mb-2 rounded-t-lg flex items-center gap-2">
        <Book className="h-4 w-4 text-mrc-blue" />
        <p className="text-xs font-medium">Recommandations de lecture</p>
        <Badge variant="outline" className="ml-auto text-[10px] py-0 px-2 h-5 bg-blue-500/20">
          Sponsorisé
        </Badge>
      </div>
      
      <div className={`grid ${compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-3"} gap-2`}>
        {books.map((book, index) => <motion.a key={book.id} href={book.url} target="_blank" rel="noopener noreferrer" className="block p-2 bg-gray-800/40 hover:bg-gray-800/60 rounded-lg transition-all duration-300 border border-white/10 overflow-hidden group" initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: index * 0.1
      }} whileHover={{
        scale: 1.02
      }}>
            <div className="relative flex flex-col h-full">
              {book.imageUrl ? <div className="relative w-full aspect-[3/4] mb-2 overflow-hidden rounded-md">
                  <img src={book.imageUrl} alt={book.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-400" />
                </div> : <div className="w-full aspect-[3/4] mb-2 overflow-hidden rounded-md bg-gradient-to-r from-blue-900 to-purple-900 flex items-center justify-center">
                  <Book className="h-12 w-12 text-white/50" />
                </div>}
              
              <div className="flex flex-col flex-grow">
                <h3 className="text-sm font-medium line-clamp-2 mb-1">{book.title}</h3>
                <div className="flex items-center mt-auto">
                  <div className="flex text-yellow-500 mr-1">
                    <Star className="h-3 w-3 fill-current" />
                    <Star className="h-3 w-3 fill-current" />
                    <Star className="h-3 w-3 fill-current" />
                    <Star className="h-3 w-3 fill-current" />
                    <Star className="h-3 w-3" />
                  </div>
                  <span className="text-[10px] text-gray-400">Amazon.fr</span>
                  <ExternalLink className="h-3 w-3 ml-auto text-mrc-blue" />
                </div>
              </div>
            </div>
          </motion.a>)}
      </div>
    </div>;
};
export default AmazonBooksAd;