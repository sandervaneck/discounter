'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { QRCode } from 'react-qrcode-logo';
import { DiscountType } from '../types/DiscountType';
import { useRouter } from "next/navigation";
import { signOut } from 'next-auth/react';

const discountsMock = [
  {
    code: 'DISC-20245',
    discount: '20%',
    items: ['Focaccia Truffle', 'Focaccia Caprese'],
    restaurant: 'Focacceria Milano',
    location: 'Amsterdam',
    expiration: '2025-08-30',
    views: 18200,
    likes: 2400,
  },
  {
    code: 'DISC-20246',
    discount: '15%',
    items: ['Pizza Margherita'],
    restaurant: 'La Piazza',
    location: 'Rotterdam',
    expiration: '2025-08-15',
    views: 15300,
    likes: 1800,
  },
  {
    code: 'DISC-20247',
    discount: '25%',
    items: ['Lasagna', 'Tiramisu'],
    restaurant: 'Osteria Roma',
    location: 'Utrecht',
    expiration: '2025-09-01',
    views: 22000,
    likes: 2900,
  },
  {
    code: 'DISC-20248',
    discount: '10%',
    items: ['Panini Prosciutto'],
    restaurant: 'Panini House',
    location: 'Amsterdam',
    expiration: '2025-08-22',
    views: 8900,
    likes: 1200,
  },
];


export default function UserPage() {
    const router = useRouter();
  
  const [reelLink, setReelLink] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState<DiscountType | null>(null);
  const [tab, setTab] = useState<0 | 1>(0);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [platform, setPlatform] = useState<'instagram' | 'tiktok'>('instagram');
  const [showTooltip, setShowTooltip] = useState(false);
  const [restaurantQuery, setRestaurantQuery] = useState('');
  const [restaurantResults, setRestaurantResults] = useState<{ id: number; name: string }[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<{ id: number; name: string } | null>(null);

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

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setVerifying(false);
    }
  };

  const [search, setSearch] = useState('');
  const [filterCity, setFilterCity] = useState('All');
  const [collapsedIndexes, setCollapsedIndexes] = useState<number[]>([]);
  const toggleCollapse = (index: number) => {
    setCollapsedIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const [user, setUser] = useState<{ email: string, name: string } | null>(null);

  useEffect(() => {
    // Fetch the authenticated user info from your API/session endpoint
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {

        if (data) {
          setUser(data);
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

  const userDefined =  user && !(user as any).error;


  const filteredDiscounts = discountsMock.filter((d) => {
    const matchesSearch = d.restaurant.toLowerCase().includes(search.toLowerCase());
    const matchesCity = filterCity === 'All' || d.location === filterCity;
    return matchesSearch && matchesCity;
  });


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
        {userDefined && <div className="flex gap-3">
          <button
            onClick={() => setTab(0)}
            className={`flex-1 text-center py-2.5 rounded-xl font-semibold text-sm transition-all ${
              tab === 0
                ? 'text-white bg-emerald-600'
                : 'bg-white text-emerald-700 border border-emerald-600 hover:bg-emerald-50'
            }`}
          >
            📤 Upload Post
          </button>
          <button
            onClick={() => setTab(1)}
            className={`flex-1 text-center py-2.5 rounded-xl font-semibold text-sm transition-all ${
              tab === 1
                ? 'text-white bg-emerald-600'
                : 'bg-white text-emerald-700 border border-emerald-600 hover:bg-emerald-50'
            }`}
          >
            🎁 My Discount Codes
          </button>
          <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition"
                  >
                    Log out
                  </button>
        </div>}
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
            {!result && (
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
                    <ul className="border border-emerald-300 rounded-xl mt-1 bg-white max-h-40 overflow-auto text-sm">
                      {restaurantResults.map((r) => (
                        <li
                          key={r.id}
                          onClick={() => { setSelectedRestaurant(r); setRestaurantQuery(r.name); setRestaurantResults([]); }}
                          className="px-3 py-1 cursor-pointer hover:bg-emerald-50"
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
          )}

          {result && (
            <div className="mt-6 space-y-4">
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
                <CheckCircle className="text-emerald-500 w-6 h-6 mx-auto mb-2" />
                <p className="text-emerald-700 font-semibold text-center text-sm mb-4">
                  Post Verified! 🎉 Here’s your reward
                </p>
                <div className="text-sm text-emerald-800 space-y-2">
                  <p><strong>👤 Username:</strong> {result.username}</p>
                  <p><strong>👀 Views:</strong> {result.views}</p>
                  <p><strong>❤️ Likes:</strong> {result.likes}</p>
                  <p><strong>💬 Comments:</strong> {result.comments}</p>
                  <p><strong>🔁 Reposts:</strong> {result.reposts}</p>
                  <p><strong>🏷️ Discount:</strong> {result.discount}</p>
                  <p><strong>🍽️ Items:</strong> {result.items.join(', ')}</p>
                  <p><strong>📍 Restaurant:</strong> {result.restaurant}</p>
                  <p><strong>🎟️ Code:</strong> {result.code}</p>
                </div>
                <div className="mt-5 flex justify-center">
                  <QRCode value={result.code} size={120} />
                </div>
              </div>
              <button
                type="submit"
                onClick={() => window.location.reload()}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm transition-all duration-200"
              >
                Submit Another Post
              </button>
            </div>
          )}
        </div>
      </div>
    ) : (
      <div className="max-w-md mx-auto bg-white rounded-[2rem] shadow-lg p-5 text-sm border border-emerald-100 mt-6">
        <h2 className="text-lg font-bold text-emerald-800 mb-4">🎁 My Discount Codes</h2>

        <div className="mb-4 flex flex-col gap-3">
          <input
            type="text"
            placeholder="Search restaurant..."
            className="w-full px-4 py-2 rounded-xl border border-emerald-300 bg-white text-emerald-800 placeholder-emerald-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="w-full px-4 py-2 rounded-xl border border-emerald-300 text-sm text-emerald-700"
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
          >
            <option value="All">All Cities</option>
            <option value="Amsterdam">Amsterdam</option>
            <option value="Rotterdam">Rotterdam</option>
            <option value="Utrecht">Utrecht</option>
          </select>
        </div>
        <ul className="space-y-3">
          {filteredDiscounts.map((d, idx) => {
            const isCollapsed = collapsedIndexes.includes(idx);
            return (
              <li
                key={d.code}
                className="border border-emerald-100 rounded-xl p-4 bg-emerald-50"
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleCollapse(idx)}
                >
                  <div>
                    <p className="font-semibold text-emerald-800">{d.restaurant} – {d.location}</p>
                    <p className="text-xs text-emerald-500">Expires: {d.expiration}</p>
                  </div>
                  {!isCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
                </div>
                {isCollapsed && (
                  <div className="mt-3 text-sm text-emerald-800 space-y-1">
                    <p><strong>🎟️ Code:</strong> {d.code}</p>
                    <p><strong>🏷️ Discount:</strong> {d.discount}</p>
                    <p><strong>🍽️ Items:</strong> {d.items.join(', ')}</p>
                    <p><strong>👀 Views:</strong> {d.views}</p>
                    <p><strong>❤️ Likes:</strong> {d.likes}</p>
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