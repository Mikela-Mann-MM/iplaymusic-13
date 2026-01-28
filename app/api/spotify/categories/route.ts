

import { NextResponse } from 'next/server';
import { getSpotifyData } from '@/lib/spotify';

export async function GET() {
  try {
    const data = await getSpotifyData(
      '/browse/categories?limit=50',
      { revalidate: 3600, retries: 3 }
    );
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    if (errorMessage === 'Token expired') {
      return NextResponse.json(
        { error: 'Token expired', redirect: '/login' }, 
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch categories' }, 
      { status: 500 }
    );
  }
}

export const revalidate = 3600;