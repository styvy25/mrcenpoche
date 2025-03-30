
import { useAuth as useAuthContext } from '@/components/auth/AuthContext';

/**
 * A wrapper around the AuthContext for ease of use
 */
export const useAuth = () => {
  return useAuthContext();
};

export default useAuth;
