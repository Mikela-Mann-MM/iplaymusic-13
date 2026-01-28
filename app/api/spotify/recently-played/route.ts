

import { NextResponse } from 'next/server';
import { getSpotifyData } from '@/lib/spotify';

export async function GET() {
  try {
    const data = await getSpotifyData(
      '/me/player/recently-played?limit=10',
      { revalidate: 60, retries: 3 }
    );
    
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    if (errorMessage === 'Token expired') {
      return NextResponse.json(
        { error: 'Token expired', redirect: '/login' }, 
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch recently played' }, 
      { status: 500 }
    );
  }
}

export const revalidate = 60; // 1 minut