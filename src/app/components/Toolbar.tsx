"use client";

export const RestaurantToolbar = ({ tab, setTab }: { tab: number; setTab: (n: number) => void }) => {
  return (
    <div className="flex justify-between items-center px-8 py-4 mb-8 bg-white rounded-2xl shadow-md border border-emerald-100">
      {/* Left section */}
      <div className="text-lg font-semibold text-emerald-800">
        📊 Discount Management Tools
      </div>

      {/* Right section */}
      <div className="flex gap-4">
        <a
          href="/restaurant"
          className={`${
            tab === 0
              ? 'text-white bg-emerald-600 hover:bg-emerald-700'
              : 'bg-white text-emerald-700 border border-emerald-600 hover:bg-emerald-50'
          } px-4 py-2 rounded-lg text-sm font-medium transition`}
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
          } px-4 py-2 rounded-lg text-sm font-medium transition`}
          onClick={() => setTab(1)}
        >
          Validate Discount Code
        </a>
      </div>
    </div>
  );
};
