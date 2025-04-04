
import Navbar from "@/components/layout/Navbar";
import AIChat from "@/components/assistant/AIChat";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const AssistantPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Animated interactive background with more intense effects */}
      <AnimatedBackground 
        numberOfOrbs={9}
        blur={95}
        intensity={0.75}
      />
      
      <Navbar />
      <div className="pt-24 pb-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-mrc-red via-mrc-blue to-mrc-green bg-clip-text text-transparent sm:text-5xl mb-2 flex items-center justify-center gap-2 animate-gradient">
            <motion.div
              animate={{ 
                rotate: [0, 5, 0, -5, 0],
                scale: [1, 1.1, 1, 1.1, 1]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              <Sparkles className="h-8 w-8 text-mrc-blue" />
            </motion.div>
            Assistant IA Styvy237
            <motion.div
              animate={{ 
                rotate: [0, -5, 0, 5, 0],
                scale: [1, 1.1, 1, 1.1, 1]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              <Sparkles className="h-8 w-8 text-mrc-green" />
            </motion.div>
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-gray-300 max-w-3xl mx-auto text-lg"
          >
            Votre guide personnalisé pour la formation MRC. Posez vos questions et obtenez des réponses précises et adaptées.
          </motion.p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-mrc-blue via-purple-500 to-mrc-green rounded-xl blur opacity-20 animate-gradient"></div>
          <AIChat />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-center text-sm text-gray-400 mt-8"
        >
          <p>Propulsé par l'intelligence artificielle au service des militants du MRC</p>
          <p className="mt-1">Les réponses fournies sont génératives et à titre informatif uniquement</p>
        </motion.div>
      </div>
    </div>
  );
};

export default AssistantPage;
