
import { supabase } from "@/integrations/supabase/client";

export interface AuthAuditResult {
  isSupabaseConnected: boolean;
  isLocalStorageAvailable: boolean;
  hasLocalUsers: boolean;
  hasSupabaseUsers: boolean;
  recommendations: string[];
}

/**
 * Audit the authentication system to identify potential issues
 */
export const auditAuthSystem = async (): Promise<AuthAuditResult> => {
  const result: AuthAuditResult = {
    isSupabaseConnected: false,
    isLocalStorageAvailable: false,
    hasLocalUsers: false,
    hasSupabaseUsers: false,
    recommendations: []
  };
  
  // Check Supabase connection
  try {
    const { data, error } = await supabase.from('profiles').select('count').limit(1);
    result.isSupabaseConnected = !error;
    
    if (error) {
      result.recommendations.push('La connexion à Supabase a échoué. Vérifiez les paramètres de connexion.');
    }
  } catch (error) {
    console.error("Error checking Supabase connection:", error);
    result.recommendations.push('Erreur lors de la vérification de la connexion à Supabase.');
  }
  
  // Check local storage
  try {
    localStorage.setItem('auth_test', 'test');
    result.isLocalStorageAvailable = localStorage.getItem('auth_test') === 'test';
    localStorage.removeItem('auth_test');
    
    if (!result.isLocalStorageAvailable) {
      result.recommendations.push('Le stockage local n\'est pas disponible. Certaines fonctionnalités peuvent ne pas fonctionner correctement.');
    }
  } catch (error) {
    console.error("Error checking localStorage:", error);
    result.recommendations.push('Erreur lors de la vérification du stockage local.');
  }
  
  // Check for local users
  try {
    const storedUsers = localStorage.getItem("mrc_learnscape_users") || "[]";
    const users = JSON.parse(storedUsers);
    result.hasLocalUsers = users.length > 0;
    
    if (result.hasLocalUsers) {
      result.recommendations.push(`${users.length} utilisateurs trouvés dans le stockage local.`);
    }
  } catch (error) {
    console.error("Error checking local users:", error);
  }
  
  // Check for Supabase users
  if (result.isSupabaseConnected) {
    try {
      const { data, error, count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact' })
        .limit(1);
      
      result.hasSupabaseUsers = !error && (count || 0) > 0;
      
      if (result.hasSupabaseUsers) {
        result.recommendations.push('Des utilisateurs sont configurés dans Supabase.');
      } else {
        result.recommendations.push('Aucun utilisateur n\'a été trouvé dans Supabase.');
      }
    } catch (error) {
      console.error("Error checking Supabase users:", error);
    }
  }
  
  // Add general recommendations
  if (result.isSupabaseConnected && result.hasLocalUsers) {
    result.recommendations.push('Vous avez des utilisateurs dans le stockage local et Supabase est connecté. Envisagez de migrer ces utilisateurs vers Supabase pour une meilleure sécurité.');
  }
  
  if (!result.isSupabaseConnected && !result.hasLocalUsers) {
    result.recommendations.push('Aucun système d\'authentification n\'est configuré. Configurez Supabase ou assurez-vous que le stockage local est disponible.');
  }
  
  return result;
};

/**
 * Test the API keys configuration
 */
export const testAPIKeysConfig = async (): Promise<{
  isSupabaseConfigured: boolean;
  isLocalConfigured: boolean;
  recommendations: string[];
}> => {
  const result = {
    isSupabaseConfigured: false,
    isLocalConfigured: false,
    recommendations: []
  };
  
  // Check local storage API keys
  try {
    const localKeys = localStorage.getItem("api_keys");
    if (localKeys) {
      const keys = JSON.parse(localKeys);
      result.isLocalConfigured = Object.values(keys).some(key => key);
      
      if (result.isLocalConfigured) {
        result.recommendations.push('API keys trouvées dans le stockage local.');
      }
    }
  } catch (error) {
    console.error("Error checking local API keys:", error);
  }
  
  // Check Supabase API keys
  try {
    const { data: sessionData } = await supabase.auth.getSession();
    
    if (sessionData?.session) {
      const { data, error } = await supabase
        .from('api_keys_config')
        .select('*')
        .eq('user_id', sessionData.session.user.id)
        .limit(1);
      
      result.isSupabaseConfigured = !error && data && data.length > 0;
      
      if (result.isSupabaseConfigured) {
        result.recommendations.push('API keys trouvées dans Supabase.');
      } else {
        result.recommendations.push('Aucune API key n\'a été trouvée dans Supabase.');
      }
    }
  } catch (error) {
    console.error("Error checking Supabase API keys:", error);
  }
  
  // Add general recommendations
  if (!result.isSupabaseConfigured && !result.isLocalConfigured) {
    result.recommendations.push('Aucune API key n\'est configurée. Configurez les API keys dans les paramètres.');
  }
  
  return result;
};
