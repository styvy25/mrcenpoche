
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import QuizPage from "./pages/QuizPage";
import ModulesPage from "./pages/ModulesPage";
import ModuleQuizPage from "./pages/ModuleQuizPage";
import DocumentsPage from "./pages/DocumentsPage";
import AssistantPage from "./pages/AssistantPage";
import Footer from "./components/layout/Footer";
import { ToastProvider } from "./hooks/use-toast";
import { Toaster } from "./components/ui/toaster";
import "./App.css";

function App() {
  return (
    <ToastProvider>
      <Router>
        <main className="min-h-screen flex flex-col">
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/modules" element={<ModulesPage />} />
              <Route path="/modules/:moduleId/quiz" element={<ModuleQuizPage />} />
              <Route path="/documents" element={<DocumentsPage />} />
              <Route path="/assistant" element={<AssistantPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </main>
        <Toaster />
      </Router>
    </ToastProvider>
  );
}

export default App;
