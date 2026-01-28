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

  import { cookies } from 'next/headers';

interface FetchOptions {
  revalidate?: number;
  retries?: number;
}

export async function getSpotifyData(
  endpoint: string, 
  options: FetchOptions = { revalidate: 60, retries: 3 }
) {
  console.log('\n🔵 ===== getSpotifyData CALLED =====');
  console.log('🔵 Endpoint:', endpoint);
  
  const cookieStore = await cookies();
  
  // List all cookies
  const allCookies = cookieStore.getAll();
  console.log('🔵 Total cookies found:', allCookies.length);
  console.log('🔵 Cookie names:', allCookies.map(c => c.name));
  
  const token = cookieStore.get('spotify_access_token')?.value;
  
  console.log('🔵 spotify_access_token found:', token ? 'YES - ' + token.substring(0, 20) + '...' : 'NO');

  if (!token) {
    console.error('❌ No access token available');
    console.error('❌ Available cookies:', allCookies.map(c => `${c.name}=${c.value.substring(0, 10)}...`));
    throw new Error('No access token available');
  }

  console.log('✅ Token found, proceeding with API call');

  let lastError;
  
  for (let attempt = 0; attempt < (options.retries || 3); attempt++) {
    try {
      console.log(`🔵 Attempt ${attempt + 1} - Calling Spotify API...`);
      
      const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        next: { 
          revalidate: options.revalidate || 60
        }
      });

      console.log('🔵 Spotify API response status:', response.status);

      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : Math.pow(2, attempt) * 1000;
        
        console.warn(`⚠️ Rate limited. Waiting ${waitTime}ms before retry ${attempt + 1}`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }

      if (response.status === 401) {
        console.error('❌ Token expired (401)');
        throw new Error('Token expired');
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Spotify API error:', response.status, errorText);
        throw new Error(`Spotify API error: ${response.status}`);
      }

      console.log('✅ Spotify API call successful');
      console.log('🔵 ===== getSpotifyData ENDED =====\n');
      return response.json();
    } catch (error) {
      console.error('❌ Request failed:', error);
      lastError = error;
      
      if (attempt < (options.retries || 3) - 1) {
        const backoffTime = Math.pow(2, attempt) * 1000;
        console.warn(`⚠️ Retrying in ${backoffTime}ms...`);
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
}