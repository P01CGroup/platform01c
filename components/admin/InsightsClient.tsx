'use client'

import { useState, useEffect, useCallback } from 'react';
import { useInsights } from '@/lib/hooks/useInsights';
import { Insight } from '@/lib/types/cms';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { RetryButton } from '@/components/ui/retry-button';
import { OfflineFallback } from '@/components/ui/offline-fallback';
import InsightForm from '@/components/admin/InsightForm';
import { Button } from '@/components/ui/button';
import HeroAdmin from './HeroAdmin';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import OptimizedImage from '@/components/ui/OptimizedImage';

export default function InsightsClient() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [hasRefetched, setHasRefetched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  const searchParams = useSearchParams();
  const router = useRouter();

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setIsSearching(false);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Build filters based on current state
  const filters = {
    search: debouncedSearchQuery || undefined,
    is_published: statusFilter === 'all' ? undefined : statusFilter === 'published'
  };

  const { insights, loading, error, refetch, pagination } = useInsights({ 
    filters,
    pagination: { page: currentPage, pageSize },
    autoFetch: true 
  });

  // Remove the problematic useEffect that was causing infinite loops
  // The backend will handle page adjustments automatically

  useEffect(() => {
    if (!hasRefetched && searchParams.get('updated') === '1') {
      refetch();
      setHasRefetched(true);
      // Remove the query param after refetching
      const params = new URLSearchParams(window.location.search);
      params.delete('updated');
      const newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
      router.replace(newUrl);
    }
  }, [searchParams, refetch, router, hasRefetched]);

  const handleEdit = (insight: Insight) => {
    router.push(`/admin/insights/edit/${insight.id}`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this insight?')) {
      return;
    }

    setIsDeleting(id);
    try {
      const response = await fetch(`/api/insights?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete insight');
      }

      // Refresh the list
      refetch();
    } catch (error) {
      console.error('Error deleting insight:', error);
      alert('Failed to delete insight');
    } finally {
      setIsDeleting(null);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      return; // Don't search if query is empty
    }
    setCurrentPage(1); // Reset to first page when searching
    setIsSearching(true);
    refetch();
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsSearching(true);
    
    // Reset to first page when user starts typing
    if (value !== debouncedSearchQuery) {
      setCurrentPage(1);
    }
  };

  const handleStatusFilterChange = (status: 'all' | 'published' | 'draft') => {
    setStatusFilter(status);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handlePageChange = (page: number) => {
    // Validate page number
    if (page < 1 || (pagination && page > pagination.totalPages)) {
      console.log('DEBUG: Invalid page requested:', page);
      return;
    }
    
    // Only update if the page is actually different
    if (page !== currentPage) {
      console.log('DEBUG: Changing page from', currentPage, 'to', page);
      setCurrentPage(page);
    }
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setDebouncedSearchQuery('');
    setCurrentPage(1);
    setIsSearching(false);
    refetch();
  };

  const totalPages = pagination?.totalPages || 1;
  const totalInsights = pagination?.total || 0;
  const actualCurrentPage = pagination?.page || currentPage;

  return (
    <OfflineFallback>
      <ErrorBoundary>
        <HeroAdmin title="Manage Insights" description="Create, edit, and publish Platform01 insights" haveChildren={true}>
          <Button
            onClick={() => router.push('/admin/insights/add')}
            variant="primary"
            size="default"
          >
            Add Insight
          </Button>
        </HeroAdmin>
        
        <div className="container py-8">
          {/* Search and Filter Controls */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search insights by title, excerpt, or content..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  className="w-full px-4 py-2 border border-gray-300 h-12 outline-none"
                />
                {isSearching && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-dark"></div>
                  </div>
                )}
              </div>
              <Button type="submit" variant="secondary" size="default" disabled={isSearching}>
                Search
              </Button>
              {(searchQuery || debouncedSearchQuery) && (
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="default"
                  onClick={handleClearSearch}
                  disabled={isSearching}
                >
                  Clear
                </Button>
              )}
            </form>

            {/* Filter Controls */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-dark">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => handleStatusFilterChange(e.target.value as 'all' | 'published' | 'draft')}
                  className="px-3 py-1 border border-gray-300 text-sm focus:ring-2 focus:ring-dark focus:border-transparent"
                >
                  <option value="all">All Insights</option>
                  <option value="published">Published Only</option>
                  <option value="draft">Draft Only</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-dark">Per Page:</span>
                <select
                  value={pageSize}
                  onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                  className="px-3 py-1 border border-gray-300 text-sm focus:ring-2 focus:ring-dark focus:border-transparent"
                >
                  <option value={6}>6</option>
                  <option value={12}>12</option>
                  <option value={24}>24</option>
                  <option value={50}>50</option>
                </select>
              </div>

              {/* Results Summary */}
              <div className="text-sm text-dark/60">
                Showing {((actualCurrentPage - 1) * pageSize) + 1} to {Math.min(actualCurrentPage * pageSize, totalInsights)} of {totalInsights} insights
                {debouncedSearchQuery && (
                  <span className="ml-2 text-blue-600">
                    (filtered by "{debouncedSearchQuery}")
                  </span>
                )}
              </div>
            </div>
          </div>

          {loading && (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dark mx-auto"></div>
              <p className="text-dark/50 mt-4">Loading insights...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-16">
              <p className="text-red-500 mb-4">Error loading insights: {error}</p>
              <RetryButton onRetry={refetch} className="bg-dark text-white hover:bg-dark/80">
                Try Again
              </RetryButton>
            </div>
          )}

          {!loading && !error && insights.length > 0 && (
            <>
              <div className="overflow-hidden">
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {insights.map((insight) => (
                    <li key={insight.id}>
                      <div className="p-6 bg-white h-full flex flex-col justify-between border border-gray-200 hover:shadow-md transition-shadow">
                        {insight.image_url ? (
                          <div className="w-full aspect-video mb-4 relative overflow-hidden bg-surface">
                            <OptimizedImage
                              src={insight.image_url}
                              alt={insight.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 300px"
                              quality={85}
                              format="webp"
                            />
                          </div>
                        ) : (
                          <div className="w-full h-40 mb-4 bg-surface flex items-center justify-center text-dark/20 text-xs">
                            No Image
                          </div>
                        )}
                        <div className="flex items-start justify-start flex-col gap-2">
                          <div className="mt-2 flex items-center justify-between text-sm w-full">
                            <span className={`inline-flex items-center px-2.5 py-0.5 text-sm font-medium rounded-full ${
                              insight.is_published 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {insight.is_published ? 'Published' : 'Draft'}
                            </span>
                            <span className="ml-4 text-xs text-dark/50">
                              {insight.published_date && `Published: ${new Date(insight.published_date).toLocaleDateString()}`}
                            </span>
                          </div>
                          <div className="mt-4 flex items-center text-xs text-dark/50">
                            <span className="block max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                              By {insight.author}{insight.co_author && ` & ${insight.co_author}`}
                            </span>
                          </div>
                          <h5 className="text-dark block max-w-full overflow-hidden font-medium" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', whiteSpace: 'normal' }}>
                            {insight.title}
                          </h5>
                          <p className="mt-2 text-sm text-dark/50 line-clamp-2">
                            {insight.excerpt}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {insight.tags?.slice(0, 3).map((tag, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium bg-surface text-dark/50 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                            {insight.tags && insight.tags.length > 3 && (
                              <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium bg-surface text-dark/50 rounded-full">
                                +{insight.tags.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-2 w-full">
                          <Button
                            onClick={() => handleDelete(insight.id)}
                            disabled={isDeleting === insight.id}
                            variant="ghost"
                            size="default"
                            className="!w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            {isDeleting === insight.id ? 'Deleting...' : 'Delete'}
                          </Button>
                          <Button
                            onClick={() => handleEdit(insight)}
                            variant="secondary"
                            size="default"
                            className='!w-full bg-surface text-dark'
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => window.open(`/insights/${insight.slug}`, '_blank')}
                            variant="secondary"
                            size="default"
                            className="!w-full col-span-2"
                            disabled={!insight.is_published}
                          >
                            View Insight
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-between">
                  <div className="text-sm text-dark/60">
                    Page {actualCurrentPage} of {totalPages}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => handlePageChange(actualCurrentPage - 1)}
                      disabled={actualCurrentPage <= 1}
                      variant="ghost"
                      size="default"
                      className="px-3 py-1"
                    >
                      Previous
                    </Button>
                    
                    {/* Page Numbers */}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (actualCurrentPage <= 3) {
                          pageNum = i + 1;
                        } else if (actualCurrentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = actualCurrentPage - 2 + i;
                        }
                        
                        return (
                          <Button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            variant={actualCurrentPage === pageNum ? "primary" : "ghost"}
                            size="default"
                            className="px-3 py-1 min-w-[40px]"
                          >
                            {pageNum}
                          </Button>
                        );
                      })}
                    </div>
                    
                    <Button
                      onClick={() => handlePageChange(actualCurrentPage + 1)}
                      disabled={actualCurrentPage >= totalPages}
                      variant="ghost"
                      size="default"
                      className="px-3 py-1"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {/* Show pagination info even when there's only one page */}
              {totalPages <= 1 && totalInsights > 0 && (
                <div className="mt-8 text-center">
                  <div className="text-sm text-dark/60">
                    Showing all {totalInsights} insights
                  </div>
                </div>
              )}
            </>
          )}

          {!loading && !error && insights.length === 0 && (
            <div className="text-center py-16">
              <p className="text-dark/50 text-lg mb-4">
                {debouncedSearchQuery || statusFilter !== 'all' 
                  ? 'No insights match your current filters.' 
                  : 'No insights found.'
                }
              </p>
              {(debouncedSearchQuery || statusFilter !== 'all') && (
                <Button
                  onClick={() => {
                    setSearchQuery('');
                    setDebouncedSearchQuery('');
                    setStatusFilter('all');
                    setCurrentPage(1);
                    setIsSearching(false);
                    refetch();
                  }}
                  variant="secondary"
                  size="default"
                  className="mr-4"
                >
                  Clear Filters
                </Button>
              )}
              <Button
                onClick={() => router.push('/admin/insights/add')}
                variant="secondary"
                size="default"
              >
                Add Your First Insight
              </Button>
            </div>
          )}
        </div>
      </ErrorBoundary>
    </OfflineFallback>
  );
} 