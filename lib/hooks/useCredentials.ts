// Custom hook for credentials data fetching
// Phase 3.4: Data Fetching Hooks

import { useState, useEffect, useCallback } from 'react';
import { Credential, CredentialsFilter } from '../types/cms';

interface UseCredentialsOptions {
  filters?: CredentialsFilter;
  autoFetch?: boolean;
  limit?: number;
}

interface UseCredentialsReturn {
  credentials: Credential[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  getByType: (type: 'Industry' | 'Service') => Promise<Credential[]>;
  search: (query: string) => Promise<Credential[]>;
}

// In-memory cache for credentials
const credentialsCache = new Map<string, { data: Credential[]; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function useCredentials(options: UseCredentialsOptions = {}): UseCredentialsReturn {
  const { filters = {}, autoFetch = true, limit } = options;
  
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate cache key based on filters and limit
  const getCacheKey = useCallback((filters: CredentialsFilter, limit?: number) => {
    return JSON.stringify({ filters, limit });
  }, []);

  // Check if cached data is still valid
  const isCacheValid = useCallback((cacheKey: string) => {
    const cached = credentialsCache.get(cacheKey);
    if (!cached) return false;
    
    return Date.now() - cached.timestamp < CACHE_DURATION;
  }, []);

  // Fetch credentials from API
  const fetchCredentials = useCallback(async (filters: CredentialsFilter) => {
    try {
      setLoading(true);
      setError(null);

      const cacheKey = getCacheKey(filters, limit);
      
      // Check cache first
      if (isCacheValid(cacheKey)) {
        const cached = credentialsCache.get(cacheKey);
        if (cached) {
          setCredentials(cached.data);
          setLoading(false);
          return;
        }
      }

      // Build query parameters
      const params = new URLSearchParams();
      if (filters.service_tags) params.append('service_tags', filters.service_tags.join(','));
      if (filters.industry_tags) params.append('industry_tags', filters.industry_tags.join(','));
      if (filters.search) params.append('search', filters.search);
      if (filters.is_active !== undefined) params.append('is_active', filters.is_active.toString());
      if (limit !== undefined) params.append('limit', limit.toString());

      const response = await fetch(`/api/credentials?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.error) {
        throw new Error(result.error);
      }

      // Cache the result
      credentialsCache.set(cacheKey, {
        data: result.data,
        timestamp: Date.now()
      });

      setCredentials(result.data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch credentials';
      setError(errorMessage);
      console.error('Error fetching credentials:', err);
    } finally {
      setLoading(false);
    }
  }, [getCacheKey, isCacheValid]);

  // Refetch function
  const refetch = useCallback(async () => {
    // Clear client-side cache before refetching
    credentialsCache.clear();
    await fetchCredentials(filters);
  }, [fetchCredentials, filters]);

  // Get credentials by type
  const getByType = useCallback(async (type: 'Industry' | 'Service'): Promise<Credential[]> => {
    try {
      const response = await fetch(`/api/credentials?type=${type}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.error) {
        throw new Error(result.error);
      }

      return result.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch credentials by type';
      console.error('Error fetching credentials by type:', err);
      throw new Error(errorMessage);
    }
  }, []);

  // Search credentials
  const search = useCallback(async (query: string): Promise<Credential[]> => {
    try {
      const response = await fetch(`/api/credentials?search=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.error) {
        throw new Error(result.error);
      }

      return result.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search credentials';
      console.error('Error searching credentials:', err);
      throw new Error(errorMessage);
    }
  }, []);

  // Auto-fetch on mount and when filters change
  useEffect(() => {
    if (autoFetch) {
      fetchCredentials(filters);
    }
  }, [fetchCredentials, filters, autoFetch]);

  return {
    credentials,
    loading,
    error,
    refetch,
    getByType,
    search
  };
}

// Hook for fetching a single credential by ID
export function useCredential(id: string) {
  const [credential, setCredential] = useState<Credential | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCredential = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/credentials/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          setCredential(null);
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.error) {
        throw new Error(result.error);
      }

      setCredential(result.data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch credential';
      setError(errorMessage);
      console.error('Error fetching credential:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCredential();
  }, [fetchCredential]);

  return {
    credential,
    loading,
    error,
    refetch: fetchCredential
  };
} 