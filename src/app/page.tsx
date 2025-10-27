"use client";

import { useRouter } from "next/navigation";
import { Button } from "./components/Button";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { ChevronDown, ChevronUp } from "lucide-react";

type RegisterForm = {
  userType?: "influencer" | "restaurant";
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  url?: string;
  restaurant?: {
    restaurantName?: string;
    street?: string;
    number?: string;
    zipCode?: string;
    city?: string;
    country?: string;
    contactEmail?: string;
    instagramUsername?: string;
    tiktokUsername?: string;
  };
};

export default function Home() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [openSignUp, setOpenSignUp] = useState(false);
  const [showLoginFields, setShowLoginFields] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInstagramConnecting, setIsInstagramConnecting] = useState(false);
  const [registerForm, setRegisterForm] = useState<RegisterForm>({});
  const [showRestaurantSearch, setShowRestaurantSearch] = useState(false);
  const [restaurantSearchQuery, setRestaurantSearchQuery] = useState("");
  const [restaurantResults, setRestaurantResults] = useState<
    { id: number; name: string }[]
  >([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<
    { id: number; name: string } | null
  >(null);
  const [restaurantDiscounts, setRestaurantDiscounts] = useState<any[]>([]);
  const [isLoadingDiscounts, setIsLoadingDiscounts] = useState(false);
  const [collapsedDiscountIndexes, setCollapsedDiscountIndexes] = useState<number[]>([]);

  const hasRequiredFields = () => {
    if (!registerForm.userType) {
      return false;
    }

    const hasValidEmail = Boolean(
      registerForm.email &&
        registerForm.email.includes("@") &&
        registerForm.email.includes(".") &&
        registerForm.email.length > 5
    );

    const hasValidPassword = Boolean(
      registerForm.password &&
        registerForm.confirmPassword &&
        registerForm.password.length >= 6 &&
        registerForm.password === registerForm.confirmPassword
    );

    if (!hasValidEmail || !hasValidPassword) {
      return false;
    }

    if (registerForm.userType === "influencer") {
      return Boolean(registerForm.name && registerForm.name.trim());
    }

    if (registerForm.userType === "restaurant") {
      const details = registerForm.restaurant;
      if (!details) {
        return false;
      }

      const hasContactEmail = Boolean(
        details.contactEmail &&
          details.contactEmail.includes("@") &&
          details.contactEmail.includes(".")
      );

      return (
        Boolean(registerForm.name && registerForm.name.trim()) &&
        Boolean(details.restaurantName && details.restaurantName.trim()) &&
        Boolean(details.street && details.street.trim()) &&
        Boolean(details.number && details.number.trim()) &&
        Boolean(details.zipCode && details.zipCode.trim()) &&
        Boolean(details.city && details.city.trim()) &&
        Boolean(details.country && details.country.trim()) &&
        hasContactEmail
      );
    }

    return false;
  };

  const handleToggleRestaurantSearch = () => {
    setShowRestaurantSearch((prev) => {
      const next = !prev;
      if (!next) {
        setRestaurantSearchQuery("");
        setRestaurantResults([]);
        setSelectedRestaurant(null);
        setRestaurantDiscounts([]);
        setCollapsedDiscountIndexes([]);
      }
      return next;
    });
  };

  const toggleDiscountCollapse = (index: number) => {
    setCollapsedDiscountIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const extractRequirements = (requirementsData: any) => {
    if (Array.isArray(requirementsData)) {
      return requirementsData;
    }
    if (typeof requirementsData === "string") {
      try {
        const parsed = JSON.parse(requirementsData);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    if (requirementsData && typeof requirementsData === "object") {
      return [requirementsData];
    }
    return [];
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "used":
        return {
          container: "bg-orange-50 border-orange-100",
          text: "text-orange-800",
          subtext: "text-orange-500",
          badgeBg: "bg-orange-100",
          badgeText: "text-orange-800",
        };
      case "expired":
        return {
          container: "bg-gray-50 border-gray-200",
          text: "text-gray-800",
          subtext: "text-gray-500",
          badgeBg: "bg-gray-100",
          badgeText: "text-gray-800",
        };
      case "requested":
        return {
          container: "bg-amber-50 border-amber-100",
          text: "text-amber-800",
          subtext: "text-amber-600",
          badgeBg: "bg-amber-100",
          badgeText: "text-amber-800",
        };
      case "awarded":
        return {
          container: "bg-sky-50 border-sky-100",
          text: "text-sky-800",
          subtext: "text-sky-600",
          badgeBg: "bg-sky-100",
          badgeText: "text-sky-800",
        };
      default:
        return {
          container: "bg-emerald-50 border-emerald-100",
          text: "text-emerald-800",
          subtext: "text-emerald-500",
          badgeBg: "bg-emerald-100",
          badgeText: "text-emerald-800",
        };
    }
  };

  // Load data from localStorage on mount
  useEffect(() => {
    const savedFormData =
      typeof window !== "undefined" ? localStorage.getItem("registrationForm") : null;
    const savedUserType =
      typeof window !== "undefined" ? localStorage.getItem("selectedUserType") : null;
    const wasRegistering =
      typeof window !== "undefined" ? localStorage.getItem("isRegistering") : null;

    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData);
        setRegisterForm(parsedData);
      } catch (error) {
        console.error('Error parsing saved form data:', error);
      }
    }

    if (savedUserType && !savedFormData) {
      setRegisterForm((prev) => ({ ...prev, userType: savedUserType as "influencer" | "restaurant" }));
    }

    if (wasRegistering === 'true') {
      setOpenSignUp(true);
      setShowLoginFields(false);
      setActiveTab("signup");
    } else {
      setActiveTab("login");
      setShowLoginFields(true);
    }
  }, []);

  useEffect(() => {
    if (!showRestaurantSearch || !restaurantSearchQuery) {
      if (!restaurantSearchQuery) {
        setRestaurantResults([]);
      }
      return;
    }

    const controller = new AbortController();

    fetch(`/api/restaurants?search=${encodeURIComponent(restaurantSearchQuery)}`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => setRestaurantResults(data))
      .catch((error) => {
        if ((error as any)?.name !== "AbortError") {
          console.error("Failed to search restaurants", error);
        }
      });

    return () => {
      controller.abort();
    };
  }, [restaurantSearchQuery, showRestaurantSearch]);

  useEffect(() => {
    if (!showRestaurantSearch || !selectedRestaurant) {
      if (!selectedRestaurant) {
        setRestaurantDiscounts([]);
      }
      return;
    }

    setIsLoadingDiscounts(true);
    setCollapsedDiscountIndexes([]);

    fetch(`/api/discounts?restaurantId=${selectedRestaurant.id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load discounts");
        }
        return res.json();
      })
      .then((data) => setRestaurantDiscounts(data))
      .catch((error) => {
        console.error("Failed to load restaurant discounts", error);
        setRestaurantDiscounts([]);
      })
      .finally(() => setIsLoadingDiscounts(false));
  }, [selectedRestaurant, showRestaurantSearch]);

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
    const hasData = Object.entries(registerForm).some(([key, value]) => {
      if (value === undefined || value === null) {
        return false;
      }

      if (typeof value === "string") {
        return value.trim() !== "";
      }

      if (typeof value === "object") {
        if (Array.isArray(value)) {
          return value.length > 0;
        }

        return Object.values(value).some((nestedValue) => {
          if (nestedValue === undefined || nestedValue === null) {
            return false;
          }

          if (typeof nestedValue === "string") {
            return nestedValue.trim() !== "";
          }

          return true;
        });
      }

      return true;
    });

    if (hasData) {
      localStorage.setItem('registrationForm', JSON.stringify(registerForm));
    } else {
      localStorage.removeItem('registrationForm');
    }
  }, [registerForm]);

  // Save user type to localStorage whenever it changes
  useEffect(() => {
    if (registerForm.userType) {
      localStorage.setItem('selectedUserType', registerForm.userType);
    } else {
      localStorage.removeItem('selectedUserType');
    }
  }, [registerForm.userType]);

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
    if (!hasRequiredFields()) {
      alert("Please fill in all required fields before registering.");
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      alert("Passwords do not match. Please re-enter them.");
      return;
    }

    const mappedUserType = registerForm.userType === "restaurant" ? "business" : "influencer";
    const mappedEmail = registerForm.email!.trim().toLowerCase();
    const mappedPassword = registerForm.password!;
    const mappedName = registerForm.name?.trim() || "";
    const mappedUrl = registerForm.url ? registerForm.url : undefined;
    const restaurantDetails =
      registerForm.userType === "restaurant" && registerForm.restaurant
        ? {
            restaurantName: registerForm.restaurant.restaurantName?.trim() || "",
            street: registerForm.restaurant.street?.trim() || "",
            number: registerForm.restaurant.number?.trim() || "",
            zipCode: registerForm.restaurant.zipCode?.trim() || "",
            city: registerForm.restaurant.city?.trim() || "",
            country: registerForm.restaurant.country?.trim() || "",
            contactEmail: registerForm.restaurant.contactEmail?.trim() || "",
            instagramUsername: registerForm.restaurant.instagramUsername?.trim() || undefined,
            tiktokUsername: registerForm.restaurant.tiktokUsername?.trim() || undefined,
          }
        : undefined;

    if (!mappedName) {
      alert("Please provide your name before registering.");
      return;
    }

    if (registerForm.userType === "restaurant" && restaurantDetails) {
      const missingField = Object.entries(restaurantDetails).find(([key, value]) => {
        if (key === "instagramUsername" || key === "tiktokUsername") {
          return false;
        }
        return !value;
      });

      if (missingField) {
        alert("Please complete all required restaurant details.");
        return;
      }
    }

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
          ...(mappedUrl ? { url: mappedUrl } : {}),
          ...(restaurantDetails ? { restaurantDetails } : {}),
        }),
      });

      if (res.ok) {
        // Registration successful, clear localStorage
        localStorage.removeItem('registrationForm');
        localStorage.removeItem('selectedUserType');
        localStorage.removeItem('isRegistering');
        setRegisterForm({});
        setOpenSignUp(false);
        setActiveTab("login");
        setShowLoginFields(true);

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
    localStorage.setItem('selectedUserType', registerForm?.userType || '');
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
              setActiveTab("login");
              setOpenSignUp(false);
              setShowLoginFields(true);
            }}
            className={`px-6 py-3 text-lg rounded-xl shadow-lg border ${
              activeTab === "login"
                ? "bg-emerald-700 border-emerald-700 text-white"
                : "bg-transparent text-emerald-700 border-emerald-600 hover:bg-emerald-50"
            }`}
          >
            Log in
          </Button>
          <Button
            onClick={() => {
              setActiveTab("signup");
              setOpenSignUp(true);
              setShowLoginFields(false);
            }}
            className={`px-6 py-3 text-lg rounded-xl shadow-lg border ${
              activeTab === "signup"
                ? "bg-emerald-700 border-emerald-700 text-white"
                : "bg-transparent text-emerald-700 border-emerald-600 hover:bg-emerald-50"
            }`}
          >
            Sign up
          </Button>
          <Button
            onClick={() => router.push("/user")}
            className="px-6 py-3 text-lg rounded-xl shadow-lg border bg-transparent text-emerald-700 border-emerald-600 hover:bg-emerald-50"
          >
            Continue without account
          </Button>
        </div>

        {openSignUp && (
          <div className="flex flex-col items-center text-sm text-emerald-600 mb-4">
            <div className="w-full max-w-sm mt-2">
              Are you an influencer or restaurant?
              <br />
              <select
                value={registerForm.userType || ""}
                onChange={(e) => {
                  const nextUserType = e.target.value as "influencer" | "restaurant";
                  setRegisterForm((prev) => ({
                    ...prev,
                    userType: nextUserType,
                    restaurant: nextUserType === "restaurant" ? prev.restaurant ?? {} : undefined,
                  }));
                }}
                className="w-full px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-800 bg-white"
              >
                <option value="" disabled>Select User Type</option>
                <option value="influencer">Influencer</option>
                <option value="restaurant">Restaurant</option>
              </select>
            </div>

            <label className="w-full max-w-sm flex flex-col text-emerald-900 font-medium mt-4">
              {registerForm.userType === "restaurant" ? "Contact name" : "Username"}
              <input
                type="text"
                placeholder={registerForm.userType === "restaurant" ? "Contact name" : "Username"}
                value={registerForm.name || ""}
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
                value={registerForm.email || ""}
                onChange={(e) =>
                  setRegisterForm((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-800 bg-white placeholder-emerald-400"
              />
            </label>

            {registerForm.userType === "restaurant" && (
              <div className="w-full max-w-sm grid grid-cols-1 gap-4 mt-4 text-emerald-900">
                <div className="flex flex-col font-medium">
                  Restaurant name
                  <input
                    type="text"
                    placeholder="Restaurant name"
                    value={registerForm.restaurant?.restaurantName || ""}
                    onChange={(e) =>
                      setRegisterForm((prev) => ({
                        ...prev,
                        restaurant: {
                          ...prev.restaurant,
                          restaurantName: e.target.value,
                        },
                      }))
                    }
                    className="mt-1 w-full px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-800 bg-white placeholder-emerald-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 font-medium">
                  <label className="flex flex-col">
                    Street
                    <input
                      type="text"
                      placeholder="Street"
                      value={registerForm.restaurant?.street || ""}
                      onChange={(e) =>
                        setRegisterForm((prev) => ({
                          ...prev,
                          restaurant: {
                            ...prev.restaurant,
                            street: e.target.value,
                          },
                        }))
                      }
                      className="mt-1 px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-800 bg-white placeholder-emerald-400"
                    />
                  </label>
                  <label className="flex flex-col">
                    Number
                    <input
                      type="text"
                      placeholder="Number"
                      value={registerForm.restaurant?.number || ""}
                      onChange={(e) =>
                        setRegisterForm((prev) => ({
                          ...prev,
                          restaurant: {
                            ...prev.restaurant,
                            number: e.target.value,
                          },
                        }))
                      }
                      className="mt-1 px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-800 bg-white placeholder-emerald-400"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-3 font-medium">
                  <label className="flex flex-col">
                    ZIP code
                    <input
                      type="text"
                      placeholder="ZIP code"
                      value={registerForm.restaurant?.zipCode || ""}
                      onChange={(e) =>
                        setRegisterForm((prev) => ({
                          ...prev,
                          restaurant: {
                            ...prev.restaurant,
                            zipCode: e.target.value,
                          },
                        }))
                      }
                      className="mt-1 px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-800 bg-white placeholder-emerald-400"
                    />
                  </label>
                  <label className="flex flex-col">
                    City
                    <input
                      type="text"
                      placeholder="City"
                      value={registerForm.restaurant?.city || ""}
                      onChange={(e) =>
                        setRegisterForm((prev) => ({
                          ...prev,
                          restaurant: {
                            ...prev.restaurant,
                            city: e.target.value,
                          },
                        }))
                      }
                      className="mt-1 px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-800 bg-white placeholder-emerald-400"
                    />
                  </label>
                </div>

                <label className="flex flex-col font-medium">
                  Country
                  <input
                    type="text"
                    placeholder="Country"
                    value={registerForm.restaurant?.country || ""}
                    onChange={(e) =>
                      setRegisterForm((prev) => ({
                        ...prev,
                        restaurant: {
                          ...prev.restaurant,
                          country: e.target.value,
                        },
                      }))
                    }
                    className="mt-1 px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-800 bg-white placeholder-emerald-400"
                  />
                </label>

                <label className="flex flex-col font-medium">
                  Contact email
                  <input
                    type="email"
                    placeholder="Contact email"
                    value={registerForm.restaurant?.contactEmail || ""}
                    onChange={(e) =>
                      setRegisterForm((prev) => ({
                        ...prev,
                        restaurant: {
                          ...prev.restaurant,
                          contactEmail: e.target.value,
                        },
                      }))
                    }
                    className="mt-1 px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-800 bg-white placeholder-emerald-400"
                  />
                </label>

                <label className="flex flex-col font-medium">
                  Instagram username (optional)
                  <input
                    type="text"
                    placeholder="Instagram username"
                    value={registerForm.restaurant?.instagramUsername || ""}
                    onChange={(e) =>
                      setRegisterForm((prev) => ({
                        ...prev,
                        restaurant: {
                          ...prev.restaurant,
                          instagramUsername: e.target.value,
                        },
                      }))
                    }
                    className="mt-1 px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-800 bg-white placeholder-emerald-400"
                  />
                </label>

                <label className="flex flex-col font-medium">
                  TikTok username (optional)
                  <input
                    type="text"
                    placeholder="TikTok username"
                    value={registerForm.restaurant?.tiktokUsername || ""}
                    onChange={(e) =>
                      setRegisterForm((prev) => ({
                        ...prev,
                        restaurant: {
                          ...prev.restaurant,
                          tiktokUsername: e.target.value,
                        },
                      }))
                    }
                    className="mt-1 px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-800 bg-white placeholder-emerald-400"
                  />
                </label>
              </div>
            )}

            <label className="w-full max-w-sm flex flex-col text-emerald-900 font-medium mt-4">
              Password
              <input
                type="password"
                placeholder="Password"
                value={registerForm.password || ""}
                onChange={(e) =>
                  setRegisterForm((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-800 bg-white placeholder-emerald-400"
              />
            </label>

            <label className="w-full max-w-sm flex flex-col text-emerald-900 font-medium mt-4">
              Confirm password
              <input
                type="password"
                placeholder="Confirm password"
                value={registerForm.confirmPassword || ""}
                onChange={(e) =>
                  setRegisterForm((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-800 bg-white placeholder-emerald-400"
              />
            </label>

            {/*
            {registerForm.userType === "influencer" && !registerForm.url && (
              <button
                onClick={handleInstagramConnect}
                disabled={isInstagramConnecting}
                className="w-full max-w-sm mt-4 px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isInstagramConnecting ? "Connecting..." : "Connect Instagram"}
              </button>
            )}

            {registerForm.userType === "influencer" && registerForm.url && (
              <div className="w-full max-w-sm mt-2 p-2 bg-green-100 text-green-700 rounded-md text-center">
                ✓ Instagram connected successfully!
                <br />
                <small className="text-green-600">Ready to create account with Instagram integration</small>
              </div>
            )}
            */}

            {!hasRequiredFields() && (
              <div className="w-full max-w-sm text-sm text-emerald-600 mt-2">
                Please fill in all required fields to create an account. Passwords must be at least 6 characters long and match.
              </div>
            )}

            <button
              onClick={handleConfirmRegistration}
              disabled={!hasRequiredFields()}
              className="w-full max-w-sm mt-4 px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Register
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

        <div className="flex justify-center mt-6">
          <Button
            onClick={handleToggleRestaurantSearch}
            className="px-6 py-3 text-lg rounded-xl shadow-lg bg-white text-emerald-700 border border-emerald-600 hover:bg-emerald-50"
          >
            {showRestaurantSearch ? "Hide Restaurant Search" : "Search Restaurant"}
          </Button>
        </div>

        {showRestaurantSearch && (
          <div className="mt-6 w-full max-w-2xl mx-auto bg-white/80 backdrop-blur rounded-3xl shadow-lg border border-emerald-100 p-6 text-left">
            <h2 className="text-2xl font-bold text-emerald-800">Search restaurant discounts</h2>
            <p className="text-sm text-emerald-700 mt-1">
              Explore available discount codes before signing up. Log in as an influencer to request a code.
            </p>

            <div className="mt-4">
              <label className="block text-sm font-semibold text-emerald-700 mb-1">
                Restaurant name
              </label>
              <input
                type="text"
                value={restaurantSearchQuery}
                onChange={(e) => {
                  setRestaurantSearchQuery(e.target.value);
                  setSelectedRestaurant(null);
                }}
                placeholder="Search restaurant..."
                className="w-full px-4 py-2 rounded-xl border border-emerald-300 bg-white text-emerald-800 placeholder-emerald-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {restaurantResults.length > 0 && (
                <ul className="border border-emerald-200 rounded-xl mt-2 bg-white max-h-40 overflow-auto text-sm text-emerald-800">
                  {restaurantResults.map((restaurant) => (
                    <li
                      key={restaurant.id}
                      onClick={() => {
                        setSelectedRestaurant(restaurant);
                        setRestaurantSearchQuery(restaurant.name);
                        setRestaurantResults([]);
                      }}
                      className="px-3 py-2 cursor-pointer hover:bg-emerald-50"
                    >
                      {restaurant.name}
                    </li>
                  ))}
                </ul>
              )}
              {restaurantSearchQuery && restaurantResults.length === 0 && !selectedRestaurant && (
                <p className="text-xs text-emerald-600 mt-2">No restaurants match your search yet.</p>
              )}
              {selectedRestaurant && (
                <p className="text-xs text-emerald-700 mt-2">
                  Viewing discounts for <strong>{selectedRestaurant.name}</strong>
                </p>
              )}
            </div>

            {selectedRestaurant && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-emerald-800">
                  Available discount codes
                </h3>
                {isLoadingDiscounts ? (
                  <p className="mt-3 text-sm text-emerald-600">Loading discounts…</p>
                ) : restaurantDiscounts.length === 0 ? (
                  <p className="mt-3 text-sm text-emerald-600">
                    This restaurant doesn&apos;t have any discount codes yet.
                  </p>
                ) : (
                  <ul className="mt-4 space-y-3">
                    {restaurantDiscounts.map((discount, index) => {
                      const statusLabel = discount.status
                        ? discount.status.charAt(0).toUpperCase() + discount.status.slice(1)
                        : "Available";
                      const styles = getStatusStyles(discount.status || "available");
                      const isCollapsed = collapsedDiscountIndexes.includes(index);
                      const requirements = extractRequirements(discount.requirements);
                      const applicableItems = discount.applicableItems
                        ? discount.applicableItems.map((item: any) => item.item?.name).filter(Boolean)
                        : [];

                      return (
                        <li
                          key={`${discount.id}-${discount.code}`}
                          className={`border rounded-2xl p-4 transition-colors ${styles.container}`}
                        >
                          <button
                            type="button"
                            onClick={() => toggleDiscountCollapse(index)}
                            className="w-full flex items-center justify-between gap-4"
                          >
                            <div className="text-left">
                              <p className={`text-base font-semibold ${styles.text}`}>{discount.code}</p>
                              <p className={`text-xs ${styles.subtext}`}>
                                Status: {statusLabel}
                              </p>
                              <p className={`text-xs ${styles.subtext}`}>
                                Discount: {discount.discountPercent}% &bull; Expires: {new Date(discount.expirationTime).toISOString().split("T")[0]}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`text-xs px-2 py-0.5 rounded-full ${styles.badgeBg} ${styles.badgeText}`}>
                                {statusLabel}
                              </span>
                              {isCollapsed ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </div>
                          </button>
                          {isCollapsed && (
                            <div className={`mt-4 text-sm space-y-3 ${styles.text}`}>
                              <div className="space-y-1">
                                <p><strong>Items:</strong> {applicableItems.length > 0 ? applicableItems.join(", ") : "All menu items"}</p>
                                <p>
                                  <strong>Expiration:</strong> {new Date(discount.expirationTime).toISOString().split("T")[0]}
                                </p>
                              </div>
                              <div>
                                <p className="font-semibold">Requirements</p>
                                <div className="mt-2 space-y-2">
                                  {requirements.length > 0 ? (
                                    requirements.map((req: any, reqIdx: number) => (
                                      <div
                                        key={reqIdx}
                                        className="rounded-xl border border-emerald-200 bg-white/80 px-3 py-2 text-sm"
                                      >
                                        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                                          {req.platform ?? "Platform"}
                                        </p>
                                        <p><strong>Views:</strong> {req.views ?? "N/A"}</p>
                                        <p><strong>Likes:</strong> {req.likes ?? "N/A"}</p>
                                        <p><strong>Comments:</strong> {req.comments ?? "N/A"}</p>
                                      </div>
                                    ))
                                  ) : (
                                    <p className="text-xs text-emerald-600">
                                      No requirements provided for this code.
                                    </p>
                                  )}
                                </div>
                              </div>
                              <p className="text-xs text-emerald-600">
                                Log in or register as an influencer to request this discount code.
                              </p>
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}