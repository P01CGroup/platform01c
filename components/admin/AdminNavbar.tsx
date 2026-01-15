'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Logo from '../ui/logo';
import { Button } from '../ui/button';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdminUser {
  id: string;
  email: string;
  user_metadata: {
    role?: string;
    email_verified?: boolean;
  };
  created_at: string;
  updated_at: string;
}

// Helper function to check if session cookies exist
const hasSessionCookies = (): boolean => {
  if (typeof document === 'undefined') return false;
  
  const cookies = document.cookie.split(';');
  const sessionCookies = ['sb-access-token', 'sb-refresh-token', 'supabase-auth-token'];
  
  return sessionCookies.some(cookieName => 
    cookies.some(cookie => cookie.trim().startsWith(`${cookieName}=`))
  );
};

// Helper function to clear all session data on client side
const clearClientSession = () => {
  if (typeof document === 'undefined') return;
  
  // Clear all possible session cookies
  const cookiesToClear = [
    'sb-access-token',
    'sb-refresh-token', 
    'supabase-auth-token',
    'supabase-auth-refresh-token',
    'admin-session',
    'auth-session'
  ];
  
  cookiesToClear.forEach(cookieName => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
  
  // Clear localStorage and sessionStorage
  localStorage.clear();
  sessionStorage.clear();
  
  // Clear any cached data
  if ('caches' in window) {
    caches.keys().then(names => {
      names.forEach(name => {
        caches.delete(name);
      });
    });
  }
};

export default function AdminNavbar() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      console.log('AdminNavbar: Starting to load user...');
      try {
        const response = await fetch('/api/auth/user');
        console.log('AdminNavbar: API response status:', response.status);
        const data = await response.json();
        console.log('AdminNavbar: API response data:', data);
        
        if (response.ok && data.user) {
          console.log('AdminNavbar: User loaded successfully:', data.user.email);
          setUser(data.user);
          setAuthError(null);
        } else {
          // If not authenticated, redirect to login
          if (response.status === 401 || response.status === 403) {
            console.log('AdminNavbar: User not authenticated, redirecting to login');
            router.push('/admin/login');
            return;
          }
          console.error('AdminNavbar: Failed to load user:', data.error);
          setAuthError(data.error || 'Failed to load user');
        }
      } catch (error) {
        console.error('AdminNavbar: Failed to load user:', error);
        setAuthError('Network error');
        // Don't redirect on network errors, just show error state
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, [router]);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      console.log('AdminNavbar: Starting sign out process');
      
      const response = await fetch('/api/auth/logout', { 
        method: 'POST',
        credentials: 'include' // Ensure cookies are sent
      });
      
      console.log('AdminNavbar: Logout API response status:', response.status);
      
      // Always clear client-side session data regardless of API response
      clearClientSession();
      setUser(null);
      
      if (response.ok) {
        console.log('AdminNavbar: Server logout successful');
      } else {
        console.error('AdminNavbar: Server logout failed, but client session cleared');
      }
      
      // Force a hard redirect to clear any cached state and ensure middleware picks up the logout
      console.log('AdminNavbar: Redirecting to login page');
      window.location.href = '/admin/login';
    } catch (error) {
      console.error('AdminNavbar: Sign out failed:', error);
      // Even on error, clear client-side session and redirect
      clearClientSession();
      setUser(null);
      window.location.href = '/admin/login';
    } finally {
      setIsSigningOut(false);
    }
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Credentials', href: '/admin/credentials' },
    { name: 'Insights', href: '/admin/insights' },
    { name: 'SEO Management', href: '/admin/static-seo' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] w-full border-b border-dark/10 bg-white">
      <div className="container flex items-center justify-between py-4">
        {/* Logo and Admin Badge */}
        <div className="flex items-end gap-3">
          <Link href="/admin" aria-label="Admin Home">
            <Logo className="fill-dark w-[132px] h-10" />
          </Link>
          <span className="ml-2 px-2 py-0.5 bg-surface text-dark/50 text-xs tracking-wide">Admin</span>
        </div>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="px-4 py-2 transition-colors duration-200 text-dark/80 hover:text-dark hover:bg-surface text-sm font-sans"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        {/* User/Sign Out */}
        <div className="hidden md:flex items-center gap-4">
          {isLoading ? (
            <span className="text-sm text-dark/50">Loading...</span>
          ) : user ? (
            <>
              <span className="text-sm text-dark/70">{user.email}</span>
              <Button
                size="default"
                variant="secondary"
                onClick={handleSignOut}
                disabled={isSigningOut}
              >
                {isSigningOut ? 'Signing out...' : 'Sign out'}
              </Button>
            </>
          ) : authError ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-red-600">{authError}</span>
              <Button
                size="default"
                variant="secondary"
                onClick={() => window.location.reload()}
              >
                Retry
              </Button>
            </div>
          ) : (
            <span className="text-sm text-dark/50">Loading user...</span>
          )}
        </div>
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-dark/80 hover:text-dark hover:bg-surface rounded-md transition-colors duration-200"
          aria-label="Toggle mobile menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-dark/10 bg-white"
          >
            <div className="container flex flex-col gap-2 py-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-3 text-dark/80 hover:text-dark hover:bg-surface text-base font-sans transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-4">
                {isLoading ? (
                  <span className="text-sm text-dark/50">Loading...</span>
                ) : user ? (
                  <>
                    <span className="text-sm text-dark/70">{user.email}</span>
                    <Button
                      size="default"
                      variant="secondary"
                      onClick={handleSignOut}
                      disabled={isSigningOut}
                      className="w-full"
                    >
                      {isSigningOut ? 'Signing out...' : 'Sign out'}
                    </Button>
                  </>
                ) : authError ? (
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-red-600">{authError}</span>
                    <Button
                      size="default"
                      variant="secondary"
                      onClick={() => window.location.reload()}
                      className="w-full"
                    >
                      Retry
                    </Button>
                  </div>
                ) : (
                  <span className="text-sm text-dark/50">Loading user...</span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
} 