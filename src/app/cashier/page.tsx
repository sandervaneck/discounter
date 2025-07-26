"use client";

import React, { useState } from "react";
import { RestaurantToolbar } from "../components/Toolbar";

type DiscountStatus = "available" | "awarded" | "used" | "expired";

interface DiscountCode {
  id: number;
  code: string;
  discount: number;
  items: string[];
  expiryDate: string;
  status: DiscountStatus;
}

interface AwardedPost {
  username: string;
  reelViews: number;
  userAccountId: string;
}



const awardedPostsMap: Record<string, AwardedPost> = {
  "FOCA-9H2L1KX3": {
    username: "milanofocaccia",
    reelViews: 5234,
    userAccountId: "user_12345",
  },
  "ANYCODE": {
    username: "milanofocaccia",
    reelViews: 1023,
    userAccountId: "user_12345",
  },
  "FREECODE": {
    username: "milanofocaccia",
    reelViews: 12345,
    userAccountId: "user_12345",
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

  async function validateCode() {
    setError("");
    setValidationResult(null);

    const code = inputCode.trim().toUpperCase();

    if (!code) return setError("Please enter a discount code.");

    try {
      const res = await fetch("/api/discounts", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        return setError("Failed to fetch discount codes.");
      }

      const discounts = await res.json();
      const found = discounts.find(
        (d: any) =>
          d.code.toUpperCase() === code &&
          (d.status === "available" || d.status === "awarded")
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

      const awardedPost = awardedPostsMap[found.code.toUpperCase()];

      const mapped: DiscountCode = {
        id: found.id,
        code: found.code,
        discount: found.discountPercent,
        items,
        expiryDate: found.expirationTime,
        status: found.status,
      };

      setValidationResult({ code: mapped, awardedPost });
    } catch (err) {
      console.error("Validation error", err);
      setError("Failed to validate discount code.");
    }
  }

  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImage(reader.result as string);

      };
      reader.readAsDataURL(file);
      validateCode();
    }
  };

  return (
    <div className="min-h-screen bg-[#e0f2f1] px-4 py-6 font-sans">
      <div className="max-w-md mx-auto">
        <RestaurantToolbar tab={tab} setTab={setTab} />

        <h1 className="text-xl font-bold text-center text-[#117a65] mb-6">
          Scan or Enter Discount Code
        </h1>

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

        <label className="w-full block mb-5">
          <div
            className="w-full py-3 text-center text-lg font-bold text-[#117a65] border-2 border-[#117a65] bg-white rounded-xl hover:bg-[#d9f5f1] transition-colors cursor-pointer"
          >
            📷 Open Camera to Scan
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
            {validationResult.awardedPost ? (
              <div className="mt-4 space-y-2">
                <p>
                  Awarded to user: <strong>{validationResult.awardedPost.username}</strong>
                </p>
                <p>
                  Reel views: <strong>{validationResult.awardedPost.reelViews.toLocaleString()}</strong>
                </p>
                <p>
                  Restaurant tagged: <strong>✅</strong>
                </p>
                <p className="text-sm text-gray-600">
                  User account ID: {validationResult.awardedPost.userAccountId}
                </p>
                <button className="w-full py-2 mt-3 bg-[#117a65] text-white font-bold rounded-xl">
                  View Post
                </button>
              </div>
            ) : (
              <p className="mt-4 italic text-gray-600">
                No user awarded for this discount code yet.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

