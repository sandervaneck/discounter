import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

const FB_OAUTH_SCOPES =
  process.env.FACEBOOK_OAUTH_SCOPES ||
  "public_profile,email,pages_show_list,pages_read_engagement,instagram_basic,instagram_manage_insights";

export async function GET() {
  const state = crypto.randomBytes(16).toString("hex");
  (await cookies()).set("fb_oauth_state", state, {
    httpOnly: true, secure: true, path: "/", maxAge: 600,
  });

  const params = new URLSearchParams({
    client_id: process.env.FACEBOOK_CLIENT_ID!,
    redirect_uri: `${process.env.NEXTAUTH_URL}/api/meta/callback`,
    state,
    response_type: "code",
    scope: FB_OAUTH_SCOPES,
  });

  return NextResponse.redirect(
    `https://api.instagram.com/oauth/authorize?${params.toString()}`
  );
}
