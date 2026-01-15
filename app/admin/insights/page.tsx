"use client";

import InsightsClient from '@/components/admin/InsightsClient';
import { Suspense } from 'react';

export default function AdminInsightsPage() {
  // Middleware handles authentication, so we can just render the page
  console.log('Admin insights page loading...');

  return (
    <div className="min-h-screen bg-surface">
      <main className="">
        <Suspense fallback={<div>Loading insights...</div>}>
          <InsightsClient />
        </Suspense>
      </main>
    </div>
  );
} 