import { NextRequest, NextResponse } from "next/server";

const DEFAULT_GRAPH_VERSION = process.env.INSTAGRAM_GRAPH_API_VERSION ?? "v19.0";
const DEFAULT_APP_ID = process.env.INSTAGRAM_APP_ID ?? "788193503894407";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) {
    return NextResponse.json({ error: "url query parameter is required" }, { status: 400 });
  }

  const appSecret = process.env.INSTAGRAM_APP_SECRET;
  if (!appSecret) {
    return NextResponse.json(
      { error: "Instagram embed credentials are not configured." },
      { status: 500 }
    );
  }

  const embedUrl = new URL(`https://graph.facebook.com/${DEFAULT_GRAPH_VERSION}/instagram_oembed`);
  embedUrl.searchParams.set("url", url);
  embedUrl.searchParams.set("access_token", `${DEFAULT_APP_ID}|${appSecret}`);
  embedUrl.searchParams.set("omitscript", "false");

  try {
    const response = await fetch(embedUrl.toString(), {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const message =
        (data as any)?.error?.message ||
        (typeof data === "string" ? data : "Failed to load Instagram embed");
      return NextResponse.json({ error: message }, { status: response.status });
    }

    if (!data || typeof data !== "object" || typeof (data as any).html !== "string") {
      return NextResponse.json(
        { error: "Instagram did not return embeddable HTML for this URL." },
        { status: 502 }
      );
    }

    return NextResponse.json({ html: (data as any).html });
  } catch (error) {
    console.error("Instagram oEmbed request failed", error);
    return NextResponse.json(
      { error: "Unable to reach the Instagram oEmbed service." },
      { status: 502 }
    );
  }
}
