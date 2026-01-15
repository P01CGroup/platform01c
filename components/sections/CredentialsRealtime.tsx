'use client'

import { useCredentialsRealtime } from '@/lib/hooks/useCredentialsRealtime';
import Credentials from './Credentials';
import CredentialsBrowser from './CredentialsBrowser';
import { CredentialSlide } from './Credentials';
import { useState, useEffect } from 'react';

interface CredentialsRealtimeProps {
  type: 'slider' | 'browser';
  filters?: {
    service_tags?: string[];
    industry_tags?: string[];
    is_active?: boolean;
  };
  // For slider mode
  tabs?: { label: string; value: string }[];
  disableTabs?: boolean;
  heading?: string;
  supportingText?: string;
  bgSurface?: boolean;
}

export default function CredentialsRealtime({ 
  type, 
  filters = { is_active: true }, 
  tabs = [],
  disableTabs = false,
  heading = 'Our Credentials',
  supportingText = 'We bring a history of performance across corporate strategy, capital structuring, and investment advisory — built on deep expertise and delivered with precision.',
  bgSurface = false
}: CredentialsRealtimeProps) {
  const [isClient, setIsClient] = useState(false);
  const { credentials, loading, error, lastUpdated, refresh } = useCredentialsRealtime({
    filters,
    autoRefresh: true,
    refreshInterval: 300000 // Refresh every 5 minutes (changed from 10000)
  });

  // Ensure we're on the client side to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Refetch on window focus
  useEffect(() => {
    const onFocus = () => {
      refresh && refresh();
    };
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [refresh]);

  // Show loading state initially to prevent hydration mismatch
  if (!isClient || (loading && credentials.length === 0)) {
    return (
      <div className="container py-16 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dark mx-auto"></div>
        <p className="mt-2 text-dark/50">Loading credentials...</p>
      </div>
    );
  }

  if (type === 'browser') {
    return (
      <div>
        {loading && (
          <div className="container py-16 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dark mx-auto"></div>
            <p className="mt-2 text-dark/50">Updating credentials...</p>
          </div>
        )}
        {error && (
          <div className="container py-16 text-center text-red-500">
            Error loading credentials: {error}
          </div>
        )}
        <CredentialsBrowser credentials={credentials} />
        {lastUpdated && (
          <div className="container text-xs text-dark/30 text-center pb-4">
            Last updated: {lastUpdated.toISOString().slice(11, 19)}
          </div>
        )}
      </div>
    );
  }

  // For slider mode, convert credentials to slides with proper categorization
  const slides: CredentialSlide[] = [];
  
  if (credentials.length > 0) {
    // Get unique industry and service tags
    const allIndustryTags = Array.from(new Set(credentials.flatMap(c => c.industry_tags)));
    const allServiceTags = Array.from(new Set(credentials.flatMap(c => c.service_tags)));

    // Create slides for each tag
    for (const tag of allIndustryTags) {
      const filtered = credentials
        .filter(c => c.industry_tags.includes(tag))
        .slice(0, 10) // Take first 10 without random sorting
        .map(c => ({
          type: 'industry' as const,
          category: tag,
          title: c.title,
        }));
      slides.push(...filtered);
    }

    for (const tag of allServiceTags) {
      const filtered = credentials
        .filter(c => c.service_tags.includes(tag))
        .slice(0, 10) // Take first 10 without random sorting
        .map(c => ({
          type: 'service' as const,
          category: tag,
          title: c.title,
        }));
      slides.push(...filtered);
    }

    // Remove duplicates by title (keep first occurrence)
    const seen = new Set<string>();
    const uniqueSlides = slides.filter(slide => {
      if (seen.has(slide.title)) return false;
      seen.add(slide.title);
      return true;
    });
    
    // Shuffle the slides for random order
    const shuffledSlides = [...uniqueSlides].sort(() => Math.random() - 0.5);
    
    // Replace slides array
    slides.length = 0;
    slides.push(...shuffledSlides);
  }

  return (
    <div>
      {loading && (
        <div className="container py-16 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dark mx-auto"></div>
          <p className="mt-2 text-dark/50">Updating credentials...</p>
        </div>
      )}
      {error && (
        <div className="container py-16 text-center text-red-500">
          Error loading credentials: {error}
        </div>
      )}
      <Credentials
        slides={slides}
        tabs={tabs}
        disableTabs={disableTabs}
        heading={heading}
        supportingText={supportingText}
        bgSurface={bgSurface}
      />
      {lastUpdated && (
        <div className="container text-xs text-dark/30 text-center pb-4 mt-4">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      )}
    </div>
  );
} 