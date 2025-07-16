"use client"
import React, { useState } from "react";
import { RestaurantToolbar } from "../components/Toolbar";

type DiscountStatus = "open" | "awarded" | "used" | "expired";

interface DiscountCode {
  id: number;
  code: string;
  discount: number;
  viewsRequired: number;
  items: string[];
  expiryDate: string; // YYYY-MM-DD
  location: string;
  status: DiscountStatus;
}

// Dummy data for awarded users/posts for demo purposes
interface AwardedPost {
  username: string;
  reelViews: number;
  userAccountId: string;
}

// This could come from props or your backend API
const discountCodes: DiscountCode[] = [
  {
    id: 1,
    code: "FOCA-9H2L1KX3",
    discount: 20,
    viewsRequired: 5000,
    items: ["Focaccia Classic", "Focaccia Cheese"],
    expiryDate: "2025-12-31",
    location: "Amsterdam, NL",
    status: "awarded",
  },
  {
    id: 2,
    code: "FOCA-X4V7ZJQ9",
    discount: 10,
    viewsRequired: 10000,
    items: ["Panini"],
    expiryDate: "2025-08-15",
    location: "Amsterdam, NL",
    status: "open",
  },
  {
    id: 3,
    code: "FOCA-WK73NDX8",
    discount: 15,
    viewsRequired: 8000,
    items: ["Salad Bowl"],
    expiryDate: "2024-06-30",
    location: "Amsterdam, NL",
    status: "used",
  },
];

// Dummy awarded posts mapped by discount code for demo
const awardedPostsMap: Record<string, AwardedPost> = {
  "FOCA-9H2L1KX3": {
    username: "milanofocaccia",
    reelViews: 5234,
    userAccountId: "user_12345",
  },
  // other codes may or may not have an awarded post
};

export default function CashierDiscountScanner() {
  const [inputCode, setInputCode] = useState("");
  const [validationResult, setValidationResult] = useState<{
    code: DiscountCode;
    awardedPost?: AwardedPost;
  } | null>(null);
  const [error, setError] = useState("");
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  function validateCode() {
    setError("");
    setValidationResult(null);

    const code = inputCode.trim().toUpperCase();

    if (!code) {
      setError("Please enter a discount code.");
      return;
    }

    const foundCode = discountCodes.find(
      (d) =>
        d.code.toUpperCase() === code &&
        (d.status === "open" || d.status === "awarded")
    );

    if (!foundCode) {
      setError("Discount code not found or not valid for use.");
      return;
    }

    const today = new Date();
    const expiry = new Date(foundCode.expiryDate);
    if (expiry < today) {
      setError("This discount code has expired.");
      return;
    }

    const awardedPost = awardedPostsMap[foundCode.code.toUpperCase()];

    setValidationResult({ code: foundCode, awardedPost });
  }

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: 480,
        margin: "40px auto",
        padding: 20,
        border: "1px solid #117a65",
        borderRadius: 12,
        backgroundColor: "#e0f2f1",
      }}
    >
      <RestaurantToolbar />
      <h1 style={{ color: "#117a65", marginBottom: 24, textAlign: "center" }}>
        Scan or Enter Discount Code
      </h1>

      <input
  type="text"
  placeholder="Enter discount code"
  value={inputCode}
  onChange={(e) => setInputCode(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") validateCode();
  }}
  style={{
    width: "100%",
    padding: "14px 20px",
    fontSize: 18,
    borderRadius: 12,
    border: "2px solid #117a65",
    boxSizing: "border-box",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 2,
    fontWeight: "bold",
    backgroundColor: "#ffffff", // ✅ Ensures white background
    color: "#1f2937",            // ✅ Ensures dark text
  }}
/>


      <button
        onClick={validateCode}
        style={{
          width: "100%",
          padding: 14,
          backgroundColor: "#117a65",
          border: "none",
          borderRadius: 12,
          color: "white",
          fontSize: 18,
          fontWeight: "bold",
          cursor: "pointer",
          marginBottom: 12,
          transition: "background-color 0.3s",
        }}
        onMouseOver={(e) =>
          ((e.target as HTMLButtonElement).style.backgroundColor = "#0b4a3e")
        }
        onMouseOut={(e) =>
          ((e.target as HTMLButtonElement).style.backgroundColor = "#117a65")
        }
      >
        Validate Code
      </button>

      <button
        onClick={() => setIsCameraOpen(true)}
        style={{
          width: "100%",
          padding: 14,
          backgroundColor: "#ffffff",
          border: "2px solid #117a65",
          borderRadius: 12,
          color: "#117a65",
          fontSize: 18,
          fontWeight: "bold",
          cursor: "pointer",
          marginBottom: 20,
          transition: "background-color 0.3s",
        }}
        onMouseOver={(e) =>
          ((e.target as HTMLButtonElement).style.backgroundColor = "#d9f5f1")
        }
        onMouseOut={(e) =>
          ((e.target as HTMLButtonElement).style.backgroundColor = "#ffffff")
        }
      >
        📷 Open Camera to Scan
      </button>

      {isCameraOpen && (
        <div
          style={{
            border: "2px dashed #117a65",
            borderRadius: 12,
            padding: 20,
            backgroundColor: "#f0faf9",
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          <p style={{ color: "#117a65", fontWeight: "bold" }}>Camera would open here on mobile for scanning QR/barcodes.</p>
          <button
            onClick={() => setIsCameraOpen(false)}
            style={{
              marginTop: 12,
              backgroundColor: "#117a65",
              color: "white",
              padding: "8px 16px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Close Camera
          </button>
        </div>
      )}

      {error && (
        <div
          style={{
            color: "#d9534f",
            fontWeight: "bold",
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}

      {validationResult && (
        <div
          style={{
            border: "2px solid #117a65",
            borderRadius: 12,
            backgroundColor: "#def2f1",
            padding: 24,
            boxShadow: "0 0 15px rgba(17, 122, 101, 0.3)",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              marginBottom: 16,
              color: "#0b4a3e",
              textAlign: "center",
            }}
          >
            Discount Code Validated
          </h2>

          <p style={{ fontSize: 18, fontWeight: "bold" }}>
            Code: <span style={{ color: "#117a65" }}>{validationResult.code.code}</span>
          </p>

          <p style={{ fontSize: 18, fontWeight: "bold" }}>
            Discount: <span style={{ color: "#117a65" }}>{validationResult.code.discount}%</span>
          </p>

          <p style={{ fontSize: 16 }}>
            Applicable items: <span style={{ color: "#117a65" }}>{validationResult.code.items.join(", ")}</span>
          </p>

          {validationResult.awardedPost ? (
            <>
              <p style={{ fontSize: 16, marginTop: 20 }}>
                Awarded to user: <strong>{validationResult.awardedPost.username}</strong>
              </p>
              <p style={{ fontSize: 16 }}>
                Reel views: <strong>{validationResult.awardedPost.reelViews.toLocaleString()}</strong>
              </p>
              <p style={{ fontSize: 14, color: "#555" }}>
                User account ID: {validationResult.awardedPost.userAccountId}
              </p>
            </>
          ) : (
            <p style={{ fontSize: 16, fontStyle: "italic", color: "#666", marginTop: 20 }}>
              No user awarded for this discount code yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
