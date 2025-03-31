
import Navbar from "@/components/layout/Navbar";
import AIChat from "@/components/assistant/AIChat";

const AssistantPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Éléments décoratifs inspirés des couleurs du MRC */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-mrc-red opacity-10 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-mrc-blue opacity-10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-mrc-green opacity-5 blur-3xl"></div>
      </div>
      
      <Navbar />
      <div className="pt-24 pb-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-mrc-red via-mrc-blue to-mrc-green bg-clip-text text-transparent sm:text-5xl mb-2">
            Assistant IA Styvy237
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            Votre guide personnalisé pour la formation MRC. Posez vos questions et obtenez des réponses précises et adaptées.
          </p>
        </div>
        
        <AIChat />
        
        <div className="mt-8 text-center text-sm text-gray-400">
          <p>Propulsé par l'intelligence artificielle au service des militants du MRC</p>
          <p className="mt-1">Les réponses fournies sont génératives et à titre informatif uniquement</p>
        </div>
      </div>
    </div>
  );
};

export default AssistantPage;
