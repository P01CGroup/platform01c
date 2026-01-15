// Custom hook for insights data fetching
// Phase 3.4: Data Fetching Hooks

import { useState, useEffect, useCallback } from 'react';
import { Insight, InsightsFilter, PaginationParams, PaginatedResponse } from '../types/cms';

interface UseInsightsOptions {
  filters?: InsightsFilter;
  pagination?: PaginationParams;
  autoFetch?: boolean;
}

interface UseInsightsReturn {
  insights: Insight[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  } | null;
  refetch: () => Promise<void>;
  loadMore: () => Promise<void>;
  getBySlug: (slug: string) => Promise<Insight | null>;
  search: (query: string) => Promise<Insight[]>;
  clearCache: () => void;
}

// Import the global cache system
import { insightsCache, clearInsightsCache as clearGlobalCache } from '../utils/cache';

const CACHE_DURATION = 30 * 1000; // Reduced to 30 seconds for more responsive updates

export function useInsights(options: UseInsightsOptions = {}): UseInsightsReturn {
  const { filters = {}, pagination = { page: 1, pageSize: 10 }, autoFetch = true } = options;
  
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paginationData, setPaginationData] = useState<any>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Generate cache key based on filters and pagination
  const getCacheKey = useCallback((filters: InsightsFilter, pagination: PaginationParams) => {
    return JSON.stringify({ filters, pagination });
  }, []);



  // Fetch insights from API
  const fetchInsights = useCallback(async (filters: InsightsFilter, pagination: PaginationParams) => {
    try {
      setLoading(true);
      setError(null);

      const cacheKey = getCacheKey(filters, pagination);
      
      // Check cache first
      const cached = insightsCache.get<PaginatedResponse<Insight>>(cacheKey);
      if (cached) {
        setInsights(cached.data);
        setPaginationData(cached.pagination);
        setLoading(false);
        return;
      }

      // Build query parameters
      const params = new URLSearchParams();
      
      // Add filter parameters
      if (filters.author) params.append('author', filters.author);
      if (filters.is_published !== undefined) params.append('is_published', filters.is_published.toString());
      if (filters.search) params.append('search', filters.search);
      if (filters.published_date_from) params.append('published_date_from', filters.published_date_from);
      if (filters.published_date_to) params.append('published_date_to', filters.published_date_to);
      if (filters.tags && filters.tags.length > 0) {
        // Send each tag as a separate parameter
        filters.tags.forEach(tag => params.append('tags', tag));
      }
      
      // Add pagination parameters
      if (pagination.page) params.append('page', pagination.page.toString());
      if (pagination.pageSize) params.append('pageSize', pagination.pageSize.toString());
      if (pagination.sortBy) params.append('sortBy', pagination.sortBy);
      if (pagination.sortOrder) params.append('sortOrder', pagination.sortOrder);

      const response = await fetch(`/api/insights?${params.toString()}`, {
        cache: 'no-store'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      console.log('useInsights: API response:', result);
      
      if (result.error) {
        throw new Error(result.error);
      }

      // Cache the result
      insightsCache.set(cacheKey, result.data, 30 * 1000); // 30 seconds TTL

      // The API returns: { data: { data: [...], pagination: {...} }, error: null }
      setInsights(result.data.data);
      setPaginationData(result.data.pagination);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch insights';
      setError(errorMessage);
      console.error('Error fetching insights:', err);
    } finally {
      setLoading(false);
    }
  }, [getCacheKey]);

  // Refetch function
  const refetch = useCallback(async () => {
    // Clear global cache to force fresh data
    clearGlobalCache();
    await fetchInsights(filters, pagination);
  }, [fetchInsights, filters, pagination]);

  // Clear cache function for external use
  const clearCache = useCallback(() => {
    clearGlobalCache();
  }, []);

  // Load more function (for pagination)
  const loadMore = useCallback(async () => {
    if (!paginationData || paginationData.page >= paginationData.totalPages) {
      return;
    }

    const nextPage = paginationData.page + 1;
    const nextPagination = { ...pagination, page: nextPage };
    
    try {
      setLoading(true);
      
      const params = new URLSearchParams();
      
      // Add filter parameters
      if (filters.author) params.append('author', filters.author);
      if (filters.is_published !== undefined) params.append('is_published', filters.is_published.toString());
      if (filters.search) params.append('search', filters.search);
      if (filters.published_date_from) params.append('published_date_from', filters.published_date_from);
      if (filters.published_date_to) params.append('published_date_to', filters.published_date_to);
      if (filters.tags && filters.tags.length > 0) {
        // Send each tag as a separate parameter
        filters.tags.forEach(tag => params.append('tags', tag));
      }
      
      // Add pagination parameters
      params.append('page', nextPage.toString());
      if (pagination.pageSize) params.append('pageSize', pagination.pageSize.toString());
      if (pagination.sortBy) params.append('sortBy', pagination.sortBy);
      if (pagination.sortOrder) params.append('sortOrder', pagination.sortOrder);

      const response = await fetch(`/api/insights?${params.toString()}`, {
        cache: 'no-store'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.error) {
        throw new Error(result.error);
      }

      // Append new insights to existing ones
      setInsights(prev => [...prev, ...result.data.data]);
      setPaginationData(result.data.pagination);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load more insights';
      setError(errorMessage);
      console.error('Error loading more insights:', err);
    } finally {
      setLoading(false);
    }
  }, [filters, pagination, paginationData]);

  // Get insight by slug
  const getBySlug = useCallback(async (slug: string): Promise<Insight | null> => {
    try {
      const response = await fetch(`/api/insights/${slug}`, {
        cache: 'no-store'
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.error) {
        throw new Error(result.error);
      }

      return result.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch insight by slug';
      console.error('Error fetching insight by slug:', err);
      throw new Error(errorMessage);
    }
  }, []);

  // Search insights
  const search = useCallback(async (query: string): Promise<Insight[]> => {
    try {
      const response = await fetch(`/api/insights?search=${encodeURIComponent(query)}`, {
        cache: 'no-store'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.error) {
        throw new Error(result.error);
      }

      return result.data.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search insights';
      console.error('Error searching insights:', err);
      throw new Error(errorMessage);
    }
  }, []);

  // Auto-fetch on mount and when filters/pagination change
  useEffect(() => {
    if (autoFetch && hasMounted) {
      fetchInsights(filters, pagination);
    }
  }, [fetchInsights, filters, pagination, autoFetch, hasMounted]);

  return {
    insights,
    loading,
    error,
    pagination: paginationData,
    refetch,
    loadMore,
    getBySlug,
    search,
    clearCache
  };
}

// Hook for fetching a single insight by ID
export function useInsight(id: string) {
  const [insight, setInsight] = useState<Insight | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInsight = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/insights/${id}`, {
        cache: 'no-store'
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          setInsight(null);
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.error) {
        throw new Error(result.error);
      }

      setInsight(result.data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch insight';
      setError(errorMessage);
      console.error('Error fetching insight:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchInsight();
  }, [fetchInsight]);

  return {
    insight,
    loading,
    error,
    refetch: fetchInsight
  };
}

// Hook for fetching published insights only
export function usePublishedInsights(options: Omit<UseInsightsOptions, 'filters'> = {}) {
  return useInsights({
    ...options,
    filters: { is_published: true }
  });
}

// New hook specifically for InsightsSlider
export function useInsightsForSlider(limit: number = 6) {
  return usePublishedInsights({
    pagination: { page: 1, pageSize: limit }
  });
} 