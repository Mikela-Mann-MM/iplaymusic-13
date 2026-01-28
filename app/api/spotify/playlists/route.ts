

import { NextResponse } from 'next/server';
import { getSpotifyData } from '@/lib/spotify';

export async function GET() {
  try {
    console.log('Playlists route called'); 
    const data = await getSpotifyData('/me/playlists?limit=50', {
      revalidate: 300,
      retries: 3
    });

    console.log('Playlists fetched successfully');
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch playlists:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    if (errorMessage === 'Token expired') {
      return NextResponse.json(
        { error: 'Token expired', redirect: '/login' }, 
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch playlists' }, 
      { status: 500 }
    );
  }
}

export const revalidate = 300;