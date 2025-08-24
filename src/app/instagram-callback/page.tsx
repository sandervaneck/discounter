"use client";
import { useEffect } from "react";

export default function InstagramCallback() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code && window.opener) {
      fetch(`/api/instagram/token?code=${code}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.access_token) {
            window.opener.postMessage(
              { type: "instagram-token", token: data.access_token },
              window.location.origin,
            );
          }
          window.close();
        })
        .catch(() => window.close());
    }
  }, []);
  return <p>Connecting to Instagram...</p>;
}
