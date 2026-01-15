import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function POST(request: NextRequest) {
  try {
    console.log('Logout API: Starting logout process');
    console.log('Logout API: Cookies before logout:', request.cookies.getAll().map(c => c.name));
    
    // Create server client
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            const cookie = request.cookies.get(name);
            console.log(`Logout API: Getting cookie ${name}:`, cookie?.value ? 'exists' : 'not found');
            return cookie?.value;
          },
          set(name: string, value: string, options: any) {
            request.cookies.set({
              name,
              value,
              ...options,
            });
          },
          remove(name: string, options: any) {
            request.cookies.set({
              name,
              value: '',
              ...options,
            });
          },
        },
      }
    );

    // Sign out the user
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Logout API: Supabase sign out error:', error);
      // Continue with cookie cleanup even if Supabase sign out fails
    } else {
      console.log('Logout API: Supabase sign out successful');
    }

    // Create response
    const response = NextResponse.json({ success: true });

    // Clear all possible session cookies
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      maxAge: 0,
      path: '/',
    };

    // Get all cookies and clear any that look like session cookies
    const allCookies = request.cookies.getAll();
    const sessionCookieNames = [
      'sb-access-token',
      'sb-refresh-token',
      'supabase-auth-token',
      'supabase-auth-refresh-token',
      'admin-session',
      'auth-session'
    ];

    // Clear any Supabase cookies (they have the project ref in the name)
    allCookies.forEach(cookie => {
      if (cookie.name.includes('sb-') || cookie.name.includes('supabase') || sessionCookieNames.includes(cookie.name)) {
        console.log(`Logout API: Clearing cookie: ${cookie.name}`);
        response.cookies.set(cookie.name, '', cookieOptions);
      }
    });

    // Also clear cookies without httpOnly for client-side access
    const clientCookieOptions = {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      maxAge: 0,
      path: '/',
    };

    allCookies.forEach(cookie => {
      if (cookie.name.includes('sb-') || cookie.name.includes('supabase') || sessionCookieNames.includes(cookie.name)) {
        response.cookies.set(cookie.name, '', clientCookieOptions);
      }
    });

    console.log('Logout API: All session cookies cleared');

    return response;

  } catch (error) {
    console.error('Logout API: Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 