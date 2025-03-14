
// Define basic types for Rosetta learning components
export interface Phrase {
  original: string;
  translation: string;
  audio?: string;
}

// Sample phrases data that can be used in different modules
export const getSamplePhrases = (moduleId: string): Phrase[] => {
  // Here we can customize phrases based on moduleId if needed
  return [
    {
      original: "Le MRC est un parti politique camerounais.",
      translation: "The MRC is a Cameroonian political party.",
    },
    {
      original: "Maurice Kamto est le président du MRC.",
      translation: "Maurice Kamto is the president of the MRC.",
    },
    {
      original: "La mobilisation citoyenne est essentielle pour le changement.",
      translation: "Citizen mobilization is essential for change.",
    },
    {
      original: "Le développement durable est une priorité pour le Cameroun.",
      translation: "Sustainable development is a priority for Cameroon.",
    },
    {
      original: "La jeunesse représente l'avenir du pays.",
      translation: "Youth represents the future of the country.",
    }
  ];
};
