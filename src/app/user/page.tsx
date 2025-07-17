'use client';

import React, { useState } from 'react';
import { CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { QRCode } from 'react-qrcode-logo';

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

export type DiscountType ={
        username: 'influencer_eric',
        views: 18200,
        likes: 2400,
        comments: 310,
        reposts: 120,
        discount: '30%',
        items: ['Focaccia Truffle', 'Focaccia Caprese'],
        restaurant: 'Focacceria Milano',
        code: 'DISCOUNT-ER-18200',
      }

export default function UserPage() {
  const [reelLink, setReelLink] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState<DiscountType | null>(null);
  const [tab, setTab] = useState<0 | 1>(0);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [platform, setPlatform] = useState<'instagram' | 'tiktok'>('instagram');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVerifying(true);

    setTimeout(() => {
      setResult({
        username: 'influencer_eric',
        views: 18200,
        likes: 2400,
        comments: 310,
        reposts: 120,
        discount: '30%',
        items: ['Focaccia Truffle', 'Focaccia Caprese'],
        restaurant: 'Focacceria Milano',
        code: 'DISCOUNT-ER-18200',
      });
      setVerifying(false);
    }, 2000);
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

  const user = { name: 'influencer_eric' };

  const filteredDiscounts = discountsMock.filter((d) => {
    const matchesSearch = d.restaurant.toLowerCase().includes(search.toLowerCase());
    const matchesCity = filterCity === 'All' || d.location === filterCity;
    return matchesSearch && matchesCity;
  });


  return (
    <main className="min-h-screen bg-[#f6f6f6] px-4 py-6 font-sans">
      <div className="max-w-md mx-auto mb-6 bg-white rounded-3xl shadow-md px-6 py-5">
        <div className="text-center text-xs text-gray-500 font-semibold mb-3">
          Logged in as <strong className="text-gray-700">{user.name}</strong>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setTab(0)}
            className={`flex-1 text-center py-2.5 rounded-xl font-semibold text-sm transition-all ${tab === 0 ? 'text-white bg-[#ff715b]' : 'bg-white text-[#ff715b] border border-[#ff715b] hover:bg-[#fff2f0]'}`}
          >
            📤 Upload Post
          </button>
          <button
            onClick={() => setTab(1)}
            className={`flex-1 text-center py-2.5 rounded-xl font-semibold text-sm transition-all ${tab === 1 ? 'text-white bg-[#ff715b]' : 'bg-white text-[#ff715b] border border-[#ff715b] hover:bg-[#fff2f0]'}`}
          >
            🎁 My Discount Codes
          </button>
        </div>
      </div>

      {tab === 0 ? (
        <div className="max-w-md mx-auto bg-white rounded-[2rem] shadow-lg overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-br from-[#ffffff] to-[#f3f3f3] p-6 text-center">
            <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight leading-tight">
              🎥 Submit Reel
            </h1>click to 
            <p className="text-s text-gray-500 mt-2">
              Turn your reel views into exclusive rewards
            </p>
          </div>

          <div className="p-6 sm:p-7">
            {!result && (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex gap-3 justify-center">
                  <button
                    type="button"
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg border text-sm font-medium ${platform === 'instagram' ? 'bg-[#ff715b] text-white' : 'bg-white border-[#ccc] text-gray-700'}`}
                    onClick={() => setPlatform('instagram')}
                  >
                    📸 Instagram
                  </button>
                  <button
                    type="button"
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg border text-sm font-medium ${platform === 'tiktok' ? 'bg-[#ff715b] text-white' : 'bg-white border-[#ccc] text-gray-700'}`}
                    onClick={() => setPlatform('tiktok')}
                  >
                    🎵 TikTok
                  </button>
                </div>

                {platform === 'tiktok' ? (
                  <>
                    <label htmlFor="reel" className="block text-gray-600 font-semibold text-xs">
                      TikTok Post URL
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="https://www.tiktok.com/@user/video/xyz"
                      value={reelLink}
                      onChange={(e) => setReelLink(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff715b] text-sm"
                    />
                  </>
                ) : (
                  <>
                    <div className="relative inline-block">
                      <label htmlFor="qr" className="block text-gray-600 font-semibold text-m flex items-start gap-2">
                        <span className="flex items-center gap-1">
                          <span className="w-5 h-5 flex items-center justify-center rounded-full bg-gray-300 text-white text-xs font-bold">i</span>
                        </span>
                        <span className="pt-0.5">Upload QR code of your Instagram post</span>
                        <div className="absolute -top-1 left-0 z-10 w-64 p-2 text-xs text-white bg-gray-800 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-200 mt-6">
  To upload the QR code of your Instagram post, navigate to your post, hit the ... on the top right of the post, choose &quot;QR Code&quot; and then &quot;Save to camera roll&quot;. Then upload the saved QR code right here below.
</div>

                      </label>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      required
                      onChange={(e) => setUploadedImage(e.target.files?.[0] || null)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#ff715b] text-sm"
                    />
                    {uploadedImage && (
                      <div className="mt-4 flex justify-center">
                        <img
                          src={URL.createObjectURL(uploadedImage)}
                          alt="QR Preview"
                          className="max-w-full max-h-40 rounded-xl border border-gray-300"
                        />
                      </div>
                    )}
                  </>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-[#ff715b] hover:bg-[#e25e4b] text-white font-semibold rounded-xl text-sm transition-all duration-200"
                >
                  {verifying ? '⏳ Verifying post...' : '🎬 Submit post'}
                </button>
              </form>
            )}

            {result && (
              <div className="mt-6 space-y-4">
                <div className="bg-[#fefaf6] border border-[#ffeedb] rounded-2xl p-5">
                  <CheckCircle className="text-[#55b467] w-6 h-6 mx-auto mb-2" />
                  <p className="text-[#388e3c] font-semibold text-center text-sm mb-4">
                    Post Verified! 🎉 Here’s your reward
                  </p>
                  <div className="text-sm text-gray-800 space-y-2">
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
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="max-w-md mx-auto bg-white rounded-[2rem] shadow-lg p-5 text-sm border border-gray-200">
          <h2 className="text-lg font-bold text-gray-800 mb-4">🎁 My Discount Codes</h2>

          <div className="mb-4 flex flex-col gap-3">
            <input
              type="text"
              placeholder="Search restaurant..."
              className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff715b]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="w-full px-4 py-2 rounded-xl border border-gray-300 text-sm text-gray-600"
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
                  className="border border-[#f2f2f2] rounded-xl p-4 bg-[#fefcfb]"
                >
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleCollapse(idx)}
                  >
                    <div>
                      <p className="font-semibold text-gray-800">{d.restaurant} – {d.location}</p>
                      <p className="text-xs text-gray-500">Expires: {d.expiration}</p>
                    </div>
                    {!isCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
                  </div>
                  {isCollapsed && (
                    <div className="mt-3 text-sm text-gray-700 space-y-1">
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
