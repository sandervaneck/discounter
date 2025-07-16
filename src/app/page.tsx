"use client";

import { useRouter } from "next/navigation";
import { Button } from "./components/Button";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [userType, setUserType] = useState<"influencer" | "restaurant" | null>(null);
  const [showLoginFields, setShowLoginFields] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (userType && showLoginFields === false) {
      setShowLoginFields(true);
    }
  }, [userType]);

  const handleContinue = () => {
    if (userType === "influencer") {
      router.push("/user");
    } else if (userType === "restaurant") {
      router.push("/restaurant");
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
            onClick={() => setUserType("influencer")}
            className={`px-6 py-3 text-lg rounded-xl shadow-lg ${userType === "influencer" ? "text-white bg-emerald-600 hover:bg-emerald-700" : "bg-white text-emerald-700 border border-emerald-600 hover:bg-emerald-50"}`}
          >
            Login as Influencer
          </Button>
          <Button
            onClick={() => setUserType("restaurant")}
            className={`px-6 py-3 text-lg rounded-xl shadow-md ${userType === "restaurant" ? "text-white bg-emerald-600 hover:bg-emerald-700" : "bg-white text-emerald-700 border border-emerald-600 hover:bg-emerald-50"}`}
          >
            Login as Restaurant
          </Button>
        </div>

        {showLoginFields && (
          <div className="flex flex-col gap-4 items-center">
   <input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full max-w-sm px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-800 bg-white placeholder-emerald-400"
/>
<input
  type="password"
  placeholder="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full max-w-sm px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-800 bg-white placeholder-emerald-400"
/>
            <Button
              onClick={handleContinue}
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
