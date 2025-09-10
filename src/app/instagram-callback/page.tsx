"use client";
export const dynamic = "force-dynamic";

import { useEffect } from "react";

export default function InstagramCallback() {
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get("access_token");
    if (token) {
      window.location.href = `/?instagram_token=${token}`;
    } else {
      window.location.href = "/";
    }
  }, []);
  return <p>Connecting to Instagram...</p>;
}
