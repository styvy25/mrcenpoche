
import React from "react";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface MatchResultsHeaderProps {
  title: string;
  category: string;
}

const MatchResultsHeader: React.FC<MatchResultsHeaderProps> = ({ title, category }) => {
  return (
    <CardHeader>
      <CardTitle>Résultats: {title}</CardTitle>
      <CardDescription>
        {category === "test" ? "MRC Test" : "Politique Camerounaise"}
      </CardDescription>
    </CardHeader>
  );
};

export default MatchResultsHeader;
