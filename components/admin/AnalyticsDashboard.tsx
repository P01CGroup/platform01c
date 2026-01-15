'use client';

import React, { useState, useEffect } from 'react';
import { BarChart3, Search, Eye, Clock, TrendingUp, Users } from 'lucide-react';

interface AnalyticsData {
  contentViews: {
    totalViews: number;
    viewsByType: Record<string, number>;
    viewsByDay: Record<string, number>;
    topContent: Record<string, number>;
  };
  searchAnalytics: {
    totalSearches: number;
    popularQueries: Record<string, number>;
    searchesByType: Record<string, number>;
    searchesByDay: Record<string, number>;
  };
  performance: {
    avgResponseTime: number;
    maxResponseTime: number;
    minResponseTime: number;
    metricsByType: Record<string, number>;
    metricsByEndpoint: Record<string, number>;
  };
}

interface AnalyticsDashboardProps {
  days?: number;
}

export default function AnalyticsDashboard({ days = 30 }: AnalyticsDashboardProps) {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, [days]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch content views
      const viewsResponse = await fetch(`/api/analytics/views?days=${days}`);
      const viewsData = await viewsResponse.json();

      // Fetch search analytics (we'll create this endpoint later)
      const searchResponse = await fetch(`/api/analytics/search?days=${days}`);
      const searchData = await searchResponse.json();

      // Fetch performance metrics (we'll create this endpoint later)
      const performanceResponse = await fetch(`/api/analytics/performance?days=${days}`);
      const performanceData = await performanceResponse.json();

      setAnalytics({
        contentViews: viewsData,
        searchAnalytics: searchData,
        performance: performanceData
      });
    } catch (err) {
      setError('Failed to load analytics data');
      console.error('Analytics fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dark mx-auto mb-4"></div>
          <p className="text-dark/50">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">Error: {error}</p>
        <button
          onClick={fetchAnalytics}
          className="px-4 py-2 bg-dark text-white rounded-lg hover:bg-dark/80 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center py-12">
        <p className="text-dark/50">No analytics data available.</p>
      </div>
    );
  }

  const { contentViews, searchAnalytics, performance } = analytics;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="heading-3 text-dark">Analytics Dashboard</h2>
          <p className="text-dark/50 mt-1">Last {days} days</p>
        </div>
        <button
          onClick={fetchAnalytics}
          className="px-4 py-2 text-sm border border-dark/20 rounded-lg hover:border-dark/30 transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Views"
          value={contentViews.totalViews}
          icon={Eye}
          trend="+12%"
          trendUp={true}
        />
        <MetricCard
          title="Total Searches"
          value={searchAnalytics.totalSearches}
          icon={Search}
          trend="+8%"
          trendUp={true}
        />
        <MetricCard
          title="Avg Response Time"
          value={`${performance.avgResponseTime?.toFixed(2) || '0'}ms`}
          icon={Clock}
          trend="-5%"
          trendUp={false}
        />
        <MetricCard
          title="Active Users"
          value="1,234"
          icon={Users}
          trend="+15%"
          trendUp={true}
        />
      </div>

      {/* Content Views Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-dark/10 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Eye className="w-5 h-5 text-dark/60" />
            <h3 className="font-medium text-dark">Content Views by Type</h3>
          </div>
          <div className="space-y-3">
            {Object.entries(contentViews.viewsByType || {}).map(([type, count]) => (
              <div key={type} className="flex items-center justify-between">
                <span className="text-sm text-dark/60 capitalize">{type}</span>
                <span className="font-medium text-dark">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-dark/10 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Search className="w-5 h-5 text-dark/60" />
            <h3 className="font-medium text-dark">Search Activity</h3>
          </div>
          <div className="space-y-3">
            {Object.entries(searchAnalytics.searchesByType || {}).map(([type, count]) => (
              <div key={type} className="flex items-center justify-between">
                <span className="text-sm text-dark/60 capitalize">{type}</span>
                <span className="font-medium text-dark">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Searches */}
      <div className="bg-white border border-dark/10 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-dark/60" />
          <h3 className="font-medium text-dark">Popular Search Queries</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(searchAnalytics.popularQueries || {})
            .slice(0, 9)
            .map(([query, count]) => (
              <div key={query} className="flex items-center justify-between p-3 bg-surface/30 rounded-lg">
                <span className="text-sm text-dark/70 truncate flex-1">{query}</span>
                <span className="text-xs text-dark/50 ml-2">{count}</span>
              </div>
            ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white border border-dark/10 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-5 h-5 text-dark/60" />
          <h3 className="font-medium text-dark">Performance Metrics</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-dark mb-1">
              {performance.avgResponseTime?.toFixed(2) || '0'}ms
            </div>
            <div className="text-sm text-dark/50">Average Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-dark mb-1">
              {performance.maxResponseTime?.toFixed(2) || '0'}ms
            </div>
            <div className="text-sm text-dark/50">Max Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-dark mb-1">
              {performance.minResponseTime?.toFixed(2) || '0'}ms
            </div>
            <div className="text-sm text-dark/50">Min Response Time</div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  trend: string;
  trendUp: boolean;
}

function MetricCard({ title, value, icon: Icon, trend, trendUp }: MetricCardProps) {
  return (
    <div className="bg-white border border-dark/10 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <Icon className="w-6 h-6 text-dark/40" />
        <span className={`text-sm font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
          {trend}
        </span>
      </div>
      <div className="text-2xl font-bold text-dark mb-1">{value}</div>
      <div className="text-sm text-dark/50">{title}</div>
    </div>
  );
} 