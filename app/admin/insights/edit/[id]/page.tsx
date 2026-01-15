'use client';
import AdminNavbarClient from '@/app/admin/AdminNavbarClient';
import HeroAdmin from '@/components/admin/HeroAdmin';
import InsightForm from '@/components/admin/InsightForm';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Insight } from '@/lib/types/cms';

export default function EditInsightPage() {
  const router = useRouter();
  const params = useParams();
  const [insight, setInsight] = useState<Insight | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInsight() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/insights?id=${params.id}`);
        const data = await res.json();
        let ins = null;
        if (res.ok && data) {
          if (Array.isArray(data.data)) {
            ins = data.data.find((i: Insight) => i.id === params.id) || null;
          } else {
            ins = data.data || data.insight || null;
          }
        }
        setInsight(ins);
      } catch (err) {
        setError('Failed to fetch insight');
      } finally {
        setLoading(false);
      }
    }
    if (params.id) fetchInsight();
  }, [params.id]);

  return (
    <div className="min-h-screen bg-surface">
      <AdminNavbarClient />
      <HeroAdmin title="Edit Insight" description="Update the details for this insight." />
      <div className="container py-8">
        {loading ? (
          <div className="text-dark/50">Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : insight ? (
          <InsightForm
            insight={insight}
            onSuccess={async () => { router.push('/admin/insights?updated=1'); }}
            onClose={() => { router.push('/admin/insights'); }}
          />
        ) : (
          <div className="text-red-500">Insight not found.</div>
        )}
      </div>
    </div>
  );
} 