
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, MessageSquare, Home } from "lucide-react";
import { Link } from "react-router-dom";

interface NavigationItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
}

const AppNavigationWidget = () => {
  const navigationItems: NavigationItem[] = [
    {
      title: "Accueil",
      description: "Page d'accueil de l'application",
      icon: <Home className="h-8 w-8 text-mrc-blue" />,
      path: "/"
    },
    {
      title: "Assistant",
      description: "Discutez avec notre assistant IA",
      icon: <MessageSquare className="h-8 w-8 text-mrc-blue" />,
      path: "/chat"
    },
    {
      title: "Documents",
      description: "Accédez à vos documents",
      icon: <FileText className="h-8 w-8 text-mrc-blue" />,
      path: "/documents"
    },
    {
      title: "Modules",
      description: "Modules de formation",
      icon: <FileText className="h-8 w-8 text-mrc-blue" />,
      path: "/modules"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            MRC<span className="text-mrc-blue"> en Poche</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-xl mx-auto">
            Bienvenue dans votre application. Choisissez une section pour commencer.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {navigationItems.map((item, index) => (
            <Link to={item.path} key={index} className="no-underline">
              <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 h-full">
                <CardHeader className="pb-2">
                  <div className="flex justify-center mb-4">
                    {item.icon}
                  </div>
                  <CardTitle className="text-xl text-center">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">{item.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppNavigationWidget;
