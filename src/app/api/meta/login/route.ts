import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

const FB_API_VERSION = process.env.FACEBOOK_API_VERSION!;
const FB_OAUTH_SCOPES = process.env.FACEBOOK_OAUTH_SCOPES!;

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
    `https://www.facebook.com/${FB_API_VERSION}/dialog/oauth?${params.toString()}`
  );
}
