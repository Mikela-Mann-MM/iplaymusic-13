

import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('spotify_access_token')?.value

    console.log('🔵 Token endpoint called')
    console.log('🔵 Access token exists:', !!accessToken)

    if (!accessToken) {
      console.log('❌ No access token found in cookies')
      return NextResponse.json(
        { error: 'No access token found. Please log in.' },
        { status: 401 }
      )
    }

    console.log('✅ Returning access token')
    return NextResponse.json({ 
      access_token: accessToken 
    })
  } catch (error) {
    console.error('❌ Error retrieving token:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve token' },
      { status: 500 }
    )
  }
}