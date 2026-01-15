'use client';
import AdminNavbarClient from '@/app/admin/AdminNavbarClient';
import HeroAdmin from '@/components/admin/HeroAdmin';
import InsightForm from '@/components/admin/InsightForm';
import { useRouter } from 'next/navigation';
import React from 'react';
import InsightsClient from '@/components/admin/InsightsClient';

export default function AddInsightPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-surface">
      <AdminNavbarClient />
      <HeroAdmin title="Add Insight" description="Create a new insight for Platform01." />
      <div className="container py-8">
        <InsightForm 
          onSuccess={async () => { router.push('/admin/insights?updated=1'); }}
          onClose={() => { router.push('/admin/insights'); }}
        />
      </div>
    </div>
  );
} 