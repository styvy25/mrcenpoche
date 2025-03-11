
import { Module } from "../types";
import { histoireQuiz } from "./histoireQuiz";
import { mobilisationQuiz } from "./mobilisationQuiz";
import { communicationQuiz } from "./communicationQuiz";
import { enjeuxQuiz } from "./enjeuxQuiz";
import { campagneQuiz } from "./campagneQuiz";

export const moduleQuizzes: { [key: string]: Module } = {
  "histoire": histoireQuiz,
  "mobilisation": mobilisationQuiz,
  "communication": communicationQuiz,
  "enjeux": enjeuxQuiz,
  "campagne": campagneQuiz
};

export const getModuleQuiz = (moduleId: string) => {
  return moduleQuizzes[moduleId] || null;
};
