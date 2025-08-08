"use client";

import { signOut } from "next-auth/react";

export const RestaurantToolbar = ({ tab, setTab }: { tab: number; setTab: (n: number) => void }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 sm:px-8 py-4 mb-8 bg-white rounded-2xl shadow-md border border-emerald-100 gap-4">
      {/* Left section */}
      <div className="text-base sm:text-lg font-semibold text-emerald-800 text-center sm:text-left">
        📊 Discount Management Tools
      </div>

      {/* Right section */}
      <div className="flex flex-wrap gap-2 w-full sm:w-auto">
        <a
          href="/restaurant"
          className={`${
            tab === 0
              ? 'text-white bg-emerald-600 hover:bg-emerald-700'
              : 'bg-white text-emerald-700 border border-emerald-600 hover:bg-emerald-50'
          } flex-1 sm:flex-none text-center px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition`}
          onClick={() => setTab(0)}
        >
          Manage Discount Codes
        </a>
        <a
          href="/cashier"
          className={`${
            tab === 1
              ? 'text-white bg-emerald-600 hover:bg-emerald-700'
              : 'bg-white text-emerald-700 border border-emerald-600 hover:bg-emerald-50'
          } flex-1 sm:flex-none text-center px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition`}
          onClick={() => setTab(1)}
        >
          Validate Discount Code
        </a>
        <a
          href="/items"
          className={`${
            tab === 2
              ? 'text-white bg-emerald-600 hover:bg-emerald-700'
              : 'bg-white text-emerald-700 border border-emerald-600 hover:bg-emerald-50'
          } flex-1 sm:flex-none text-center px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition`}
          onClick={() => setTab(2)}
        >
          Manage Items
        </a>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex-1 sm:flex-none text-center px-4 py-2 rounded-lg text-xs sm:text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition"
        >
          Log out
        </button>
      </div>
    </div>
  );
};
