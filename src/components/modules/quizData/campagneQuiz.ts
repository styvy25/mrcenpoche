
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
      id: "501",
      question: "Quelle est la première étape pour organiser une campagne politique efficace ?",
      options: [
        { id: "0", text: "Collecter des fonds" },
        { id: "1", text: "Définir une stratégie claire" },
        { id: "2", text: "Recruter des volontaires" },
        { id: "3", text: "Créer des supports de communication" }
      ],
      correctOptionId: "1",
      explanation: "Définir une stratégie claire est la première étape cruciale pour organiser une campagne politique efficace. Cette stratégie guidera toutes les autres activités et décisions.",
      category: "campagne",
      difficulty: "facile"
    },
    {
      id: "502",
      question: "Quelle structure est recommandée pour une campagne locale ?",
      options: [
        { id: "0", text: "Hiérarchie verticale stricte" },
        { id: "1", text: "Structure horizontale sans hiérarchie" },
        { id: "2", text: "Réseau en étoile avec coordinateur central" },
        { id: "3", text: "Structure ad hoc sans organisation formelle" }
      ],
      correctOptionId: "2",
      explanation: "Une structure en réseau en étoile avec un coordinateur central est généralement recommandée pour les campagnes locales, permettant à la fois coordination et flexibilité.",
      category: "campagne",
      difficulty: "moyen"
    },
    {
      id: "503",
      question: "Comment gérer efficacement les ressources limitées d'une campagne ?",
      options: [
        { id: "0", text: "Concentrer les efforts sur un seul aspect" },
        { id: "1", text: "Répartir également entre tous les aspects" },
        { id: "2", text: "Prioriser selon l'impact potentiel" },
        { id: "3", text: "Chercher uniquement des solutions gratuites" }
      ],
      correctOptionId: "2",
      explanation: "La priorisation selon l'impact potentiel est la méthode la plus efficace pour gérer des ressources limitées. Cela garantit que les ressources sont allouées aux activités qui produiront les meilleurs résultats.",
      category: "campagne",
      difficulty: "moyen"
    },
    {
      id: "504",
      question: "Quelle approche est la plus efficace pour le porte-à-porte ?",
      options: [
        { id: "0", text: "Longs discours préparés" },
        { id: "1", text: "Distribution de tracts sans discussion" },
        { id: "2", text: "Écoute active et dialogue court" },
        { id: "3", text: "Collecte de dons uniquement" }
      ],
      correctOptionId: "2",
      explanation: "L'écoute active et un dialogue court constituent l'approche la plus efficace pour le porte-à-porte. Cette méthode permet de créer une connexion personnelle tout en respectant le temps des électeurs.",
      category: "campagne",
      difficulty: "facile"
    },
    {
      id: "505",
      question: "Quel indicateur est le plus pertinent pour évaluer le succès d'une campagne avant le jour du vote ?",
      options: [
        { id: "0", text: "Nombre de supporters sur les réseaux sociaux" },
        { id: "1", text: "Montant des fonds collectés" },
        { id: "2", text: "Taux d'engagement et de conversion" },
        { id: "3", text: "Couverture médiatique" }
      ],
      correctOptionId: "2",
      explanation: "Le taux d'engagement et de conversion (nombre de personnes indécises devenant supporters) est l'indicateur le plus pertinent pour évaluer le succès d'une campagne avant le jour du vote.",
      category: "campagne",
      difficulty: "difficile"
    }
  ]
};
