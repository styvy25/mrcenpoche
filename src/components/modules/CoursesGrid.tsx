
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Award,
  TrendingUp,
  Target,
  FileText,
  Music,
  Map,
  Lock,
  Clock,
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  Eye,
  Download,
  Share2,
  MessageSquare,
  Users,
  Video,
  LayoutDashboard,
  Settings,
  HelpCircle,
  ChevronRight,
  ChevronDown,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  Copy,
  Save,
  X,
  Menu,
  Bell,
  User,
  LogOut,
  LogIn,
  UserPlus,
  Key,
  Mail,
  Phone,
  Info,
  AlertOctagon,
  Check,
  XOctagon,
  Loader2,
  RefreshCw,
  ArrowLeft,
  ArrowRight,
  ChevronsLeft,
  ChevronsRight,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  SkipForward,
  SkipBack,
  Volume,
  VolumeX,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Layout,
  List,
  Grid
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Module } from "./types";

interface CoursesGridProps {
  modules: Module[];
}

const CoursesGrid: React.FC<CoursesGridProps> = ({ modules }) => {
  const getIcon = (category: string) => {
    switch (category) {
      case "histoire":
        return BookOpen;
      case "politique":
        return Award;
      case "economie":
        return TrendingUp;
      case "strategie":
        return Target;
      case "test":
        return FileText;
      case "culture":
        return Music;
      case "geographie":
        return Map;
      default:
        return Lightbulb;
    }
  };

  const formatDifficulty = (level: string): 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert' => {
    if (level === 'beginner') return 'Débutant';
    if (level === 'intermediate') return 'Intermédiaire';
    if (level === 'advanced') return 'Avancé';
    if (level === 'expert') return 'Expert';
    return 'Débutant'; // Default
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {modules.map((module) => (
        <Link to={`/modules/quiz/${module.id}`} key={module.id}>
          <Card className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105">
            {module.coverImage && (
              <img
                src={module.coverImage}
                alt={module.title}
                className="w-full h-32 object-cover"
              />
            )}
            <CardHeader className="space-y-1 p-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">{module.title}</CardTitle>
                {module.isNew && (
                  <Badge variant="secondary" className="uppercase text-xs">
                    Nouveau
                  </Badge>
                )}
              </div>
              <CardDescription className="text-gray-500">{module.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  {React.createElement(getIcon(module.category), {
                    className: "w-4 h-4 mr-2 text-gray-600",
                  })}
                  <span className="text-sm text-gray-600">{module.category}</span>
                </div>
                {module.level && (
                  <Badge variant="outline" className="uppercase text-xs">
                    {formatDifficulty(module.level)}
                  </Badge>
                )}
              </div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-gray-600" />
                  <span className="text-sm text-gray-600">{module.duration}</span>
                </div>
                {module.isPdfAvailable && (
                  <a
                    href={module.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline text-sm"
                  >
                    <Download className="w-4 h-4 mr-1 inline-block" />
                    PDF
                  </a>
                )}
              </div>
              <Progress value={module.progress} className="h-2 mb-3" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Progression</span>
                <span className="text-sm font-medium">{module.progress}%</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default CoursesGrid;
