'use client'

import { useState, useEffect, useCallback } from 'react';
import { Credential } from '@/lib/types/cms';

interface UseCredentialsRealtimeOptions {
  filters?: {
    service_tags?: string[];
    industry_tags?: string[];
    is_active?: boolean;
  };
  autoRefresh?: boolean;
  refreshInterval?: number; // in milliseconds
}

export function useCredentialsRealtime(options: UseCredentialsRealtimeOptions = {}) {
  const { filters = {}, autoRefresh = true, refreshInterval = 300000 } = options; // Changed from 5000 to 300000 (5 minutes)
  
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [loading, setLoading] = useState(true); // Start with loading true
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null); // Start with null

  // Fetch credentials from API
  const fetchCredentials = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Build query parameters
      const params = new URLSearchParams();
      if (filters.service_tags) params.append('service_tags', filters.service_tags.join(','));
      if (filters.industry_tags) params.append('industry_tags', filters.industry_tags.join(','));
      if (filters.is_active !== undefined) params.append('is_active', filters.is_active.toString());

      const response = await fetch(`/api/credentials?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.error) {
        throw new Error(result.error);
      }

      setCredentials(result.data);
      setLastUpdated(new Date());
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch credentials';
      setError(errorMessage);
      console.error('Error fetching credentials:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Manual refresh function
  const refresh = useCallback(() => {
    fetchCredentials();
  }, [fetchCredentials]);

  // Auto-refresh effect
  useEffect(() => {
    if (!autoRefresh) return;

    // Initial fetch
    fetchCredentials();

    // Set up interval for auto-refresh
    const interval = setInterval(() => {
      fetchCredentials();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [fetchCredentials, autoRefresh, refreshInterval]);

  // Listen for custom events when credentials are updated
  useEffect(() => {
    const handleCredentialsUpdate = () => {
      console.log('Credentials update detected, refreshing...');
      fetchCredentials();
    };

    // Listen for custom events
    window.addEventListener('credentials-updated', handleCredentialsUpdate);
    
    // Also listen for storage events (for cross-tab updates)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'credentials-last-updated') {
        handleCredentialsUpdate();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('credentials-updated', handleCredentialsUpdate);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [fetchCredentials]);

  return {
    credentials,
    loading,
    error,
    refresh,
    lastUpdated
  };
} 