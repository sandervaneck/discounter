// File: src/app/api/auth/instagram/exchange/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();
    
    if (!code) {
      return NextResponse.json({ error: 'Authorization code is required' }, { status: 400 });
    }

    const clientId = process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID || "750340034464298";
    const clientSecret = process.env.INSTAGRAM_CLIENT_SECRET; // Add this to your .env
    const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI || "https://discounter-coral.vercel.app";

    if (!clientSecret) {
      return NextResponse.json({ error: 'Instagram client secret not configured' }, { status: 500 });
    }

    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://api.instagram.com/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
        code: code,
      }),
    });

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text();
      console.error('Instagram token exchange failed:', error);
      return NextResponse.json({ error: 'Failed to exchange code for token' }, { status: 400 });
    }

    const tokenData = await tokenResponse.json();
    
    // Get user info from Instagram
    const userResponse = await fetch(`https://graph.instagram.com/me?fields=id,username&access_token=${tokenData.access_token}`);
    
    if (!userResponse.ok) {
      console.error('Failed to get Instagram user info');
      return NextResponse.json({ error: 'Failed to get user info' }, { status: 400 });
    }

    const userData = await userResponse.json();

    return NextResponse.json({
      access_token: tokenData.access_token,
      user_id: tokenData.user_id,
      username: userData.username,
      instagram_user_id: userData.id,
    });

  } catch (error) {
    console.error('Instagram token exchange error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}