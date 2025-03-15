
export interface Phrase {
  id: number;
  french: string;
  english: string;
  ewondo: string;
  fulfulde: string;
  audioUrl?: string;
}

export enum Language {
  FRENCH = 'french',
  ENGLISH = 'english',
  EWONDO = 'ewondo',
  FULFULDE = 'fulfulde'
}

export const rosettaPhrases: Phrase[] = [
  {
    id: 1,
    french: "Bonjour, comment allez-vous?",
    english: "Hello, how are you?",
    ewondo: "Mbolo, o ne va?",
    fulfulde: "Jaaraama, no mboodaa?"
  },
  {
    id: 2,
    french: "Je soutiens le MRC",
    english: "I support the MRC",
    ewondo: "Me yebe MRC",
    fulfulde: "Mi yeddii MRC"
  },
  {
    id: 3,
    french: "Nous voulons le changement",
    english: "We want change",
    ewondo: "Bi ding nfetban",
    fulfulde: "Min yiɗi mbayliigu"
  },
  {
    id: 4,
    french: "Le Cameroun mérite mieux",
    english: "Cameroon deserves better",
    ewondo: "Kamerun a kom mvoe",
    fulfulde: "Kamerun haani ɓuri"
  },
  {
    id: 5,
    french: "Ensemble, nous sommes plus forts",
    english: "Together, we are stronger",
    ewondo: "E mbok, bi ne ngul",
    fulfulde: "E kawtal, min ɓuri semmbe"
  }
];
