
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ModulesPage from "@/pages/ModulesPage";
import AuthPage from "@/pages/AuthPage";
import DocumentsPage from "@/pages/DocumentsPage";
import AssistantPage from "@/pages/AssistantPage";
import NewsPage from "@/pages/NewsPage";
import QuizPage from "@/pages/QuizPage";
import LegalPage from "@/pages/LegalPage";
import PrivacyPage from "@/pages/PrivacyPage";
import TermsPage from "@/pages/TermsPage";
import SettingsPage from "@/pages/SettingsPage";
import PaymentPage from "@/pages/PaymentPage";
import NotFound from "@/pages/NotFound";
import ModuleQuizPage from "@/pages/ModuleQuizPage";
import Index from "./pages/Index";
import { AuthProvider } from "@/components/auth/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import { StripeProvider } from "./providers/StripeProvider";
import PageTransition from "@/components/ui/page-transition";

import "./App.css";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <StripeProvider>
          <BrowserRouter>
            <PageTransition>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/modules" element={<ModulesPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/documents" element={<DocumentsPage />} />
                <Route path="/chat" element={<AssistantPage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="/module-quiz/:id" element={<ModuleQuizPage />} />
                <Route path="/legal" element={<LegalPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </PageTransition>
            <Toaster />
          </BrowserRouter>
        </StripeProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
