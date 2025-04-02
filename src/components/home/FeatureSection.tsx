import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, FileText, Medal, BarChart } from "lucide-react";
const features = [{
  icon: <Brain className="h-10 w-10 text-mrc-blue" />,
  title: "Assistant IA Styvy237",
  description: "Un assistant intelligent qui répond à vos questions, propose des formations sur mesure et vous guide tout au long de votre apprentissage."
}, {
  icon: <FileText className="h-10 w-10 text-mrc-red" />,
  title: "Supports PDF interactifs",
  description: "Générez des documents PDF personnalisés pour chaque module de formation, à consulter hors ligne ou à partager avec d'autres militants."
}, {
  icon: <Medal className="h-10 w-10 text-mrc-green" />,
  title: "Modules de formation progressifs",
  description: "Des modules adaptés à tous les niveaux, du débutant à l'expert, pour vous permettre d'avancer à votre rythme."
}, {
  icon: <BarChart className="h-10 w-10 text-blue-500" />,
  title: "Suivi de progression",
  description: "Un tableau de bord personnel qui suit votre évolution et vous propose des recommandations personnalisées."
}];
const FeatureSection = () => {
  return <section className="py-12 md:py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 rounded-sm lg:px-[87px] my-px">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Une plateforme complète pour votre formation
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            MRC LearnScape combine technologie de pointe et contenu pédagogique de qualité pour une expérience d'apprentissage unique.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => <Card key={index} className="border-t-4 border-t-mrc-blue hover:shadow-lg transition-shadow py-0 my-0 mx-0 px-0 rounded-sm">
              <CardHeader className="pb-2 flex flex-col items-center">
                <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-center">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>)}
        </div>
      </div>
    </section>;
};
export default FeatureSection;