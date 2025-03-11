
import { QuizQuestion } from "../types";

export interface MatchParticipant {
  id: string;
  name: string;
  avatar?: string;
  score: number;
  correctAnswers: number;
  totalAnswers: number;
}

export interface Match {
  id: string;
  title: string;
  createdAt: Date;
  status: "pending" | "active" | "completed";
  category: string;
  questions: QuizQuestion[];
  participants: MatchParticipant[];
  inviteLink?: string;
  creator: string;
}

export interface MatchInvite {
  matchId: string;
  invitedBy: string;
  category: string;
  message: string;
}
