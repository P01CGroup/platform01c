import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function POST(request: NextRequest) {
  try {
    const { contentId, contentType, userId, userAgent, referrer } = await request.json();

    if (!contentId || !contentType) {
      return NextResponse.json(
        { error: 'Missing required fields: contentId, contentType' },
        { status: 400 }
      );
    }

    // Insert view record
    const { error } = await supabaseAdmin
      .from('content_views')
      .insert({
        content_id: contentId,
        content_type: contentType,
        user_id: userId || null,
        user_agent: userAgent || null,
        referrer: referrer || null,
        viewed_at: new Date().toISOString()
      });

    if (error) {
      console.error('Analytics error:', error);
      return NextResponse.json(
        { error: 'Failed to record view' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contentType = searchParams.get('type');
    const days = parseInt(searchParams.get('days') || '30');

    let query = supabaseAdmin
      .from('content_views')
      .select('*');

    if (contentType) {
      query = query.eq('content_type', contentType);
    }

    // Filter by date range
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    query = query.gte('viewed_at', startDate.toISOString());

    const { data: views, error } = await query;

    if (error) {
      console.error('Analytics fetch error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch analytics' },
        { status: 500 }
      );
    }

    // Aggregate data
    const analytics = {
      totalViews: views?.length || 0,
      viewsByType: {} as Record<string, number>,
      viewsByDay: {} as Record<string, number>,
      topContent: {} as Record<string, number>
    };

    views?.forEach(view => {
      // Count by content type
      analytics.viewsByType[view.content_type] = (analytics.viewsByType[view.content_type] || 0) + 1;
      
      // Count by day
      const day = view.viewed_at.split('T')[0];
      analytics.viewsByDay[day] = (analytics.viewsByDay[day] || 0) + 1;
      
      // Count by content
      analytics.topContent[view.content_id] = (analytics.topContent[view.content_id] || 0) + 1;
    });

    return NextResponse.json(analytics);

  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 