
// Ce fichier est un simple wrapper pour maintenir la compatibilité avec le code existant
import { useAuth as useAuthContext, User, AuthProvider } from './useAuth.tsx';

/**
 * Un wrapper autour du contexte d'authentification pour faciliter l'utilisation
 */
export const useAuth = useAuthContext;
export type { User };
export { AuthProvider };

export default useAuth;
