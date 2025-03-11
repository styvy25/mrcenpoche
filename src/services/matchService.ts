import { supabase } from "@/integrations/supabase/client";
import { Match, MatchPlayer } from "@/components/quiz/types/match";
import { culturalQuizQuestions } from "@/components/quiz/culturalQuizData";
import { testQuestions } from "@/components/quiz/data/test";

export const createMatch = async (quizType: string, userId: string): Promise<Match | null> => {
  try {
    const { data: match, error: matchError } = await supabase
      .from('matches')
      .insert([{ 
        quiz_type: quizType, 
        created_by: userId,
        created_at: new Date()
      }])
      .select()
      .single();

    if (matchError) {
      console.error("Error creating match:", matchError);
      return null;
    }

    return match as Match;
  } catch (error) {
    console.error("Error creating match:", error);
    return null;
  }
};

export const addPlayerToMatch = async (matchId: string, userId: string): Promise<MatchPlayer | null> => {
  try {
    const { data: player, error: playerError } = await supabase
      .from('match_players')
      .insert([{ 
        match_id: matchId, 
        user_id: userId,
        joined_at: new Date()
      }])
      .select()
      .single();

    if (playerError) {
      console.error("Error adding player to match:", playerError);
      return null;
    }

    return player as MatchPlayer;
  } catch (error) {
    console.error("Error adding player to match:", error);
    return null;
  }
};

export const getMatch = async (matchId: string): Promise<Match | null> => {
    try {
        const { data: match, error: matchError } = await supabase
            .from('matches')
            .select('*')
            .eq('id', matchId)
            .single();

        if (matchError) {
            console.error("Error fetching match:", matchError);
            return null;
        }

        return match as Match;
    } catch (error) {
        console.error("Error fetching match:", error);
        return null;
    }
};

export const getMatchPlayers = async (matchId: string): Promise<MatchPlayer[] | null> => {
    try {
        const { data: players, error: playersError } = await supabase
            .from('match_players')
            .select('*')
            .eq('match_id', matchId);

        if (playersError) {
            console.error("Error fetching match players:", playersError);
            return null;
        }

        return players as MatchPlayer[];
    } catch (error) {
        console.error("Error fetching match players:", error);
        return null;
    }
};

export const recordAnswer = async (matchId: string, userId: string, questionId: string, answer: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('match_answers')
      .insert([{
        match_id: matchId,
        user_id: userId,
        question_id: questionId,
        answer: answer,
        answered_at: new Date()
      }]);

    if (error) {
      console.error("Error recording answer:", error);
    }
  } catch (error) {
    console.error("Error recording answer:", error);
  }
};

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

export const calculateMatchResults = async (matchId: string) => {
  try {
    const match = await getMatch(matchId);
    if (!match) {
      console.error("Match not found");
      return null;
    }

    const questions = getMatchQuestions(match.quiz_type);
    const players = await getMatchPlayers(matchId);

    if (!players) {
      console.error("No players found for this match");
      return null;
    }

    const results = await Promise.all(
      players.map(async (player) => {
        const { data: answers, error } = await supabase
          .from('match_answers')
          .select('*')
          .eq('match_id', matchId)
          .eq('user_id', player.user_id);

        if (error) {
          console.error("Error fetching answers:", error);
          return {
            userId: player.user_id,
            correctAnswers: 0,
            totalQuestions: questions.length,
          };
        }

        let correctAnswers = 0;
        answers.forEach((answer) => {
          const question = questions.find((q) => q.id === answer.question_id);
          if (question && question.correctAnswer === answer.answer) {
            correctAnswers++;
          }
        });

        return {
          userId: player.user_id,
          correctAnswers: correctAnswers,
          totalQuestions: questions.length,
        };
      })
    );

    return results;
  } catch (error) {
    console.error("Error calculating match results:", error);
    return null;
  }
};
