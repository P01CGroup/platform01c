import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const type = searchParams.get('type') || 'all'; // 'all', 'insights', 'credentials'
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    if (!query.trim()) {
      return NextResponse.json({ 
        data: [], 
        total: 0, 
        page, 
        limit,
        message: 'No search query provided' 
      });
    }

    let results: any[] = [];
    let totalCount = 0;

    // Search insights if type is 'all' or 'insights'
    if (type === 'all' || type === 'insights') {
      const { data: insights, error: insightsError, count: insightsCount } = await supabaseAdmin
        .from('insights')
        .select('*', { count: 'exact' })
        .eq('is_published', true)
        .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%,author.ilike.%${query}%`)
        .order('published_date', { ascending: false });

      if (insightsError) {
        console.error('Insights search error:', insightsError);
      } else {
        const insightsWithType = (insights || []).map(insight => ({
          ...insight,
          _type: 'insight',
          _searchScore: calculateSearchScore(insight, query)
        }));
        results.push(...insightsWithType);
        totalCount += insightsCount || 0;
      }
    }

    // Search credentials if type is 'all' or 'credentials'
    if (type === 'all' || type === 'credentials') {
      const { data: credentials, error: credentialsError, count: credentialsCount } = await supabaseAdmin
        .from('credentials')
        .select('*', { count: 'exact' })
        .eq('is_active', true)
        .or(`title.ilike.%${query}%,category.ilike.%${query}%`)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (credentialsError) {
        console.error('Credentials search error:', credentialsError);
      } else {
        const credentialsWithType = (credentials || []).map(credential => ({
          ...credential,
          _type: 'credential',
          _searchScore: calculateSearchScore(credential, query)
        }));
        results.push(...credentialsWithType);
        totalCount += credentialsCount || 0;
      }
    }

    // Sort by search score and apply pagination
    results.sort((a, b) => b._searchScore - a._searchScore);
    const paginatedResults = results.slice(offset, offset + limit);

    return NextResponse.json({
      data: paginatedResults,
      total: totalCount,
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit),
      query,
      type,
      breakdown: {
        insights: results.filter(r => r._type === 'insight').length,
        credentials: results.filter(r => r._type === 'credential').length
      }
    });

  } catch (error) {
    console.error('Unified search API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Simple search score calculation
function calculateSearchScore(item: any, query: string): number {
  const queryLower = query.toLowerCase();
  let score = 0;

  // Title matches get highest score
  if (item.title?.toLowerCase().includes(queryLower)) {
    score += 10;
  }

  // Exact title match gets bonus
  if (item.title?.toLowerCase() === queryLower) {
    score += 5;
  }

  // Excerpt/content matches
  if (item.excerpt?.toLowerCase().includes(queryLower)) {
    score += 3;
  }

  if (item.content?.toLowerCase().includes(queryLower)) {
    score += 2;
  }

  // Author matches
  if (item.author?.toLowerCase().includes(queryLower)) {
    score += 2;
  }

  // Category matches (for credentials)
  if (item.category?.toLowerCase().includes(queryLower)) {
    score += 2;
  }

  return score;
} 