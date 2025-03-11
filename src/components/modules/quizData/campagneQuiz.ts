
import { Module } from "../types";

export const campagneQuiz: Module = {
  id: "campagne",
  title: "Organisation de Campagne",
  description: "Testez vos connaissances sur l'organisation efficace d'une campagne politique",
  progress: 0,
  duration: "15 min",
  level: "Avancé",
  isPdfAvailable: false,
  isCompleted: false,
  overview: "Ce quiz teste vos connaissances sur l'organisation efficace d'une campagne politique",
  lessons: [],
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
};
