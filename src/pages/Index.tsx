// Replace the import for News with a different icon
import { Book, Check, Settings, User, BarChart, Newspaper } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            MRC LearnScape
          </h1>
          <p className="mt-2 text-gray-600">
            Bienvenue sur votre plateforme d'apprentissage personnalisée.
          </p>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Module de Formation */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="w-0 flex-1">
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Modules de Formation
                    </dt>
                    <dd className="mt-4 text-gray-900 text-2xl font-semibold">
                      Découvrez nos cours
                    </dd>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-mrc-blue text-white flex items-center justify-center">
                    <Book className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    to="/modules"
                    className="inline-flex items-center text-sm font-medium text-mrc-blue hover:text-blue-500"
                  >
                    Commencer l'apprentissage
                    <span className="ml-1">→</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Assistant IA */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="w-0 flex-1">
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Assistant IA
                    </dt>
                    <dd className="mt-4 text-gray-900 text-2xl font-semibold">
                      Obtenez de l'aide
                    </dd>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-mrc-blue text-white flex items-center justify-center">
                    <Check className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    to="/assistant"
                    className="inline-flex items-center text-sm font-medium text-mrc-blue hover:text-blue-500"
                  >
                    Poser une question
                    <span className="ml-1">→</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="w-0 flex-1">
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Documents
                    </dt>
                    <dd className="mt-4 text-gray-900 text-2xl font-semibold">
                      Téléchargez les ressources
                    </dd>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-mrc-blue text-white flex items-center justify-center">
                    <Settings className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    to="/documents"
                    className="inline-flex items-center text-sm font-medium text-mrc-blue hover:text-blue-500"
                  >
                    Accéder aux documents
                    <span className="ml-1">→</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Profil */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="w-0 flex-1">
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Profil
                    </dt>
                    <dd className="mt-4 text-gray-900 text-2xl font-semibold">
                      Gérez votre compte
                    </dd>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-mrc-blue text-white flex items-center justify-center">
                    <User className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    to="/profile"
                    className="inline-flex items-center text-sm font-medium text-mrc-blue hover:text-blue-500"
                  >
                    Modifier votre profil
                    <span className="ml-1">→</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Quiz et Challenges */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="w-0 flex-1">
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Quiz et Challenges
                    </dt>
                    <dd className="mt-4 text-gray-900 text-2xl font-semibold">
                      Testez vos connaissances
                    </dd>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-mrc-blue text-white flex items-center justify-center">
                    <BarChart className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    to="/quiz"
                    className="inline-flex items-center text-sm font-medium text-mrc-blue hover:text-blue-500"
                  >
                    Participer aux activités
                    <span className="ml-1">→</span>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Actualités */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="w-0 flex-1">
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Actualités
                    </dt>
                    <dd className="mt-4 text-gray-900 text-2xl font-semibold">
                      Dernières nouvelles
                    </dd>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-mrc-blue text-white flex items-center justify-center">
                    <Newspaper className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    to="/news"
                    className="inline-flex items-center text-sm font-medium text-mrc-blue hover:text-blue-500"
                  >
                    Voir les actualités
                    <span className="ml-1">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
