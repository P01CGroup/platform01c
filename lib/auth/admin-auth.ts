import { supabase } from '../supabase/client';
import { User } from '@supabase/supabase-js';
import { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export interface AdminUser extends User {
  user_metadata: {
    role?: string;
    email_verified?: boolean;
  };
}

// Check if user is admin
export function isAdmin(user: User | null): boolean {
  if (!user) return false;
  
  const adminUser = user as AdminUser;
  console.log('Checking admin role for user:', {
    email: user.email,
    user_metadata: adminUser.user_metadata,
    role: adminUser.user_metadata?.role
  });
  
  return adminUser.user_metadata?.role === 'admin';
}

// Get current admin user
export async function getCurrentAdminUser(): Promise<AdminUser | null> {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) {
      return null;
    }

    // Check if user is admin
    if (!isAdmin(user)) {
      return null;
    }

    return user as AdminUser;
  } catch (error) {
    console.error('Error getting current admin user:', error);
    return null;
  }
}

// Sign in admin
export async function signInAdmin(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    // Verify admin role
    if (!isAdmin(data.user)) {
      await supabase.auth.signOut();
      throw new Error('Access denied. Admin privileges required.');
    }

    return { user: data.user as AdminUser, error: null };
  } catch (error) {
    return { 
      user: null, 
      error: error instanceof Error ? error.message : 'Sign in failed' 
    };
  }
}

// Sign out admin
export async function signOutAdmin() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error) {
    return { 
      error: error instanceof Error ? error.message : 'Sign out failed' 
    };
  }
}

// Check admin session
export async function getAdminSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error || !session) {
      return { session: null, error: null };
    }

    // Verify admin role
    if (!isAdmin(session.user)) {
      return { session: null, error: 'Access denied. Admin privileges required.' };
    }

    return { session, error: null };
  } catch (error) {
    return { 
      session: null, 
      error: error instanceof Error ? error.message : 'Session check failed' 
    };
  }
} 

// Utility: Get admin user from API route request (server-side)
export async function getServerAdminUser(request: NextRequest): Promise<AdminUser | null> {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          const cookie = request.cookies.get(name);
          return cookie?.value;
        },
        set() {},
        remove() {},
      },
    }
  );

  // Try to get session first, then user
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !session) {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return null;
    if (!isAdmin(user)) return null;
    return user as AdminUser;
  }
  const user = session.user;
  if (!isAdmin(user)) return null;
  return user as AdminUser;
} 