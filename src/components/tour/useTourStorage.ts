
// Storage utility for tour completion
export const useTourStorage = () => {
  // Check for completed tours in localStorage
  const checkCompletedTours = (): string[] => {
    const completedTours = localStorage.getItem('completed_tours');
    return completedTours ? JSON.parse(completedTours) : [];
  };

  const markTourAsCompleted = (tourId: string) => {
    const completedTours = checkCompletedTours();
    if (!completedTours.includes(tourId)) {
      localStorage.setItem('completed_tours', JSON.stringify([...completedTours, tourId]));
    }
  };

  const removeTourFromCompleted = (tourId: string) => {
    const completedTours = checkCompletedTours();
    const updatedTours = completedTours.filter((id: string) => id !== tourId);
    localStorage.setItem('completed_tours', JSON.stringify(updatedTours));
  };

  return {
    checkCompletedTours,
    markTourAsCompleted,
    removeTourFromCompleted
  };
};
