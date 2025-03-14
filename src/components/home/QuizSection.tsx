
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ShareSection from "./ShareSection";
import QuizFeatures from "./QuizFeatures";
import { Info } from "lucide-react";

const QuizSection = () => {
  return (
    <section className="bg-gradient-to-br from-mrc-blue/5 to-mrc-yellow/10 py-0 px-0 mx-[4px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <Badge className="mb-2 bg-mrc-blue text-white px-3 py-1 text-xs uppercase tracking-wider">
            Nouveau
          </Badge>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Quiz Culturel Camerounais
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500">
            Testez vos connaissances sur la culture, l'histoire et les traditions du Cameroun,
            et gagnez des badges culturels exclusifs.
          </p>
          
          {/* Social sharing buttons */}
          <ShareSection />
        </div>
        
        <QuizFeatures />
        
        <div className="text-center">
          <Link to="/quiz">
            <Button className="bg-gradient-to-r from-mrc-blue to-blue-600 text-white hover:opacity-90 transition-opacity px-8 py-6 h-auto text-lg shadow-lg hover:shadow-xl">
              Participer au Quiz
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default QuizSection;
