import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const type = searchParams.get('type') || ''; // 'Industry' or 'Service'
    const category = searchParams.get('category') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    let supabaseQuery = supabaseAdmin
      .from('credentials')
      .select('*', { count: 'exact' })
      .eq('is_active', true);

    // Apply type filter
    if (type) {
      supabaseQuery = supabaseQuery.eq('type', type);
    }

    // Apply category filter
    if (category) {
      supabaseQuery = supabaseQuery.eq('category', category);
    }

    // Apply search query
    if (query.trim()) {
      supabaseQuery = supabaseQuery.or(`title.ilike.%${query}%,category.ilike.%${query}%`);
    }

    // Apply pagination and ordering
    const { data: credentials, error, count } = await supabaseQuery
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Credentials search error:', error);
      return NextResponse.json(
        { error: 'Failed to search credentials' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      data: credentials || [],
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
      query,
      filters: { type, category }
    });

  } catch (error) {
    console.error('Credentials search API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 