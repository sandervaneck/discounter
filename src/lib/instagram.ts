interface InstagramMediaListResponse {
  data?: Array<{
    id: string;
    media_type?: string;
    media_product_type?: string;
    caption?: string | null;
    permalink?: string;
    thumbnail_url?: string | null;
    timestamp?: string;
  }>;
  paging?: {
    next?: string;
  };
}

interface InstagramMediaResponse {
  id: string;
  caption?: string | null;
  permalink?: string;
  media_type?: string;
  like_count?: number;
  comments_count?: number;
}

interface InstagramInsightsResponse {
  data?: Array<{
    name?: string;
    period?: string;
    values?: Array<{ value: number }>;
  }>;
}

export interface InstagramReelInfo {
  mediaId: string;
  caption: string;
  permalink: string;
  views: number | null;
  likes: number | null;
  comments: number | null;
  shares: number | null;
  fetchedAt: string;
}

const GRAPH_API_VERSION = "v19.0";

async function fetchJson(url: string): Promise<any> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`HTTP ${res.status}: ${errorText}`);
  }
  return res.json();
}

function normalizePermalink(permalink: string): string {
  try {
    const parsed = new URL(permalink.trim());
    parsed.hash = "";
    parsed.search = "";
    let pathname = parsed.pathname;
    if (!pathname.endsWith("/")) {
      pathname += "/";
    }
    return `${parsed.origin}${pathname}`;
  } catch {
    return permalink.trim();
  }
}

async function findMediaIdByPermalink(
  igUserId: string,
  accessToken: string,
  reelUrl: string
): Promise<string> {
  const normalizedTarget = normalizePermalink(reelUrl);
  const fields = [
    "id",
    "media_type",
    "media_product_type",
    "caption",
    "permalink",
    "thumbnail_url",
    "timestamp",
  ].join(",");

  let pageUrl = `https://graph.facebook.com/${GRAPH_API_VERSION}/${igUserId}/media?fields=${fields}&access_token=${accessToken}`;
  let iterations = 0;
  const maxIterations = 10;

  while (pageUrl && iterations < maxIterations) {
    iterations += 1;
    const response = (await fetchJson(pageUrl)) as InstagramMediaListResponse;
    const match = response.data?.find((media) => {
      if (!media.permalink) return false;
      return normalizePermalink(media.permalink) === normalizedTarget;
    });

    if (match?.id) {
      return match.id;
    }

    pageUrl = response.paging?.next ?? "";
  }

  throw new Error("Unable to find an Instagram media item that matches the provided QR code.");
}

async function fetchMediaDetails(mediaId: string, accessToken: string): Promise<InstagramMediaResponse> {
  const fields = ["caption", "permalink", "media_type", "like_count", "comments_count"].join(",");
  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${mediaId}?fields=${fields}&access_token=${accessToken}`;
  return fetchJson(url) as Promise<InstagramMediaResponse>;
}

async function fetchMediaInsights(
  mediaId: string,
  accessToken: string
): Promise<{ plays: number | null; likes: number | null; comments: number | null; shares: number | null }> {
  const metrics = ["plays", "likes", "comments", "shares"];
  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${mediaId}/insights?metric=${metrics.join(",")}&access_token=${accessToken}`;
  const insights = (await fetchJson(url)) as InstagramInsightsResponse;
  const result = {
    plays: null as number | null,
    likes: null as number | null,
    comments: null as number | null,
    shares: null as number | null,
  };
  if (!Array.isArray(insights.data)) {
    return result;
  }
  for (const entry of insights.data) {
    const value = entry.values?.[0]?.value;
    if (typeof value !== "number") {
      continue;
    }
    switch (entry.name) {
      case "plays":
        result.plays = value;
        break;
      case "likes":
        result.likes = value;
        break;
      case "comments":
        result.comments = value;
        break;
      case "shares":
        result.shares = value;
        break;
      default:
        break;
    }
  }
  return result;
}

export async function getInstagramReelInfo(params: {
  igUserId: string;
  accessToken: string;
  reelUrl: string;
}): Promise<InstagramReelInfo> {
  const { igUserId, accessToken, reelUrl } = params;
  if (!igUserId || !accessToken) {
    throw new Error("Instagram account is not connected.");
  }
  const mediaId = await findMediaIdByPermalink(igUserId, accessToken, reelUrl);
  const media = await fetchMediaDetails(mediaId, accessToken);
  const metrics = await fetchMediaInsights(mediaId, accessToken);

  return {
    mediaId,
    caption: media.caption ?? "",
    permalink: media.permalink ?? reelUrl,
    views: metrics.plays,
    likes: typeof media.like_count === "number" ? media.like_count : metrics.likes,
    comments:
      typeof media.comments_count === "number" ? media.comments_count : metrics.comments,
    shares: metrics.shares,
    fetchedAt: new Date().toISOString(),
  };
}
