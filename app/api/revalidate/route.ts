// API Route for revalidating Next.js static pages
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

// POST /api/revalidate - Revalidate specific paths or tags
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { path, tag } = body;

    if (path) {
      revalidatePath(path);
    }

    if (tag) {
      // @ts-ignore - Next.js 16 revalidateTag signature change workaround
      revalidateTag(tag, 'default');
    }

    // Always revalidate credentials-related pages
    revalidatePath('/');
    revalidatePath('/credentials');
    revalidatePath('/services');

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      path: path || 'multiple',
      tag: tag || 'credentials'
    });
  } catch (error) {
    console.error('Error revalidating:', error);
    return NextResponse.json(
      { error: 'Error revalidating' },
      { status: 500 }
    );
  }
} 