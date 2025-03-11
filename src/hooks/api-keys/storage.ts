
import { supabase } from "@/integrations/supabase/client";
import { ApiKeys } from "./types";

export const loadFromSupabase = async (): Promise<ApiKeys | null> => {
  try {
    const { data: sessionData } = await supabase.auth.getSession();
    
    if (sessionData?.session) {
      const response = await fetch('/api/manage-api-keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionData.session.access_token}`
        },
        body: JSON.stringify({ action: 'get' })
      });
      
      const result = await response.json();
      
      if (result.success && result.data) {
        return result.data;
      }
    }
    return null;
  } catch (err) {
    console.error("Error fetching from Supabase:", err);
    return null;
  }
};

export const loadFromLocalStorage = (): ApiKeys | null => {
  try {
    const savedKeys = localStorage.getItem("api_keys");
    if (savedKeys) {
      return JSON.parse(savedKeys);
    }
    return null;
  } catch (error) {
    console.error("Error loading API keys from localStorage:", error);
    return null;
  }
};

export const saveToSupabase = async (keys: ApiKeys): Promise<boolean> => {
  try {
    const { data: sessionData } = await supabase.auth.getSession();
    
    if (sessionData?.session) {
      const response = await fetch('/api/manage-api-keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionData.session.access_token}`
        },
        body: JSON.stringify({ 
          action: 'save',
          keys: keys
        })
      });
      
      const result = await response.json();
      
      if (!result.success) {
        console.error("Error saving to Supabase:", result.error);
        return false;
      }
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error saving to Supabase:", error);
    return false;
  }
};

export const saveToLocalStorage = (keys: ApiKeys): void => {
  localStorage.setItem("api_keys", JSON.stringify(keys));
};
