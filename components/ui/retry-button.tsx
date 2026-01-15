'use client'

import React, { useState, useCallback } from 'react';

interface RetryButtonProps {
  onRetry: () => Promise<void> | void;
  maxRetries?: number;
  initialDelay?: number;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export function RetryButton({
  onRetry,
  maxRetries = 3,
  initialDelay = 1000,
  className = '',
  children = 'Retry',
  disabled = false
}: RetryButtonProps) {
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);

  const handleRetry = useCallback(async () => {
    if (retryCount >= maxRetries) {
      setLastError(`Maximum retries (${maxRetries}) exceeded`);
      return;
    }

    setIsRetrying(true);
    setLastError(null);

    try {
      // Exponential backoff delay
      const delay = initialDelay * Math.pow(2, retryCount);
      await new Promise(resolve => setTimeout(resolve, delay));
      
      await onRetry();
      setRetryCount(0); // Reset on success
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setLastError(errorMessage);
      setRetryCount(prev => prev + 1);
    } finally {
      setIsRetrying(false);
    }
  }, [onRetry, retryCount, maxRetries, initialDelay]);

  const isMaxRetriesReached = retryCount >= maxRetries;

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleRetry}
        disabled={disabled || isRetrying || isMaxRetriesReached}
        className={`
          px-4 py-2 rounded-md font-medium transition-all duration-200
          ${isRetrying || disabled
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : isMaxRetriesReached
            ? 'bg-red-100 text-red-700 hover:bg-red-200'
            : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
          }
          ${className}
        `}
      >
        {isRetrying ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Retrying...
          </div>
        ) : isMaxRetriesReached ? (
          'Max Retries Reached'
        ) : (
          children
        )}
      </button>
      
      {retryCount > 0 && !isMaxRetriesReached && (
        <p className="text-sm text-gray-600">
          Retry {retryCount} of {maxRetries}
        </p>
      )}
      
      {lastError && (
        <p className="text-sm text-red-600 max-w-xs text-center">
          {lastError}
        </p>
      )}
    </div>
  );
}

// Hook for managing retry logic
export function useRetry(
  callback: () => Promise<void> | void,
  maxRetries = 3,
  initialDelay = 1000
) {
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);

  const retry = useCallback(async () => {
    if (retryCount >= maxRetries) {
      setLastError(`Maximum retries (${maxRetries}) exceeded`);
      return false;
    }

    setIsRetrying(true);
    setLastError(null);

    try {
      // Exponential backoff delay
      const delay = initialDelay * Math.pow(2, retryCount);
      await new Promise(resolve => setTimeout(resolve, delay));
      
      await callback();
      setRetryCount(0); // Reset on success
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setLastError(errorMessage);
      setRetryCount(prev => prev + 1);
      return false;
    } finally {
      setIsRetrying(false);
    }
  }, [callback, retryCount, maxRetries, initialDelay]);

  const reset = useCallback(() => {
    setRetryCount(0);
    setLastError(null);
    setIsRetrying(false);
  }, []);

  return {
    retry,
    reset,
    retryCount,
    isRetrying,
    lastError,
    isMaxRetriesReached: retryCount >= maxRetries
  };
} 