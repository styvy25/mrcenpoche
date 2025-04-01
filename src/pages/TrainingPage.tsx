
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const TrainingPage: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to TrainingModulePage
    navigate('/training');
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin" />
      <span className="ml-2">Redirection vers la page de formation...</span>
    </div>
  );
};

export default TrainingPage;
