
import React from "react";
import { Input } from "@/components/ui/input";

interface UserInfoFormProps {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}

const UserInfoForm = ({ userName, setUserName }: UserInfoFormProps) => {
  return (
    <div>
      <label htmlFor="user-name" className="text-sm font-medium block mb-2">
        Nom du destinataire
      </label>
      <Input 
        id="user-name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Entrez votre nom (optionnel)"
        className="w-full"
      />
      <p className="text-xs text-gray-500 mt-1">
        Ce nom sera inclus dans le titre du document
      </p>
    </div>
  );
};

export default UserInfoForm;
