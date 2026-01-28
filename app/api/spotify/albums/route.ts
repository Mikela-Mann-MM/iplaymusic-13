

import { NextResponse } from 'next/server';
import { getSpotifyData } from '@/lib/spotify';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const ids = searchParams.get('ids');
    
    if (ids) {
      const data = await getSpotifyData(
        `/albums?ids=${ids}`,
        { revalidate: 3600, retries: 3 }
      );
      return NextResponse.json(data);
    }
    
    const data = await getSpotifyData(
      '/browse/new-releases?limit=50',
      { revalidate: 600, retries: 3 }
    );
    
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
      { error: 'Failed to fetch albums' }, 
      { status: 500 }
    );
  }
}

export const revalidate = 600;