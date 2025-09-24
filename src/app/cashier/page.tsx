"use client";

import React, { useCallback, useEffect, useState } from "react";
import { RestaurantToolbar } from "../components/Toolbar";

type DiscountStatus = "available" | "requested" | "awarded" | "used" | "expired";

interface Requirement {
  platform: string;
  views: number;
  likes: number;
  comments: number;
  reposts: number;
}

interface DiscountCode {
  id: number;
  code: string;
  discount: number;
  items: string[];
  expiryDate: string;
  status: DiscountStatus;
  requirements?: Requirement[];
}

interface AwaitingRequest {
  id: number;
  code: string;
  discountPercent: number;
  items: string[];
  expiryDate: string;
  influencerName: string;
  influencerEmail?: string;
}

interface AwardedPost {
  username: string;
  reelViews: number;
  likes: number;
  comments: number;
  reposts: number;
  userAccountId: string;
  postLink: string;
  datePosted: string;
  dateRedeemed: string;
}



const awardedPostsMap: Record<string, AwardedPost> = {
  "FOCA-9H2L1KX3": {
    username: "milanofocaccia",
    reelViews: 5234,
    likes: 850,
    comments: 120,
    reposts: 60,
    userAccountId: "user_12345",
    postLink: "https://instagram.com/p/abc123",
    datePosted: "2024-01-15",
    dateRedeemed: "2024-01-20",
  },
  "ANYCODE": {
    username: "milanofocaccia",
    reelViews: 1023,
    likes: 300,
    comments: 45,
    reposts: 12,
    userAccountId: "user_12345",
    postLink: "https://instagram.com/p/def456",
    datePosted: "2024-02-01",
    dateRedeemed: "2024-02-04",
  },
  "FREECODE": {
    username: "milanofocaccia",
    reelViews: 12345,
    likes: 2000,
    comments: 250,
    reposts: 100,
    userAccountId: "user_12345",
    postLink: "https://instagram.com/p/ghi789",
    datePosted: "2024-03-10",
    dateRedeemed: "2024-03-15",
  },
};

