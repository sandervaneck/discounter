'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { QRCode } from 'react-qrcode-logo';
import { useRouter } from "next/navigation";
import { signOut } from 'next-auth/react';
import { DiscountStatus } from "@prisma/client";

type MyDiscountRedemption = {
  id: number;
  status: DiscountStatus;
  redeemedAt: string | null;
  postUrl?: string | null;
  discountCode: {
    id: number;
    code: string;
    expirationTime: string;
    discountPercent: number;
    requirements: unknown;
    restaurant: { id: number; name: string } | null;
    applicableItems: { item: { name: string } }[];
  };
};

type RestaurantDetails = {
  id: number;
  name: string;
  profile: {
    restaurantName: string;
    street: string;
    streetNumber: string;
    zipCode: string;
    city: string;
    country: string;
    contactEmail: string;
    instagramUsername: string | null;
    tiktokUsername: string | null;
  } | null;
};


export default function UserPage() {
    const router = useRouter();

  const [reelLink, setReelLink] = useState('');
  const [requestingCodeId, setRequestingCodeId] = useState<number | null>(null);
  const [tab, setTab] = useState<0 | 1>(0);
  const [restaurantQuery, setRestaurantQuery] = useState('');
  const [restaurantResults, setRestaurantResults] = useState<{ id: number; name: string }[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<{ id: number; name: string } | null>(null);
  const [restaurantDetails, setRestaurantDetails] = useState<RestaurantDetails | null>(null);
  const [isLoadingRestaurantDetails, setIsLoadingRestaurantDetails] = useState(false);
  const [discounts, setDiscounts] = useState<any[]>([]);
  const [myDiscounts, setMyDiscounts] = useState<MyDiscountRedemption[]>([]);
  const [statusFilter, setStatusFilter] = useState<DiscountStatus | 'all'>('all');

  const linkProvided = reelLink.trim().length > 0;

  const fetchDiscounts = async (id: number) => {
    try {
      const res = await fetch(`/api/discounts?restaurantId=${id}`);
      if (res.ok) {
        const data = await res.json();
        data.sort((a: any, b: any) => a.code.localeCompare(b.code));
        setDiscounts(data);
      }
    } catch (e) {
      /* ignore */
    }
  };

  const fetchRestaurantDetails = async (id: number) => {
    setIsLoadingRestaurantDetails(true);
    try {
      const res = await fetch(`/api/restaurants/${id}`);
      if (!res.ok) {
        throw new Error('Failed to load restaurant details');
      }
      const data: RestaurantDetails = await res.json();
      if (selectedRestaurant?.id === id) {
        setRestaurantDetails(data);
      }
    } catch (e) {
      if (selectedRestaurant?.id === id) {
        setRestaurantDetails(null);
      }
    } finally {
      if (selectedRestaurant?.id === id) {
        setIsLoadingRestaurantDetails(false);
      }
    }
  };

  const fetchMyDiscounts = async () => {
    try {
      const res = await fetch('/api/user/discounts');
      if (res.ok) {
        const data: MyDiscountRedemption[] = await res.json();
        data.sort((a, b) =>
          a.discountCode.code.localeCompare(b.discountCode.code)
        );
        setMyDiscounts(data);
      }
    } catch (e) {
      /* ignore */
    }
  };

  const handleRequest = async (id: number, action: 'request' | 'cancel') => {
    if (action === 'request' && !linkProvided) {
      alert('Please add your post link before requesting a discount code.');
      return;
    }
    setRequestingCodeId(id);
    try {
      const trimmedLink = reelLink.trim();
      const payload: Record<string, unknown> = { codeId: id, action };
      if (action === 'request') {
        payload.postUrl = trimmedLink;
      }

      const res = await fetch('/api/discounts/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error('Request update failed');
      }
      if (selectedRestaurant) {
        await fetchDiscounts(selectedRestaurant.id);
      }
      await fetchMyDiscounts();
    } catch (e) {
      console.error(e);
    } finally {
      setRequestingCodeId(null);
    }
  };

  const handleReviewClick = () => {
    if (!linkProvided) {
      return;
    }
    const trimmedLink = reelLink.trim();
    const hasProtocol = /^https?:\/\//i.test(trimmedLink);
    const target = hasProtocol ? trimmedLink : `https://${trimmedLink}`;
    window.open(target, '_blank', 'noopener,noreferrer');
  };

  const [search, setSearch] = useState('');
  const [collapsedIndexes, setCollapsedIndexes] = useState<number[]>([]);
  const toggleCollapse = (index: number) => {
    setCollapsedIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const [eligibleCollapsed, setEligibleCollapsed] = useState<number[]>([]);
  const toggleEligible = (index: number) => {
    setEligibleCollapsed((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const [disabledCollapsed, setDisabledCollapsed] = useState<number[]>([]);
  const toggleDisabled = (index: number) => {
    setDisabledCollapsed((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'used':
        return {
          container: 'bg-orange-50 border-orange-100',
          text: 'text-orange-800',
          subtext: 'text-orange-500',
          badgeBg: 'bg-orange-100',
          badgeText: 'text-orange-800',
        };
      case 'expired':
        return {
          container: 'bg-gray-50 border-gray-200',
          text: 'text-gray-800',
          subtext: 'text-gray-500',
          badgeBg: 'bg-gray-100',
          badgeText: 'text-gray-800',
        };
      case 'requested':
        return {
          container: 'bg-amber-50 border-amber-100',
          text: 'text-amber-800',
          subtext: 'text-amber-600',
          badgeBg: 'bg-amber-100',
          badgeText: 'text-amber-800',
        };
      default:
        return {
          container: 'bg-emerald-50 border-emerald-100',
          text: 'text-emerald-800',
          subtext: 'text-emerald-500',
          badgeBg: 'bg-emerald-100',
          badgeText: 'text-emerald-800',
        };
    }
  };

  const extractRequirements = (requirementsData: any) => {
    if (Array.isArray(requirementsData)) {
      return requirementsData;
    }
    if (typeof requirementsData === 'string') {
      try {
        const parsed = JSON.parse(requirementsData);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  };

  const [user, setUser] = useState<{ id: number; email: string; name: string; userType: string } | null>(null);

  useEffect(() => {
    // Fetch the authenticated user info from your API/session endpoint
    fetch('/api/auth/me')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Unauthorized');
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setUser({
            id: Number(data.id),
            email: data.email,
            name: data.name,
            userType: data.userType,
          });
        }
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  useEffect(() => {
    if (!restaurantQuery) {
      setRestaurantResults([]);
      return;
    }
    const controller = new AbortController();
    fetch(`/api/restaurants?search=${encodeURIComponent(restaurantQuery)}`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => setRestaurantResults(data))
      .catch(() => {});
    return () => controller.abort();
  }, [restaurantQuery]);

  useEffect(() => {
    if (!selectedRestaurant) {
      setDiscounts([]);
      setRestaurantDetails(null);
      setIsLoadingRestaurantDetails(false);
      return;
    }
    setReelLink('');
    setRestaurantDetails(null);
    setDiscounts([]);
    fetchRestaurantDetails(selectedRestaurant.id);
    fetchDiscounts(selectedRestaurant.id);
  }, [selectedRestaurant]);

  const userDefined =  user && !(user as any).error;

  useEffect(() => {
    if (userDefined) {
      fetchMyDiscounts();
    }
  }, [userDefined]);

  const isRequestedByCurrentUser = (discount: any) => {
    if (!user) return false;
    return (
      discount.status === 'requested' &&
      Array.isArray(discount.redemptions) &&
      discount.redemptions.some(
        (r: any) =>
          r.status === 'requested' &&
          Number((r as any).influencerId ?? r.influencer?.id) === Number(user.id)
      )
    );
  };

  const ownedStatuses = useMemo(
    () =>
      new Set<DiscountStatus>([
        DiscountStatus.awarded,
        DiscountStatus.requested,
        DiscountStatus.used,
        DiscountStatus.expired,
      ]),
    []
  );

  const visibleMyDiscounts = myDiscounts.filter((d) =>
    ownedStatuses.has(d.status)
  );

  const searchTerm = search.trim().toLowerCase();

  const filteredMyDiscounts = visibleMyDiscounts
    .filter((d) => {
      if (!searchTerm) return true;
      const restaurantName =
        d.discountCode.restaurant?.name?.toLowerCase() ?? '';
      return (
        d.discountCode.code.toLowerCase().includes(searchTerm) ||
        restaurantName.includes(searchTerm)
      );
    })
    .filter((d) => (statusFilter === 'all' ? true : d.status === statusFilter));

  const eligibleDiscounts = discounts.filter(
    (d) => d.status === 'available' || isRequestedByCurrentUser(d)
  );
  const disabledDiscounts = discounts.filter(
    (d) => !(d.status === 'available' || isRequestedByCurrentUser(d))
  );

  const restaurantProfile = restaurantDetails?.profile;
  const restaurantName =
    restaurantProfile?.restaurantName?.trim() ||
    restaurantDetails?.name ||
    selectedRestaurant?.name ||
    '';
  const streetLine = [restaurantProfile?.street, restaurantProfile?.streetNumber]
    .filter((part) => !!part && `${part}`.trim().length > 0)
    .join(' ');
  const cityLine = [restaurantProfile?.zipCode, restaurantProfile?.city]
    .filter((part) => !!part && `${part}`.trim().length > 0)
    .join(' ');
  const countryLine = restaurantProfile?.country ?? '';


  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-white flex flex-col items-center px-4 py-6 font-sans">
      
      <div className="max-w-md w-full bg-white rounded-3xl shadow-md px-6 py-6 border border-emerald-100">
        <div className="text-center text-xs text-emerald-600 font-semibold mb-3">
          {userDefined ? <>Logged in as{' '}</> : <><button 
                          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm transition-all duration-200"
          onClick={() => router.push("/")}>Register and manage your discount codes!</button></>}
          <strong className="text-emerald-800">
            {user ? user.name : 'Loading...'}
          </strong>
        </div>
        {userDefined && (
        <div className="flex gap-3 mt-3 w-full">
          <button
            onClick={() => setTab(0)}
            className={`flex-1 text-center py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all ${
              tab === 0
                ? 'text-white bg-emerald-600'
                : 'bg-white text-emerald-700 border border-emerald-600 hover:bg-emerald-50'
            }`}
          >
            📤 Upload Post
          </button>
          <button
            onClick={() => setTab(1)}
            className={`flex-1 text-center py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all ${
              tab === 1
                ? 'text-white bg-emerald-600'
                : 'bg-white text-emerald-700 border border-emerald-600 hover:bg-emerald-50'
            }`}
          >
            🎁 My Discount Codes
          </button>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex-1 text-center py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-red-500 text-white hover:bg-red-600 transition"
          >
            Log out
          </button>
        </div>
        )}
      </div>

      {/* CONTENT BASED ON TAB */}
      {tab === 0 ? (
        <div className="max-w-md mx-auto bg-white rounded-[2rem] shadow-lg overflow-hidden border border-emerald-100 mt-6">
          <div className="bg-gradient-to-br from-white to-emerald-50 p-6 text-center">
            <h1 className="text-3xl font-extrabold text-emerald-800 tracking-tight leading-tight">
              🎥 Submit Reel
            </h1>
            <p className="text-sm text-emerald-700 mt-2">
              Turn your reel views into exclusive rewards
            </p>
          </div>

          <div className="p-6 sm:p-7">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
              <div>
                <label className="block text-emerald-700 font-semibold text-xs mb-1">Search Restaurant</label>
                <input
                  type="text"
                  value={restaurantQuery}
                  onChange={(e) => { setRestaurantQuery(e.target.value); setSelectedRestaurant(null); }}
                  placeholder="Search restaurant..."
                  className="w-full px-4 py-2 rounded-xl border border-emerald-300 bg-white text-emerald-800 placeholder-emerald-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {restaurantResults.length > 0 && (
                  <ul className="border border-emerald-300 rounded-xl mt-1 bg-white max-h-40 overflow-auto text-sm text-emerald-800">
                    {restaurantResults.map((r) => (
                      <li
                        key={r.id}
                        onClick={() => { setSelectedRestaurant(r); setRestaurantQuery(r.name); setRestaurantResults([]); }}
                        className="px-3 py-1 cursor-pointer hover:bg-emerald-50 text-emerald-800"
                      >
                        {r.name}
                      </li>
                    ))}
                  </ul>
                )}
                {selectedRestaurant && (
                  <p className="text-xs text-emerald-700 mt-1">Selected: {selectedRestaurant.name}</p>
                )}
              </div>

              {selectedRestaurant && (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 text-sm text-emerald-800">
                  {isLoadingRestaurantDetails ? (
                    <p className="text-emerald-700">Loading restaurant details...</p>
                  ) : restaurantDetails ? (
                    <div className="space-y-1">
                      <p className="font-semibold text-emerald-900">{restaurantName}</p>
                      {streetLine && <p>{streetLine}</p>}
                      {cityLine && <p>{cityLine}</p>}
                      {countryLine && <p>{countryLine}</p>}
                      {restaurantProfile?.contactEmail && (
                        <p className="text-xs text-emerald-600">
                          Contact: {restaurantProfile.contactEmail}
                        </p>
                      )}
                      {(restaurantProfile?.instagramUsername || restaurantProfile?.tiktokUsername) && (
                        <div className="pt-1 text-xs text-emerald-600 space-y-0.5">
                          {restaurantProfile.instagramUsername && (
                            <p>Instagram: @{restaurantProfile.instagramUsername}</p>
                          )}
                          {restaurantProfile.tiktokUsername && (
                            <p>TikTok: @{restaurantProfile.tiktokUsername}</p>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-emerald-700">Restaurant details not available.</p>
                  )}
                </div>
              )}

              <div>
                <label htmlFor="reel-link" className="block text-emerald-700 font-semibold text-xs mb-1">
                  Reel link
                </label>
                <input
                  id="reel-link"
                  type="url"
                  placeholder="https://www.instagram.com/reel/..."
                  value={reelLink}
                  onChange={(e) => setReelLink(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-emerald-300 bg-white text-emerald-900 placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              <button
                type="button"
                onClick={handleReviewClick}
                disabled={!linkProvided}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Review post
              </button>

              {!linkProvided && (
                <p className="text-xs text-emerald-600">
                  Add your reel link to enable discount requests.
                </p>
              )}

              {selectedRestaurant && (
                <div className="mt-6 overflow-hidden rounded-xl border border-emerald-200">
                  <table className="w-full text-sm">
                    <tbody>
                      {eligibleDiscounts.map((d, idx) => {
                        const isRequested = isRequestedByCurrentUser(d);
                        const isProcessing = requestingCodeId === d.id;
                        const buttonLabel = isProcessing
                          ? isRequested
                            ? 'Updating...'
                            : 'Requesting...'
                          : isRequested
                            ? 'Cancel Request'
                            : 'Request';
                        const buttonAction = isRequested ? 'cancel' : 'request';
                        const requirements = extractRequirements(d.requirements);
                        const disableRequestButton = isProcessing || (!linkProvided && !isRequested);

                        return (
                          <React.Fragment key={d.code}>
                            <tr className="bg-green-50">
                              <td
                                className="p-3 w-full cursor-pointer"
                                onClick={() => toggleEligible(idx)}
                              >
                                <div className="flex justify-between items-center gap-2">
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-emerald-800">{d.code}</span>
                                    {isRequested && (
                                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300">
                                        Requested
                                      </span>
                                    )}
                                  </div>
                                  {eligibleCollapsed.includes(idx) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </div>
                              </td>
                              <td className="p-3 text-right">
                                <button
                                  type="button"
                                  onClick={() => handleRequest(d.id, buttonAction)}
                                  disabled={disableRequestButton}
                                  className={`px-3 py-1 rounded transition-colors ${
                                    isRequested
                                      ? 'bg-white border border-emerald-500 text-emerald-700 hover:bg-emerald-50'
                                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                                  } ${disableRequestButton ? 'opacity-60 cursor-not-allowed' : ''}`}
                                >
                                  {buttonLabel}
                                </button>
                              </td>
                            </tr>
                          {eligibleCollapsed.includes(idx) && (
                            <tr className="bg-green-50 border-t border-emerald-200">
                              <td colSpan={2} className="p-3 text-emerald-800">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                  <div className="space-y-1">
                                    <p><strong>Discount:</strong> {d.discountPercent}%</p>
                                    <p><strong>Items:</strong> {d.applicableItems.map((a: any) => a.item.name).join(', ')}</p>
                                    <p><strong>Expiration:</strong> {new Date(d.expirationTime).toISOString().split('T')[0]}</p>
                                  </div>
                                  <div className="space-y-2 sm:text-right">
                                    <p className="font-semibold">Requirements</p>
                                    <div className="space-y-2 text-sm">
                                      {requirements.map((req: any, reqIdx: number) => (
                                        <div key={reqIdx} className="rounded-lg border border-emerald-200 bg-white/70 px-3 py-2">
                                          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{req.platform}</p>
                                          <p><strong>Views:</strong> {req.views ?? 'N/A'}</p>
                                          <p><strong>Likes:</strong> {req.likes ?? 'N/A'}</p>
                                          <p><strong>Comments:</strong> {req.comments ?? 'N/A'}</p>
                                        </div>
                                      ))}
                                      {requirements.length === 0 && (
                                        <p className="text-xs text-emerald-600">No requirements provided.</p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                          </React.Fragment>
                        );
                      })}
                      {disabledDiscounts.map((d, idx) => {
                        const statusLabel = d.status.charAt(0).toUpperCase() + d.status.slice(1);
                        const isRequestedElsewhere = d.status === 'requested';
                        const requirements = extractRequirements(d.requirements);

                        return (
                          <React.Fragment key={d.code}>
                            <tr className="bg-orange-50">
                              <td
                                className="p-3 w-full cursor-pointer"
                                onClick={() => toggleDisabled(idx)}
                              >
                                <div className="flex justify-between items-center gap-2">
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-orange-800">{d.code}</span>
                                    <span
                                      className={`text-xs px-2 py-0.5 rounded-full border ${
                                        isRequestedElsewhere
                                          ? 'bg-amber-100 text-amber-700 border-amber-300'
                                          : 'bg-orange-100 text-orange-700 border-orange-200'
                                      }`}
                                    >
                                      {statusLabel}
                                    </span>
                                  </div>
                                  {disabledCollapsed.includes(idx) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </div>
                              </td>
                              <td className="p-3 text-right">
                                <button
                                  disabled
                                  className={`px-3 py-1 rounded cursor-not-allowed ${
                                    isRequestedElsewhere
                                      ? 'bg-amber-100 text-amber-700 border border-amber-200'
                                      : 'bg-orange-200 text-orange-600'
                                  }`}
                                >
                                  {statusLabel}
                                </button>
                              </td>
                            </tr>
                          {disabledCollapsed.includes(idx) && (
                            <tr className="bg-orange-50 border-t border-orange-200">
                              <td colSpan={2} className="p-3 text-orange-800">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                  <div className="space-y-1">
                                    <p><strong>Discount:</strong> {d.discountPercent}%</p>
                                    <p><strong>Items:</strong> {d.applicableItems.map((a: any) => a.item.name).join(', ')}</p>
                                    <p><strong>Expiration:</strong> {new Date(d.expirationTime).toISOString().split('T')[0]}</p>
                                  </div>
                                  <div className="space-y-2 sm:text-right">
                                    <p className="font-semibold">Requirements</p>
                                    <div className="space-y-2 text-sm">
                                      {requirements.map((req: any, reqIdx: number) => (
                                        <div key={reqIdx} className="rounded-lg border border-orange-200 bg-white/70 px-3 py-2">
                                          <p className="text-xs font-semibold uppercase tracking-wide text-orange-700">{req.platform}</p>
                                          <p><strong>Views:</strong> {req.views ?? 'N/A'}</p>
                                          <p><strong>Likes:</strong> {req.likes ?? 'N/A'}</p>
                                          <p><strong>Comments:</strong> {req.comments ?? 'N/A'}</p>
                                        </div>
                                      ))}
                                      {requirements.length === 0 && (
                                        <p className="text-xs text-orange-600">No requirements provided.</p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                          </React.Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </form>

          </div>
        </div>
      ) : (
      <div className="max-w-md mx-auto bg-white rounded-[2rem] shadow-lg p-5 text-sm border border-emerald-100 mt-6">
        <h2 className="text-lg font-bold text-emerald-800 mb-4">🎁 My Discount Codes</h2>

        <div className="mb-4 flex flex-col gap-3">
          <input
            type="text"
            placeholder="Search code..."
            className="w-full px-4 py-2 rounded-xl border border-emerald-300 bg-white text-emerald-800 placeholder-emerald-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as DiscountStatus | 'all')}
            className="w-full px-4 py-2 rounded-xl border border-emerald-300 bg-white text-emerald-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All</option>
            <option value="requested">Requested</option>
            <option value="awarded">Awarded</option>
            <option value="used">Used</option>
            <option value="expired">Expired</option>
          </select>
        </div>
        {filteredMyDiscounts.length === 0 ? (
          <p className="text-sm text-emerald-700 text-center bg-emerald-50 border border-emerald-100 rounded-xl py-4">
            {searchTerm || statusFilter !== 'all'
              ? 'No discount codes match your filters.'
              : 'You have not been awarded any discount codes yet.'}
          </p>
        ) : (
          <ul className="space-y-3">
            {filteredMyDiscounts.map((d, idx) => {
              const discount = d.discountCode;
              const isCollapsed = collapsedIndexes.includes(idx);
              const styles = getStatusStyles(d.status);
              return (
                <li
                  key={`${d.id}-${discount.code}`}

                  className={`border rounded-xl p-4 ${styles.container}`}
                >
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleCollapse(idx)}
                  >
                    <div>
<p className={`font-semibold ${styles.text}`}>{discount.code}</p>
                      <p className={`text-xs ${styles.subtext}`}>{discount.restaurant?.name}</p>
                      <p className={`text-xs ${styles.subtext}`}>
                        Expires: {new Date(discount.expirationTime).toISOString().split('T')[0]}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${styles.badgeBg} ${styles.badgeText}`}>
                        {d.status.charAt(0).toUpperCase() + d.status.slice(1)}
                      </span>
                      {!isCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
                    </div>
                  </div>
                  {isCollapsed && (
                    <div className={`mt-3 text-sm ${styles.text} space-y-1`}>
<p><strong>🎟️ Code:</strong> {discount.code}</p>
                      <p><strong>🏠 Restaurant:</strong> {discount.restaurant?.name}</p>
                      <p><strong>🏷️ Discount:</strong> {discount.discountPercent}%</p>
                      <p><strong>🍽️ Items:</strong> {discount.applicableItems.map((a: any) => a.item.name).join(', ')}</p>
                      <p><strong>📆 Expiration:</strong> {new Date(discount.expirationTime).toISOString().split('T')[0]}</p>
                      <div className="pt-2 flex justify-center">
                        <QRCode value={discount.code} size={80} />
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    )}
  </main>
);
}
