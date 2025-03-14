
import { Brain, Award, BookOpen } from "lucide-react";

const QuizFeatures = () => {
  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Questions Variées",
      description: "Explorez une variété de questions sur la culture, l'histoire et les traditions camerounaises."
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Badges Culturels",
      description: "Collectionnez des badges pour chaque niveau de connaissance atteint."
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Apprentissage Ludique",
      description: "Découvrez des anecdotes fascinantes et des explications détaillées pour chaque réponse."
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
      {features.map((feature, index) => (
        <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="p-5 flex flex-col h-full">
            <div className={`flex items-center justify-center w-12 h-12 ${
              index === 0 ? "bg-blue-100 text-mrc-blue" : 
              index === 1 ? "bg-red-100 text-mrc-red" : 
              "bg-green-100 text-mrc-green"
            } rounded-full mb-4`}>
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600 flex-grow">
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuizFeatures;
