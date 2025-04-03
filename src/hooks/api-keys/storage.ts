
import { ApiKeys } from "./types";
import { getApiKeys as getApiKeysService, saveApiKeys as saveApiKeysService } from "@/services/apiKeysService";

export const loadFromSupabase = async (): Promise<ApiKeys | null> => {
  return getApiKeysService();
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
  return saveApiKeysService(keys);
};

export const saveToLocalStorage = (keys: ApiKeys): void => {
  localStorage.setItem("api_keys", JSON.stringify(keys));
};
