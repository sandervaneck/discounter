'use client';

import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { QRCode } from 'react-qrcode-logo';
import { useRouter } from "next/navigation";
import { signOut } from 'next-auth/react';
import { DiscountStatus } from "@/generated/client";


export default function UserPage() {
    const router = useRouter();
  
  const [reelLink, setReelLink] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [requestingCodeId, setRequestingCodeId] = useState<number | null>(null);
  const [tab, setTab] = useState<0 | 1>(0);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [platform, setPlatform] = useState<'instagram' | 'tiktok'>('instagram');
  const [showTooltip, setShowTooltip] = useState(false);
  const [restaurantQuery, setRestaurantQuery] = useState('');
  const [restaurantResults, setRestaurantResults] = useState<{ id: number; name: string }[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<{ id: number; name: string } | null>(null);
  const [discounts, setDiscounts] = useState<any[]>([]);
  const [myDiscounts, setMyDiscounts] = useState<any[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [statusFilter, setStatusFilter] = useState<DiscountStatus | 'all'>('all');

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

  const fetchMyDiscounts = async () => {
    try {
      const res = await fetch('/api/user/discounts');
      if (res.ok) {
        const data = await res.json();
        data.sort((a: any, b: any) => a.code.localeCompare(b.code));
        setMyDiscounts(data);
      }
    } catch (e) {
      /* ignore */
    }
  };

  const handleRequest = async (id: number, action: 'request' | 'cancel') => {
    setRequestingCodeId(id);
    try {
      const res = await fetch('/api/discounts/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codeId: id, action }),
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRestaurant) {
      alert('Please select a restaurant');
      return;
    }
    setVerifying(true);

    try {
      const res = await fetch('/api/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          restaurantId: selectedRestaurant.id,
          platform,
          reelLink,
        }),
      });

      if (!res.ok) {
        throw new Error('Validation failed');
      }

      await res.json();
      setSubmitted(true);
      await fetchDiscounts(selectedRestaurant.id);
    } catch (err) {
      console.error(err);
    } finally {
      setVerifying(false);
    }
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
      return;
    }
    setSubmitted(false);
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

  const visibleMyDiscounts = myDiscounts.filter((d) =>
    ["available", "requested"].includes(d.status)
  );

  const filteredMyDiscounts = visibleMyDiscounts
    .filter((d) => d.code.toLowerCase().includes(search.toLowerCase()))
    .filter((d) => (statusFilter === 'all' ? true : d.status === statusFilter));

  const eligibleDiscounts = submitted
    ? discounts.filter((d) => d.status === 'available' || isRequestedByCurrentUser(d))
    : [];
  const disabledDiscounts = submitted
    ? discounts.filter((d) => !(d.status === 'available' || isRequestedByCurrentUser(d)))
    : discounts;


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
            <form onSubmit={handleSubmit} className="space-y-5">
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
                                  disabled={isProcessing}
                                  className={`px-3 py-1 rounded transition-colors ${
                                    isRequested
                                      ? 'bg-white border border-emerald-500 text-emerald-700 hover:bg-emerald-50'
                                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                                  } ${isProcessing ? 'opacity-60 cursor-not-allowed' : ''}`}
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

              <div className="flex gap-3 justify-center">
                <button
                  type="button"
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg border text-sm font-medium ${
                    platform === 'instagram'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white border-emerald-300 text-emerald-700'
                  }`}
                  onClick={() => setPlatform('instagram')}
                >
                  📸 Instagram
                </button>
                <button
                  type="button"
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg border text-sm font-medium ${
                    platform === 'tiktok'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white border-emerald-300 text-emerald-700'
                  }`}
                  onClick={() => setPlatform('tiktok')}
                >
                  🎵 TikTok
                </button>
              </div>

            {platform === 'tiktok' ? (
              <>
                <label htmlFor="reel" className="block text-emerald-700 font-semibold text-xs">
                  TikTok Post URL
                </label>
                <input
                  type="text"
                  required
                  placeholder="https://www.tiktok.com/@user/video/xyz"
                  value={reelLink ?? ''}
                  onChange={(e) => setReelLink(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-emerald-300 bg-white text-emerald-900 placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </>
            ) : (
              <>
                <label htmlFor="qr" className="block text-emerald-700 font-semibold text-sm flex items-start gap-2 relative">
                  <button
                    type="button"
                    onClick={() => setShowTooltip((prev) => !prev)}
                    className="w-5 h-5 flex items-center justify-center rounded-full bg-emerald-300 text-white text-xs font-bold focus:outline-none"
                    aria-label="Help"
                  >
                    i
                  </button>
                  <span className="pt-0.5">Upload QR code of your Instagram post</span>
                  {showTooltip && (
                    <div className="absolute top-8 left-0 z-10 w-64 p-2 text-xs text-white bg-emerald-700 rounded-lg shadow-lg">
                      To upload the QR code of your Instagram post, navigate to your post, hit the &ldquo;***&rdquo; on the top right of the post, choose &ldquo;QR Code&rdquo; and then &ldquo;Save to Camera Roll&rdquo;. Then upload the saved QR code right here below.
                    </div>
                  )}
                </label>
                <label htmlFor="qr-file" className="block w-full">
                  <input
                    id="qr-file"
                    type="file"
                    accept="image/*"
                    required
                    onChange={(e) => setUploadedImage(e.target.files?.[0] || null)}
                    className="w-full px-4 py-3 rounded-xl border border-emerald-300 bg-white text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                </label>
                {uploadedImage && (
                  <div className="mt-4 flex justify-center">
                    <img
                      src={URL.createObjectURL(uploadedImage)}
                      alt="QR Preview"
                      className="max-w-full max-h-40 rounded-xl border border-emerald-300"
                    />
                  </div>
                )}
              </>
            )}

              <button
                type="submit"
                disabled={!selectedRestaurant}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {verifying ? '⏳ Verifying post...' : '🎬 Submit post'}
              </button>
              {!selectedRestaurant && (
                <p className="text-xs text-emerald-600 mt-1">
                  Please select a restaurant to submit.
                </p>
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
            <option value="available">Available</option>
            <option value="requested">Requested</option>
          </select>
        </div>
        <ul className="space-y-3">
          {filteredMyDiscounts.map((d, idx) => {
            const isCollapsed = collapsedIndexes.includes(idx);
            const styles = getStatusStyles(d.status);
            return (
              <li
                key={d.code}
                className={`border rounded-xl p-4 ${styles.container}`}
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleCollapse(idx)}
                >
                  <div>
                    <p className={`font-semibold ${styles.text}`}>{d.code}</p>
                    <p className={`text-xs ${styles.subtext}`}>{d.restaurant?.name}</p>
                    <p className={`text-xs ${styles.subtext}`}>Expires: {new Date(d.expirationTime).toISOString().split('T')[0]}</p>
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
                    <p><strong>🎟️ Code:</strong> {d.code}</p>
                    <p><strong>🏠 Restaurant:</strong> {d.restaurant?.name}</p>
                    <p><strong>🏷️ Discount:</strong> {d.discountPercent}%</p>
                    <p><strong>🍽️ Items:</strong> {d.applicableItems.map((a: any) => a.item.name).join(', ')}</p>
                    <p><strong>📆 Expiration:</strong> {new Date(d.expirationTime).toISOString().split('T')[0]}</p>
                    <div className="pt-2 flex justify-center">
                      <QRCode value={d.code} size={80} />
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    )}
  </main>
);
}
