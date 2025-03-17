
import { useState, useCallback, memo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Download, PlusCircle, Mic, Square } from "lucide-react";

interface ChatInputProps {
  isLoading: boolean;
  onSendMessage: (message: string) => void;
  onGeneratePDF: () => void;
}

const ChatInput = memo(({
  isLoading,
  onSendMessage,
  onGeneratePDF
}: ChatInputProps) => {
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [recognition, setRecognition] = useState<any>(null);

  // Set up speech recognition
  useEffect(() => {
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
        setInput(finalTranscript || interimTranscript);
      };

      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const toggleListening = useCallback(() => {
    if (!recognition) return;

    if (!isListening) {
      recognition.start();
      setIsListening(true);
    } else {
      recognition.stop();
      setIsListening(false);
      // Send the message if transcript is not empty
      if (transcript.trim()) {
        onSendMessage(transcript.trim());
        setTranscript("");
        setInput("");
      }
    }
  }, [isListening, recognition, transcript, onSendMessage]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) return;
    onSendMessage(trimmedInput);
    setInput("");
  }, [input, onSendMessage]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  return (
    <div className="p-4 border-t border-white/10 backdrop-blur-lg bg-sky-300">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input 
          value={input} 
          onChange={handleChange} 
          placeholder="Posez votre question à Styvy237..." 
          disabled={isLoading || isListening} 
          aria-label="Message input" 
          className="flex-1 border-white/20 focus:border-mrc-blue/50 focus:ring-1 focus:ring-mrc-blue/30 h-11 my-0 px-[18px] rounded bg-cyan-50" 
        />
        <Button 
          type="button" 
          variant="outline" 
          onClick={toggleListening} 
          disabled={isLoading || !recognition}
          className={`border-white/20 h-11 w-11 p-0 flex items-center justify-center ${isListening ? 'bg-red-100 text-red-500' : 'bg-cyan-50'}`}
        >
          {isListening ? <Square size={18} /> : <Mic size={18} />}
        </Button>
        <Button 
          type="submit" 
          disabled={isLoading || !input.trim()} 
          className="bg-gradient-to-r from-mrc-blue to-mrc-green hover:opacity-90 transition-opacity h-11 px-4 optimize-animation"
        >
          <Send size={18} className="mr-2" />
          <span>Envoyer</span>
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={onGeneratePDF} 
          title="Générer un PDF" 
          disabled={isLoading} 
          className="border-white/20 h-11 w-11 p-0 flex items-center justify-center bg-cyan-50"
        >
          <Download size={18} />
        </Button>
      </form>
    </div>
  );
});

ChatInput.displayName = 'ChatInput';

export default ChatInput;
