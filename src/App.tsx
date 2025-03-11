
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Index from "./pages/Index";
import ModulesPage from "./pages/ModulesPage";
import QuizPage from "./pages/QuizPage";
import AssistantPage from "./pages/AssistantPage";
import DocumentsPage from "./pages/DocumentsPage";
import NotFound from "./pages/NotFound";
import ModuleQuizPage from "./pages/ModuleQuizPage";
import AuthPage from "./pages/AuthPage";
import { Toaster } from "./components/ui/toaster";
import AuthNavItem from "./components/layout/AuthNavItem";
import ApiKeysDialog from "./components/settings/ApiKeysDialog";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar navEndElement={<AuthNavItem />} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/modules" element={<ModulesPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/assistant" element={<AssistantPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/module-quiz/:moduleId" element={<ModuleQuizPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster />
    </Router>
  );
}

export default App;
