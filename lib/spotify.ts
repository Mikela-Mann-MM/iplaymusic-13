/* 

import { cookies } from 'next/headers';

interface FetchOptions {
  revalidate?: number;
  retries?: number;
}

export async function getSpotifyData(
  endpoint: string, 
  options: FetchOptions = { revalidate: 60, retries: 3 }
) {

console.log('getSpotifyData called for:', endpoint);

  const cookieStore = await cookies();
  const token = cookieStore.get('spotify_access_token')?.value;
console.log('Token from cookies:', token ? token.substring(0, 20) + '...' : 'NOT FOUND'); 

  if (!token) {
    throw new Error('No access token available');
  }

  let lastError;
  
  for (let attempt = 0; attempt < (options.retries || 3); attempt++) {
    try {
      const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        next: { 
          revalidate: options.revalidate || 60
        }
      });

      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : Math.pow(2, attempt) * 1000;
        
        console.warn(`Rate limited. Waiting ${waitTime}ms before retry ${attempt + 1}`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }

      if (response.status === 401) {
        throw new Error('Token expired');
      }

      if (!response.ok) {
        console.error('Spotify API error:', response.status);
        throw new Error(`Spotify API error: ${response.status}`);
      }
      console.log('Spotify API call successful');
      return response.json();
    } catch (error) {
      lastError = error;
      
      if (attempt < (options.retries || 3) - 1) {
        const backoffTime = Math.pow(2, attempt) * 1000;
        console.warn(`Request failed. Retrying in ${backoffTime}ms...`);
        await new Promise(resolve => setTimeout(resolve, backoffTime));
      }
    }
  }

  throw lastError;
}

export async function getSpotifyBatch(
  baseEndpoint: string,
  ids: string[],
  options?: FetchOptions
) {
  const chunks = [];
  for (let i = 0; i < ids.length; i += 50) {
    chunks.push(ids.slice(i, i + 50));
  }

  const results = await Promise.all(
    chunks.map(chunk => 
      getSpotifyData(`${baseEndpoint}?ids=${chunk.join(',')}`, options)
    )
  );

  return results.flat();
} */

// lib/spotify.ts
import { cookies } from 'next/headers'

export async function getSpotifyData(
  endpoint: string,
  options: { revalidate?: number; retries?: number } = {}
) {
  console.log('\n🔵 ===== getSpotifyData CALLED =====')
  console.log('🔵 Endpoint:', endpoint)

  const { revalidate = 3600, retries = 3 } = options
  
  // Try to get token from cookies first (server-side)
  let accessToken: string | undefined

  try {
    const cookieStore = await cookies()
    const tokenCookie = cookieStore.get('spotify_access_token')
    accessToken = tokenCookie?.value
  } catch (error) {
    // Cookies not available (client-side or error)
    console.log('🔵 Cookies not available, will use client header')
  }

  if (!accessToken) {
    console.log('❌ No access token in cookies')
    throw new Error('No access token available')
  }

  console.log('✅ Token found, proceeding with API call')

  /* // Retry logic for API calls
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        next: { revalidate },
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Spotify API error: ${response.status} - ${errorText}`)
      }

      const data = await response.json()
      console.log('✅ Successfully fetched data from Spotify')
      return data
    } catch (error) {
      console.error(`❌ Attempt ${attempt} failed:`, error)
      if (attempt === retries) {
        throw error
      }
      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempt))
    }
  }

  // This should never be reached due to throw in catch block
  throw new Error('Failed to fetch data after all retries')
} */}