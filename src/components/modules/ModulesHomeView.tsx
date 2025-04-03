import React from "react";
import { motion } from "framer-motion";
import CoursesGrid from "./CoursesGrid";
import { Module } from "./types";

// Mock modules data
const mockModules: Module[] = [
  {
    id: "1",
    title: "Histoire du MRC",
    description: "Découvrez l'histoire et les fondements du Mouvement pour la Renaissance du Cameroun",
    category: "histoire",
    level: "Débutant",
    duration: "1h 30min",
    progress: 75,
    locked: false,
    coverImage: "/images/history.jpg",
  },
  {
    id: "2",
    title: "Communication politique",
    description: "Maîtrisez l'art de communiquer efficacement les idées politiques",
    category: "communication",
    level: "Intermédiaire",
    duration: "2h 15min",
    progress: 30,
    locked: false,
    coverImage: "/images/communication.jpg",
  },
  {
    id: "3",
    title: "Mobilisation citoyenne",
    description: "Apprenez à mobiliser et engager les citoyens dans l'action politique",
    category: "mobilisation",
    level: "Avancé",
    duration: "3h 00min",
    progress: 0,
    locked: true,
    coverImage: "/images/mobilization.jpg",
  }
];

interface ModulesHomeViewProps {
  onChallengeClick: () => void;
  onChatClick: () => void;
  onStartQuiz: (moduleId: string) => void;
  onChallengeComplete: () => void;
}

const ModulesHomeView: React.FC<ModulesHomeViewProps> = ({
  onChallengeClick,
  onChatClick,
  onStartQuiz,
  onChallengeComplete
}) => {
  return (
    <div className="space-y-8">
      {/* Featured Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Modules recommandés</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-mrc-blue to-blue-700 rounded-lg p-6 text-white"
          >
            <h3 className="text-lg font-medium mb-2">Formation politique</h3>
            <p className="text-sm opacity-90 mb-4">
              Approfondissez vos connaissances sur l'idéologie et les valeurs du MRC
            </p>
            <button
              onClick={() => onStartQuiz("histoire")}
              className="bg-white text-blue-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors"
            >
              Commencer
            </button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-purple-700 to-pink-600 rounded-lg p-6 text-white"
          >
            <h3 className="text-lg font-medium mb-2">Défis interactifs</h3>
            <p className="text-sm opacity-90 mb-4">
              Testez vos compétences avec des scénarios politiques réels
            </p>
            <button
              onClick={onChallengeClick}
              className="bg-white text-purple-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-50 transition-colors"
            >
              Relever le défi
            </button>
          </motion.div>
        </div>
      </section>

      {/* Progress Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Votre progression</h2>
          <button
            onClick={onChatClick}
            className="text-sm text-mrc-blue hover:underline flex items-center gap-1"
          >
            <span>Assistance IA</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progression globale</span>
            <span className="text-sm font-medium">35%</span>
          </div>
          <div className="w-full bg-gray-300 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
            <div
              className="bg-mrc-blue h-full rounded-full"
              style={{ width: "35%" }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Complétez plus de modules pour débloquer des badges et certificats
          </p>
        </div>
      </section>

      {/* Modules Grid */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Modules de formation</h2>
          <button className="text-sm text-mrc-blue hover:underline">
            Voir tout
          </button>
        </div>
        <CoursesGrid modules={mockModules} />
      </section>

      {/* Challenges Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Défis hebdomadaires</h2>
        <div className="bg-gradient-to-r from-green-700 to-emerald-600 rounded-lg p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium mb-2">
                Défi: Organisation d'une réunion locale
              </h3>
              <p className="text-sm opacity-90 mb-4">
                Apprenez à planifier et exécuter une réunion politique efficace dans votre localité
              </p>
              <button
                onClick={onChallengeComplete}
                className="bg-white text-green-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-green-50 transition-colors"
              >
                Commencer le défi
              </button>
            </div>
            <div className="bg-white bg-opacity-20 rounded-full p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModulesHomeView;
