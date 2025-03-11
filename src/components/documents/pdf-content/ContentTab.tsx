
import React from "react";
import PDFContent from "../PDFContent";
import { getModuleContent } from "../pdfUtils";

interface ContentTabProps {
  selectedModule: string;
}

const ContentTab = ({ selectedModule }: ContentTabProps) => {
  const moduleContent = selectedModule ? getModuleContent(selectedModule) : [];

  if (!selectedModule) {
    return <PDFContent />;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Sections incluses dans le document</h3>
      <div className="space-y-2 max-h-60 overflow-y-auto p-2">
        {moduleContent.map((section, index) => (
          <div key={index} className="border rounded-md p-3 bg-white dark:bg-gray-800">
            <h4 className="font-medium text-mrc-blue">{section.title}</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
              {section.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentTab;
