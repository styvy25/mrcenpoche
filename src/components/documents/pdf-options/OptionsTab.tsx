
import React from "react";
import UserInfoForm from "./UserInfoForm";
import DocumentOptions from "./DocumentOptions";

interface OptionsTabProps {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  options: {
    includeExercises: boolean;
    includeImages: boolean;
    includeSummary: boolean;
  };
  setOptions: React.Dispatch<React.SetStateAction<{
    includeExercises: boolean;
    includeImages: boolean;
    includeSummary: boolean;
  }>>;
}

const OptionsTab = ({ userName, setUserName, options, setOptions }: OptionsTabProps) => {
  return (
    <div className="space-y-4">
      <UserInfoForm userName={userName} setUserName={setUserName} />
      <DocumentOptions options={options} setOptions={setOptions} />
    </div>
  );
};

export default OptionsTab;
