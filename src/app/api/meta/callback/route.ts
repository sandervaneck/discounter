import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const FB_VER = "v23.0";
const G = (p: Record<string, string>) => new URLSearchParams(p).toString();

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const stored = (await cookies()).get("fb_oauth_state")?.value;

  if (!code || !state || state !== stored) {
    return NextResponse.json({ error: "Invalid state or code" }, { status: 400 });
  }

  // 1) Exchange code for SHORT-LIVED user access token
  const tokenRes = await fetch(
    `https://graph.facebook.com/${FB_VER}/oauth/access_token?` + G({
      client_id: process.env.FACEBOOK_CLIENT_ID!,
      client_secret: process.env.FACEBOOK_CLIENT_SECRET!,
      redirect_uri: `${process.env.NEXTAUTH_URL}/api/meta/callback`,
      code,
    })
  );
  const tokenJson = await tokenRes.json();
  if (!tokenRes.ok) return NextResponse.json(tokenJson, { status: 400 });

  const shortLived = tokenJson.access_token as string;

  // 2) Upgrade to LONG-LIVED user token (~60 days)
  const longRes = await fetch(
    `https://graph.facebook.com/${FB_VER}/oauth/access_token?` + G({
      grant_type: "fb_exchange_token",
      client_id: process.env.FACEBOOK_CLIENT_ID!,
      client_secret: process.env.FACEBOOK_CLIENT_SECRET!,
      fb_exchange_token: shortLived,
    })
  );
  const longJson = await longRes.json();
  const userAccessToken = (longJson.access_token as string) ?? shortLived;

  // 3) List Pages the user manages (returns Page access tokens)
  const pagesRes = await fetch(
    `https://graph.facebook.com/${FB_VER}/me/accounts?` + G({
      fields: "name,access_token,instagram_business_account",
    }),
    { headers: { Authorization: `Bearer ${userAccessToken}` } }
  );
  const pagesJson = await pagesRes.json();

  // 4) Optionally: for each page that has instagram_business_account, fetch IG profile
  const igSummaries: Array<any> = [];
  if (Array.isArray(pagesJson?.data)) {
    for (const page of pagesJson.data) {
      const pageToken = page.access_token as string | undefined;
      const ig = page.instagram_business_account?.id as string | undefined;
      if (pageToken && ig) {
        const igRes = await fetch(
          `https://graph.facebook.com/${FB_VER}/${ig}?` + G({
            fields: "id,username,profile_picture_url,followers_count,media_count",
          }),
          { headers: { Authorization: `Bearer ${pageToken}` } }
        );
        igSummaries.push(await igRes.json());
      }
    }
  }

  // TODO: persist tokens to your DB (userAccessToken, per-Page tokens) tied to your user

  // For the demo we just return JSON. In prod, redirect back to your UI.
  return NextResponse.json({
    userAccessToken,
    pages: pagesJson,
    igAccounts: igSummaries,
  });
}
