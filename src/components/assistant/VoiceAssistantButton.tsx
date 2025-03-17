
import React, { useState, useCallback } from 'react';
import { Mic, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const VoiceAssistantButton: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const initRecognition = useCallback(() => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'fr-FR';

      recognitionInstance.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        setTranscript(finalTranscript || interimTranscript);
      };

      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        toast({
          title: "Erreur d'écoute",
          description: "Impossible d'accéder au microphone. Vérifiez les autorisations.",
          variant: "destructive",
        });
      };

      setRecognition(recognitionInstance);
      return recognitionInstance;
    }
    return null;
  }, [toast]);

  const toggleListening = useCallback(() => {
    if (!recognition) {
      const recognitionInstance = initRecognition();
      if (!recognitionInstance) {
        toast({
          title: "Non supporté",
          description: "La reconnaissance vocale n'est pas supportée par votre navigateur.",
          variant: "destructive",
        });
        return;
      }
    }

    if (!isListening) {
      // Start listening
      recognition.start();
      setIsListening(true);
      toast({
        title: "Écoute active",
        description: "Parlez maintenant. Je vous écoute...",
      });
    } else {
      // Stop listening and navigate
      recognition.stop();
      setIsListening(false);
      
      if (transcript.trim()) {
        // Save the question to localStorage
        localStorage.setItem('pending_assistant_question', transcript.trim());
        // Navigate to the assistant page
        navigate('/chat');
      }
    }
  }, [isListening, recognition, transcript, navigate, toast, initRecognition]);

  // Styling for the animated button
  const buttonSize = 100; // In pixels
  const pulseClass = isListening ? 'animate-pulse ring-4 ring-red-500 ring-opacity-50' : 'hover:ring-2 hover:ring-mrc-blue hover:ring-opacity-50';

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={toggleListening}
            className={`rounded-full w-[${buttonSize}px] h-[${buttonSize}px] bg-gradient-to-br from-mrc-blue to-mrc-green text-white shadow-lg transition-all duration-300 ${pulseClass}`}
            style={{ width: buttonSize, height: buttonSize }}
          >
            {isListening ? (
              <div className="flex flex-col items-center justify-center">
                <Square className="h-6 w-6 mb-1" />
                <span className="text-xs">{transcript.substring(0, 10)}{transcript.length > 10 ? '...' : ''}</span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <Mic className="h-6 w-6 mb-1" />
                <span className="text-xs">Styvy237</span>
              </div>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isListening ? "Cliquez pour arrêter et envoyer" : "Cliquez pour parler à Styvy237"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default VoiceAssistantButton;
