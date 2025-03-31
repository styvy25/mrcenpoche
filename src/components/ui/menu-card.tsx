
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MenuCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  onClick: () => void;
  color?: "blue" | "green" | "red" | "purple" | "yellow" | "orange" | "teal" | "pink" | "cyan" | "indigo";
  index?: number;
  disabled?: boolean;
}

const colors = {
  blue: "bg-blue-500 hover:bg-blue-600",
  green: "bg-green-500 hover:bg-green-600",
  red: "bg-red-500 hover:bg-red-600",
  purple: "bg-purple-500 hover:bg-purple-600",
  yellow: "bg-amber-500 hover:bg-amber-600",
  orange: "bg-orange-500 hover:bg-orange-600",
  teal: "bg-teal-500 hover:bg-teal-600",
  pink: "bg-pink-500 hover:bg-pink-600",
  cyan: "bg-cyan-500 hover:bg-cyan-600",
  indigo: "bg-indigo-500 hover:bg-indigo-600",
};

export function MenuCard({
  title,
  value,
  subtitle,
  icon,
  onClick,
  color = "blue",
  index = 0,
  disabled = false
}: MenuCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={cn(
        "relative overflow-hidden rounded-xl bg-white shadow-md dark:bg-gray-800 transition-all duration-200 cursor-pointer border border-gray-100 dark:border-gray-700",
        disabled && "opacity-60 cursor-not-allowed"
      )}
      onClick={disabled ? undefined : onClick}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
          </div>
          <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center", colors[color])}>
            {icon}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
          
          <motion.div
            whileHover={{ x: 5 }}
            className="text-sm font-medium text-primary flex items-center"
          >
            <span className="mr-1">Explorer</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
