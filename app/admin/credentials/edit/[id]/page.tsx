'use client';
import AdminNavbarClient from '@/app/admin/AdminNavbarClient';
import HeroAdmin from '@/components/admin/HeroAdmin';
import CredentialForm from '@/components/admin/CredentialForm';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Credential } from '@/lib/types/cms';

export default function EditCredentialPage() {
  const router = useRouter();
  const params = useParams();
  const [credential, setCredential] = useState<Credential | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCredential() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/credentials?id=${params.id}`);
        const data = await res.json();
        let cred = null;
        if (res.ok && data) {
          if (Array.isArray(data.data)) {
            cred = data.data.find((c: Credential) => c.id === params.id) || null;
          } else {
            cred = data.data || data.credential || null;
          }
        }
        setCredential(cred);
      } catch (err) {
        setError('Failed to fetch credential');
      } finally {
        setLoading(false);
      }
    }
    if (params.id) fetchCredential();
  }, [params.id]);

  return (
    <div className="min-h-screen bg-surface">
      <AdminNavbarClient />
      <HeroAdmin title="Edit Credential" description="Update the details for this credential." />
      <div className="container py-8">
        {loading ? (
          <div className="text-dark/50">Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : credential ? (
          <CredentialForm
            credential={credential}
            onSuccess={() => router.push('/admin/credentials?updated=1')}
            onClose={() => router.push('/admin/credentials')}
          />
        ) : (
          <div className="text-red-500">Credential not found.</div>
        )}
      </div>
    </div>
  );
} 