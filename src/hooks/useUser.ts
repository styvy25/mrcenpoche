
import { useState, useEffect } from 'react';
import { supabase } from '@/services/supabaseService';

interface User {
  id: string;
  email: string;
  username: string;
  isAdmin: boolean;
  createdAt: string;
}

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        // In a real app, this would fetch the user from Supabase auth
        const { data, error } = await supabase.auth.getUser();
        
        if (error) {
          throw new Error(error.message);
        }
        
        if (data?.user) {
          // Mock user data for development
          setUser({
            id: '1',
            email: 'user@example.com',
            username: 'Demo User',
            isAdmin: false,
            createdAt: new Date().toISOString()
          });
        } else {
          setUser(null);
        }
      } catch (err: any) {
        console.error('Error fetching user:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
};

export default useUser;
