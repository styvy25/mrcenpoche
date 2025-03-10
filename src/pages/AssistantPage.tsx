
import Navbar from "@/components/layout/Navbar";
import AIChat from "@/components/assistant/AIChat";

const AssistantPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      <div className="pt-24 pb-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gradient sm:text-5xl mb-2">
            Assistant IA Styvy237
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            Votre guide personnalisé pour la formation MRC. Posez vos questions et obtenez des réponses précises et adaptées.
          </p>
        </div>
        
        <AIChat />
      </div>
    </div>
  );
};

export default AssistantPage;
