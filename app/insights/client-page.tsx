"use client";

import { usePublishedInsights } from "@/lib/hooks/useInsights";
import { useInsightsSearch } from "@/lib/hooks/useSearch";
import SearchBar from "@/components/ui/search-bar";
import HeroInner from "@/components/sections/HeroInner";
import InsightsBrowser from "@/components/sections/InsightsBrowser";
import InsightCard from "@/components/ui/insight-card";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { RetryButton } from "@/components/ui/retry-button";
import { OfflineFallback } from "@/components/ui/offline-fallback";
import { getDatePart, areDatesDifferent } from "@/lib/utils/date-format";
import { Search, X } from "lucide-react";
import Link from "next/link";

// Map database insight to card format
function mapToCard(insight: any) {
  const publishedDate =
    getDatePart(insight.published_date) || getDatePart(new Date()) || "";
  const updatedDate = getDatePart(insight.updated_at);

  return {
    image:
      insight.image_url ||
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
    date: publishedDate,
    updatedDate:
      updatedDate && areDatesDifferent(updatedDate, publishedDate)
        ? updatedDate
        : undefined,
    title: insight.title,
    excerpt: insight.excerpt || "",
    author: insight.author || "",
    coAuthor: insight.co_author || "",
    slug: insight.slug || "",
  };
}

export default function InsightsClientPage() {
  const { insights, loading, error, refetch } = usePublishedInsights({
    pagination: { page: 1, pageSize: 50 }, // Fetch more insights
  });

  const {
    query,
    setQuery,
    results: searchResults,
    loading: searchLoading,
    error: searchError,
    total: searchTotal,
    totalPages: searchTotalPages,
    page: searchPage,
    nextPage: searchNextPage,
    prevPage: searchPrevPage,
    resetSearch,
  } = useInsightsSearch("", 1);

  const isSearching = query.trim().length > 0;

  return (
    <OfflineFallback>
      <ErrorBoundary>
        <HeroInner
          title="Our Featured<br/>Insights"
          supportingText="Platform01 Consulting's leadership team has successfully delivered 200+ strategic and financial consulting engagements globally in 100+ years of professional experience with globally renowned corporates, investors and services firms."
        />

        <div className="container py-16">
          {/* Search Bar */}
          <div className="mb-4">
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder="Search insights by title, author, or content... (min 2 characters)"
              loading={searchLoading}
              onClear={resetSearch}
              minLength={2}
            />
          </div>

          {/* Search Results Info */}
          {isSearching && (
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-dark/50">
                  <Search className="w-4 h-4" />
                  {searchTotal} result{searchTotal !== 1 ? "s" : ""} found for
                  &quot;{query}&quot;
                </div>
                <button
                  onClick={resetSearch}
                  className="flex items-center gap-1 text-sm text-dark/40 hover:text-dark/60 transition-colors"
                >
                  <X className="w-3 h-3" />
                  Clear search
                </button>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && !isSearching && (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dark mx-auto"></div>
              <p className="text-dark/50 mt-4">Loading insights...</p>
            </div>
          )}

          {/* Error State */}
          {error && !isSearching && (
            <div className="text-center py-16">
              <div className="mb-6">
                <p className="text-red-500 mb-4">Error: {error}</p>
                <RetryButton
                  onRetry={refetch}
                  className="bg-dark text-white hover:bg-dark/80"
                >
                  Try Again
                </RetryButton>
              </div>
            </div>
          )}

          {/* Search Results */}
          {isSearching && (
            <>
              {searchLoading && (
                <div className="text-center py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dark mx-auto"></div>
                  <p className="text-dark/50 mt-4">Searching insights...</p>
                </div>
              )}

              {searchError && (
                <div className="text-center py-16">
                  <div className="mb-6">
                    <p className="text-red-500 mb-4">Error: {searchError}</p>
                    <RetryButton
                      onRetry={resetSearch}
                      className="bg-dark text-white hover:bg-dark/80"
                    >
                      Try Again
                    </RetryButton>
                  </div>
                </div>
              )}

              {!searchLoading && !searchError && searchResults.length > 0 && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {searchResults.map((insight) => (
                      <InsightCard
                        insight={mapToCard(insight)}
                        key={insight.id}
                      />
                    ))}
                  </div>

                  {/* Search Pagination */}
                  {searchTotalPages > 1 && (
                    <div className="flex items-center justify-center gap-4 mt-12">
                      <button
                        onClick={searchPrevPage}
                        disabled={searchPage === 1}
                        className="px-4 py-2 text-sm border border-dark/20 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-dark/30 transition-colors"
                      >
                        Previous
                      </button>

                      <span className="text-sm text-dark/50">
                        Page {searchPage} of {searchTotalPages}
                      </span>

                      <button
                        onClick={searchNextPage}
                        disabled={searchPage === searchTotalPages}
                        className="px-4 py-2 text-sm border border-dark/20 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-dark/30 transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}

              {!searchLoading && !searchError && searchResults.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-dark/50 text-lg">
                    No insights found matching your search criteria.
                  </p>
                </div>
              )}
            </>
          )}

          {/* Category Browser (when not searching) */}
          {!isSearching && !loading && !error && insights.length > 0 && (
            <InsightsBrowser insights={insights} />
          )}

          {/* No insights available */}
          {!isSearching && !loading && !error && insights.length === 0 && (
            <div className="text-center py-16">
              <p className="text-dark/50 text-lg">
                No insights available at the moment. Please check back later.
              </p>
            </div>
          )}
        </div>
      </ErrorBoundary>
    </OfflineFallback>
  );
}
