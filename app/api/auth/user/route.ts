import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function GET(request: NextRequest) {
  try {
    console.log('User API: Request received');
    console.log('User API: Cookies:', request.cookies.getAll().map(c => c.name));
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            const cookie = request.cookies.get(name);
            console.log(`User API: Getting cookie ${name}:`, cookie?.value ? 'exists' : 'not found');
            if (cookie?.value) {
              console.log(`User API: Cookie ${name} value length:`, cookie.value.length);
              console.log(`User API: Cookie ${name} value preview:`, cookie.value.substring(0, 100));
            }
            return cookie?.value;
          },
          set(name: string, value: string, options: any) {
            // Not needed for GET requests
          },
          remove(name: string, options: any) {
            // Not needed for GET requests
          },
        },
      }
    );

    // Try to get session first, then user
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    console.log('User API: Session check:', { 
      hasSession: !!session, 
      userEmail: session?.user?.email,
      userRole: session?.user?.user_metadata?.role,
      error: sessionError?.message 
    });

    if (sessionError || !session) {
      console.log('User API: No session, trying getUser directly');
      const { data: { user }, error } = await supabase.auth.getUser();
      
      console.log('User API: Direct getUser result:', { 
        hasUser: !!user, 
        userEmail: user?.email,
        userRole: user?.user_metadata?.role,
        error: error?.message 
      });

      if (error || !user) {
        console.log('User API: No user or error, returning 401');
        return NextResponse.json({ user: null, error: 'Not authenticated' }, { status: 401 });
      }

      // Check if user has admin role
      if (user.user_metadata?.role !== 'admin') {
        console.log('User API: User is not admin, returning 403');
        return NextResponse.json({ user: null, error: 'Access denied. Admin privileges required.' }, { status: 403 });
      }

      console.log('User API: User authenticated successfully via getUser, returning user data');
      return NextResponse.json({ 
        user: {
          id: user.id,
          email: user.email,
          user_metadata: user.user_metadata,
          created_at: user.created_at,
          updated_at: user.updated_at
        },
        error: null 
      });
    }

    // Use session user
    const user = session.user;
    
    // Check if user has admin role
    if (user.user_metadata?.role !== 'admin') {
      console.log('User API: User is not admin, returning 403');
      return NextResponse.json({ user: null, error: 'Access denied. Admin privileges required.' }, { status: 403 });
    }

    console.log('User API: User authenticated successfully via session, returning user data');
    return NextResponse.json({ 
      user: {
        id: user.id,
        email: user.email,
        user_metadata: user.user_metadata,
        created_at: user.created_at,
        updated_at: user.updated_at
      },
      error: null 
    });

  } catch (error) {
    console.error('User API: Error getting user:', error);
    return NextResponse.json({ user: null, error: 'Internal server error' }, { status: 500 });
  }
} 