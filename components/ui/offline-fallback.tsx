'use client'

import React, { useState, useEffect } from 'react';

interface OfflineFallbackProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  showOfflineIndicator?: boolean;
}

export function OfflineFallback({
  children,
  fallback,
  showOfflineIndicator = true
}: OfflineFallbackProps) {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Set initial state
    setIsOnline(navigator.onLine);

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOnline) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="min-h-[400px] flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            You're offline
          </h2>
          <p className="text-gray-600 mb-4">
            Please check your internet connection and try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {children}
      {showOfflineIndicator && (
        <OfflineIndicator />
      )}
    </>
  );
}

// Offline indicator component
function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true);
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Hide indicator after a short delay
      setTimeout(() => setShowIndicator(false), 2000);
    };
    const handleOffline = () => {
      setIsOnline(false);
      setShowIndicator(true);
    };

    setIsOnline(navigator.onLine);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showIndicator) return null;

  return (
    <div className={`
      fixed bottom-4 right-4 z-50 px-4 py-2 rounded-md shadow-lg transition-all duration-300
      ${isOnline 
        ? 'bg-green-500 text-white' 
        : 'bg-red-500 text-white'
      }
    `}>
      <div className="flex items-center gap-2">
        <div className={`
          w-2 h-2 rounded-full
          ${isOnline ? 'bg-green-200' : 'bg-red-200'}
        `}></div>
        <span className="text-sm font-medium">
          {isOnline ? 'Back online' : 'You\'re offline'}
        </span>
      </div>
    </div>
  );
}

// Hook for offline detection
export function useOfflineDetection() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    setIsOnline(navigator.onLine);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

// Higher-order component for offline handling
export function withOfflineFallback<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ReactNode,
  showOfflineIndicator = true
) {
  return function WithOfflineFallback(props: P) {
    return (
      <OfflineFallback fallback={fallback} showOfflineIndicator={showOfflineIndicator}>
        <Component {...props} />
      </OfflineFallback>
    );
  };
} 