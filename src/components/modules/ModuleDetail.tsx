
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Download, Award, Sparkles, Zap, Star, TrendingUp, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PDFPreview from "../documents/pdf-preview/PDFPreview";
import ModuleHeader from "./ModuleHeader";
import ModuleInfo from "./ModuleInfo";
import ModuleOverview from "./ModuleOverview";
import ModuleLessonsList from "./ModuleLessonsList";
import ModuleLessonContent from "./ModuleLessonContent";
import { Module, Lesson } from "./types";
import { downloadCertificate } from "../documents/CertificateGenerator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ModuleDetailProps {
  module: Module;
  onBack: () => void;
}

const ModuleDetail = ({ module, onBack }: ModuleDetailProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [showCertificateDialog, setShowCertificateDialog] = useState(false);
  const [userName, setUserName] = useState("");
  const [animateTab, setAnimateTab] = useState(false);
  const [animateStar, setAnimateStar] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Animation effects
  useEffect(() => {
    // Periodically animate star
    const starInterval = setInterval(() => {
      setAnimateStar(true);
      setTimeout(() => setAnimateStar(false), 2000);
    }, 10000);
    
    return () => clearInterval(starInterval);
  }, []);

  // Trigger tab animation when tab changes
  useEffect(() => {
    setAnimateTab(true);
    const timer = setTimeout(() => setAnimateTab(false), 500);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const handleLessonClick = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setActiveTab("content");
  };

  const handleTakeQuiz = () => {
    if (module.quizLink) {
      // Animation before navigation
      toast({
        title: "Lancement du quiz",
        description: "Préparez-vous à tester vos connaissances!",
        icon: <Zap className="text-yellow-400 animate-pulse" />
      });
      
      // Navigate after a small delay for animation to be visible
      setTimeout(() => navigate(module.quizLink), 800);
    }
  };
  
  const handleMarkLessonComplete = (lessonId: number) => {
    toast({
      title: "Leçon terminée",
      description: "Votre progression a été enregistrée.",
      icon: <CheckCircle className="text-green-500" />
    });
    // Dans une vraie application, nous mettrions à jour l'état ou enverrions une requête à l'API
  };
  
  const handleOpenPdf = () => {
    if (module.isPdfAvailable) {
      if (module.pdfUrl) {
        setShowPdfPreview(true);
      } else {
        toast({
          title: "PDF non disponible",
          description: "Le PDF pour ce module n'est pas encore disponible.",
          variant: "destructive",
        });
      }
    }
  };

  const handleOpenCertificateDialog = () => {
    if (module.isCompleted) {
      setShowCertificateDialog(true);
    } else {
      toast({
        title: "Module non terminé",
        description: "Vous devez terminer ce module pour obtenir un certificat.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadCertificate = () => {
    downloadCertificate(module, userName || undefined);
    setShowCertificateDialog(false);
    
    // Enhanced toast with animation
    toast({
      title: "Félicitations!",
      description: "Votre certificat a été généré et téléchargé avec succès.",
      icon: <Sparkles className="text-yellow-400 animate-pulse" />
    });
  };

  return (
    <div className="space-y-6">
      <ModuleHeader module={module} onBack={onBack} />

      <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg border-t-4 border-t-mrc-blue">
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-mrc-blue/10 to-transparent rounded-full blur-xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-mrc-green/10 to-transparent rounded-full blur-xl"></div>
        
        {/* Animated stars based on completion percentage */}
        {module.progress >= 75 && (
          <div className="absolute top-4 right-4">
            <Star 
              className={`text-yellow-400 h-5 w-5 transition-all duration-300 ${
                animateStar ? 'scale-150 rotate-12' : 'scale-100'
              }`}
            />
          </div>
        )}
        
        <CardHeader className="pb-2">
          <ModuleInfo module={module} />
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 relative overflow-hidden">
              <TabsTrigger 
                value="overview"
                className="relative z-10 transition-all duration-300 data-[state=active]:text-white"
              >
                Aperçu
                <span className={`${
                  activeTab === "overview" ? 'bg-gradient-to-r from-mrc-blue to-mrc-green' : 'bg-transparent'
                } absolute inset-0 -z-10 rounded-md transition-all duration-500`}></span>
              </TabsTrigger>
              <TabsTrigger 
                value="lessons"
                className="relative z-10 transition-all duration-300 data-[state=active]:text-white"
              >
                Leçons
                <span className={`${
                  activeTab === "lessons" ? 'bg-gradient-to-r from-mrc-blue to-mrc-green' : 'bg-transparent'
                } absolute inset-0 -z-10 rounded-md transition-all duration-500`}></span>
              </TabsTrigger>
              <TabsTrigger 
                value="content"
                className="relative z-10 transition-all duration-300 data-[state=active]:text-white"
              >
                Contenu
                <span className={`${
                  activeTab === "content" ? 'bg-gradient-to-r from-mrc-blue to-mrc-green' : 'bg-transparent'
                } absolute inset-0 -z-10 rounded-md transition-all duration-500`}></span>
              </TabsTrigger>
              
              {/* Animated gradient line */}
              <div 
                className="absolute bottom-0 h-0.5 bg-gradient-to-r from-mrc-blue via-mrc-green to-mrc-blue bg-[length:200%_100%] animate-[gradient-shift_3s_linear_infinite] transition-all duration-300"
                style={{ 
                  width: '33.33%',
                  left: activeTab === "overview" ? '0%' : activeTab === "lessons" ? '33.33%' : '66.66%',
                }}
              ></div>
            </TabsList>
            
            <div className={`mt-6 ${animateTab ? 'animate-fade-in' : ''}`}>
              <TabsContent value="overview" className="transition-all duration-300 transform">
                <ModuleOverview module={module} onTakeQuiz={handleTakeQuiz} />
              </TabsContent>
              
              <TabsContent value="lessons" className="pt-4 transition-all duration-300 transform">
                <ModuleLessonsList 
                  lessons={module.lessons} 
                  onLessonClick={handleLessonClick}
                />
              </TabsContent>
              
              <TabsContent value="content" className="pt-4 transition-all duration-300 transform">
                <ModuleLessonContent 
                  activeLesson={activeLesson}
                  onMarkComplete={handleMarkLessonComplete}
                />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-3 sm:flex-row justify-between bg-gray-50 dark:bg-gray-800/50 border-t transition-all duration-300">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                toast({
                  title: module.isCompleted ? "Module déjà terminé" : "Module marqué comme terminé",
                  description: module.isCompleted ? "Vous avez déjà terminé ce module." : "Votre progression a été enregistrée.",
                  icon: module.isCompleted ? <CheckCircle className="text-green-500" /> : <TrendingUp className="text-mrc-blue" />
                });
              }}
              disabled={module.isCompleted}
              className="transition-all duration-300 hover:scale-105 group"
            >
              <BookOpen className="h-4 w-4 mr-1 group-hover:rotate-6 transition-transform duration-300" />
              {module.isCompleted ? "Terminé" : "Marquer comme terminé"}
              <span className="absolute inset-0 rounded-md bg-green-500/10 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
            </Button>
            
            {module.isPdfAvailable && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleOpenPdf}
                className="transition-all duration-300 hover:scale-105 group overflow-hidden"
              >
                <Download className="h-4 w-4 mr-1 group-hover:translate-y-1 transition-transform duration-300" />
                Support PDF
                <span className="absolute inset-0 rounded-md bg-blue-500/10 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
              </Button>
            )}
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleOpenCertificateDialog}
            className={`
              transition-all duration-300 hover:scale-105 
              ${module.isCompleted ? 
                'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-200 hover:bg-green-100 hover:text-green-800' : 
                'bg-gray-50 text-gray-500'}
              relative overflow-hidden group
            `}
          >
            <Award className={`h-4 w-4 mr-1 group-hover:text-yellow-400 ${module.isCompleted ? 'text-green-600' : ''} transition-all duration-300`} />
            Certificat
            
            {/* Shine effect for completed modules */}
            {module.isCompleted && (
              <span className="absolute inset-0 overflow-hidden rounded-md pointer-events-none">
                <span className="absolute -inset-[10px] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-40deg] animate-[shine_4s_infinite_ease-in-out] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </span>
            )}
          </Button>
        </CardFooter>
      </Card>

      {showPdfPreview && module.pdfUrl && (
        <PDFPreview 
          pdfUrl={module.pdfUrl} 
          onClose={() => setShowPdfPreview(false)} 
          moduleName={module.title} 
        />
      )}

      <Dialog open={showCertificateDialog} onOpenChange={setShowCertificateDialog}>
        <DialogContent className="sm:max-w-md overflow-hidden bg-white dark:bg-gray-900 border-t-4 border-t-mrc-blue">
          {/* Decorative background elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-mrc-blue/10 to-transparent rounded-full blur-xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-mrc-green/10 to-transparent rounded-full blur-xl"></div>
          
          <DialogHeader className="relative z-10">
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Award className="h-5 w-5 text-yellow-400" />
              <span>Télécharger votre certificat</span>
            </DialogTitle>
            <DialogDescription className="text-sm opacity-90">
              Votre certificat sera personnalisé avec votre nom et les détails du module.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 relative z-10">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right text-mrc-blue font-medium">
                Votre nom
              </Label>
              <Input
                id="name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Entrez votre nom complet"
                className="col-span-3 border-mrc-blue/30 focus-visible:ring-mrc-blue/50 transition-all duration-300"
              />
            </div>
          </div>
          <DialogFooter className="relative z-10">
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => setShowCertificateDialog(false)}
              className="transition-all duration-300 hover:bg-gray-200"
            >
              Annuler
            </Button>
            <Button 
              type="button" 
              onClick={handleDownloadCertificate} 
              className="bg-gradient-to-r from-mrc-blue to-mrc-green hover:from-mrc-green hover:to-mrc-blue transition-all duration-500 hover:scale-105 group overflow-hidden"
            >
              <Download className="h-4 w-4 mr-2 group-hover:translate-y-1 transition-transform duration-300" />
              Télécharger
              <span className="absolute inset-0 rounded-md pointer-events-none overflow-hidden">
                <span className="absolute -inset-[10px] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-40deg] animate-[shine_3s_infinite_ease-in-out] opacity-0 group-hover:opacity-100"></span>
              </span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModuleDetail;
