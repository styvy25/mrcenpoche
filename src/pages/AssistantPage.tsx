
import Navbar from "@/components/layout/Navbar";
import AIChat from "@/components/assistant/AIChat";

const AssistantPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="pt-24 pb-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-2">
            Assistant IA Styvy237
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Votre guide personnalisé pour la formation MRC. Posez vos questions et obtenez des réponses précises et adaptées.
          </p>
        </div>
        
        <AIChat />
      </div>
    </div>
  );
};

export default AssistantPage;
