
import { motion } from "framer-motion";
import { MessageSquareText } from "lucide-react";

const EmptyChat = () => {
  return (
    <div className="flex h-full items-center justify-center p-6 text-center text-gray-400">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center"
      >
        <MessageSquareText size={40} className="text-mrc-blue/50 mb-3" />
        <p className="text-lg font-medium mb-2">Aucun message</p>
        <p className="text-sm text-gray-500">Commencez la conversation avec les autres apprenants</p>
      </motion.div>
    </div>
  );
};

export default EmptyChat;
