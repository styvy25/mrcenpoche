
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface UISettings {
  id: string;
  component_name: string;
  is_visible: boolean;
  style_options: Record<string, any>;
}

interface ComponentSettings {
  isVisible: boolean;
  color?: string;
  size?: string;
  priority?: string;
  [key: string]: any;
}

export const useUISettings = () => {
  const [settings, setSettings] = useState<UISettings[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        
        // Try to fetch from Supabase
        // Since the ui_settings table might not be in TypeScript types yet,
        // we use the generic fetch approach with proper typing
        const { data, error } = await supabase
          .from('ui_settings')
          .select('*') as { data: UISettings[] | null, error: Error | null };
          
        if (error) {
          console.warn('Error fetching UI settings, using defaults:', error);
          // Provide default settings if table doesn't exist or on error
          setSettings([
            {
              id: '1',
              component_name: 'FraudAlertButton',
              is_visible: true,
              style_options: { color: 'mrc-red', size: 'default', priority: 'high' }
            },
            {
              id: '2',
              component_name: 'ChatButton',
              is_visible: true,
              style_options: { color: 'mrc-blue', size: 'default', priority: 'medium' }
            },
            {
              id: '3',
              component_name: 'MatchGameButtons',
              is_visible: true,
              style_options: { color: 'mrc-green', size: 'default', priority: 'medium' }
            }
          ]);
        } else {
          setSettings(data || []);
        }
      } catch (err) {
        console.error('Failed to fetch UI settings:', err);
        setError(err as Error);
        
        // Use default settings on error
        setSettings([
          {
            id: '1',
            component_name: 'FraudAlertButton',
            is_visible: true,
            style_options: { color: 'mrc-red', size: 'default', priority: 'high' }
          },
          {
            id: '2',
            component_name: 'ChatButton',
            is_visible: true,
            style_options: { color: 'mrc-blue', size: 'default', priority: 'medium' }
          },
          {
            id: '3',
            component_name: 'MatchGameButtons',
            is_visible: true,
            style_options: { color: 'mrc-green', size: 'default', priority: 'medium' }
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const getComponentSettings = (componentName: string): ComponentSettings => {
    const componentSettings = settings.find(s => s.component_name === componentName);
    
    if (!componentSettings) {
      return { isVisible: true }; // Default if not found
    }
    
    return {
      isVisible: componentSettings.is_visible,
      ...componentSettings.style_options
    };
  };

  return {
    settings,
    loading,
    error,
    getComponentSettings
  };
};
