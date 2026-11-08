import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { User, Session } from '@supabase/supabase-js';

interface AdminAuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdminStatus = React.useCallback(async (user: User) => {
    try {
      // For this single-owner owner-only CMS, we can check the email
      // or check a specific table.
      const { data, error } = await supabase
        .from('admin_users')
        .select('role')
        .eq('id', user.id)
        .single();

      if (data && data.role === 'owner') {
        setIsAdmin(true);
      } else {
        // Fallback for initial setup: if user email matches owner email
        if (user.email === 'harshparmar2898@gmail.com') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      }
    } catch (err) {
      console.error('Error checking admin status:', err);
      // Fallback
      if (user.email === 'harshparmar2898@gmail.com') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          checkAdminStatus(session.user);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Supabase getSession error:', err);
        setLoading(false);
      });

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminStatus(session.user);
      } else {
        setIsAdmin(false);
        setLoading(false);
      }
    });

    return () => {
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [checkAdminStatus]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      // The onAuthStateChange will handle setting user and checking admin status
      return !!data.user;
    } catch (err: any) {
      console.error('Login error:', err);
      return false;
    }
  };

  const signUp = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      return { success: !!data.user };
    } catch (err: any) {
      console.error('Signup error:', err);
      return { success: false, error: err.message };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
  };

  return (
    <AdminAuthContext.Provider value={{ user, session, loading, isAdmin, login, signUp, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
