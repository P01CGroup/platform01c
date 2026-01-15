'use client';

import HeroAdmin from '@/components/admin/HeroAdmin';
import { useEffect, useState } from 'react';
import { BadgeCheck, Users, FileText, CheckCircle } from 'lucide-react';

// Add a type for static pages
interface StaticPage {
  slug: string;
  seo: {
    title?: string;
    description?: string;
    [key: string]: any;
  };
}

export default function AdminRootPage() {
  const [stats, setStats] = useState({
    totalCredentials: 0,
    activeCredentials: 0,
    totalInsights: 0,
    publishedInsights: 0,
  });
  useEffect(() => {
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);
  // Middleware handles authentication, so we can just render the dashboard
  console.log('Admin dashboard loading...');

  // Fetch statistics
  // let stats = {
  //   totalCredentials: 0,
  //   activeCredentials: 0,
  //   totalInsights: 0,
  //   publishedInsights: 0,
  // };

  // try {
  //   // Get credentials stats
  //   // const credentialsResult = await credentialsService.getCredentials(); // This line is removed
  //   // const allCredentials = credentialsResult.data || []; // This line is removed
  //   // const activeCredentials = allCredentials.filter(c => c.is_active); // This line is removed

  //   // Get insights stats
  //   // const insightsResult = await insightsService.getInsights({}, { page: 1, pageSize: 1000 }); // This line is removed
  //   // const allInsights = insightsResult.data || []; // This line is removed
  //   // const publishedInsights = allInsights.filter((i: any) => i.is_published); // This line is removed

  //   stats = {
  //     totalCredentials: 0, // Placeholder, as credentialsService is removed
  //     activeCredentials: 0, // Placeholder, as credentialsService is removed
  //     totalInsights: 0, // Placeholder, as insightsService is removed
  //     publishedInsights: 0, // Placeholder, as insightsService is removed
  //   };
  // } catch (error) {
  //   console.error('Failed to fetch dashboard stats:', error);
  // }

  return (
    <div className="min-h-screen bg-surface">
      <HeroAdmin title="Admin Dashboard" description="Manage your Platform01 content and monitor performance" />
      <main className="pt-8">
        <div className="container">

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            <div className="bg-white flex justify-start items-center p-6 border border-dark/10 gap-4">
              <div className="bg-surface text-dark p-5">
                <BadgeCheck size={28} />
              </div>
              <div className="flex flex-col items-start justify-center">
                <div className="text-3xl font-heading">{stats.totalCredentials}</div>
                <div className="text-sm text-gray-500">Total Credentials</div>
              </div>
            </div>
            <div className="bg-white flex justify-start items-center p-6 border border-dark/10 gap-4">
              <div className="bg-surface text-dark p-5">
              <Users size={28} />
              </div>
              <div className="flex flex-col items-start justify-center">
                <div className="text-3xl font-heading">{stats.activeCredentials}</div>
                <div className="text-sm text-gray-500">Active Credentials</div>
              </div>
            </div>
            <div className="bg-white flex justify-start items-center p-6 border border-dark/10 gap-4">
              <div className="bg-surface text-dark p-5">
              <FileText size={28} />
              </div>
              <div className="flex flex-col items-start justify-center">
                <div className="text-3xl font-heading">{stats.totalInsights}</div>
                <div className="text-sm text-gray-500">Total Insights</div>
              </div>
            </div>
            <div className="bg-white flex justify-start items-center p-6 border border-dark/10 gap-4">
              <div className="bg-surface text-dark p-5">
              <CheckCircle size={28} />
              </div>
              <div className="flex flex-col items-start justify-center">
                <div className="text-3xl font-heading">{stats.publishedInsights}</div>
                <div className="text-sm text-gray-500">Published Insights</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-dark/10">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="heading-4 font-heading font-normal text-dark mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <a
                  href="/admin/credentials"
                  className="relative border border-dark/10 bg-white px-6 py-5 flex-col flex items-start gap-4 space-x-3 hover:border-dark/20 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-dark"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-surface flex items-center justify-center">
                    <svg className="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-2xl font-heading text-dark font-normal">
                      Manage <br /> Credentials
                    </p>
                    <p className="text-sm font-sans text-dark/50">
                      Add, edit, or remove credentials
                    </p>
                  </div>
                </a>

                <a
                  href="/admin/insights"
                  className="relative border border-dark/10 bg-white px-6 py-5 flex-col flex items-start gap-4 space-x-3 hover:border-dark/20 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-dark"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-surface flex items-center justify-center">
                    <svg className="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-2xl font-heading text-dark font-normal">
                      Manage <br /> Insights
                    </p>
                    <p className="text-sm font-sans text-dark/50">
                      Create and publish insights
                    </p>
                  </div>
                </a>

                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative border border-dark/10 bg-white px-6 py-5 flex-col flex items-start gap-4 space-x-3 hover:border-dark/20 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-dark"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-surface flex items-center justify-center">
                  <svg className="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-2xl font-heading text-dark font-normal">
                      Visit <br /> Live Web
                    </p>
                    <p className="text-sm font-sans text-dark/50">
                      Preview your changes
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
} 