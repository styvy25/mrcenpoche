
// Mock client Supabase pour résoudre les erreurs d'importation
export const supabase = {
  from: (table: string) => ({
    select: () => ({
      eq: (column: string, value: any) => ({
        single: async () => ({ data: null, error: null }),
        order: () => ({
          data: [],
          error: null
        })
      })
    }),
    update: () => ({
      eq: async () => ({ data: null, error: null })
    }),
    insert: async () => ({ data: null, error: null }),
  }),
  auth: {
    getUser: async () => ({ data: { user: null }, error: null }),
  }
};

// API key management with defaults
export const getApiKeysWithDefaults = (configKeys = null) => {
  const defaultKeys = {
    YOUTUBE_API_KEY: process.env.REACT_APP_YOUTUBE_API_KEY || "mock_youtube_api_key",
    OPENAI_API_KEY: process.env.REACT_APP_OPENAI_API_KEY || "mock_openai_api_key",
    MAPS_API_KEY: process.env.REACT_APP_MAPS_API_KEY || "mock_maps_api_key"
  };

  if (!configKeys) {
    return defaultKeys;
  }
  
  return {
    ...defaultKeys,
    ...configKeys
  };
};

// Function to fetch data from any table with proper typing
export async function fetchFromSupabase<T>(
  tableName: string, 
  condition?: { column: string; value: any }
): Promise<T[]> {
  try {
    let query = supabase.from(tableName).select();
    
    if (condition) {
      query = query.eq(condition.column, condition.value);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error(`Error fetching from ${tableName}:`, error);
      return [];
    }
    
    return data as T[];
  } catch (err) {
    console.error(`Error in fetchFromSupabase (${tableName}):`, err);
    return [];
  }
}

// Mock implementation for fetchMeetingsFromSupabase
export const fetchMeetingsFromSupabase = async () => {
  // Mock data
  return {
    data: [
      {
        id: '1',
        title: 'Réunion stratégique',
        date: new Date().toISOString(),
        time: '14:00',
        duration: 60,
        organizer: 'Bureau National',
        status: 'scheduled'
      }
    ],
    error: null
  };
};
