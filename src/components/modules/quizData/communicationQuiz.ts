
import { Module } from "../types";

export const communicationQuiz: Module = {
  id: "communication",
  title: "Communication Politique",
  description: "Testez vos connaissances en communication politique efficace",
  progress: 0,
  duration: "15 min",
  level: "Avancé",
  isPdfAvailable: false,
  isCompleted: false,
  overview: "Ce quiz teste vos connaissances en communication politique efficace",
  lessons: [],
  questions: [
    {
      id: "301",
      question: "Quel élément est essentiel dans un message politique efficace ?",
      options: [
        { id: "0", text: "Complexité intellectuelle" },
        { id: "1", text: "Clarté et simplicité" },
        { id: "2", text: "Longueur détaillée" },
        { id: "3", text: "Vocabulaire technique" }
      ],
      correctOptionId: "1",
      explanation: "La clarté et la simplicité sont essentielles dans un message politique efficace. Un message clair est plus facilement compris et retenu par le public.",
      category: "communication",
      difficulty: "facile"
    },
    {
      id: "302",
      question: "Quelle est la règle des '3C' en communication politique ?",
      options: [
        { id: "0", text: "Critique, Convainc, Convertit" },
        { id: "1", text: "Clair, Concis, Convaincant" },
        { id: "2", text: "Crédible, Charismatique, Calculé" },
        { id: "3", text: "Cohérent, Continu, Captivant" }
      ],
      correctOptionId: "1",
      explanation: "La règle des '3C' fait référence à un message Clair, Concis et Convaincant - les trois qualités fondamentales d'une communication politique efficace.",
      category: "communication",
      difficulty: "moyen"
    },
    {
      id: "303",
      question: "Quelle plateforme est actuellement la plus utilisée pour communiquer avec les jeunes au Cameroun ?",
      options: [
        { id: "0", text: "Radio" },
        { id: "1", text: "Télévision" },
        { id: "2", text: "WhatsApp/Facebook" },
        { id: "3", text: "Journaux" }
      ],
      correctOptionId: "2",
      explanation: "WhatsApp et Facebook sont les plateformes les plus utilisées pour communiquer avec les jeunes au Cameroun, reflétant la forte pénétration mobile dans le pays.",
      category: "communication",
      difficulty: "facile",
      imageSrc: "/lovable-uploads/487ae071-af40-445e-b753-7fea7f39e90f.png"
    },
    {
      id: "304",
      question: "Comment répondre efficacement à une désinformation ?",
      options: [
        { id: "0", text: "L'ignorer complètement" },
        { id: "1", text: "Répondre avec des faits vérifiables rapidement" },
        { id: "2", text: "Attaquer la source de la désinformation" },
        { id: "3", text: "Attendre que cela se dissipe" }
      ],
      correctOptionId: "1",
      explanation: "Répondre avec des faits vérifiables rapidement est la stratégie la plus efficace contre la désinformation. Il est important de corriger les fausses informations avant qu'elles ne se propagent trop largement.",
      category: "communication",
      difficulty: "difficile"
    },
    {
      id: "305",
      question: "Quel principe gouverne l'utilisation des couleurs dans la communication politique ?",
      options: [
        { id: "0", text: "Esthétique uniquement" },
        { id: "1", text: "Symbolisme psychologique" },
        { id: "2", text: "Traditions locales uniquement" },
        { id: "3", text: "Pas d'importance particulière" }
      ],
      correctOptionId: "1",
      explanation: "Le symbolisme psychologique gouverne l'utilisation des couleurs en communication politique. Chaque couleur évoque des émotions et des associations spécifiques qui peuvent renforcer votre message.",
      category: "communication",
      difficulty: "moyen"
    }
  ]
};
