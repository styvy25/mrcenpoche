
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Star, X, CheckCircle, AlertCircle } from 'lucide-react';

type NotificationType = 'success' | 'error' | 'achievement' | 'streak' | 'info';

interface QuizNotificationProps {
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
  isVisible: boolean;
  onClose: () => void;
}

const QuizNotification: React.FC<QuizNotificationProps> = ({
  type,
  title,
  message,
  duration = 3000,
  isVisible,
  onClose,
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  // Define styles and icons based on notification type
  const getNotificationStyles = () => {
    switch (type) {
      case 'success':
        return {
          icon: CheckCircle,
          bgColor: 'bg-green-100 border-green-500',
          textColor: 'text-green-700',
          iconColor: 'text-green-500',
        };
      case 'error':
        return {
          icon: AlertCircle,
          bgColor: 'bg-red-100 border-red-500',
          textColor: 'text-red-700',
          iconColor: 'text-red-500',
        };
      case 'achievement':
        return {
          icon: Award,
          bgColor: 'bg-purple-100 border-purple-500',
          textColor: 'text-purple-700',
          iconColor: 'text-purple-500',
        };
      case 'streak':
        return {
          icon: Star,
          bgColor: 'bg-amber-100 border-amber-500',
          textColor: 'text-amber-700',
          iconColor: 'text-amber-500',
        };
      case 'info':
      default:
        return {
          icon: AlertCircle,
          bgColor: 'bg-blue-100 border-blue-500',
          textColor: 'text-blue-700',
          iconColor: 'text-blue-500',
        };
    }
  };

  const { icon: Icon, bgColor, textColor, iconColor } = getNotificationStyles();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className={`fixed top-6 right-6 z-50 max-w-sm p-4 rounded-lg shadow-lg border-l-4 ${bgColor}`}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Icon className={`h-6 w-6 ${iconColor}`} />
            </div>
            <div className="ml-3 flex-1">
              <h3 className={`text-sm font-medium ${textColor}`}>{title}</h3>
              {message && <p className={`mt-1 text-sm ${textColor} opacity-90`}>{message}</p>}
            </div>
            <button
              onClick={onClose}
              className={`flex-shrink-0 ml-2 ${textColor} hover:text-gray-900 focus:outline-none`}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuizNotification;
