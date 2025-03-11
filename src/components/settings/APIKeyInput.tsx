
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";

interface APIKeyInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  isValid: boolean;
  placeholder: string;
  infoText: string;
  linkText: string;
  linkUrl: string;
}

const APIKeyInput = ({
  id,
  label,
  value,
  onChange,
  isValid,
  placeholder,
  infoText,
  linkText,
  linkUrl
}: APIKeyInputProps) => {
  const [showKey, setShowKey] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
        {isValid ? (
          <span className="text-xs flex items-center text-green-600">
            <CheckCircle className="h-3 w-3 mr-1" />
            Connecté
          </span>
        ) : (
          <span className="text-xs flex items-center text-gray-400">
            <XCircle className="h-3 w-3 mr-1" />
            Non configuré
          </span>
        )}
      </div>
      
      <div className="relative">
        <Input
          id={id}
          type={showKey ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="pr-10"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full px-3 py-2"
          onClick={() => setShowKey(!showKey)}
        >
          {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>
      
      <p className="text-xs text-gray-500">
        {infoText}{" "}
        <a 
          href={linkUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-mrc-blue hover:underline"
        >
          {linkText}
        </a>
      </p>
    </div>
  );
};

export default APIKeyInput;
