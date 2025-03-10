
import React from "react";
import { Category } from "./types";
import QuestionScreen from "./QuestionScreen";
import ResultsScreen from "./ResultsScreen";
import { calculateEarnedBadges } from "./badgeUtils";

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

class QuizContainer extends React.Component<QuizContainerProps, QuizContainerState> {
  constructor(props: QuizContainerProps) {
    super(props);
    
    // Find the first category with questions
    const initialCategory = props.categories.find(cat => 
      cat.questions && cat.questions.length > 0
    ) || props.categories[0];
    
    this.state = {
      currentCategoryIndex: props.categories.indexOf(initialCategory),
      currentQuestionIndex: 0,
      selectedAnswers: [],
      quizResults: null,
      currentCategory: initialCategory,
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

  render() {
    const { quizResults, currentQuestionIndex, selectedAnswers, currentCategoryIndex } = this.state;
    const currentCategory = this.props.categories[currentCategoryIndex];

    if (!currentCategory || !currentCategory.questions || currentCategory.questions.length === 0) {
      return (
        <div className="p-8 text-center">
          <h2 className="text-xl font-semibold text-mrc-blue mb-4">Aucune question disponible</h2>
          <p className="text-gray-600">Veuillez sélectionner une autre catégorie ou réessayer plus tard.</p>
        </div>
      );
    }

    const currentQuestion = currentCategory.questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === currentCategory.questions.length - 1;

    return (
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-mrc-green to-mrc-blue shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <h1 className="text-2xl font-bold text-gray-900 text-center">Quiz de Formation MRC</h1>
            <div className="mt-8">
              {quizResults ? (
                <ResultsScreen
                  score={quizResults.score}
                  totalQuestions={currentCategory.questions.length}
                  categoryName={currentCategory.label || currentCategory.name || ""}
                  selectedAnswers={selectedAnswers}
                  questions={currentCategory.questions}
                  onRestart={this.restartQuiz}
                  earnedBadges={calculateEarnedBadges(quizResults.score, currentCategory.questions.length)}
                />
              ) : (
                <QuestionScreen
                  currentQuestion={currentQuestion}
                  onAnswer={this.handleAnswer}
                  selectedAnswer={selectedAnswers[currentQuestionIndex]}
                  isLastQuestion={isLastQuestion}
                  onNextQuestion={this.nextQuestion}
                  onCalculateResults={this.calculateResults}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default QuizContainer;
