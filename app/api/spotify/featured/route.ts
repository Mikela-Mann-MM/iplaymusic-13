
import { NextRequest, NextResponse } from 'next/server';
import { getSpotifyData } from '@/lib/spotify';

export async function GET(request: NextRequest) {
  try {
    console.log('Featured playlists route called');

    // Debug: se hvilke cookies der faktisk kommer ind
    console.log('cookie names:', request.cookies.getAll().map(c => c.name));
    const data = await getSpotifyData(
      '/browse/featured-playlists?limit=20',
      { 
        cookies: request.cookies, 
        revalidate: 300, 
        retries: 3 }
    );
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch featured:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    if (errorMessage === 'Token expired') {
      return NextResponse.json(
        { error: 'Token expired', redirect: '/login' }, 
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch featured' }, 
      { status: 500 }
    );
  }
}

export const revalidate = 300;