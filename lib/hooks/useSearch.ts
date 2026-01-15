import { useState, useEffect, useCallback } from 'react';
import { useDebounce, useSearchDebounce } from '@/lib/hooks/useDebounce';

// Search result types
export interface SearchResult {
  _type: 'insight' | 'credential';
  _searchScore: number;
  id: string;
  title: string;
  [key: string]: any;
}

export interface SearchResponse {
  data: SearchResult[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  query: string;
  type?: string;
  breakdown?: {
    insights: number;
    credentials: number;
  };
  error?: string;
}

// Search hook for insights
export function useInsightsSearch(initialQuery = '', initialPage = 1) {
  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const debouncedQuery = useSearchDebounce(query, 500, 2);

  const searchInsights = useCallback(async (searchQuery: string, pageNum: number) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setTotal(0);
      setTotalPages(0);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        q: searchQuery,
        page: pageNum.toString(),
        limit: '10'
      });

      const response = await fetch(`/api/search/insights?${params}`);
      const data: SearchResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Search failed');
      }

      setResults(data.data);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      searchInsights(debouncedQuery, page);
    } else {
      // Clear results when query is empty
      setResults([]);
      setTotal(0);
      setTotalPages(0);
      setLoading(false);
      setError(null);
    }
  }, [debouncedQuery, page, searchInsights]);

  const nextPage = useCallback(() => {
    if (page < totalPages) {
      setPage(prev => prev + 1);
    }
  }, [page, totalPages]);

  const prevPage = useCallback(() => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  }, [page]);

  const resetSearch = useCallback(() => {
    setQuery('');
    setPage(1);
    setResults([]);
    setError(null);
  }, []);

  return {
    query,
    setQuery,
    page,
    setPage,
    results,
    loading,
    error,
    total,
    totalPages,
    nextPage,
    prevPage,
    resetSearch,
    searchInsights
  };
}

// Search hook for credentials
export function useCredentialsSearch(initialQuery = '', initialPage = 1) {
  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);
  const [type, setType] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const debouncedQuery = useSearchDebounce(query, 500, 2);

  const searchCredentials = useCallback(async (searchQuery: string, pageNum: number, filterType: string, filterCategory: string) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        q: searchQuery,
        page: pageNum.toString(),
        limit: '10'
      });

      if (filterType) params.append('type', filterType);
      if (filterCategory) params.append('category', filterCategory);

      const response = await fetch(`/api/search/credentials?${params}`);
      const data: SearchResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Search failed');
      }

      setResults(data.data);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      searchCredentials(debouncedQuery, page, type, category);
    } else {
      // Clear results when query is empty
      setResults([]);
      setTotal(0);
      setTotalPages(0);
      setLoading(false);
      setError(null);
    }
  }, [debouncedQuery, page, type, category, searchCredentials]);

  const nextPage = useCallback(() => {
    if (page < totalPages) {
      setPage(prev => prev + 1);
    }
  }, [page, totalPages]);

  const prevPage = useCallback(() => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  }, [page]);

  const resetSearch = useCallback(() => {
    setQuery('');
    setPage(1);
    setType('');
    setCategory('');
    setResults([]);
    setError(null);
  }, []);

  return {
    query,
    setQuery,
    page,
    setPage,
    type,
    setType,
    category,
    setCategory,
    results,
    loading,
    error,
    total,
    totalPages,
    nextPage,
    prevPage,
    resetSearch,
    searchCredentials
  };
}

// Unified search hook
export function useUnifiedSearch(initialQuery = '', initialPage = 1) {
  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);
  const [type, setType] = useState<'all' | 'insights' | 'credentials'>('all');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [breakdown, setBreakdown] = useState({ insights: 0, credentials: 0 });

  const debouncedQuery = useSearchDebounce(query, 500, 2);

  const searchAll = useCallback(async (searchQuery: string, pageNum: number, searchType: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setTotal(0);
      setTotalPages(0);
      setBreakdown({ insights: 0, credentials: 0 });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        q: searchQuery,
        type: searchType,
        page: pageNum.toString(),
        limit: '10'
      });

      const response = await fetch(`/api/search?${params}`);
      const data: SearchResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Search failed');
      }

      setResults(data.data);
      setTotal(data.total);
      setTotalPages(data.totalPages);
      setBreakdown(data.breakdown || { insights: 0, credentials: 0 });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      searchAll(debouncedQuery, page, type);
    } else {
      // Clear results when query is empty
      setResults([]);
      setTotal(0);
      setTotalPages(0);
      setLoading(false);
      setError(null);
      setBreakdown({ insights: 0, credentials: 0 });
    }
  }, [debouncedQuery, page, type, searchAll]);

  const nextPage = useCallback(() => {
    if (page < totalPages) {
      setPage(prev => prev + 1);
    }
  }, [page, totalPages]);

  const prevPage = useCallback(() => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  }, [page]);

  const resetSearch = useCallback(() => {
    setQuery('');
    setPage(1);
    setType('all');
    setResults([]);
    setError(null);
    setBreakdown({ insights: 0, credentials: 0 });
  }, []);

  return {
    query,
    setQuery,
    page,
    setPage,
    type,
    setType,
    results,
    loading,
    error,
    total,
    totalPages,
    breakdown,
    nextPage,
    prevPage,
    resetSearch,
    searchAll
  };
} 