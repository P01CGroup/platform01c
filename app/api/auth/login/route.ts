import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    console.log('Login API: Attempting login for email:', email);

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    // Create server client
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
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

    // Sign in the user
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log('Login API: Supabase signIn result:', { 
      hasData: !!data, 
      hasUser: !!data?.user, 
      hasSession: !!data?.session,
      userEmail: data?.user?.email,
      userRole: data?.user?.user_metadata?.role,
      error: error?.message 
    });

    if (error) {
      console.log('Login API: Authentication error:', error.message);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (!data.user) {
      console.log('Login API: No user returned from authentication');
      return NextResponse.json({ error: 'No user returned from authentication' }, { status: 400 });
    }

    // Check if user has admin role
    if (data.user.user_metadata?.role !== 'admin') {
      console.log('Login API: User is not admin, signing out');
      await supabase.auth.signOut();
      return NextResponse.json({ error: 'Access denied. Admin privileges required.' }, { status: 403 });
    }

    // Create response and let Supabase set the cookies
    let response = NextResponse.json({ 
      success: true, 
      user: data.user 
    });

    // Let Supabase handle the cookie setting automatically
    if (data.session) {
      console.log('Login API: Login successful for user:', data.user.email);
      
      // Create a new Supabase client that can set cookies on the response
      const supabaseWithCookies = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            get(name: string) {
              return request.cookies.get(name)?.value;
            },
            set(name: string, value: string, options: any) {
              response.cookies.set(name, value, options);
            },
            remove(name: string, options: any) {
              response.cookies.set(name, '', { ...options, maxAge: 0 });
            },
          },
        }
      );

      // Set the session using Supabase's built-in method
      await supabaseWithCookies.auth.setSession(data.session);
      console.log('Login API: Session cookies set successfully');
    } else {
      console.log('Login API: No session in response');
    }

    return response;

  } catch (error) {
    console.error('Login API: Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 