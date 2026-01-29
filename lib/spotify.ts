import type { NextRequest } from 'next/server';

type CookieStore = NextRequest['cookies'];

type SpotifyOptions = {
  cookies: CookieStore
  revalidate?: number;
  retries?: number;
};

export async function getSpotifyData(
  endpoint: string,
  options: SpotifyOptions
) {
  console.log('\n🔵 ===== getSpotifyData CALLED =====');
  console.log('🔵 Endpoint:', endpoint);

  const {
    cookies,
    revalidate = 3600,
    retries = 3,
  } = options;

  const accessToken = cookies.get('spotify_access_token')?.value;

  if (!accessToken) {
    console.log('❌ No access token in cookies');
    throw new Error('No access token available');
  }

  console.log('✅ Token found, proceeding with API call');

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        next: { revalidate },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Spotify API error: ${response.status} - ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      if (attempt === retries) throw error;
      await new Promise(r => setTimeout(r, 1000 * attempt));
    }
  }

  throw new Error('Failed after retries');
}
