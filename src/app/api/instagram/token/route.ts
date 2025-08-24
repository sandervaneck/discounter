import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID ?? "788193503894407";
  const appSecret = process.env.FACEBOOK_APP_SECRET;
  if (!code || !appId || !appSecret) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }
  const redirectUri = `${req.nextUrl.origin}/instagram-callback`;
  const tokenRes = await fetch(
    `https://graph.facebook.com/v19.0/oauth/access_token?client_id=${appId}&client_secret=${appSecret}&redirect_uri=${encodeURIComponent(redirectUri)}&code=${code}`,
  );
  const data = await tokenRes.json();
  return NextResponse.json(data);
}
