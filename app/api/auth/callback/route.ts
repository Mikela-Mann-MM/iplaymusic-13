/* import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  const error = request.nextUrl.searchParams.get('error');

  if (error || !code) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI!;
    const clientId = process.env.SPOTIFY_CLIENT_ID!;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;

    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      console.error('Spotify token error:', errorData);
      return NextResponse.redirect(new URL('/login?error=token_failed', request.url));
    }

    const tokens = await tokenResponse.json();

    //byg response først, og sæt cookies på den
    const res = NextResponse.redirect(new URL('/onboarding', request.url));

    res.cookies.set('spotify_access_token', tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: tokens.expires_in,
      path: '/',
    });

    if (tokens.refresh_token) {
      res.cookies.set('spotify_refresh_token', tokens.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });
    }

    // hvis splash bruger den:
    res.cookies.set('isLoggedIn', 'true', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });

    return res;
  } catch (e) {
    console.error('Callback error:', e);
    return NextResponse.redirect(new URL('/login?error=auth_failed', request.url));
  }
}
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  const error = request.nextUrl.searchParams.get('error');

  if (error || !code) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI!;
    const clientId = process.env.SPOTIFY_CLIENT_ID!;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;

    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      console.error('Spotify token error:', errorData);
      return NextResponse.redirect(new URL('/login?error=token_failed', request.url));
    }

    const tokens = await tokenResponse.json();

    console.log('✅ Tokens received:', {
      has_access_token: !!tokens.access_token,
      has_refresh_token: !!tokens.refresh_token,
      expires_in: tokens.expires_in
    });

    // VIGTIGT: Brug cookies() function i Next.js 15
    const cookieStore = await cookies();
    
    // Sæt access token cookie
    cookieStore.set('spotify_access_token', tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: tokens.expires_in,
      path: '/',
    });

    console.log('✅ Set spotify_access_token cookie');

    // Sæt refresh token cookie
    if (tokens.refresh_token) {
      cookieStore.set('spotify_refresh_token', tokens.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 dage
        path: '/',
      });
      console.log('✅ Set spotify_refresh_token cookie');
    }

    // Sæt isLoggedIn cookie (bruges af splash)
    cookieStore.set('isLoggedIn', 'true', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 dage
      path: '/',
    });

    console.log('✅ Set isLoggedIn cookie');

    // DEV MODE: Altid vis onboarding (udkommentér når du vil have prod behavior)
    const DEV_MODE = true; // Sæt til false for produktion
    
    if (DEV_MODE) {
      console.log('🔧 DEV MODE: Altid vis onboarding');
      return NextResponse.redirect(new URL('/onboarding', request.url));
    }

    // PROD MODE: Tjek om bruger allerede har completed onboarding
    const hasCompletedOnboarding = cookieStore.get('hasCompletedOnboarding')?.value === 'true';

    // Redirect baseret på onboarding status
    const redirectUrl = hasCompletedOnboarding ? '/home' : '/onboarding';

    console.log('✅ All cookies set, redirecting to:', redirectUrl);
    console.log('   Has completed onboarding:', hasCompletedOnboarding);

    return NextResponse.redirect(new URL(redirectUrl, request.url));
  } catch (e) {
    console.error('Callback error:', e);
    return NextResponse.redirect(new URL('/login?error=auth_failed', request.url));
  }
}