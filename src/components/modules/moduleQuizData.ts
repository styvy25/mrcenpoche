
import { QuizQuestion } from "../quiz/types";

interface ModuleQuiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
}

export const moduleQuizzes: { [key: string]: ModuleQuiz } = {
  "histoire": {
    id: "histoire",
    title: "Histoire et Valeurs du MRC",
    description: "Testez vos connaissances sur l'histoire et les valeurs fondamentales du MRC",
    questions: [
      {
        id: 101,
        question: "En quelle année le MRC a-t-il été créé ?",
        options: ["2008", "2010", "2012", "2013"],
        correctAnswer: 2,
        explanation: "Le Mouvement pour la Renaissance du Cameroun (MRC) a été créé en 2012 par Maurice Kamto et d'autres personnalités.",
        category: "histoire",
        difficulty: "facile"
      },
      {
        id: 102,
        question: "Qui est le fondateur principal du MRC ?",
        options: ["Paul Biya", "Joshua Osih", "Maurice Kamto", "John Fru Ndi"],
        correctAnswer: 2,
        explanation: "Maurice Kamto est le fondateur principal et actuel président du MRC.",
        category: "histoire",
        difficulty: "facile",
        imageSrc: "/lovable-uploads/0a7e7325-0ab5-4f67-b830-1e1b22984ac8.png"
      },
      {
        id: 103,
        question: "Quelle est la devise du MRC ?",
        options: ["Le Peuple D'abord", "Unité, Progrès, Démocratie", "Liberté, Égalité, Fraternité", "Renaissance et Progrès"],
        correctAnswer: 0,
        explanation: "La devise du MRC est 'Le Peuple D'abord', reflétant son engagement envers les intérêts des citoyens camerounais.",
        category: "histoire",
        difficulty: "moyen"
      },
      {
        id: 104,
        question: "Quel est le symbole principal du MRC ?",
        options: ["Un lion", "Un arbre", "Une étoile", "Une colombe"],
        correctAnswer: 1,
        explanation: "L'arbre est le symbole principal du MRC, représentant l'enracinement, la croissance et la renaissance.",
        category: "histoire",
        difficulty: "moyen"
      },
      {
        id: 105,
        question: "Quel poste gouvernemental Maurice Kamto a-t-il occupé avant de fonder le MRC ?",
        options: ["Ministre de la Justice", "Ministre des Finances", "Ministre des Relations Extérieures", "Premier Ministre"],
        correctAnswer: 0,
        explanation: "Maurice Kamto a été Ministre Délégué à la Justice du Cameroun avant de fonder le MRC.",
        category: "histoire",
        difficulty: "difficile"
      }
    ]
  },
  "mobilisation": {
    id: "mobilisation",
    title: "Techniques de Mobilisation",
    description: "Évaluez vos compétences en mobilisation et sensibilisation politique",
    questions: [
      {
        id: 201,
        question: "Quelle est la méthode la plus efficace pour mobiliser dans les zones rurales ?",
        options: ["Les réseaux sociaux", "La radio locale", "Les affiches", "Les SMS"],
        correctAnswer: 1,
        explanation: "Dans les zones rurales camerounaises, la radio locale reste le moyen le plus efficace pour toucher un large public, car elle est accessible même dans les zones sans électricité via des postes à piles.",
        category: "mobilisation",
        difficulty: "moyen"
      },
      {
        id: 202,
        question: "Quel est le principe fondamental de la mobilisation politique ?",
        options: ["La confrontation", "L'éducation", "La persuasion", "La participation"],
        correctAnswer: 3,
        explanation: "La participation est le principe fondamental de la mobilisation politique. Encourager les citoyens à participer activement est l'objectif principal de toute mobilisation efficace.",
        category: "mobilisation",
        difficulty: "moyen"
      },
      {
        id: 203,
        question: "Quelle stratégie est recommandée pour mobiliser les jeunes ?",
        options: ["Discours formels", "Réseaux sociaux et activités culturelles", "Distribution de tracts", "Porte-à-porte uniquement"],
        correctAnswer: 1,
        explanation: "Les réseaux sociaux et les activités culturelles sont particulièrement efficaces pour mobiliser les jeunes, car ils correspondent à leurs modes de communication et centres d'intérêt.",
        category: "mobilisation",
        difficulty: "facile",
        imageSrc: "/lovable-uploads/e326c83f-f666-44e5-9da1-72639a1027e0.png"
      },
      {
        id: 204,
        question: "Comment gérer une opposition hostile lors d'une action de mobilisation ?",
        options: ["Répondre avec hostilité", "Ignorer complètement", "Dialoguer respectueusement", "Quitter immédiatement les lieux"],
        correctAnswer: 2,
        explanation: "Le dialogue respectueux est la meilleure approche face à une opposition hostile. Il permet de désamorcer les tensions tout en maintenant l'intégrité de votre message.",
        category: "mobilisation",
        difficulty: "difficile"
      },
      {
        id: 205,
        question: "Quelle est la première étape d'une campagne de mobilisation efficace ?",
        options: ["Imprimer des affiches", "Définir clairement les objectifs", "Organiser un grand événement", "Recruter des volontaires"],
        correctAnswer: 1,
        explanation: "Définir clairement les objectifs est la première étape cruciale de toute campagne de mobilisation. Sans objectifs précis, les autres activités manqueront de direction et d'efficacité.",
        category: "mobilisation",
        difficulty: "facile"
      }
    ]
  },
  "communication": {
    id: "communication",
    title: "Communication Politique",
    description: "Testez vos connaissances en communication politique efficace",
    questions: [
      {
        id: 301,
        question: "Quel élément est essentiel dans un message politique efficace ?",
        options: ["Complexité intellectuelle", "Clarté et simplicité", "Longueur détaillée", "Vocabulaire technique"],
        correctAnswer: 1,
        explanation: "La clarté et la simplicité sont essentielles dans un message politique efficace. Un message clair est plus facilement compris et retenu par le public.",
        category: "communication",
        difficulty: "facile"
      },
      {
        id: 302,
        question: "Quelle est la règle des '3C' en communication politique ?",
        options: ["Critique, Convainc, Convertit", "Clair, Concis, Convaincant", "Crédible, Charismatique, Calculé", "Cohérent, Continu, Captivant"],
        correctAnswer: 1,
        explanation: "La règle des '3C' fait référence à un message Clair, Concis et Convaincant - les trois qualités fondamentales d'une communication politique efficace.",
        category: "communication",
        difficulty: "moyen"
      },
      {
        id: 303,
        question: "Quelle plateforme est actuellement la plus utilisée pour communiquer avec les jeunes au Cameroun ?",
        options: ["Radio", "Télévision", "WhatsApp/Facebook", "Journaux"],
        correctAnswer: 2,
        explanation: "WhatsApp et Facebook sont les plateformes les plus utilisées pour communiquer avec les jeunes au Cameroun, reflétant la forte pénétration mobile dans le pays.",
        category: "communication",
        difficulty: "facile",
        imageSrc: "/lovable-uploads/487ae071-af40-445e-b753-7fea7f39e90f.png"
      },
      {
        id: 304,
        question: "Comment répondre efficacement à une désinformation ?",
        options: ["L'ignorer complètement", "Répondre avec des faits vérifiables rapidement", "Attaquer la source de la désinformation", "Attendre que cela se dissipe"],
        correctAnswer: 1,
        explanation: "Répondre avec des faits vérifiables rapidement est la stratégie la plus efficace contre la désinformation. Il est important de corriger les fausses informations avant qu'elles ne se propagent trop largement.",
        category: "communication",
        difficulty: "difficile"
      },
      {
        id: 305,
        question: "Quel principe gouverne l'utilisation des couleurs dans la communication politique ?",
        options: ["Esthétique uniquement", "Symbolisme psychologique", "Traditions locales uniquement", "Pas d'importance particulière"],
        correctAnswer: 1,
        explanation: "Le symbolisme psychologique gouverne l'utilisation des couleurs en communication politique. Chaque couleur évoque des émotions et des associations spécifiques qui peuvent renforcer votre message.",
        category: "communication",
        difficulty: "moyen"
      }
    ]
  },
  "enjeux": {
    id: "enjeux",
    title: "Enjeux Politiques au Cameroun",
    description: "Évaluez votre compréhension des défis politiques actuels du Cameroun",
    questions: [
      {
        id: 401,
        question: "Quel est l'un des principaux défis de la gouvernance au Cameroun selon le MRC ?",
        options: ["Excès de décentralisation", "Corruption systémique", "Trop de partis politiques", "Manque de ressources naturelles"],
        correctAnswer: 1,
        explanation: "La corruption systémique est identifiée par le MRC comme l'un des principaux défis de la gouvernance au Cameroun, affectant tous les secteurs de développement du pays.",
        category: "enjeux",
        difficulty: "moyen"
      },
      {
        id: 402,
        question: "Quelle crise affecte les régions du Nord-Ouest et du Sud-Ouest depuis 2016 ?",
        options: ["Crise économique", "Crise sanitaire", "Crise anglophone", "Crise alimentaire"],
        correctAnswer: 2,
        explanation: "La crise anglophone affecte les régions du Nord-Ouest et du Sud-Ouest du Cameroun depuis 2016, résultant de revendications liées à la marginalisation perçue des régions anglophones.",
        category: "enjeux",
        difficulty: "facile"
      },
      {
        id: 403,
        question: "Quel système électoral est actuellement en place au Cameroun ?",
        options: ["Proportionnel intégral", "Majoritaire à deux tours", "Mixte", "Vote unique transférable"],
        correctAnswer: 2,
        explanation: "Le Cameroun utilise un système électoral mixte, combinant des éléments du scrutin majoritaire et de la représentation proportionnelle selon les élections.",
        category: "enjeux",
        difficulty: "difficile"
      },
      {
        id: 404,
        question: "Quelle réforme électorale le MRC considère-t-il comme prioritaire ?",
        options: ["Biométrie et liste électorale fiable", "Vote par correspondance", "Réduction du nombre de députés", "Vote électronique"],
        correctAnswer: 0,
        explanation: "La mise en place d'un système biométrique fiable et d'une liste électorale transparente est considérée comme une réforme prioritaire par le MRC pour garantir des élections crédibles.",
        category: "enjeux",
        difficulty: "moyen"
      },
      {
        id: 405,
        question: "Quel est le défi principal pour l'unité nationale selon l'analyse du MRC ?",
        options: ["Diversité linguistique", "Tribalisme politique", "Influence étrangère", "Différences religieuses"],
        correctAnswer: 1,
        explanation: "Le tribalisme politique, l'exploitation des différences ethniques à des fins politiques, est considéré comme le principal défi pour l'unité nationale selon l'analyse du MRC.",
        category: "enjeux",
        difficulty: "moyen"
      }
    ]
  },
  "campagne": {
    id: "campagne",
    title: "Organisation de Campagne",
    description: "Testez vos connaissances sur l'organisation efficace d'une campagne politique",
    questions: [
      {
        id: 501,
        question: "Quelle est la première étape pour organiser une campagne politique efficace ?",
        options: ["Collecter des fonds", "Définir une stratégie claire", "Recruter des volontaires", "Créer des supports de communication"],
        correctAnswer: 1,
        explanation: "Définir une stratégie claire est la première étape cruciale pour organiser une campagne politique efficace. Cette stratégie guidera toutes les autres activités et décisions.",
        category: "campagne",
        difficulty: "facile"
      },
      {
        id: 502,
        question: "Quelle structure est recommandée pour une campagne locale ?",
        options: ["Hiérarchie verticale stricte", "Structure horizontale sans hiérarchie", "Réseau en étoile avec coordinateur central", "Structure ad hoc sans organisation formelle"],
        correctAnswer: 2,
        explanation: "Une structure en réseau en étoile avec un coordinateur central est généralement recommandée pour les campagnes locales, permettant à la fois coordination et flexibilité.",
        category: "campagne",
        difficulty: "moyen"
      },
      {
        id: 503,
        question: "Comment gérer efficacement les ressources limitées d'une campagne ?",
        options: ["Concentrer les efforts sur un seul aspect", "Répartir également entre tous les aspects", "Prioriser selon l'impact potentiel", "Chercher uniquement des solutions gratuites"],
        correctAnswer: 2,
        explanation: "La priorisation selon l'impact potentiel est la méthode la plus efficace pour gérer des ressources limitées. Cela garantit que les ressources sont allouées aux activités qui produiront les meilleurs résultats.",
        category: "campagne",
        difficulty: "moyen"
      },
      {
        id: 504,
        question: "Quelle approche est la plus efficace pour le porte-à-porte ?",
        options: ["Longs discours préparés", "Distribution de tracts sans discussion", "Écoute active et dialogue court", "Collecte de dons uniquement"],
        correctAnswer: 2,
        explanation: "L'écoute active et un dialogue court constituent l'approche la plus efficace pour le porte-à-porte. Cette méthode permet de créer une connexion personnelle tout en respectant le temps des électeurs.",
        category: "campagne",
        difficulty: "facile"
      },
      {
        id: 505,
        question: "Quel indicateur est le plus pertinent pour évaluer le succès d'une campagne avant le jour du vote ?",
        options: ["Nombre de supporters sur les réseaux sociaux", "Montant des fonds collectés", "Taux d'engagement et de conversion", "Couverture médiatique"],
        correctAnswer: 2,
        explanation: "Le taux d'engagement et de conversion (nombre de personnes indécises devenant supporters) est l'indicateur le plus pertinent pour évaluer le succès d'une campagne avant le jour du vote.",
        category: "campagne",
        difficulty: "difficile"
      }
    ]
  }
};

export const getModuleQuiz = (moduleId: string) => {
  return moduleQuizzes[moduleId] || null;
};
