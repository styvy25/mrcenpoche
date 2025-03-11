
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ModulesPage from "./pages/ModulesPage";
import QuizPage from "./pages/QuizPage";
import AssistantPage from "./pages/AssistantPage";
import DocumentsPage from "./pages/DocumentsPage";
import NotFound from "./pages/NotFound";
import ModuleQuizPage from "./pages/ModuleQuizPage";
import AuthPage from "./pages/AuthPage";
import PaymentPage from "./pages/PaymentPage";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/modules" element={<ModulesPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/assistant" element={<AssistantPage />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/modules/quiz" element={<ModuleQuizPage />} />
        <Route path="/modules/quiz/:moduleId" element={<ModuleQuizPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
