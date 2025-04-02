
import { ApiKeys } from "./types";
import { loadApiKeysFromSupabase, saveApiKeysToSupabase } from "@/services/supabaseService";

export const loadFromSupabase = async (): Promise<ApiKeys | null> => {
  return loadApiKeysFromSupabase();
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
  return saveApiKeysToSupabase(keys);
};

export const saveToLocalStorage = (keys: ApiKeys): void => {
  localStorage.setItem("api_keys", JSON.stringify(keys));
};
