
import { ApiKeys } from "./types";

export const loadApiKeys = async (): Promise<ApiKeys | null> => {
  try {
    // Load from localStorage
    const savedKeys = localStorage.getItem("api_keys");
    if (savedKeys) {
      return JSON.parse(savedKeys);
    }
    return null;
  } catch (error) {
    console.error("Error loading API keys:", error);
    return null;
  }
};

export const persistApiKeys = async (keys: ApiKeys): Promise<boolean> => {
  try {
    // Save to localStorage
    localStorage.setItem("api_keys", JSON.stringify(keys));
    return true;
  } catch (error) {
    console.error("Error persisting API keys:", error);
    return false;
  }
};
