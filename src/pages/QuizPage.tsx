
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import QuizContainer from "@/components/quiz/QuizContainer";
import BadgesDisplay from "@/components/quiz/BadgesDisplay";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, Medal, Trophy } from "lucide-react";

const QuizPage = () => {
  const [activeTab, setActiveTab] = useState("quiz");

  return (
    <div className="min-h-screen bg-gradient-to-br from-mrc-blue/5 to-mrc-yellow/10">
      <Navbar />
      <main className="container mx-auto px-4 py-10 pt-24">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-mrc-blue">Quiz Culturel Camerounais</h1>
          <p className="text-gray-600 mt-2">Testez vos connaissances et gagnez des badges culturels</p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Badge className="bg-mrc-green text-white">Culture</Badge>
            <Badge className="bg-mrc-red text-white">Histoire</Badge>
            <Badge className="bg-mrc-yellow text-mrc-dark">Traditions</Badge>
          </div>
        </div>

        <Tabs 
          defaultValue="quiz" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="max-w-4xl mx-auto"
        >
          <TabsList className="grid grid-cols-2 w-full mb-8">
            <TabsTrigger value="quiz" className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              Quiz
            </TabsTrigger>
            <TabsTrigger value="badges" className="flex items-center gap-2">
              <Medal className="h-4 w-4" />
              Mes Badges
            </TabsTrigger>
          </TabsList>
          <TabsContent value="quiz" className="p-1">
            <QuizContainer />
          </TabsContent>
          <TabsContent value="badges" className="p-1">
            <BadgesDisplay />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default QuizPage;
