import { NextRequest, NextResponse } from 'next/server';
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

    //UDVIKLINGS FIX - Udkommenter denne linje for altid at vise onboarding
    // const hasCompletedOnboarding = (await cookies()).get('hasCompletedOnboarding')?.value;
    
    //UDVIKLINGS FIX - Hardcod til onboarding
    const hasCompletedOnboarding = false; // Sæt til false for altid at vise onboarding
    
    const redirectUrl = hasCompletedOnboarding ? '/home' : '/onboarding';
    return NextResponse.redirect(new URL(redirectUrl, request.url));

  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.redirect(new URL('/login?error=auth_failed', request.url));
  }
}