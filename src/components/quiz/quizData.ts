import { Question } from './types';

const culturalQuiz: Question[] = [
  {
    id: "1",
    question: "Quelle est la langue la plus parlée au Cameroun?",
    options: ["Français", "Anglais", "Fulfulde", "Ewondo"],
    correctOption: 0,
    explanation: "Le français est la langue officielle la plus utilisée, parlée par environ 80% de la population."
  },
  {
    id: "2",
    question: "Quel est le plat national du Cameroun?",
    options: ["Ndolé", "Eru", "Koki", "Achou"],
    correctOption: 0,
    explanation: "Le Ndolé est un plat traditionnel à base de feuilles de ndolé, de pâte d'arachide et de viande ou de poisson."
  },
  {
    id: "3",
    question: "Quelle est la capitale politique du Cameroun?",
    options: ["Douala", "Yaoundé", "Bafoussam", "Garoua"],
    correctOption: 1,
    explanation: "Yaoundé est la capitale politique du Cameroun, abritant les institutions gouvernementales."
  },
  {
    id: "4",
    question: "Quel est le fleuve le plus long du Cameroun?",
    options: ["Sanaga", "Nyong", "Wouri", "Bénoué"],
    correctOption: 3,
    explanation: "Le fleuve Bénoué est le plus long du Cameroun, traversant plusieurs régions du pays."
  },
  {
    id: "5",
    question: "Quel est le mont le plus élevé du Cameroun?",
    options: ["Mont Manengouba", "Mont Oku", "Mont Bamboutos", "Mont Cameroun"],
    correctOption: 3,
    explanation: "Le Mont Cameroun est le plus haut sommet du pays, culminant à plus de 4 000 mètres d'altitude."
  },
  {
    id: "6",
    question: "Quel est le genre musical le plus populaire au Cameroun?",
    options: ["Makossa", "Bikutsi", "Ambasse Bey", "Afrobeat"],
    correctOption: 0,
    explanation: "Le Makossa est un genre musical emblématique du Cameroun, connu pour ses rythmes entraînants."
  },
  {
    id: "7",
    question: "Quel est le nom du héros national camerounais qui a lutté contre la colonisation?",
    options: ["Ruben Um Nyobè", "Ernest Ouandié", "Félix Moumié", "Martin Paul Samba"],
    correctOption: 3,
    explanation: "Martin Paul Samba est un héros national pour sa résistance contre la colonisation allemande."
  },
  {
    id: "8",
    question: "Quelle est la principale religion pratiquée au Cameroun?",
    options: ["Christianisme", "Islam", "Animisme", "Bouddhisme"],
    correctOption: 0,
    explanation: "Le christianisme est la religion la plus répandue au Cameroun, avec une forte présence de catholiques et de protestants."
  },
  {
    id: "9",
    question: "Quel est le nom du parc national le plus célèbre du Cameroun?",
    options: ["Parc National de Waza", "Parc National de Korup", "Parc National de Campo-Ma'an", "Parc National de Lobéké"],
    correctOption: 0,
    explanation: "Le Parc National de Waza est réputé pour sa faune diversifiée, notamment les éléphants, les lions et les girafes."
  },
  {
    id: "10",
    question: "Quel est le nom du célèbre festival culturel qui se déroule chaque année à Ngaoundéré?",
    options: ["Ngondo", "Foulbé", "Mbog Bassaa", "Ekie"],
    correctOption: 1,
    explanation: "Le festival Foulbé est une célébration annuelle de la culture peule à Ngaoundéré, mettant en valeur la musique, la danse et l'artisanat."
  }
];

export default culturalQuiz;
