"use client";
import { useEffect } from "react";

export default function InstagramCallback() {
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get("access_token");
    if (token && window.opener) {
      window.opener.postMessage({ type: "instagram-token", token }, window.location.origin);
      window.close();
    }
  }, []);
  return <p>Connecting to Instagram...</p>;
}
