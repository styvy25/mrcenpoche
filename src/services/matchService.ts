
import { supabase } from "@/integrations/supabase/client";
import { Match, MatchInvite, MatchParticipant } from "@/components/quiz/types/match";
import { QuizQuestion } from "@/components/quiz/types";
import { testQuestions } from "@/components/quiz/data/testQuestions";
import { politiqueQuestions } from "@/components/quiz/data/politiqueQuestions";

// Fonction pour créer un nouveau match
export const createMatch = async (title: string, category: string, creatorName: string): Promise<Match | null> => {
  try {
    // Sélectionner les questions appropriées selon la catégorie
    const questions = category === "test" 
      ? testQuestions
      : category === "politique" 
        ? politiqueQuestions 
        : [];
    
    // Dans une vraie implémentation, nous sauvegarderions cela dans Supabase
    // Pour l'instant, nous simulons une réponse
    const match: Match = {
      id: `match_${Date.now()}`,
      title,
      createdAt: new Date(),
      status: "pending",
      category,
      questions: questions.slice(0, 10), // Limiter à 10 questions
      participants: [{
        id: `user_${Date.now()}`,
        name: creatorName,
        score: 0,
        correctAnswers: 0,
        totalAnswers: 0
      }],
      creator: creatorName
    };
    
    // Sauvegarder en local storage pour démo
    const matches = JSON.parse(localStorage.getItem('mrc_matches') || '[]');
    matches.push(match);
    localStorage.setItem('mrc_matches', JSON.stringify(matches));
    
    return match;
  } catch (error) {
    console.error("Erreur lors de la création du match:", error);
    return null;
  }
};

// Générer un lien d'invitation WhatsApp
export const generateWhatsAppInvite = (matchId: string, category: string, creatorName: string): string => {
  const baseUrl = window.location.origin;
  const matchUrl = `${baseUrl}/quiz?match=${matchId}`;
  
  const message = encodeURIComponent(
    `🏆 ${creatorName} vous invite à un match d'incollables sur ${category === 'test' ? 'le MRC' : 'la politique camerounaise'}! Cliquez ici pour rejoindre: ${matchUrl}`
  );
  
  return `https://wa.me/?text=${message}`;
};

// Fonction pour rejoindre un match
export const joinMatch = (matchId: string, participant: MatchParticipant): Match | null => {
  try {
    const matches = JSON.parse(localStorage.getItem('mrc_matches') || '[]');
    const matchIndex = matches.findIndex((m: Match) => m.id === matchId);
    
    if (matchIndex === -1) return null;
    
    matches[matchIndex].participants.push(participant);
    localStorage.setItem('mrc_matches', JSON.stringify(matches));
    
    return matches[matchIndex];
  } catch (error) {
    console.error("Erreur lors de la participation au match:", error);
    return null;
  }
};

// Fonction pour mettre à jour le score d'un participant
export const updateScore = (matchId: string, participantId: string, score: number, correct: boolean): Match | null => {
  try {
    const matches = JSON.parse(localStorage.getItem('mrc_matches') || '[]');
    const matchIndex = matches.findIndex((m: Match) => m.id === matchId);
    
    if (matchIndex === -1) return null;
    
    const participantIndex = matches[matchIndex].participants.findIndex(
      (p: MatchParticipant) => p.id === participantId
    );
    
    if (participantIndex === -1) return null;
    
    const participant = matches[matchIndex].participants[participantIndex];
    participant.score += score;
    participant.totalAnswers += 1;
    if (correct) {
      participant.correctAnswers += 1;
    }
    
    localStorage.setItem('mrc_matches', JSON.stringify(matches));
    
    return matches[matchIndex];
  } catch (error) {
    console.error("Erreur lors de la mise à jour du score:", error);
    return null;
  }
};

// Fonction pour récupérer tous les matchs
export const getMatches = (): Match[] => {
  try {
    return JSON.parse(localStorage.getItem('mrc_matches') || '[]');
  } catch (error) {
    console.error("Erreur lors de la récupération des matchs:", error);
    return [];
  }
};

// Fonction pour récupérer un match spécifique
export const getMatch = (matchId: string): Match | null => {
  try {
    const matches = JSON.parse(localStorage.getItem('mrc_matches') || '[]');
    return matches.find((m: Match) => m.id === matchId) || null;
  } catch (error) {
    console.error("Erreur lors de la récupération du match:", error);
    return null;
  }
};

// Fonction pour terminer un match
export const completeMatch = (matchId: string): Match | null => {
  try {
    const matches = JSON.parse(localStorage.getItem('mrc_matches') || '[]');
    const matchIndex = matches.findIndex((m: Match) => m.id === matchId);
    
    if (matchIndex === -1) return null;
    
    matches[matchIndex].status = "completed";
    localStorage.setItem('mrc_matches', JSON.stringify(matches));
    
    return matches[matchIndex];
  } catch (error) {
    console.error("Erreur lors de la complétion du match:", error);
    return null;
  }
};
