
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays, Send, ArrowLeft, Book } from "lucide-react";
import { Appointment } from "@/components/quiz/types";

// Define topics manually since TOPICS is not exported
const APPOINTMENT_TOPICS = [
  "Introduction aux principes du MRC",
  "Formation politique de base",
  "Techniques de mobilisation",
  "Stratégies de campagne",
  "Communication politique",
  "Droits et obligations des militants"
];

interface AppointmentFormProps {
  date?: Date;
  formData: any;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onTopicChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  date,
  formData,
  onInputChange,
  onTopicChange,
  onSubmit,
  onBack
}) => {
  const [activeField, setActiveField] = useState('');
  const [animateSubmit, setAnimateSubmit] = useState(false);
  
  useEffect(() => {
    // Check if all required fields are filled
    const requiredFields = ['name', 'email', 'topic'];
    const allFilled = requiredFields.every(field => formData[field]?.trim());
    
    if (allFilled) {
      setAnimateSubmit(true);
      setTimeout(() => setAnimateSubmit(false), 1000);
    }
  }, [formData]);

  return (
    <form onSubmit={onSubmit} className="space-y-5 relative">
      {/* Decorative elements */}
      <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-mrc-blue/20 to-transparent rounded-full blur-xl"></div>
      <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-tr from-mrc-green/20 to-transparent rounded-full blur-xl"></div>
    
      <div 
        className={`space-y-2 transition-all duration-300 ${
          activeField === 'name' ? 'scale-105 -translate-x-2' : ''
        }`}
      >
        <Label htmlFor="name" className="flex items-center gap-1 text-mrc-blue">
          Nom complet <span className="text-red-500">*</span>
        </Label>
        <Input 
          id="name"
          name="name"
          value={formData.name}
          onChange={onInputChange}
          placeholder="Jean Dupont"
          required
          className="border-mrc-blue/30 focus:border-mrc-blue transition-all duration-300"
          onFocus={() => setActiveField('name')}
          onBlur={() => setActiveField('')}
        />
      </div>

      <div 
        className={`space-y-2 transition-all duration-300 ${
          activeField === 'email' ? 'scale-105 -translate-x-2' : ''
        }`}
      >
        <Label htmlFor="email" className="flex items-center gap-1 text-mrc-blue">
          Email <span className="text-red-500">*</span>
        </Label>
        <Input 
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={onInputChange}
          placeholder="jean.dupont@example.com"
          required
          className="border-mrc-blue/30 focus:border-mrc-blue transition-all duration-300"
          onFocus={() => setActiveField('email')}
          onBlur={() => setActiveField('')}
        />
      </div>

      <div 
        className={`space-y-2 transition-all duration-300 ${
          activeField === 'phone' ? 'scale-105 -translate-x-2' : ''
        }`}
      >
        <Label htmlFor="phone" className="text-mrc-blue">
          Téléphone
        </Label>
        <Input 
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={onInputChange}
          placeholder="+237 6xx xxx xxx"
          className="border-mrc-blue/30 focus:border-mrc-blue transition-all duration-300"
          onFocus={() => setActiveField('phone')}
          onBlur={() => setActiveField('')}
        />
      </div>

      <div 
        className={`space-y-2 transition-all duration-300 ${
          activeField === 'topic' ? 'scale-105 -translate-x-2' : ''
        }`}
      >
        <Label htmlFor="topic" className="flex items-center gap-1 text-mrc-blue">
          <Book size={14} className="text-mrc-green" />
          Sujet de formation <span className="text-red-500">*</span>
        </Label>
        <Select 
          value={formData.topic} 
          onValueChange={onTopicChange}
          onOpenChange={() => {
            if (activeField !== 'topic') setActiveField('topic');
            else setActiveField('');
          }}
        >
          <SelectTrigger className="border-mrc-blue/30 focus:border-mrc-blue transition-all duration-300">
            <SelectValue placeholder="Sélectionnez un sujet" />
          </SelectTrigger>
          <SelectContent className="bg-white/95 backdrop-blur-sm border-mrc-blue/30">
            {APPOINTMENT_TOPICS.map((topic) => (
              <SelectItem 
                key={topic} 
                value={topic}
                className="hover:bg-mrc-blue/10 cursor-pointer transition-colors"
              >
                {topic}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div 
        className={`space-y-2 transition-all duration-300 ${
          activeField === 'message' ? 'scale-105 -translate-x-2' : ''
        }`}
      >
        <Label htmlFor="message" className="text-mrc-blue flex items-center gap-1">
          <CalendarDays size={14} className="text-mrc-green" />
          Notes ou questions
        </Label>
        <Textarea 
          id="message"
          name="message"
          value={formData.message}
          onChange={onInputChange}
          placeholder="Questions spécifiques ou points que vous souhaitez aborder..."
          rows={3}
          className="border-mrc-blue/30 focus:border-mrc-blue resize-none transition-all duration-300"
          onFocus={() => setActiveField('message')}
          onBlur={() => setActiveField('')}
        />
      </div>

      <div className="flex justify-between pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack}
          className="border-mrc-blue/50 text-mrc-blue hover:bg-mrc-blue/10 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          <span>Retour</span>
        </Button>
        
        <Button 
          type="submit"
          className={`bg-gradient-to-r from-mrc-blue to-mrc-green hover:from-mrc-green hover:to-mrc-blue transition-all duration-500 hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2 ${
            animateSubmit ? 'button-glow' : ''
          }`}
        >
          <span>Confirmer la réservation</span>
          <Send size={16} />
          
          {/* Animated shine effect */}
          <span className="absolute inset-0 pointer-events-none overflow-hidden rounded-md">
            <span 
              className={`absolute -inset-[10px] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-40deg] transition-all duration-1000 ease-out ${
                animateSubmit ? 'left-full opacity-0' : 'left-[-100%] opacity-0'
              }`}
              style={{
                width: '60%',
                height: '200%',
              }}
            ></span>
          </span>
        </Button>
      </div>

      {date && (
        <div className="mt-4 p-3 bg-gradient-to-r from-mrc-blue/10 to-mrc-green/10 rounded-lg border border-mrc-blue/20 flex items-center justify-center space-x-2">
          <CalendarDays size={18} className="text-mrc-blue" />
          <span className="text-sm text-mrc-blue font-medium">
            Date sélectionnée: {date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>
      )}
    </form>
  );
};

export default AppointmentForm;
