
import { ModuleQuestion } from "../types";

const histoireQuiz: ModuleQuestion[] = [
  {
    id: "1",
    text: "En quelle année le MRC a-t-il été fondé?",
    options: [
      { id: "1", text: "2008" },
      { id: "2", text: "2012" },
      { id: "3", text: "2013" },
      { id: "4", text: "2015" }
    ],
    answer: "2",
    explanation: "Le Mouvement pour la Renaissance du Cameroun (MRC) a été fondé en 2012 par Maurice Kamto et d'autres personnalités.",
    category: "histoire",
    difficulty: "facile",
    question: "En quelle année le MRC a-t-il été fondé?"
  },
  {
    id: "2",
    text: "Qui est le fondateur principal du MRC?",
    options: [
      { id: "1", text: "Paul Biya" },
      { id: "2", text: "Maurice Kamto" },
      { id: "3", text: "John Fru Ndi" },
      { id: "4", text: "Cabral Libii" }
    ],
    answer: "2",
    explanation: "Maurice Kamto est le fondateur principal et président du Mouvement pour la Renaissance du Cameroun.",
    category: "histoire",
    difficulty: "facile",
    imageSrc: "/images/maurice-kamto.jpg",
    question: "Qui est le fondateur principal du MRC?"
  },
  {
    id: "3",
    text: "Quel événement important a marqué l'histoire du MRC en 2018?",
    options: [
      { id: "1", text: "Sa dissolution" },
      { id: "2", text: "Sa première victoire aux législatives" },
      { id: "3", text: "Sa participation à l'élection présidentielle" },
      { id: "4", text: "Son alliance avec le RDPC" }
    ],
    answer: "3",
    explanation: "En 2018, le MRC a participé pour la première fois à une élection présidentielle avec Maurice Kamto comme candidat.",
    category: "histoire",
    difficulty: "moyen",
    question: "Quel événement important a marqué l'histoire du MRC en 2018?"
  },
  {
    id: "4",
    text: "Quelle était la profession de Maurice Kamto avant son engagement politique?",
    options: [
      { id: "1", text: "Médecin" },
      { id: "2", text: "Avocat et professeur de droit" },
      { id: "3", text: "Économiste" },
      { id: "4", text: "Ingénieur" }
    ],
    answer: "2",
    explanation: "Maurice Kamto était avocat et professeur de droit international avant son engagement politique à temps plein.",
    category: "histoire",
    difficulty: "moyen",
    question: "Quelle était la profession de Maurice Kamto avant son engagement politique?"
  },
  {
    id: "5",
    text: "Quelle fonction gouvernementale Maurice Kamto a-t-il occupée avant la création du MRC?",
    options: [
      { id: "1", text: "Ministre de la Justice" },
      { id: "2", text: "Ministre des Finances" },
      { id: "3", text: "Ministre des Relations Extérieures" },
      { id: "4", text: "Ministre délégué auprès du Ministre de la Justice" }
    ],
    answer: "4",
    explanation: "Avant la création du MRC, Maurice Kamto a servi comme Ministre délégué auprès du Ministre de la Justice du Cameroun.",
    category: "histoire",
    difficulty: "difficile",
    question: "Quelle fonction gouvernementale Maurice Kamto a-t-il occupée avant la création du MRC?"
  }
];

export default histoireQuiz;
