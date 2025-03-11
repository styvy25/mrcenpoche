
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, Trophy, Star, Zap } from 'lucide-react';

interface DuelVisualEffectsProps {
  isCorrect: boolean | null;
  isAnimating: boolean;
  score: number;
  showEffect?: 'correct' | 'incorrect' | 'victory' | 'start' | null;
}

const DuelVisualEffects: React.FC<DuelVisualEffectsProps> = ({ 
  isCorrect, 
  isAnimating, 
  score, 
  showEffect 
}) => {
  return (
    <AnimatePresence>
      {/* Effet de démarrage du duel */}
      {showEffect === 'start' && (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="bg-gradient-to-r from-mrc-blue to-mrc-green p-8 rounded-full flex items-center justify-center"
            initial={{ scale: 0.5, rotate: -10 }}
            animate={{ 
              scale: [0.5, 1.2, 1], 
              rotate: [-10, 10, 0] 
            }}
            transition={{ duration: 0.6 }}
          >
            <Swords className="h-20 w-20 text-white" />
          </motion.div>
          <motion.div
            className="absolute text-4xl font-bold text-white bg-black/50 px-6 py-2 rounded-full"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            DUEL COMMENCE !
          </motion.div>
        </motion.div>
      )}

      {/* Effet de réponse correcte */}
      {isAnimating && isCorrect === true && (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="relative"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.div 
              className="absolute inset-0 bg-green-500 rounded-full"
              initial={{ scale: 1 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.8, repeat: 1 }}
            />
            <motion.div 
              className="relative bg-green-100 p-8 rounded-full z-10"
              animate={{ 
                boxShadow: ["0 0 0px rgba(0, 255, 0, 0)", "0 0 20px rgba(0, 255, 0, 0.7)", "0 0 0px rgba(0, 255, 0, 0)"]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Zap className="h-16 w-16 text-green-600" />
            </motion.div>
            
            <motion.div
              className="absolute top-24 left-1/2 transform -translate-x-1/2"
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: -20, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div 
                className="text-2xl font-bold text-green-600"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: 1 }}
              >
                +10 points!
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* Effet de réponse incorrecte */}
      {isAnimating && isCorrect === false && (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="relative"
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, -5, 5, -5, 0] }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="bg-red-100 p-8 rounded-full"
              animate={{ 
                boxShadow: ["0 0 0px rgba(255, 0, 0, 0)", "0 0 20px rgba(255, 0, 0, 0.5)", "0 0 0px rgba(255, 0, 0, 0)"]
              }}
              transition={{ duration: 1, repeat: 1 }}
            >
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <Zap className="h-16 w-16 text-red-500" />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* Effet de victoire */}
      {showEffect === 'victory' && (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          <motion.div className="relative flex flex-col items-center">
            <motion.div 
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-10 rounded-full"
              initial={{ y: -50, scale: 0.5 }}
              animate={{ y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Trophy className="h-24 w-24 text-white" />
            </motion.div>
            
            <motion.div
              className="mt-6 text-4xl font-bold text-yellow-500 bg-white/90 px-8 py-3 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              VICTOIRE!
            </motion.div>
            
            <motion.div
              className="mt-2 text-xl font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Score final: {score} points
            </motion.div>
            
            {/* Confettis */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-20px`,
                }}
                initial={{ y: -20, opacity: 1 }}
                animate={{ 
                  y: `${Math.random() * 400 + 100}px`, 
                  x: `${(Math.random() - 0.5) * 200}px`, 
                  rotate: `${Math.random() * 360}deg`,
                  opacity: 0,
                }}
                transition={{ duration: Math.random() * 2 + 1, ease: "easeOut" }}
              >
                <Star 
                  fill={`hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`} 
                  color="transparent"
                  size={Math.random() * 20 + 10} 
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DuelVisualEffects;
