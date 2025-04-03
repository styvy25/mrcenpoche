
import { ModuleQuestion } from '../types';

// Module quiz questions about histoire (history)
const histoireQuiz: ModuleQuestion[] = [
  {
    id: "histoire-1",
    text: "Quand le MRC a-t-il été fondé?",
    answer: "2012",
    options: [
      { id: "a", text: "2008" },
      { id: "b", text: "2010" },
      { id: "c", text: "2012" },
      { id: "d", text: "2015" }
    ],
    correctOptionId: "c",
    explanation: "Le Mouvement pour la Renaissance du Cameroun (MRC) a été fondé en 2012 par Maurice Kamto."
  },
  {
    id: "histoire-2",
    text: "Qui est le fondateur du MRC?",
    answer: "Maurice Kamto",
    options: [
      { id: "a", text: "John Fru Ndi" },
      { id: "b", text: "Maurice Kamto" },
      { id: "c", text: "Cabral Libii" },
      { id: "d", text: "Joshua Osih" }
    ],
    correctOptionId: "b",
    explanation: "Maurice Kamto est le fondateur et président du Mouvement pour la Renaissance du Cameroun (MRC)."
  },
  {
    id: "histoire-3",
    text: "Quel était le slogan principal du MRC lors des élections de 2018?",
    answer: "La Solution",
    options: [
      { id: "a", text: "Le Changement" },
      { id: "b", text: "L'Avenir" },
      { id: "c", text: "La Solution" },
      { id: "d", text: "Le Progrès" }
    ],
    correctOptionId: "c",
    explanation: "Le slogan 'La Solution' était le principal message de campagne du MRC lors des élections présidentielles de 2018."
  },
  {
    id: "histoire-4",
    text: "En quelle année Maurice Kamto s'est-il présenté pour la première fois aux élections présidentielles?",
    answer: "2018",
    options: [
      { id: "a", text: "2011" },
      { id: "b", text: "2015" },
      { id: "c", text: "2018" },
      { id: "d", text: "2020" }
    ],
    correctOptionId: "c",
    explanation: "Maurice Kamto s'est présenté pour la première fois aux élections présidentielles camerounaises en 2018."
  },
  {
    id: "histoire-5",
    text: "Quelle fonction gouvernementale Maurice Kamto a-t-il occupée avant de fonder le MRC?",
    answer: "Ministre délégué à la Justice",
    options: [
      { id: "a", text: "Ministre de l'Éducation" },
      { id: "b", text: "Ministre délégué à la Justice" },
      { id: "c", text: "Ministre des Finances" },
      { id: "d", text: "Ministre de la Défense" }
    ],
    correctOptionId: "b",
    explanation: "Avant de fonder le MRC, Maurice Kamto a été Ministre délégué à la Justice du Cameroun."
  }
];

export default histoireQuiz;
