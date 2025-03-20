
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loadApiKeys } from "@/hooks/api-keys/storage";

interface AppContextType {
  isApiKeySet: boolean;
  setApiKeyStatus: (status: boolean) => void;
}

const defaultContext: AppContextType = {
  isApiKeySet: false,
  setApiKeyStatus: () => {},
};

const AppContext = createContext<AppContextType>(defaultContext);

export const useAppContext = () => useContext(AppContext);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isApiKeySet, setIsApiKeySet] = useState<boolean>(false);

  useEffect(() => {
    const checkApiKeys = async () => {
      try {
        const apiKeys = await loadApiKeys();
        setIsApiKeySet(!!apiKeys && Object.keys(apiKeys).length > 0);
      } catch (error) {
        console.error("Error loading API keys:", error);
        setIsApiKeySet(false);
      }
    };

    checkApiKeys();
  }, []);

  const setApiKeyStatus = (status: boolean) => {
    setIsApiKeySet(status);
  };

  return (
    <AppContext.Provider value={{ isApiKeySet, setApiKeyStatus }}>
      {children}
    </AppContext.Provider>
  );
};
