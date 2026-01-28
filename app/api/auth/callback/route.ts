/* import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    console.error('Spotify auth error:', error);
    return NextResponse.redirect(new URL('/login?error=access_denied', request.url));
  }

  if (!code) {
    console.error('No code provided');
    return NextResponse.redirect(new URL('/login?error=no_code', request.url));
  }

  try {
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
      },
      body: new URLSearchParams({
        code,
        redirect_uri: REDIRECT_URI!,
        grant_type: 'authorization_code'
      })
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      console.error('Token exchange failed:', errorData);
      throw new Error('Failed to exchange code for token');
    }

    const data = await tokenResponse.json();
    console.log('Access token received successfully');
    console.log('🔵 Token preview:', data.access_token.substring(0, 20) + '...'); 
    console.log('🔵 Expires in:', data.expires_in, 'seconds');

    const cookieStore = await cookies();
    
    cookieStore.set('spotify_access_token', data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: data.expires_in,
      path: '/'
    });
    
    cookieStore.set('spotify_refresh_token', data.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
      path: '/'
    });

    cookieStore.set('isLoggedIn', 'true', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
      path: '/'
    });

    console.log('Cookies set with maxAge:', data.expires_in);

    // TEST: Læs cookien med det samme
    const testToken = cookieStore.get('spotify_access_token')?.value;
    console.log('🔵 Cookie read test:', testToken ? testToken.substring(0, 20) + '...' : 'NOT FOUND'); 

    //UDVIKLINGS FIX - Udkommenter denne linje for altid at vise onboarding
    // const hasCompletedOnboarding = (await cookies()).get('hasCompletedOnboarding')?.value;
    
    //UDVIKLINGS FIX - Hardcod til onboarding
    const hasCompletedOnboarding = false; // Sæt til false for altid at vise onboarding
    
    const redirectUrl = hasCompletedOnboarding ? '/home' : '/onboarding';
    console.log('Redirecting to:', redirectUrl);
    return NextResponse.redirect(new URL(redirectUrl, request.url));

  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.redirect(new URL('/login?error=auth_failed', request.url));
  }
} */

import { NextRequest, NextResponse } from 'next/server';

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;

export async function GET(request: NextRequest) {
  console.log('\n🔵 ===== CALLBACK STARTED =====');
  
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    console.error('❌ Spotify auth error:', error);
    return NextResponse.redirect(new URL('/login?error=access_denied', request.url));
  }

  if (!code) {
    console.error('❌ No code provided');
    return NextResponse.redirect(new URL('/login?error=no_code', request.url));
  }

  try {
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
      },
      body: new URLSearchParams({
        code,
        redirect_uri: REDIRECT_URI!,
        grant_type: 'authorization_code'
      })
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      console.error('❌ Token exchange failed:', errorData);
      throw new Error('Failed to exchange code for token');
    }

    const data = await tokenResponse.json();
    console.log('✅ Token received from Spotify');
    console.log('🔵 Token preview:', data.access_token?.substring(0, 30) + '...');

    // Create redirect response to onboarding
    const redirectUrl = new URL('/onboarding', request.url);
    const response = NextResponse.redirect(redirectUrl);

    // Set cookies with VERY permissive settings for development
    const cookieSettings = {
      httpOnly: true,
      secure: false,  // Must be false in development (http://)
      sameSite: 'lax' as const,
      path: '/',
      // NO domain property - let browser handle it
    };

    // Set access token (expires in 1 hour typically)
    response.cookies.set('spotify_access_token', data.access_token, {
      ...cookieSettings,
      maxAge: data.expires_in, // Usually 3600 (1 hour)
    });
    console.log('✅ Set spotify_access_token cookie');
    
    // Set refresh token (long-lived)
    response.cookies.set('spotify_refresh_token', data.refresh_token, {
      ...cookieSettings,
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    console.log('✅ Set spotify_refresh_token cookie');
    
    // Set login flag (client can read this one)
    response.cookies.set('isLoggedIn', 'true', {
      httpOnly: false, // Client needs to read this
      secure: false,
      sameSite: 'lax' as const,
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    });
    console.log('✅ Set isLoggedIn cookie');

    console.log('✅ All cookies set, returning redirect response');
    console.log('🔵 ===== CALLBACK ENDED =====\n');
    
    return response;

  } catch (error) {
    console.error('❌ Authentication error:', error);
    return NextResponse.redirect(new URL('/login?error=auth_failed', request.url));
  }
}