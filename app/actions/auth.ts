'use server'

import { redirect } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

// Create a server-side Supabase client
function createServerSupabaseClient() {
  const cookieStore = cookies();
  
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false, // Don't persist on server
      },
    }
  );
}

export async function signInAdminAction(email: string, password: string) {
  try {
    const supabase = createServerSupabaseClient();
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }

    if (!data.user) {
      return { error: 'No user returned from authentication' };
    }

    // Check if user has admin role
    if (data.user.user_metadata?.role !== 'admin') {
      await supabase.auth.signOut();
      return { error: 'Access denied. Admin privileges required.' };
    }

    console.log('Server-side login successful for user:', data.user.email);

    return { success: true, user: data.user };
  } catch (error) {
    console.error('Sign in error:', error);
    return { error: 'An unexpected error occurred' };
  }
}

export async function getAdminSessionAction() {
  try {
    const supabase = createServerSupabaseClient();
    const { data: { session }, error } = await supabase.auth.getSession();
    
    console.log('Server action session check:', { 
      hasSession: !!session, 
      error,
      userEmail: session?.user?.email,
      userMetadata: session?.user?.user_metadata
    });
    
    if (error || !session) {
      return { session: null, error: null };
    }

    // Check if user has admin role
    if (session.user.user_metadata?.role !== 'admin') {
      console.log('User is not admin:', session.user.user_metadata);
      return { session: null, error: 'Access denied. Admin privileges required.' };
    }

    console.log('User is admin, returning session');
    return { session, error: null };
  } catch (error) {
    console.error('Session check error:', error);
    return { 
      session: null, 
      error: error instanceof Error ? error.message : 'Session check failed' 
    };
  }
} 