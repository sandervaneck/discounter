// File: src/app/api/auth/signup/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function exchangeInstagramCode(code: string) {
  const clientId = process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID || "750340034464298";
  const clientSecret = process.env.INSTAGRAM_CLIENT_SECRET;
  const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI || "https://discounter-coral.vercel.app";

  if (!clientSecret) {
    throw new Error('Instagram client secret not configured');
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
    throw new Error('Failed to exchange code for token');
  }

  const tokenData = await tokenResponse.json();
  
  // Get user info from Instagram
  const userResponse = await fetch(`https://graph.instagram.com/me?fields=id,username&access_token=${tokenData.access_token}`);
  
  if (!userResponse.ok) {
    console.error('Failed to get Instagram user info');
    throw new Error('Failed to get user info');
  }

  const userData = await userResponse.json();

  return {
    access_token: tokenData.access_token,
    user_id: tokenData.user_id,
    username: userData.username,
    instagram_user_id: userData.id,
  };
}

export async function POST(req: NextRequest) {
  try {
    const { email, password, userType, name, url } = await req.json();
    
    if (!email || !password || !userType || !name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters long' }, { status: 400 });
    }

    // Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    let instagramData = null;
    
    // If url is provided and looks like an Instagram auth code, exchange it for token
    if (url && url !== "https://www.instagram.com/" && !url.startsWith("http")) {
      try {
        instagramData = await exchangeInstagramCode(url);
      } catch (error) {
        console.error('Instagram token exchange failed:', error);
        // Continue with registration but without Instagram connection
      }
    }

    // Create the user with Instagram data if available
    const userData = {
      email,
      password: hashedPassword,
      name,
      userType,
      url: instagramData ? `https://www.instagram.com/${instagramData.username}/` : (url || "https://www.instagram.com/"),
    };

    // Add Instagram fields if token exchange was successful
    if (instagramData) {
      Object.assign(userData, {
        instagramToken: instagramData.access_token,
        instagramUserId: instagramData.instagram_user_id,
        instagramUsername: instagramData.username,
        instagramConnected: true,
        tokenExpiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
      });
    }

    const user = await prisma.user.create({
      data: userData,
    });

    // Return user data (excluding password and token)
    return NextResponse.json({ 
      id: user.id, 
      email: user.email, 
      name: user.name, 
      userType: user.userType,
      url: user.url,
      instagramConnected: user.instagramConnected,
      instagramUsername: user.instagramUsername,
    });
  } catch (err) {
    console.error('Signup error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}