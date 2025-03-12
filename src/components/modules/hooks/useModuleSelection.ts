
import { useState } from "react";
import { Module } from "../types";

export function useModuleSelection() {
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);
  
  const handleModuleClick = (id: number) => {
    setSelectedModuleId(id);
  };
  
  const handleBackClick = () => {
    setSelectedModuleId(null);
  };

  return {
    selectedModuleId,
    handleModuleClick,
    handleBackClick
  };
}
