import React from "react";
import { QuizQuestion } from "./types";
import QuizQuestionComponent from "./QuizQuestion";
import QuizResult from "./QuizResult";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";

interface Category {
  label: string;
  questions: QuizQuestion[];
}

interface QuizContainerProps {
  categories: Category[];
}

interface QuizContainerState {
  currentCategoryIndex: number;
  currentQuestionIndex: number;
  selectedAnswers: (number | undefined)[];
  quizResults: { score: number } | null;
  currentCategory: Category | undefined;
}

interface BadgeProps {
  name: string;
  description: string;
  icon: React.ReactNode;
}

const BadgesDisplay = ({ badges }: { badges: BadgeProps[] }) => (
  <div className="flex flex-wrap justify-center gap-4">
    {badges.map((badge, index) => (
      <div key={index} className="flex flex-col items-center">
        {badge.icon}
        <Badge className="mt-2">{badge.name}</Badge>
        <p className="text-sm text-gray-500">{badge.description}</p>
      </div>
    ))}
  </div>
);

class QuizContainer extends React.Component<QuizContainerProps, QuizContainerState> {
  constructor(props: QuizContainerProps) {
    super(props);
    this.state = {
      currentCategoryIndex: 0,
      currentQuestionIndex: 0,
      selectedAnswers: [],
      quizResults: null,
      currentCategory: props.categories[0],
    };
  }

  handleAnswer = (answerIndex: number) => {
    const { currentQuestionIndex, currentCategoryIndex } = this.state;
    const currentCategory = this.props.categories[currentCategoryIndex];

    if (!currentCategory) {
      console.error("No current category found");
      return;
    }

    const currentQuestion = currentCategory.questions[currentQuestionIndex];

    if (!currentQuestion) {
      console.error("No current question found");
      return;
    }

    this.setState(
      (prevState) => {
        const updatedAnswers = [...prevState.selectedAnswers];
        updatedAnswers[prevState.currentQuestionIndex] = answerIndex;

        return {
          selectedAnswers: updatedAnswers,
        };
      },
      () => {
        const isLastQuestion =
          currentQuestionIndex === currentCategory.questions.length - 1;

        if (isLastQuestion) {
          this.calculateResults();
        } else {
          this.nextQuestion();
        }
      }
    );
  };

  nextQuestion = () => {
    this.setState((prevState) => ({
      currentQuestionIndex: prevState.currentQuestionIndex + 1,
    }));
  };

  calculateResults = () => {
    const { selectedAnswers, currentCategoryIndex } = this.state;
    const currentCategory = this.props.categories[currentCategoryIndex];

    if (!currentCategory) {
      console.error("No current category found");
      return;
    }

    const questions = currentCategory.questions;
    let score = 0;

    questions.forEach((question, index) => {
      if (question.correctAnswer === selectedAnswers[index]) {
        score++;
      }
    });

    this.setState({
      quizResults: { score: score },
    });
  };

  restartQuiz = () => {
    this.setState({
      currentQuestionIndex: 0,
      selectedAnswers: [],
      quizResults: null,
    });
  };

  calculateEarnedBadges = (score: number): BadgeProps[] => {
    const percentage = (score / this.state.currentCategory!.questions.length) * 100;
    const badges: BadgeProps[] = [];

    if (percentage >= 50) {
      badges.push({
        name: "Apprenti Militant",
        description: "Connaissances de base acquises",
        icon: <CheckCircle className="h-6 w-6 text-green-500" />,
      });
    }

    if (percentage >= 75) {
      badges.push({
        name: "Militant Engagé",
        description: "Bonne compréhension des enjeux",
        icon: <CheckCircle className="h-6 w-6 text-blue-500" />,
      });
    }

    if (percentage === 100) {
      badges.push({
        name: "Expert MRC",
        description: "Maîtrise parfaite du sujet",
        icon: <CheckCircle className="h-6 w-6 text-mrc-red" />,
      });
    }

    return badges;
  };

  renderQuestionScreen() {
    const { currentQuestionIndex, selectedAnswers, currentCategoryIndex } = this.state;
    const currentCategory = this.props.categories[currentCategoryIndex];

    if (!currentCategory) {
      console.error("No current category found");
      return null;
    }

    const currentQuestion = currentCategory.questions[currentQuestionIndex];

    if (!currentQuestion) {
      console.error("No current question found");
      return null;
    }

    const isLastQuestion =
      currentQuestionIndex === currentCategory.questions.length - 1;

    return (
      <div className="flex flex-col items-center">
        <QuizQuestionComponent
          question={currentQuestion}
          onAnswer={this.handleAnswer}
          selectedAnswer={selectedAnswers[currentQuestionIndex]}
        />
        <div className="mt-6">
          {!isLastQuestion ? (
            <Button onClick={this.nextQuestion} disabled={selectedAnswers[currentQuestionIndex] === undefined}>
              Question Suivante
            </Button>
          ) : (
            <Button onClick={this.calculateResults} disabled={selectedAnswers[currentQuestionIndex] === undefined}>
              Voir les résultats
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Fix the error by removing the 'title' property and using children instead
  renderResultsScreen() {
    const { quizResults, selectedAnswers, questions, restartQuiz, currentCategory } = this.state;
    
    if (!quizResults) return null;
    
    const earnedBadges = this.calculateEarnedBadges(quizResults.score);
    
    return (
      <div className="flex flex-col items-center">
        <QuizResult 
          score={quizResults.score}
          totalQuestions={questions.length}
          categoryName={currentCategory?.label || ""}
          onRestart={restartQuiz}
        >
          {/* Use children prop instead of title */}
          Félicitations pour avoir terminé ce quiz !
        </QuizResult>
        
        {earnedBadges.length > 0 && (
          <div className="mt-8 text-center">
            <h3 className="text-xl font-bold mb-4 text-mrc-blue">Badges débloqués</h3>
            <BadgesDisplay badges={earnedBadges} />
          </div>
        )}
        
        <div className="mt-8 w-full max-w-2xl">
          <h3 className="text-xl font-bold mb-4 text-mrc-blue">Revue des questions</h3>
          {questions.map((question, index) => (
            <div key={index} className="mb-6 bg-white p-4 rounded-lg shadow">
              <QuizQuestionComponent
                question={question}
                onAnswer={() => {}}
                selectedAnswer={selectedAnswers[index]}
                showFeedback={true}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  render() {
    const { quizResults } = this.state;

    return (
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-mrc-green to-mrc-blue shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <h1 className="text-2xl font-bold text-gray-900 text-center">Quiz de Formation MRC</h1>
            <div className="mt-8">
              {quizResults ? this.renderResultsScreen() : this.renderQuestionScreen()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default QuizContainer;