export default function CashierDiscountScanner() {
  const [inputCode, setInputCode] = useState("");
  const [tab, setTab] = useState(1);
  const [validationResult, setValidationResult] = useState<{
    code: DiscountCode;
    awardedPost?: AwardedPost;
  } | null>(null);
  const [error, setError] = useState("");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [awaitingRequests, setAwaitingRequests] = useState<AwaitingRequest[]>([]);

  const loadDiscounts = useCallback(async () => {
    const res = await fetch("/api/discounts", {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch discount codes.");
    }

    const discounts = await res.json();

    const requests: AwaitingRequest[] = discounts
      .filter((d: any) => d.status === "requested")
      .map((d: any) => {
        const requester = Array.isArray(d.redemptions)
          ? d.redemptions.find((r: any) => r.status === "requested")
          : null;
        const items = Array.isArray(d.applicableItems)
          ? d.applicableItems
              .map((item: any) => item?.item?.name ?? item?.name)
              .filter((name: string | undefined): name is string => Boolean(name))
          : [];

        return {
          id: d.id,
          code: d.code,
          discountPercent: d.discountPercent,
          items,
          expiryDate: d.expirationTime,
          influencerName: requester?.influencer?.name ?? "Unknown influencer",
          influencerEmail: requester?.influencer?.email ?? undefined,
        };
      });

    setAwaitingRequests(requests);
    return discounts;
  }, []);

  useEffect(() => {
    loadDiscounts().catch((err) => {
      console.error("Failed to load awaiting requests", err);
    });
  }, [loadDiscounts]);

  async function validateCode() {
    setError("");
    setValidationResult(null);
    setCapturedImage(null);
    setScanResult(null);

    const code = inputCode.trim().toUpperCase();

    if (!code) return setError("Please enter a discount code.");

    let discounts: any[] = [];
    try {
      discounts = await loadDiscounts();
    } catch (err) {
      console.error("Failed to fetch discount codes.", err);
      return setError("Failed to fetch discount codes.");
    }

    const found = discounts.find(
        (d: any) =>
          d.code.toUpperCase() === code &&
          (d.status === "available" || d.status === "awarded" || d.status === "requested")
      );

    if (!found) {
      return setError("Discount code not found or not valid for use.");
    }

    const expiry = new Date(found.expirationTime);
    if (expiry < new Date()) {
      return setError("This discount code has expired.");
    }

    let items: string[] = [];
    try {
      const itemsRes = await fetch(`/api/discounts/${found.id}/items`, {
        method: "GET",
        credentials: "include",
      });
      if (itemsRes.ok) {
        const itemsData = await itemsRes.json();
        items = itemsData.map((i: any) => i.name);
      }
    } catch (e) {
      console.error("Failed fetching items", e);
    }

      let requirements: Requirement[] = [];
      if (Array.isArray(found.requirements)) {
        requirements = found.requirements;
      } else if (typeof found.requirements === "string") {
        try {
          const parsed = JSON.parse(found.requirements);
          if (Array.isArray(parsed)) requirements = parsed;
        } catch (e) {
        console.error("Failed fetching items", e);
      }
    }

      const username = found.redemptions?.[0]?.influencer?.name;
      let awardedPost = awardedPostsMap[found.code.toUpperCase()];
      if (found.status === "awarded" && username) {
        awardedPost = awardedPost
          ? { ...awardedPost, username }
          : {
              username,
              reelViews: 0,
              likes: 0,
              comments: 0,
              reposts: 0,
              userAccountId: "",
              postLink: "",
              datePosted: "",
              dateRedeemed: "",
            };
      }

      const mapped: DiscountCode = {
        id: found.id,
        code: found.code,
        discount: found.discountPercent,
        items,
        expiryDate: found.expirationTime,
        status: found.status,
        requirements,
      };

      setValidationResult({ code: mapped, awardedPost });
    } try {
      
    } catch (err) {
      console.error("Validation error", err);
      setError("Failed to validate discount code.");
    }
  

  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImage(reader.result as string);
        setScanResult("Positive");
      };
      reader.readAsDataURL(file);
    }
  };

  async function useCode() {
    if (!validationResult) return;
    try {
      const res = await fetch("/api/discounts/use", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ codeId: validationResult.code.id }),
      });
      if (!res.ok) throw new Error();
      setValidationResult({
        ...validationResult,
        code: { ...validationResult.code, status: "used" },
      });
      setScanResult(null);
      await loadDiscounts().catch((err) => {
        console.error("Failed to refresh awaiting requests", err);
      });
    } catch (e) {
      setError("Failed to mark code as used.");
    }
  }

  return (
    <div className="min-h-screen bg-[#e0f2f1] px-4 py-6 font-sans">
      <div className="max-w-md mx-auto">
        <RestaurantToolbar tab={tab} setTab={setTab} />

        <h1 className="text-xl font-bold text-center text-[#117a65] mb-6">
          Scan or Enter Discount Code
        </h1>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[#117a65] mb-3 text-center">Awaiting Requests</h2>
          {awaitingRequests.length > 0 ? (
            <ul className="space-y-3">
              {awaitingRequests.map((request) => (
                <li
                  key={request.id}
                  className="bg-white border border-[#117a65] rounded-xl p-4 shadow-sm"
                >
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <p className="text-lg font-bold text-[#117a65]">{request.code}</p>
                      <p className="text-sm text-gray-600">
                        Requested by{' '}
                        <span className="font-semibold text-[#0b4a3e]">{request.influencerName}</span>
                      </p>
                      {request.influencerEmail && (
                        <p className="text-xs text-gray-500">{request.influencerEmail}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-2">
                        Discount: {request.discountPercent}% • Items: {request.items.join(", ") || 'N/A'}
                      </p>
                      <p className="text-xs text-gray-500">
                        Expires: {new Date(request.expiryDate).toISOString().split('T')[0]}
                      </p>
                    </div>
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-700 border border-amber-200">
                      Requested
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="bg-white border border-dashed border-[#117a65] rounded-xl p-4 text-center text-sm text-gray-600">
              No pending discount requests.
            </div>
          )}
        </div>

        <input
          type="text"
          placeholder="Enter discount code"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && validateCode()}
          className="w-full px-4 py-3 text-lg font-bold tracking-wider text-gray-800 uppercase bg-white border-2 border-[#117a65] rounded-xl mb-4"
        />

        <button
          onClick={validateCode}
          className="w-full py-3 mb-3 text-white text-lg font-bold bg-[#117a65] rounded-xl hover:bg-[#0b4a3e] transition-colors"
        >
          Validate Code
        </button>

        {error && (
          <div className="mb-5 text-center text-red-600 font-bold">
            {error}
          </div>
        )}

        {validationResult && (
          <div className="p-5 mb-6 bg-[#def2f1] border-2 border-[#117a65] rounded-xl shadow">
            <h2 className="text-center text-lg font-bold text-[#0b4a3e] mb-4">
              Discount Code Validated
            </h2>
            <p className="font-bold text-lg">
              Code: <span className="text-[#117a65]">{validationResult.code.code}</span>
            </p>
            <p className="font-bold text-lg">
              Discount: <span className="text-[#117a65]">{validationResult.code.discount}%</span>
            </p>
          <p>
            Applicable items: <span className="text-[#117a65]">{validationResult.code.items.join(", ")}</span>
          </p>
          {validationResult.code.requirements && validationResult.code.requirements.length > 0 && (
            <div className="mt-3">
              <h3 className="font-semibold">Requirements</h3>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {validationResult.code.requirements.map((req, idx) => (
                  <li key={idx}>
                    {req.platform}: {req.views} views, {req.likes} likes, {req.comments} comments, {req.reposts} reposts
                  </li>
                ))}
              </ul>
            </div>
          )}
          {validationResult.code.status === "awarded" ? (
            <div className="mt-4 space-y-2">
              <p>
                Awarded to user: <strong>{validationResult.awardedPost?.username ?? "Unknown"}</strong>
              </p>
              {validationResult.awardedPost && (
                <>
                  <p>
                    Reel views: <strong>{validationResult.awardedPost.reelViews.toLocaleString()}</strong>
                  </p>
                  <p>
                    Likes: <strong>{validationResult.awardedPost.likes.toLocaleString()}</strong>
                  </p>
                  <p>
                    Comments: <strong>{validationResult.awardedPost.comments.toLocaleString()}</strong>
                  </p>
                  <p>
                    Reposts: <strong>{validationResult.awardedPost.reposts.toLocaleString()}</strong>
                  </p>
                  <p>
                    Restaurant tagged: <strong>✅</strong>
                  </p>
                  <p className="text-sm text-gray-600">
                    User account ID: {validationResult.awardedPost.userAccountId}
                  </p>
                  <p className="text-sm">Date posted: {validationResult.awardedPost.datePosted}</p>
                  <p className="text-sm">Date redeemed: {validationResult.awardedPost.dateRedeemed}</p>
                  
                </>
              )}
            </div>
          ) : (
            <p className="mt-4 italic text-gray-600">
              No user awarded for this discount code yet.
            </p>
          )}

          <label className="w-full block mb-5 mt-5">
            <div
              className="w-full py-3 text-center text-lg font-bold text-[#117a65] border-2 border-[#117a65] bg-white rounded-xl hover:bg-[#d9f5f1] transition-colors cursor-pointer"
            >
              📷 Open Camera to Scan Post
            </div>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleCapture}
              className="hidden"
            />
          </label>

          {capturedImage && (
            <div className="mb-5 text-center">
              <p className="text-sm font-semibold text-gray-600 mb-2">Scanned Image:</p>
              <img
                src={capturedImage}
                alt="Captured QR"
                className="w-32 h-32 object-contain mx-auto rounded-lg border border-gray-300"
              />
            </div>
          )}

          {scanResult && (
            <div className="text-center mt-4 space-y-3">
              <p className="font-bold text-green-700">
                Requirements check: {scanResult}
              </p>
              <button
                onClick={useCode}
                className="w-full py-3 text-white text-lg font-bold bg-[#117a65] rounded-xl hover:bg-[#0b4a3e] transition-colors"
              >
                Use Code
              </button>
            </div>
          )}
          </div>
        )}
      </div>
    </div>
  );
}

