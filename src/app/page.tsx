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
  const [isInstagramConnecting, setIsInstagramConnecting] = useState(false);
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
      registerForm?.password && 
      registerForm?.email.includes("@") &&
      registerForm?.email.includes(".") &&
      registerForm?.email.length > 5 &&
      registerForm?.password.length >= 6 &&
      registerForm?.userType &&
      registerForm?.name &&
      registerForm?.url
    );
  };

  useEffect(() => {
    if (userType && showLoginFields === false) {
      setShowLoginFields(true);
    }
  }, [userType]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedFormData =  typeof window !== "undefined" ? localStorage.getItem("registrationForm") : null;
    const savedUserType =  typeof window !== "undefined" ? localStorage.getItem("selectedUserType") : null;
    const wasRegistering =  typeof window !== "undefined" ? localStorage.getItem("isRegistering") : null; 

    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData);
        setRegisterForm(parsedData);
      } catch (error) {
        console.error('Error parsing saved form data:', error);
      }
    }
    
    if (savedUserType) {
      setUserType(savedUserType as "influencer" | "restaurant");
    }
    
    if (wasRegistering === 'true') {
      setOpenSignUp(true);
      setShowLoginFields(false);
    }
  }, []);

  // Handle Instagram OAuth redirect (only run once on mount)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');
    
    if (code && !registerForm?.url) {
      // Instagram connected successfully, save the code
      setRegisterForm((prev) => {
        const updatedForm = {
          ...prev,
          url: code
        };
        // Update localStorage with the Instagram code
        localStorage.setItem('registrationForm', JSON.stringify(updatedForm));
        return updatedForm;
      });
      setIsInstagramConnecting(false);
      
      // Clean up URL parameters
      const url = new URL(window.location.href);
      url.searchParams.delete('code');
      url.searchParams.delete('state');
      window.history.replaceState({}, document.title, url.pathname);
      
    } else if (error) {
      console.error('Instagram auth error:', error);
      setIsInstagramConnecting(false);
      alert('Instagram connection failed. Please try again.');
      
      // Clean up URL parameters
      const url = new URL(window.location.href);
      url.searchParams.delete('error');
      url.searchParams.delete('error_description');
      window.history.replaceState({}, document.title, url.pathname);
    }
  }, []); // Empty dependency array - run only once on mount

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    if (registerForm) {
      localStorage.setItem('registrationForm', JSON.stringify(registerForm));
    }
  }, [registerForm]);

  // Save user type to localStorage whenever it changes
  useEffect(() => {
    if (userType) {
      localStorage.setItem('selectedUserType', userType);
    }
  }, [userType]);

  // Save registration state to localStorage
  useEffect(() => {
    localStorage.setItem('isRegistering', openSignUp.toString());
  }, [openSignUp]);

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
    if (!checkFields()) {
      alert("Please fill in all fields and connect Instagram.");
      return;
    }

    const mappedUserType = registerForm!.userType === "restaurant" ? "business" : "influencer";
    const mappedEmail = registerForm!.email!.trim().toLowerCase();
    const mappedPassword = registerForm!.password!;
    const mappedName = registerForm!.name!.trim();
    const mappedUrl = registerForm!.url!;

    try {
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
          url: mappedUrl,
        }),
      });

      if (res.ok) {
        // Registration successful, clear localStorage
        localStorage.removeItem('registrationForm');
        localStorage.removeItem('selectedUserType');
        localStorage.removeItem('isRegistering');
        
        // Now login
        const loginRes = await signIn("credentials", {
          redirect: false,
          email: mappedEmail,
          password: mappedPassword,
        });

        if (loginRes?.ok) {
          // Redirect based on user type
          if (mappedUserType === "business") {
            router.push("/restaurant");
          } else {
            router.push("/user");
          }
        } else {
          alert("Login failed after registration. Please try logging in manually.");
        }
      } else {
        const error = await res.json();
        alert(`Sign up failed: ${error?.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    }
  };

  const handleInstagramConnect = () => {
    // Save current form state to localStorage before redirecting
    if (registerForm) {
      localStorage.setItem('registrationForm', JSON.stringify(registerForm));
    }
    localStorage.setItem('selectedUserType', userType || '');
    localStorage.setItem('isRegistering', 'true');
    
    setIsInstagramConnecting(true);
    
    const authUrl = `https://www.instagram.com/oauth/authorize?force_reauth=true&client_id=750340034464298&redirect_uri=https://discounter-coral.vercel.app&response_type=code&scope=instagram_business_basic`;
    
    // Redirect to Instagram OAuth
    window.location.href = authUrl;
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
              setUserType("influencer");
            }}
            className={`px-6 py-3 text-lg rounded-xl shadow-lg ${
              userType === "influencer" 
                ? "text-white bg-emerald-600 hover:bg-emerald-700" 
                : "bg-white text-emerald-700 border border-emerald-600 hover:bg-emerald-50"
            }`}
          >
            Login as Influencer
          </Button>
          <Button
            onClick={() => {
              setOpenSignUp(false);
              setUserType("restaurant");
            }}
            className={`px-6 py-3 text-lg rounded-xl shadow-md ${
              userType === "restaurant" 
                ? "text-white bg-emerald-600 hover:bg-emerald-700" 
                : "bg-white text-emerald-700 border border-emerald-600 hover:bg-emerald-50"
            }`}
          >
            Login as Restaurant
          </Button>
          <Button
            onClick={() => {
              setShowLoginFields(false);
              setOpenSignUp(true);
            }}
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
                  setRegisterForm((prev) => ({
                    ...prev,
                    userType: e.target.value as "influencer" | "restaurant",
                  }))
                }
                className="w-full px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-800 bg-white"
              >
                <option value="" disabled>Select User Type</option>
                <option value="influencer">Influencer</option>
                <option value="restaurant">Restaurant</option>
              </select>
            </div>

            <label className="w-full max-w-sm flex flex-col text-emerald-900 font-medium mt-4">
              Username
              <input
                type="text"
                placeholder="Username"
                value={registerForm?.name || ""}
                onChange={(e) =>
                  setRegisterForm((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-800 bg-white placeholder-emerald-400"
              />
            </label>

            <label className="w-full max-w-sm flex flex-col text-emerald-900 font-medium mt-4">
              Email
              <input
                type="email"
                placeholder="Email"
                value={registerForm?.email || ""}
                onChange={(e) =>
                  setRegisterForm((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-800 bg-white placeholder-emerald-400"
              />
            </label>

            <label className="w-full max-w-sm flex flex-col text-emerald-900 font-medium mt-4">
              Password
              <input
                type="password"
                placeholder="Password"
                value={registerForm?.password || ""}
                onChange={(e) =>
                  setRegisterForm((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-800 bg-white placeholder-emerald-400"
              />
            </label>

            <button
              onClick={handleInstagramConnect}
              disabled={isInstagramConnecting}
              className="w-full max-w-sm mt-4 px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isInstagramConnecting ? "Connecting..." : "Connect Instagram"}
            </button>
            
            {registerForm?.url && (
              <div className="w-full max-w-sm mt-2 p-2 bg-green-100 text-green-700 rounded-md text-center">
                ✓ Instagram connected successfully!
                <br />
                <small className="text-green-600">Ready to create account with Instagram integration</small>
              </div>
            )}

            {!checkFields() && (
              <div className="w-full max-w-sm text-sm text-emerald-600 mt-2">
                Please fill in all fields and connect Instagram to create an account.
                <br />
                <strong>Note:</strong> Passwords must be at least 6 characters long.
              </div>
            )}

            <button
              onClick={handleConfirmRegistration}
              disabled={!checkFields()}
              className="w-full max-w-sm mt-4 px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm Registration
            </button>
          </div>
        )}

        {showLoginFields && !openSignUp && (
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