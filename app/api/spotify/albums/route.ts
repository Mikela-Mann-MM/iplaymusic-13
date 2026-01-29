
import { NextRequest, NextResponse } from 'next/server';
import { getSpotifyData } from '@/lib/spotify';

export async function GET(request: NextRequest) {
  try {
    console.log('Albums route called');

    // Debug: se hvilke cookies der faktisk kommer ind
    console.log('cookie names:', request.cookies.getAll().map(c => c.name));

    const ids = request.nextUrl.searchParams.get('ids');

    if (ids) {
      const data = await getSpotifyData(`/albums?ids=${ids}`, {
        cookies: request.cookies,
        revalidate: 3600,
        retries: 3,
      });

      return NextResponse.json(data);
    }

    const data = await getSpotifyData('/browse/new-releases?limit=50', {
      cookies: request.cookies,
      revalidate: 600,
      retries: 3,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch albums:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    if (errorMessage === 'Token expired') {
      return NextResponse.json(
        { error: 'Token expired', redirect: '/login' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to fetch albums', details: errorMessage },
      { status: 500 }
    );
  }
}

export const revalidate = 600;
