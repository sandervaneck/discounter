"use client";

export const RestaurantToolbar = () => {
  return (
    <div className="flex justify-between items-center px-8 py-4 mb-8 bg-white rounded-2xl shadow-md border border-gray-100">
      {/* Left section */}
      <div className="text-lg font-semibold text-gray-800">
        📊 Discount Management Tools
      </div>

      {/* Right section */}
      <div className="flex gap-4">
        <a
          href="/restaurant"
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          Manage Discount Codes
        </a>
        <a
          href="/cashier"
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          Validate Discount Code
        </a>
      </div>
    </div>
  );
};
