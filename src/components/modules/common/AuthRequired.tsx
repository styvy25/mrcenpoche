
import { Info } from "lucide-react";
import AuthDialog, { useAuth } from "@/components/auth/AuthDialog";

interface AuthRequiredProps {
  children: React.ReactNode;
}

const AuthRequired = ({ children }: AuthRequiredProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="mb-6">
        <div className="flex flex-col items-center justify-center p-10 bg-gray-900/50 rounded-lg border border-white/10">
          <Info size={48} className="text-mrc-blue mb-4" />
          <h3 className="text-xl font-semibold mb-2">Connexion requise</h3>
          <p className="text-center text-muted-foreground mb-6">
            Vous devez être connecté pour accéder aux espaces de discussion
          </p>
          <AuthDialog />
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthRequired;
