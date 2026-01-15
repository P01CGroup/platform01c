'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useUnifiedSearch } from '@/lib/hooks/useSearch';
import SearchBar from '@/components/ui/search-bar';
import SearchResults from '@/components/ui/search-results';
import HeroInner from '@/components/sections/HeroInner';
import { Filter, X } from 'lucide-react';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('q') || '';
  const initialType = (searchParams.get('type') as 'all' | 'insights' | 'credentials') || 'all';

  const {
    query,
    setQuery,
    type,
    setType,
    results,
    loading,
    error,
    total,
    totalPages,
    page,
    setPage,
    breakdown,
    nextPage,
    prevPage,
    resetSearch
  } = useUnifiedSearch(initialQuery, 1);

  const [showFilters, setShowFilters] = useState(false);

  // Update URL when search changes
  React.useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (type !== 'all') params.set('type', type);
    
    const newUrl = query ? `/search?${params.toString()}` : '/search';
    router.replace(newUrl, { scroll: false });
  }, [query, type, router]);

  const handleResultClick = (result: any) => {
    // Analytics tracking could go here
    console.log('Search result clicked:', result);
  };

  return (
    <>
      <HeroInner 
        title="Search Results" 
        supportingText="Find insights, credentials, and expertise across Platform01 Consulting's knowledge base."
      />
      
      <div className="container py-8">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search insights, credentials, authors... (min 2 characters)"
            loading={loading}
            autoFocus
            onClear={resetSearch}
            minLength={2}
          />
        </div>

        {/* Filters and Results */}
        <div className="max-w-4xl mx-auto">
          {/* Filter Toggle */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-3 py-2 text-sm border border-dark/20 rounded-lg hover:border-dark/30 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
              
              {query && (
                <div className="text-sm text-dark/50">
                  {total} result{total !== 1 ? 's' : ''} found
                  {breakdown && (
                    <span className="ml-2">
                      ({breakdown.insights} insights, {breakdown.credentials} credentials)
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-2">
              {['all', 'insights', 'credentials'].map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setType(filterType as any)}
                  className={`
                    px-3 py-1 text-sm rounded-full transition-colors
                    ${type === filterType 
                      ? 'bg-dark text-white' 
                      : 'bg-dark/5 text-dark/60 hover:bg-dark/10'
                    }
                  `}
                >
                  {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mb-6 p-4 border border-dark/10 rounded-lg bg-surface/30">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-dark">Search Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-dark/40 hover:text-dark/60"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="text-sm text-dark/50">
                <p>• Search across titles, content, authors, and categories</p>
                <p>• Results are ranked by relevance</p>
                <p>• Use quotes for exact phrase matching</p>
              </div>
            </div>
          )}

          {/* Search Results */}
          <SearchResults
            results={results}
            loading={loading}
            error={error}
            query={query}
            onResultClick={handleResultClick}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevPage}
                disabled={page === 1}
                className="px-4 py-2 text-sm border border-dark/20 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-dark/30 transition-colors"
              >
                Previous
              </button>
              
              <span className="text-sm text-dark/50">
                Page {page} of {totalPages}
              </span>
              
              <button
                onClick={nextPage}
                disabled={page === totalPages}
                className="px-4 py-2 text-sm border border-dark/20 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-dark/30 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchPageContent />
    </Suspense>
  );
} 