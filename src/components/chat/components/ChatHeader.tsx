
import { motion } from "framer-motion";
import { Users, Sparkles } from "lucide-react";

const ChatHeader = () => {
  return (
    <div className="text-xl flex items-center gap-2 text-white">
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="p-1.5 rounded-full bg-gradient-to-r from-mrc-blue to-mrc-green"
      >
        <Users size={18} className="text-white" />
      </motion.div>
      <span className="bg-gradient-to-r from-mrc-blue via-mrc-red to-mrc-green bg-clip-text text-transparent animate-gradient">
        Discussion entre apprenants
      </span>
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 5, 0, -5, 0]
        }}
        transition={{ 
          repeat: Infinity,
          duration: 5,
          repeatDelay: 3
        }}
        className="ml-2"
      >
        <Sparkles size={14} className="text-mrc-blue" />
      </motion.div>
    </div>
  );
};

export default ChatHeader;
