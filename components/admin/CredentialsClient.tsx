'use client'

import { useState, useEffect } from 'react';
import { useCredentials } from '@/lib/hooks/useCredentials';
import { Credential } from '@/lib/types/cms';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { RetryButton } from '@/components/ui/retry-button';
import { OfflineFallback } from '@/components/ui/offline-fallback';
import CredentialForm from '@/components/admin/CredentialForm';
import { Button } from '@/components/ui/button';
import HeroAdmin from './HeroAdmin';
import { useRouter, useSearchParams } from 'next/navigation';
import Modal from '@/components/ui/modal';

export default function CredentialsClient() {
  const { credentials, loading, error, refetch } = useCredentials({ autoFetch: true });
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [credentialToDelete, setCredentialToDelete] = useState<Credential | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [hasRefetched, setHasRefetched] = useState(false);

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

  const handleEdit = (credential: Credential) => {
    router.push(`/admin/credentials/edit/${credential.id}`);
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(id);
    try {
      const response = await fetch(`/api/credentials?id=${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete credential');
      }
      // Clear all caches and revalidate pages to ensure main site updates
      try {
        await Promise.all([
          fetch('/api/cache/clear', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'credentials' }),
          }),
          fetch('/api/revalidate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tag: 'credentials' }),
          })
        ]);
        window.dispatchEvent(new CustomEvent('credentials-updated'));
        localStorage.setItem('credentials-last-updated', new Date().toISOString());
      } catch (error) {
        console.error('Failed to clear cache or revalidate:', error);
      }
      setIsDeleteModalOpen(false);
      setCredentialToDelete(null);
      // Refresh the list (Next.js App Router)
      router.refresh();
    } catch (error) {
      console.error('Error deleting credential:', error);
      alert(`Failed to delete credential: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <OfflineFallback>
      <ErrorBoundary>
        <HeroAdmin title="Manage Credentials" description="Add, edit, and manage your Platform01 credentials" haveChildren={true} >
          <Button
            onClick={() => router.push('/admin/credentials/add')}
            variant="primary"
            size="default"
          >
            Add Credential
          </Button>
        </HeroAdmin>
        <div className="container py-8">
          {loading && (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dark mx-auto"></div>
              <p className="text-dark/50 mt-4">Loading credentials...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-16">
              <p className="text-red-500 mb-4">Error loading credentials: {error}</p>
              <RetryButton onRetry={refetch} className="bg-dark text-white hover:bg-dark/80">
                Try Again
              </RetryButton>
            </div>
          )}

          {!loading && !error && credentials.length > 0 && (
            <div className="overflow-hidden">
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {credentials.map((credential, index) => (
                  <li key={credential.id || `credential-${index}`}>
                    <div className="p-6 md:p-6  bg-white h-full flex flex-col justify-between">
                      <div className="flex items-start justify-start flex-col gap-2">
                        <div className="mt-2 flex items-center justify-between text-sm w-full">
                          <span className={`inline-flex items-center px-2.5 py-0.5 text-sm font-medium ${
                            credential.is_active 
                              ? 'bg-secondary/5 text-secondary' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {credential.is_active ? 'Active' : 'Inactive'}
                          </span>
                          <span className="ml-4 text-xs text-dark/50">
                            Created: {new Date(credential.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="mt-4 flex items-center text-xs text-gray-500">
                          <span className="block max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                            ID: {credential.id || 'No ID'}
                          </span>
                        </div>
                        <h5 className="text-dark block max-w-full overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', whiteSpace: 'normal' }}>
                          {credential.title}
                        </h5>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {credential.industry_tags?.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium bg-surface text-dark/50"
                            >
                              Industry: {tag}
                            </span>
                          ))}
                          {credential.service_tags?.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium  bg-surface text-dark/50"
                            >
                              Service: {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4 flex space-x-2 w-full">
                        <Button
                          onClick={() => {
                            setCredentialToDelete(credential);
                            setIsDeleteModalOpen(true);
                          }}
                          disabled={isDeleting === credential.id}
                          variant="ghost"
                          size="default"
                          className="!w-full "
                        >
                          {isDeleting === credential.id ? 'Deleting...' : 'Delete'}
                        </Button>
                        <Button
                          onClick={() => handleEdit(credential)}
                          variant="secondary"
                          size="default"
                          className='!w-full bg-surface text-dark'
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!loading && !error && credentials.length === 0 && (
            <div className="text-center py-16">
              <p className="text-dark/50 text-lg mb-4">No credentials found.</p>
              <Button
                onClick={() => router.push('/admin/credentials/add')}
                variant="secondary"
                size="default"
              >
                Add Your First Credential
              </Button>
            </div>
          )}
        </div>
      </ErrorBoundary>
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Delete Credential?">
        <div className="space-y-6">
          <div className="text-dark text-lg font-medium">
            Are you sure you want to delete this credential?
          </div>
          <div className="text-dark/60 text-sm">
            <span className="font-semibold">{credentialToDelete?.title}</span>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => setIsDeleteModalOpen(false)} className="border border-dark/10 rounded-none">Cancel</Button>
            <Button
              variant="secondary"
              className="bg-red-600 text-white rounded-none"
              onClick={() => credentialToDelete && handleDelete(credentialToDelete.id)}
              disabled={isDeleting === credentialToDelete?.id}
            >
              {isDeleting === credentialToDelete?.id ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </div>
      </Modal>
    </OfflineFallback>
  );
} 