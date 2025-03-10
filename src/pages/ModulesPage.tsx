
import Navbar from "@/components/layout/Navbar";
import CoursesGrid from "@/components/modules/CoursesGrid";

const ModulesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="pt-20 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-2">
            Modules de Formation
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explorez nos modules de formation conçus pour vous aider à devenir un militant efficace et bien informé.
          </p>
        </div>
        
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Votre progression
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <div className="text-3xl font-bold text-mrc-blue">1/5</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Modules complétés</div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <div className="text-3xl font-bold text-mrc-blue">38%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Progression globale</div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <div className="text-3xl font-bold text-mrc-blue">3h 45m</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Temps d'étude</div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <div className="text-3xl font-bold text-mrc-blue">12</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Leçons terminées</div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
            Tous les modules
          </h2>
          <CoursesGrid />
        </div>
      </div>
    </div>
  );
};

export default ModulesPage;
