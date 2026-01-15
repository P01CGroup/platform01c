import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export async function middleware(req: NextRequest) {
  let res = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });
  console.log('Middleware running for:', req.nextUrl.pathname);
  console.log('Cookies:', req.cookies.getAll().map(c => c.name));
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          const cookie = req.cookies.get(name);
          console.log(`Getting cookie ${name}:`, cookie?.value ? 'exists' : 'not found');
          if (cookie?.value) {
            console.log(`Cookie ${name} value length:`, cookie.value.length);
            console.log(`Cookie ${name} value preview:`, cookie.value.substring(0, 100));
          }
          return cookie?.value;
        },
        set(name: string, value: string, options: any) {
          console.log(`Setting cookie ${name}`);
          req.cookies.set({
            name,
            value,
            ...options,
          });
          res = NextResponse.next({
            request: {
              headers: req.headers,
            },
          });
          res.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: any) {
          console.log(`Removing cookie ${name}`);
          req.cookies.set({
            name,
            value: '',
            ...options,
          });
          res = NextResponse.next({
            request: {
              headers: req.headers,
            },
          });
          res.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  // Refresh session if expired
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  console.log('Middleware session check:', { 
    hasSession: !!session, 
    userEmail: session?.user?.email,
    userRole: session?.user?.user_metadata?.role,
    error: error?.message
  });

  // If accessing admin routes without session, redirect to login
  if (req.nextUrl.pathname.startsWith('/admin') && 
      !req.nextUrl.pathname.startsWith('/admin/login') && 
      !session) {
    console.log('No session, redirecting to login');
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  // If accessing login page with session, redirect to admin
  if (req.nextUrl.pathname.startsWith('/admin/login') && session) {
    // Check if user has admin role
    if (session.user.user_metadata?.role === 'admin') {
      console.log('User has session, redirecting to admin');
      return NextResponse.redirect(new URL('/admin', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*'],
}; 