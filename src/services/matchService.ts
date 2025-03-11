
import { Match, MatchParticipant } from "@/components/quiz/types/match";
import { culturalQuizQuestions } from "@/components/quiz/culturalQuizData";
import { testQuestions } from "@/components/quiz/data/test";
import { v4 as uuidv4 } from "uuid";

// Mock function to create a match and store in localStorage
export const createMatch = (title: string, category: string, creatorName: string): Match => {
  const matchId = uuidv4();
  const questions = getMatchQuestions(category);
  
  const newMatch: Match = {
    id: matchId,
    title,
    createdAt: new Date(),
    status: "pending",
    category,
    questions,
    participants: [
      {
        id: uuidv4(),
        name: creatorName,
        score: 0,
        correctAnswers: 0,
        totalAnswers: 0
      }
    ],
    creator: creatorName
  };
  
  // Store in localStorage
  const matches = JSON.parse(localStorage.getItem('mrc_matches') || '[]');
  matches.push(newMatch);
  localStorage.setItem('mrc_matches', JSON.stringify(matches));
  
  return newMatch;
};

// Function to get a match by ID
export const getMatch = (matchId: string): Match | null => {
  try {
    const matches = JSON.parse(localStorage.getItem('mrc_matches') || '[]');
    const match = matches.find((m: Match) => m.id === matchId);
    
    if (match) {
      // Convert string date to Date object
      match.createdAt = new Date(match.createdAt);
      return match;
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching match:", error);
    return null;
  }
};

// Function to get all matches
export const getMatches = (): Match[] => {
  try {
    const matches = JSON.parse(localStorage.getItem('mrc_matches') || '[]');
    
    // Convert string dates to Date objects
    return matches.map((match: any) => ({
      ...match,
      createdAt: new Date(match.createdAt)
    }));
  } catch (error) {
    console.error("Error fetching matches:", error);
    return [];
  }
};

// Function to record an answer for a player
export const recordAnswer = (matchId: string, playerId: string, questionId: string, answer: string): void => {
  try {
    const matches = JSON.parse(localStorage.getItem('mrc_matches') || '[]');
    const matchIndex = matches.findIndex((m: Match) => m.id === matchId);
    
    if (matchIndex !== -1) {
      // Record is saved in memory but not persisted
      console.log(`Answer recorded: Match ${matchId}, Player ${playerId}, Question ${questionId}, Answer ${answer}`);
    }
  } catch (error) {
    console.error("Error recording answer:", error);
  }
};

// Function to update a player's score
export const updateScore = (
  matchId: string, 
  playerId: string, 
  pointsEarned: number,
  isCorrect: boolean
): Match | null => {
  try {
    const matches = JSON.parse(localStorage.getItem('mrc_matches') || '[]');
    const matchIndex = matches.findIndex((m: Match) => m.id === matchId);
    
    if (matchIndex !== -1) {
      const match = matches[matchIndex];
      const playerIndex = match.participants.findIndex((p: MatchParticipant) => p.id === playerId);
      
      if (playerIndex !== -1) {
        const player = match.participants[playerIndex];
        player.score += pointsEarned;
        player.totalAnswers += 1;
        if (isCorrect) {
          player.correctAnswers += 1;
        }
        
        matches[matchIndex] = match;
        localStorage.setItem('mrc_matches', JSON.stringify(matches));
        
        return match;
      }
    }
    
    return null;
  } catch (error) {
    console.error("Error updating score:", error);
    return null;
  }
};

// Function to mark a match as completed
export const completeMatch = (matchId: string): boolean => {
  try {
    const matches = JSON.parse(localStorage.getItem('mrc_matches') || '[]');
    const matchIndex = matches.findIndex((m: Match) => m.id === matchId);
    
    if (matchIndex !== -1) {
      matches[matchIndex].status = "completed";
      localStorage.setItem('mrc_matches', JSON.stringify(matches));
      return true;
    }
    
    return false;
  } catch (error) {
    console.error("Error completing match:", error);
    return false;
  }
};

// Function to get questions for a match
export const getMatchQuestions = (quizType: string, numberOfQuestions: number = 10) => {
  let questions;

  switch (quizType) {
    case "culture":
      questions = culturalQuizQuestions;
      break;
    case "test":
      questions = testQuestions;
      break;
    default:
      questions = culturalQuizQuestions;
      break;
  }

  // Shuffle questions and pick the first 'numberOfQuestions'
  const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
  return shuffledQuestions.slice(0, numberOfQuestions);
};

// Generate a WhatsApp invite link for a match
export const generateWhatsAppInvite = (matchId: string, category: string, invitedBy: string): string => {
  const baseUrl = window.location.origin;
  const matchUrl = `${baseUrl}/quiz-match/${matchId}`;
  const message = `${invitedBy} vous a invité à participer à un match d'incollables sur ${category === 'test' ? 'MRC Test' : 'Politique Camerounaise'}! Rejoignez le match: ${matchUrl}`;
  
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
};
