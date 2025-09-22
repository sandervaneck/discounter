// app/api/auth/instagram/route.js
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    const error = url.searchParams.get("error");

    if (error) {
      console.error("Instagram auth error:", error);
      return NextResponse.redirect(new URL("/?auth_error=true", req.url));
    }
    if (!code) {
      console.error("No code in callback");
      return NextResponse.redirect(new URL("/?auth_error=true", req.url));
    }
//Exchange
    // Exchange code for access token (server-side)
    const tokenUrl = `https://graph.facebook.com/v16.0/oauth/access_token
  ?client_id=${encodeURIComponent(process.env.FACEBOOK_CLIENT_ID || "")}
  &redirect_uri=${encodeURIComponent(
    "https://discounter-coral.vercel.app/api/auth/instagram/callback"
  )}
  &client_secret=${encodeURIComponent(process.env.FACEBOOK_CLIENT_SECRET || "")}
  &code=${encodeURIComponent(code)}`;

    const tokenRes = await fetch(tokenUrl);
    const tokenData = await tokenRes.json();

    if (!tokenRes.ok) {
      console.error("Token exchange failed", tokenData);
      // redirect to home with error query so UI can show message
      return NextResponse.redirect(new URL("/?auth_error=true", req.url));
    }

    // tokenData contains access_token, token_type, expires_in, etc.
    // Persist tokenData to DB or session here.
    // Example: set a cookie with minimal info (do this securely in production)
    const response = NextResponse.redirect(new URL("/", req.url));
    // Example cookie (httpOnly, secure in production)
    response.cookies.set({
      name: "ig_auth",
      value: "1", // set a flag or store a session id
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      // secure: true // enable on HTTPS production
    });

    return response;
  } catch (err) {
    console.error("Callback exception", err);
    return NextResponse.redirect(new URL("/?auth_error=true", req.url));
  }
}
