import { QuizQuestion } from "./types";

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Quelle est la capitale politique du Cameroun ?",
    options: ["Douala", "Yaoundé", "Garoua", "Bamenda"],
    correctAnswer: 1,
    explanation: "Yaoundé est la capitale politique du Cameroun, tandis que Douala est la capitale économique.",
    category: "politique",
    difficulty: "facile",
    imageSrc: "https://images.unsplash.com/photo-1543161949-1f9193812ce8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    question: "En quelle année le Cameroun a-t-il obtenu son indépendance de la France ?",
    options: ["1957", "1960", "1962", "1970"],
    correctAnswer: 1,
    explanation: "Le Cameroun a obtenu son indépendance de la France le 1er janvier 1960.",
    category: "histoire",
    difficulty: "facile",
    imageSrc: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    question: "Combien d'étoiles figurent sur le drapeau camerounais ?",
    options: ["Une", "Deux", "Trois", "Quatre"],
    correctAnswer: 0,
    explanation: "Le drapeau camerounais comporte une étoile au centre, symbole de l'unité nationale.",
    category: "culture",
    difficulty: "facile",
    imageSrc: "https://images.unsplash.com/photo-1565791380709-49e529c11d62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    question: "Quelle est la devise du Cameroun ?",
    options: ["Unité, Progrès, Démocratie", "Paix, Travail, Patrie", "Liberté, Égalité, Fraternité", "Unité, Travail, Justice"],
    correctAnswer: 1,
    explanation: "La devise du Cameroun est « Paix, Travail, Patrie ».",
    category: "politique",
    difficulty: "moyen",
    imageSrc: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    question: "Quelle danse traditionnelle est originaire de l'ouest du Cameroun ?",
    options: ["Bikutsi", "Assiko", "Makossa", "Nguon"],
    correctAnswer: 0,
    explanation: "Le Bikutsi est une danse traditionnelle originaire de la région de l'ouest du Cameroun, particulièrement populaire chez les Beti.",
    category: "culture",
    difficulty: "moyen",
    imageSrc: "https://images.unsplash.com/photo-1545128485-c400ce7b15ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    question: "Quel est le plus grand lac naturel du Cameroun ?",
    options: ["Lac Tchad", "Lac Nyos", "Lac Ossa", "Lac Barombi Mbo"],
    correctAnswer: 0,
    explanation: "Le lac Tchad, bien que partagé avec d'autres pays, est le plus grand lac naturel touchant le Cameroun.",
    category: "geographie",
    difficulty: "moyen"
  },
  {
    id: 7,
    question: "Quel est le plat traditionnel camerounais à base de manioc fermenté ?",
    options: ["Ndolé", "Eru", "Bobolo", "Sanga"],
    correctAnswer: 2,
    explanation: "Le Bobolo est un plat traditionnel camerounais fait à base de manioc fermenté, enveloppé dans des feuilles de bananier.",
    category: "culture",
    difficulty: "moyen"
  },
  {
    id: 8,
    question: "Quel musicien camerounais est connu comme le 'Roi du Makossa' ?",
    options: ["Petit Pays", "Manu Dibango", "Lapiro de Mbanga", "Manu Ella"],
    correctAnswer: 1,
    explanation: "Manu Dibango, avec son tube 'Soul Makossa', est considéré comme le 'Roi du Makossa'.",
    category: "culture",
    difficulty: "moyen"
  },
  {
    id: 9,
    question: "Quelle langue est la plus parlée au Cameroun en termes de locuteurs natifs ?",
    options: ["Français", "Anglais", "Fulfulde", "Ewondo"],
    correctAnswer: 2,
    explanation: "Le Fulfulde est la langue avec le plus grand nombre de locuteurs natifs au Cameroun.",
    category: "culture",
    difficulty: "difficile"
  },
  {
    id: 10,
    question: "Quel est le nom de la cérémonie traditionnelle qui marque la succession des chefs Bamoun ?",
    options: ["Feymania", "Nguon", "Nyanga", "Mbaya"],
    correctAnswer: 1,
    explanation: "Le Nguon est la cérémonie traditionnelle qui marque la succession des chefs Bamoun.",
    category: "traditions",
    difficulty: "difficile"
  },
  // Adding new questions with images
  {
    id: 11,
    question: "Quel est ce célèbre plat camerounais à base de banane plantain ?",
    options: ["Koki", "Ndolé", "Kondré", "Pilé"],
    correctAnswer: 2,
    explanation: "Le Kondré est un plat traditionnel camerounais à base de banane plantain mûre, généralement préparé avec de la viande ou du poisson.",
    category: "culture",
    difficulty: "moyen",
    imageSrc: "https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 12,
    question: "Quel est ce monument historique situé à Yaoundé ?",
    options: ["Monastère du Mont Fébé", "Monument de la Réunification", "Cathédrale Notre-Dame-des-Victoires", "Palais des Congrès"],
    correctAnswer: 1,
    explanation: "Le Monument de la Réunification à Yaoundé symbolise l'union des parties anglophone et francophone du Cameroun en 1972.",
    category: "histoire",
    difficulty: "moyen",
    imageSrc: "https://images.unsplash.com/photo-1562653439-47c82d8db4a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 13,
    question: "Quel est ce célèbre parc national camerounais, connu pour sa biodiversité ?",
    options: ["Parc national de Waza", "Parc national de Korup", "Parc national de Bouba Ndjida", "Parc national de Campo-Ma'an"],
    correctAnswer: 0,
    explanation: "Le Parc national de Waza, situé dans l'extrême-nord du Cameroun, est l'une des réserves naturelles les plus célèbres du pays, abritant lions, éléphants, girafes et nombreuses espèces d'oiseaux.",
    category: "geographie",
    difficulty: "moyen",
    imageSrc: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 14,
    question: "Quelle est cette montagne emblématique du Cameroun ?",
    options: ["Mont Fébé", "Mont Cameroun", "Mont Manengouba", "Mont Oku"],
    correctAnswer: 1,
    explanation: "Le Mont Cameroun, également appelé 'Char des Dieux', est un volcan actif situé près de la ville de Buéa. C'est le point culminant de l'Afrique occidentale avec 4040 mètres d'altitude.",
    category: "geographie",
    difficulty: "facile",
    imageSrc: "https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 15,
    question: "Quel est ce fruit tropical cultivé au Cameroun et exporté dans le monde entier ?",
    options: ["Mangue", "Ananas", "Banane", "Papaye"],
    correctAnswer: 2,
    explanation: "La banane est l'un des principaux produits d'exportation du Cameroun. Le pays est le 5ème exportateur de bananes en Afrique.",
    category: "culture",
    difficulty: "facile",
    imageSrc: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 16,
    question: "Quelle est cette tenue traditionnelle camerounaise ?",
    options: ["Kaba Ngondo", "Boubou", "Kabba", "Toghu"],
    correctAnswer: 3,
    explanation: "Le Toghu est une tenue traditionnelle emblématique de la région du Nord-Ouest du Cameroun, reconnaissable à ses motifs colorés et complexes brodés à la main.",
    category: "traditions",
    difficulty: "difficile",
    imageSrc: "https://images.unsplash.com/photo-1516575334481-f85287c2c82d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 17,
    question: "Quel sport est le plus populaire au Cameroun ?",
    options: ["Basketball", "Volleyball", "Football", "Tennis"],
    correctAnswer: 2,
    explanation: "Le football est de loin le sport le plus populaire au Cameroun. L'équipe nationale, connue sous le nom de 'Lions Indomptables', a remporté cinq fois la Coupe d'Afrique des Nations.",
    category: "culture",
    difficulty: "facile",
    imageSrc: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 18,
    question: "Quel est ce lac du Cameroun connu pour sa catastrophe naturelle de 1986 ?",
    options: ["Lac Tchad", "Lac Barombi Mbo", "Lac Nyos", "Lac Tizon"],
    correctAnswer: 2,
    explanation: "Le lac Nyos est tristement célèbre pour l'événement du 21 août 1986, lorsqu'une éruption limnique a libéré un nuage de dioxyde de carbone, causant la mort de plus de 1700 personnes et 3500 têtes de bétail.",
    category: "histoire",
    difficulty: "difficile",
    imageSrc: "https://images.unsplash.com/photo-1584824388957-a4d5b939a953?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 19,
    question: "Quelle est cette danse traditionnelle des régions du Nord Cameroun ?",
    options: ["Bikutsi", "Makossa", "Mbaghalum", "Assiko"],
    correctAnswer: 2,
    explanation: "Le Mbaghalum est une danse traditionnelle des Grassfields du Nord-Ouest du Cameroun, caractérisée par des mouvements rythmiques accompagnés de tambours traditionnels.",
    category: "traditions",
    difficulty: "difficile",
    imageSrc: "https://images.unsplash.com/photo-1547055442-4abec3724bb7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 20,
    question: "Quel est ce fleuve important qui traverse le Cameroun ?",
    options: ["Fleuve Congo", "Fleuve Sanaga", "Fleuve Niger", "Fleuve Logone"],
    correctAnswer: 1,
    explanation: "Le fleuve Sanaga est le plus long fleuve du Cameroun, avec une longueur d'environ 918 km. Il est essentiel pour l'hydroélectricité du pays.",
    category: "geographie",
    difficulty: "moyen",
    imageSrc: "https://images.unsplash.com/photo-1546484475-7f7bd55792da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

export const quizData = {
  categories: [
    { id: "culture", name: "Culture", color: "bg-mrc-blue" },
    { id: "histoire", name: "Histoire", color: "bg-mrc-red" },
    { id: "traditions", name: "Traditions", color: "bg-mrc-yellow" },
    { id: "politique", name: "Politique", color: "bg-mrc-green" },
    { id: "geographie", name: "Géographie", color: "bg-purple-500" }
  ],
  quizQuestions: quizQuestions
};

export const getQuizQuestions = async (): Promise<QuizQuestion[]> => {
  // Simuler un chargement asynchrone
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(quizQuestions);
    }, 1000);
  });
};

export default quizQuestions;
