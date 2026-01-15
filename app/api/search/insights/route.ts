import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

function sanitizeQuery(query: string): string {
  // Remove or escape characters that break Supabase .or() filter (e.g., commas)
  // For now, just remove commas and trim whitespace
  return query.replace(/,/g, ' ').replace(/\s+/g, ' ').trim();
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    let query = searchParams.get('q') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    query = sanitizeQuery(query);
    if (!query || query.length < 2) {
      return NextResponse.json({ 
        data: [], 
        total: 0, 
        page, 
        limit,
        message: 'Please enter at least 2 characters to search.' 
      });
    }

    const supabase = supabaseAdmin;

    // Full-text search using PostgreSQL's built-in search capabilities
    let { data: insights, error, count } = await supabase
      .from('insights')
      .select('*', { count: 'exact' })
      .eq('is_published', true)
      .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%,author.ilike.%${query}%`)
      .order('published_date', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      // If the error is due to invalid .or() syntax, return a user-friendly error
      if (error.message && error.message.includes('syntax error')) {
        return NextResponse.json(
          { error: 'Your search contains invalid characters. Please try a different query.' },
          { status: 400 }
        );
      }
      console.error('Search error:', error);
      return NextResponse.json(
        { error: 'Failed to search insights. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      data: insights || [],
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
      query
    });

  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
} 