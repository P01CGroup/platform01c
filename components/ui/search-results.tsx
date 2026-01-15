import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SearchResult } from '@/lib/hooks/useSearch';
import { formatDate } from '@/lib/utils/date-format';
import { FileText, Building2, Calendar, User, Search, AlertTriangle, Ghost, Loader2 } from 'lucide-react';
import Header from '@/components/ui/header';
import OptimizedImage from '@/components/ui/OptimizedImage';

interface SearchResultsProps {
  results: SearchResult[];
  loading: boolean;
  error: string | null;
  query: string;
  onResultClick?: (result: SearchResult) => void;
}

export default function SearchResults({
  results,
  loading,
  error,
  query,
  onResultClick
}: SearchResultsProps) {
  // Loading State
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <Header text="Searching..." className="text-primary mb-2" />
        <p className="text-dark/40 text-base">Looking for results, please wait.</p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
        <AlertTriangle className="w-10 h-10 text-red-500 mb-4" />
        <Header text="Search Error" className="text-red-600 mb-2" />
        <p className="text-dark/50 text-base mb-4">{error}</p>
        <p className="text-dark/30 text-sm">Try a different search or check your connection.</p>
      </div>
    );
  }

  // No Query State
  if (!query.trim()) {
    return (
      <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
        <Search className="w-12 h-12 text-primary/20 mb-4" />
        <Header text="Start Your Search" className="mb-2" />
        <p className="text-dark/40 text-base">Type at least 2 characters to search insights and credentials.</p>
      </div>
    );
  }

  // No Results State
  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
        <Ghost className="w-12 h-12 text-dark/20 mb-4" />
        <Header text="No Results Found" className="mb-2" />
        <p className="text-dark/50 mb-2">We couldn't find anything for <span className="font-semibold text-primary">"{query}"</span>.</p>
        <p className="text-dark/30 text-sm">Try different keywords or check your spelling.</p>
      </div>
    );
  }

  // Results State
  return (
    <div className="space-y-4 animate-fade-in">
      {results.map((result) => (
        <SearchResultItem
          key={`${result._type}-${result.id}`}
          result={result}
          query={query}
          onClick={onResultClick}
        />
      ))}
    </div>
  );
}

interface SearchResultItemProps {
  result: SearchResult;
  query: string;
  onClick?: (result: SearchResult) => void;
}

function SearchResultItem({ result, query, onClick }: SearchResultItemProps) {
  const isInsight = result._type === 'insight';
  const href = isInsight ? `/insights/${result.slug}` : `/credentials#${result.id}`;

  const handleClick = () => {
    onClick?.(result);
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className="block group focus:outline-none focus:ring-2 focus:ring-primary/60 rounded-lg transition-shadow"
      tabIndex={0}
      aria-label={result.title}
    >
      <div className="
        p-4 border border-dark/10 rounded-lg
        hover:border-primary/40 hover:shadow-md
        transition-all duration-200
        group-hover:bg-primary/5
        group-focus:bg-primary/10
        flex items-start gap-4
      ">
        {/* Icon */}
        <div className="flex-shrink-0 mt-1">
          {isInsight ? (
            <FileText className="w-5 h-5 text-primary/60" />
          ) : (
            <Building2 className="w-5 h-5 text-secondary/60" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3 className="
            font-medium text-dark mb-2
            group-hover:text-primary transition-colors
            line-clamp-2
            text-base md:text-lg
          ">
            {highlightText(result.title, query)}
          </h3>

          {/* Meta Information */}
          <div className="flex items-center gap-4 text-xs text-dark/50 mb-2">
            <span className="flex items-center gap-1">
              {isInsight ? (
                <>
                  <Calendar className="w-3 h-3" />
                  {formatDate(result.published_date, 'short')}
                </>
              ) : (
                <>
                  <Building2 className="w-3 h-3" />
                  {result.type}
                </>
              )}
            </span>
            
            {isInsight && result.author && (
              <span className="flex items-center gap-1">
                <User className="w-3 h-3" />
                {result.author}
              </span>
            )}
          </div>

          {/* Excerpt/Description */}
          {isInsight && result.excerpt && (
            <p className="text-sm text-dark/60 line-clamp-2 mb-2">
              {highlightText(result.excerpt, query)}
            </p>
          )}

          {/* Category for credentials */}
          {!isInsight && result.category && (
            <p className="text-sm text-dark/60">
              Category: {highlightText(result.category, query)}
            </p>
          )}

          {/* Type badge */}
          <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2
            bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
            {isInsight ? 'Insight' : 'Credential'}
          </div>
        </div>

        {/* Image for insights */}
        {isInsight && result.image_url && (
          <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-dark/10">
            <OptimizedImage
              src={result.image_url}
              alt={result.title}
              width={64}
              height={64}
              className="w-full h-full object-cover"
              quality={85}
              format="webp"
            />
          </div>
        )}
      </div>
    </Link>
  );
}

// Helper function to highlight search terms
function highlightText(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;

  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  
  return parts.map((part, index) => 
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={index} className="bg-primary/20 px-1 rounded">
        {part}
      </mark>
    ) : (
      part
    )
  );
} 