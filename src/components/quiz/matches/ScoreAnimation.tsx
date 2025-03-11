
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, CheckCircle, XCircle } from "lucide-react";

interface ScoreAnimationProps {
  points: number;
}

const ScoreAnimation: React.FC<ScoreAnimationProps> = ({ points }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
        >
          <div className="relative">
            <motion.div
              className={`text-center p-6 rounded-full ${
                points > 0 ? "bg-green-100" : "bg-red-100"
              }`}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 0.5 }}
            >
              {points > 0 ? (
                <CheckCircle className="h-16 w-16 text-green-500" />
              ) : (
                <XCircle className="h-16 w-16 text-red-500" />
              )}
            </motion.div>
            
            <motion.div
              className="absolute top-0 left-0 right-0 -mt-8 text-center"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: -40, opacity: 1 }}
              exit={{ y: -60, opacity: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className={`text-xl font-bold ${
                points > 0 ? "text-green-600" : "text-red-600"
              }`}>
                {points > 0 ? `+${points}` : "0"} points
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScoreAnimation;
