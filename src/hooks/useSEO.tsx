
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from '@/components/auth/AuthContext';

interface SEOContext {
  optimizeContent: (content: string, type: 'title' | 'description' | 'keywords' | 'content') => Promise<{
    optimizedContent: string;
    keywords?: string[];
    suggestions?: string[];
  }>;
  setPageTitle: (title: string) => void;
  setPageDescription: (description: string) => void;
  setPageKeywords: (keywords: string[]) => void;
}

const SEOContext = createContext<SEOContext>({
  optimizeContent: async () => ({ optimizedContent: '' }),
  setPageTitle: () => {},
  setPageDescription: () => {},
  setPageKeywords: () => {},
});

export const SEOProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [pageData, setPageData] = useState<{
    [path: string]: {
      title?: string;
      description?: string;
      keywords?: string[];
    };
  }>({});

  // Update document meta tags when page data or location changes
  useEffect(() => {
    const currentPath = location.pathname;
    const data = pageData[currentPath] || {};
    
    if (data.title) {
      document.title = data.title;
    }
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    
    if (data.description) {
      metaDescription.setAttribute('content', data.description);
    }
    
    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    
    if (data.keywords && data.keywords.length > 0) {
      metaKeywords.setAttribute('content', data.keywords.join(', '));
    }
    
    return () => {
      // Cleanup could go here if needed
    };
  }, [location.pathname, pageData]);

  const optimizeContent = async (
    content: string, 
    type: 'title' | 'description' | 'keywords' | 'content'
  ) => {
    if (!content) return { optimizedContent: content };
    
    try {
      if (isAuthenticated) {
        // Use Supabase Edge Function for optimization
        const { data, error } = await supabase.functions.invoke('optimize-seo', {
          body: {
            content,
            type,
            targetPage: location.pathname
          }
        });
        
        if (error) {
          console.error('SEO optimization error:', error);
          return { optimizedContent: content };
        }
        
        return data;
      } else {
        // Simple client-side optimization for non-authenticated users
        let optimized = content;
        let suggestions: string[] = [];
        
        if (type === 'title' && content.length > 60) {
          optimized = content.substring(0, 57) + '...';
          suggestions.push('Your title is too long and has been shortened.');
        }
        
        if (type === 'description' && content.length > 160) {
          optimized = content.substring(0, 157) + '...';
          suggestions.push('Your description is too long and has been shortened.');
        }
        
        return { 
          optimizedContent: optimized, 
          suggestions 
        };
      }
    } catch (error) {
      console.error('SEO optimization error:', error);
      return { optimizedContent: content };
    }
  };

  const setPageTitle = async (title: string) => {
    if (!title) return;
    
    const { optimizedContent } = await optimizeContent(title, 'title');
    
    setPageData(prev => ({
      ...prev,
      [location.pathname]: {
        ...prev[location.pathname],
        title: optimizedContent
      }
    }));
  };
  
  const setPageDescription = async (description: string) => {
    if (!description) return;
    
    const { optimizedContent } = await optimizeContent(description, 'description');
    
    setPageData(prev => ({
      ...prev,
      [location.pathname]: {
        ...prev[location.pathname],
        description: optimizedContent
      }
    }));
  };
  
  const setPageKeywords = (keywords: string[]) => {
    if (!keywords.length) return;
    
    setPageData(prev => ({
      ...prev,
      [location.pathname]: {
        ...prev[location.pathname],
        keywords
      }
    }));
  };

  return (
    <SEOContext.Provider
      value={{
        optimizeContent,
        setPageTitle,
        setPageDescription,
        setPageKeywords
      }}
    >
      {children}
    </SEOContext.Provider>
  );
};

export const useSEO = () => {
  const context = useContext(SEOContext);
  if (!context) {
    throw new Error('useSEO must be used within a SEOProvider');
  }
  return context;
};
