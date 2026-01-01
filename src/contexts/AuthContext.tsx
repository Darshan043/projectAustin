import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithEmailOnly: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to create a mock user for email-only login
const createMockUser = (email: string): User => {
  return {
    id: `mock-${email.replace(/[^a-zA-Z0-9]/g, '-')}`,
    email: email,
    aud: 'authenticated',
    role: 'authenticated',
    email_confirmed_at: new Date().toISOString(),
    phone: '',
    confirmed_at: new Date().toISOString(),
    last_sign_in_at: new Date().toISOString(),
    app_metadata: {},
    user_metadata: {},
    identities: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_anonymous: false,
  } as User;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for mock user in localStorage first
    const mockUserEmail = localStorage.getItem('mock_user_email');
    if (mockUserEmail) {
      setUser(createMockUser(mockUserEmail));
      setLoading(false);
      return;
    }

    // Otherwise check for real Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        // Only update if we don't have a mock user
        if (!localStorage.getItem('mock_user_email')) {
          setUser(session?.user ?? null);
        }
      })();
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    // MOCK AUTH: Allow any signup to work for demo purposes
    console.log('Mock Signup:', { email, password, fullName });

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Store in localStorage to persist the "session"
    localStorage.setItem('mock_user_email', email);
    localStorage.setItem('mock_user_name', fullName);

    setUser(createMockUser(email));
  };

  const signIn = async (email: string, password: string) => {
    // MOCK AUTH: Allow any login to work
    console.log('Mock Login:', { email, password });

    await new Promise(resolve => setTimeout(resolve, 1000));

    localStorage.setItem('mock_user_email', email);
    setUser(createMockUser(email));
  };

  const signInWithEmailOnly = async (email: string) => {
    // Store email in localStorage for mock user
    localStorage.setItem('mock_user_email', email);
    setUser(createMockUser(email));
  };

  const signOut = async () => {
    // Clear mock user
    localStorage.removeItem('mock_user_email');

    // Sign out from Supabase if there's a real session
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signInWithEmailOnly, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
