"use client";

import { useRouter } from "next/navigation";
import { Button } from "./components/Button";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [userType, setUserType] = useState<"influencer" | "restaurant" | null>(null);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [showLoginFields, setShowLoginFields] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerForm, setRegisterForm] = useState<{email: string | undefined, password: string | undefined, userType: "influencer" | "restaurant" | undefined} | null>(null);

  useEffect(() => {
    if (userType && showLoginFields === false) {
      setShowLoginFields(true);
    }
  }, [userType]);

  const handleLogin = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      if (userType === "influencer") {
        router.push("/user");
      } else if (userType === "restaurant") {
        router.push("/restaurant");
      }
    } else {
      alert("Login failed");
    }
  };

  const handleSignUp = async () => {
    if (!registerForm?.email || !registerForm.password || !registerForm.userType) {
      alert("Please fill in all fields.");
      return;
    }

    const mappedUserType = registerForm.userType === "restaurant" ? "business" : "influencer";
    const mappedEmail = registerForm.email.trim().toLowerCase();
    const mappedPassword = registerForm.password;
    
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  email: mappedEmail,
  password: mappedPassword,
  userType: mappedUserType,
})

    });

    if (res.ok) {
      alert("Signed up successfully! Please log in.");
      setOpenSignUp(false);
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
          <div className="text-sm text-emerald-600 mb-4">
              <select
                value={registerForm?.userType || ""}
                onChange={(e) => setRegisterForm({
                  email: registerForm?.email,
                  password: registerForm?.password,
                  userType: e.target.value as "influencer" | "restaurant"
                })
                }
                className="w-full max-w-sm px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-800 bg-white"
              >
                <option value="" disabled>Select User Type</option>
                <option value="influencer">Influencer</option>
                <option value="restaurant">Restaurant</option>
              </select>
              <div className="text-sm text-emerald-600 mt-2">
                Please select whether you are an influencer or restaurant signing up.
                <br />
              </div>
              <input
                type="email"
                placeholder="Email"
                value={registerForm?.email || ""}
                onChange={(e) => setRegisterForm({
                  email: e.target.value,
                  password: registerForm?.password,
                  userType: registerForm?.userType
                })}
                className="w-full max-w-sm px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-800 bg-white placeholder-emerald-400"
              />
              <input
                type="password"
                placeholder="Password"
                value={registerForm?.password || ""}
                onChange={(e) => setRegisterForm({
                  email: registerForm?.email,
                  password: e.target.value,
                  userType: registerForm?.userType
                })}
                className="w-full max-w-sm px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-800 bg-white placeholder-emerald-400"
              />
              <div className="text-sm text-emerald-600 mt-2">
                Please enter your email and password to create an account.
                  <br />
                <strong>Note:</strong> Passwords must be at least 6 characters long.
                <br
                  />
                  </div>
                  <button
                    onClick={handleSignUp}
                    disabled={!registerForm?.email || !registerForm?.password || !registerForm?.userType || !registerForm || registerForm.password.length < 6}
                    className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                  >
                    Sign Up
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
