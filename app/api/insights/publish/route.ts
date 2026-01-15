import { NextRequest, NextResponse } from 'next/server';
import { insightsService } from '@/lib/services/InsightsService';

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }
    // Publish the insight
    const result = await insightsService.publishInsight(id);
    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
    return NextResponse.json({ success: true, data: result.data });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to publish insight' }, { status: 500 });
  }
} 