import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Loader2 } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  loading?: boolean;
  className?: string;
  onClear?: () => void;
  autoFocus?: boolean;
  minLength?: number;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search...',
  loading = false,
  className = '',
  onClear,
  autoFocus = false,
  minLength = 2
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleClear = () => {
    onChange('');
    onClear?.();
    inputRef.current?.focus();
  };

  return (
    <div className={`relative ${className}`}>
              <div className={`
          relative flex items-center w-full
          transition-all duration-200
          ${isFocused ? 'border-dark/40' : 'hover:border-dark/30'}
          ${loading ? 'bg-surface' : 'bg-surface'}
          ${value.trim().length > 0 && value.trim().length < minLength ? 'border-yellow-400' : ''}
        `}>
        {/* Search Icon */}
        <div className="absolute left-3 text-dark/40">
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Search className="w-4 h-4" />
          )}
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`
            w-full pl-10 pr-10 py-3
            bg-transparent border-none outline-none
            text-dark placeholder:text-dark/40
            text-sm md:text-base
          `}
          disabled={loading}
        />

                  {/* Clear Button */}
          {value && !loading && (
            <button
              onClick={handleClear}
              className="absolute right-3 p-1 text-dark/40 hover:text-dark/60 transition-colors"
              type="button"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Minimum Length Indicator */}
          {value.trim().length > 0 && value.trim().length < minLength && (
            <div className="absolute right-10 text-xs text-yellow-600">
              {minLength - value.trim().length} more
            </div>
          )}
      </div>
    </div>
  );
} 