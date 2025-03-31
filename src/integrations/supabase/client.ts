
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ppdcwerrsmnngmmdgrcp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwZGN3ZXJyc21ubmdtbWRncmNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkyODEwOTYsImV4cCI6MjA1NDg1NzA5Nn0.DqPh1bYf9Q99ro3ws618XzH9B-q6-kAkFAkdjc6S2Ic";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});
