"use client";

import { useRouter } from "next/navigation";
import { Button } from "./components/Button";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const [userType, setUserType] = useState<"influencer" | "restaurant" | null>(null);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [showLoginFields, setShowLoginFields] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerForm, setRegisterForm] = useState<{
    email: string | undefined;
    password: string | undefined;
    name: string | undefined;
    userType: "influencer" | "restaurant" | undefined;
    url: string | undefined;
  } | null>(null);

  const checkFields = () => {
    return (
      registerForm?.email &&
      registerForm?.password && registerForm?.email.includes("@") &&
      registerForm?.email.includes(".") &&
      registerForm?.email.length > 5 &&
      registerForm?.password.length >= 6 &&
      registerForm?.userType &&
      registerForm?.name 
    );
  };

  useEffect(() => {
    if (userType && showLoginFields === false) {
      setShowLoginFields(true);
    }
  }, [userType]);

  const handleLogin = async () => {
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      try {
        const meRes = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
        });
        const me = await meRes.json();
        if (me?.userType === "business") {
          router.push("/restaurant");
        } else {
          router.push("/user");
        }
      } catch (err) {
        console.error("Failed fetching current user:", err);
        router.refresh();
      }
    } else {
      alert("Login failed");
    }
  };

  const handleConfirmRegistration = async () => {
    if (
      !registerForm?.email ||
      !registerForm.password ||
      !registerForm.userType ||
      !registerForm.name ||
      !registerForm.url
    ) {
      alert("Please fill in all fields and connect Instagram.");
      return;
    }

    const mappedUserType =
      registerForm.userType === "restaurant" ? "business" : "influencer";
    const mappedEmail = registerForm.email.trim().toLowerCase();
    const mappedPassword = registerForm.password;
    const mappedName = registerForm.name.trim();
    const mappedUrl = registerForm.url;

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: mappedEmail,
        password: mappedPassword,
        name: mappedName,
        userType: mappedUserType,
        url: mappedUrl ? mappedUrl : "www.instagram.com",
      }),
    });

    if (res.ok) {
      const loginRes = await signIn("credentials", {
        redirect: false,
        email: mappedEmail,
        password: mappedPassword,
      });

      if (loginRes?.ok) {
        router.push("/user");
      } else {
        alert("Login failed after registration.");
      }
    } else {
      let errorMsg = "Unknown error";
      try {
        const error = await res.json();
        errorMsg = error?.error || errorMsg;
      } catch (e) {
        console.error("Failed to parse error response:", e);
      }
      alert(`Sign up failed: ${errorMsg}`);
    }
  };

  const handleInstagramConnect = () => {
    const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
    if (!appId) {
      alert("Facebook App ID is not configured.");
      return;
    }
    const redirectUri = `${window.location.origin}/instagram-callback`;
    const scope = "instagram_basic,pages_show_list";

    const authUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&response_type=token`;

    const popup = window.open(authUrl, "instagramLogin", "width=600,height=700");

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.data.type === "instagram-token") {
        const token = event.data.token;
        setRegisterForm((prev) => ({
          email: prev?.email,
          password: prev?.password,
          name: prev?.name,
          userType: prev?.userType,
          url: token,
        }));
        window.removeEventListener("message", handleMessage);
        popup?.close();
      }
    };

    window.addEventListener("message", handleMessage);
  };
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-white flex flex-col items-center justify-center px-4">
      <div className="max-w-xl text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-800 mb-6">
          Become a Food Influencer & Earn Discounts
        </h1>
        <p className="text-lg md:text-xl text-emerald-700 mb-10">
          You can be our influencer! Post your food, show your results, and get rewarded with discounts at your favorite restaurants.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Button
            onClick={() => {
              setOpenSignUp(false);
              setUserType("influencer")}}
            className={`px-6 py-3 text-lg rounded-xl shadow-lg ${userType === "influencer" ? "text-white bg-emerald-600 hover:bg-emerald-700" : "bg-white text-emerald-700 border border-emerald-600 hover:bg-emerald-50"}`}
          >
            Login as Influencer
          </Button>
          <Button
            onClick={() => {
              setOpenSignUp(false);
              setUserType("restaurant")}}
            className={`px-6 py-3 text-lg rounded-xl shadow-md ${userType === "restaurant" ? "text-white bg-emerald-600 hover:bg-emerald-700" : "bg-white text-emerald-700 border border-emerald-600 hover:bg-emerald-50"}`}
          >
            Login as Restaurant
          </Button>
          <Button
                  onClick={() => {
                    setShowLoginFields(false)
                    ;
                    setOpenSignUp(true)}}
                  className="px-6 py-3 text-lg rounded-xl shadow-lg bg-white text-emerald-700 border border-emerald-600 hover:bg-emerald-50"
                >
                  Click to Register
                </Button>
                <Button
            onClick={() => router.push("/user")}
                  className="px-6 py-3 text-lg rounded-xl shadow-lg bg-white text-emerald-700 border border-emerald-600 hover:bg-emerald-50"
                >
                  Continue without Login
                </Button>
        </div>
{openSignUp && (
          <div className="flex flex-col items-center text-sm text-emerald-600 mb-4">
            <div className="w-full max-w-sm mt-2">
                Are you an influencer or restaurant?
                <br />
              <select
                value={registerForm?.userType || ""}
                  onChange={(e) =>
                    setRegisterForm({
                      email: registerForm?.email,
                      password: registerForm?.password,
                      name: registerForm?.name,
                      userType: e.target.value as "influencer" | "restaurant",
                      url: registerForm?.url,
                    })
                  }
                className="w-full px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-800 bg-white"
              >
                <option value="" disabled>Select User Type</option>
                <option value="influencer">Influencer</option>
                <option value="restaurant">Restaurant</option>
              </select>
            </div>
              <label className="w-full max-w-sm flex flex-col text-emerald-900 font-medium">
                Username
                <input
                  type="text"
                  placeholder="Username"
                  value={registerForm?.name || ""}
                  onChange={(e) =>
                    setRegisterForm({
                      email: registerForm?.email,
                      password: registerForm?.password,
                      name: e.target.value,
                      userType: registerForm?.userType,
                      url: registerForm?.url,
                    })
                  }
                  className="w-full px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-800 bg-white placeholder-emerald-400"
                />
              </label>
                <label className="w-full max-w-sm flex flex-col text-emerald-900 font-medium">
                  Email
                  <input
                    type="email"
                    placeholder="Email"
                    value={registerForm?.email || ""}
                    onChange={(e) =>
                      setRegisterForm({
                        email: e.target.value,
                        password: registerForm?.password,
                        name: registerForm?.name,
                        userType: registerForm?.userType,
                        url: registerForm?.url,
                      })
                    }
                    className="w-full px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-800 bg-white placeholder-emerald-400"
                  />
                </label>
                <label className="w-full max-w-sm flex flex-col text-emerald-900 font-medium">
                  Password
                  <input
                    type="password"
                    placeholder="Password"
                    value={registerForm?.password || ""}
                    onChange={(e) =>
                      setRegisterForm({
                        email: registerForm?.email,
                        password: e.target.value,
                        name: registerForm?.name,
                        userType: registerForm?.userType,
                        url: registerForm?.url,
                      })
                    }
                    className="w-full px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-800 bg-white placeholder-emerald-400"
                  />
                </label>
              <button
                type="button"
                onClick={handleInstagramConnect}
                className="w-full max-w-sm mt-2 px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors"
              >
                Connect Instagram
              </button>
              {registerForm?.url && (
                <div className="w-full max-w-sm mt-2 text-emerald-700">
                  Instagram connected!
                </div>
              )}
              {checkFields() && (
                <div className="w-full max-w-sm text-sm text-emerald-600 mt-2">
                  Please enter your email and password to create an account.
                  <br />
                  <strong>Note:</strong> Passwords must be at least 6 characters long.
                </div>
              )}
              <button
                onClick={handleConfirmRegistration}
                disabled={
                  !registerForm?.email ||
                  !registerForm?.password ||
                  !registerForm?.userType ||
                  !registerForm?.name ||
                  !registerForm?.url ||
                  registerForm.password.length < 6
                }
                className="w-full max-w-sm mt-4 px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
              >
                Confirm Registration
              </button>
          </div>
            )}
        {showLoginFields && (
          <div className="flex flex-col gap-4 items-center">
            {openSignUp && (<>Please enter your details to sign up</>)}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full max-w-sm px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-800 bg-white placeholder-emerald-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full max-w-sm px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-800 bg-white placeholder-emerald-400"
            />
            
            
            <Button
                  onClick={handleLogin}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-md shadow"
                >
                  Continue
                </Button>
          </div>
        )}
      </div>
    </main>
  );
}
