
// Re-export useAuth from AuthContext
export { useAuth, AuthProvider, type AuthUser } from '../components/auth/AuthContext';

// Legacy default export for backward compatibility
import { useAuth as authHook } from '../components/auth/AuthContext';
export default authHook;
