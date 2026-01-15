"use client";

import CredentialsClient from '@/components/admin/CredentialsClient';
import { Suspense } from 'react';

export default function AdminCredentialsPage() {
  // Middleware handles authentication, so we can just render the page
  console.log('Admin credentials page loading...');

  return (
    <div className="min-h-screen bg-surface">
      <main className="">
        <Suspense fallback={<div>Loading credentials...</div>}>
          <CredentialsClient />
        </Suspense>
      </main>
    </div>
  );
} 