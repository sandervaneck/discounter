'use client';

import React, { useEffect, useState } from "react";
import { RestaurantToolbar } from "../components/Toolbar";
import { useSession } from "next-auth/react";
import { DiscountCode, DiscountStatus } from "@/generated/client";

const availableItems = [
  "Focaccia Classic",
  "Focaccia Cheese",
  "Focaccia Vegan",
  "Panini",
  "Salad Bowl",
];

export default function RestaurantDiscountDashboard() {
  const { data: session, status } = useSession();

  

  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>([]);
  const [filterStatus, setFilterStatus] = useState<DiscountStatus | "all">("all");
  const [newCode, setNewCode] = useState("");
  const [newDiscount, setNewDiscount] = useState(10);
  const [newViewsRequired, setNewViewsRequired] = useState(5000);
  const [newItems, setNewItems] = useState<string[]>([]);
  const [newExpiryDate, setNewExpiryDate] = useState("");
  const [newLocation, setNewLocation] = useState("Amsterdam, NL");
  const [newStatus, setNewStatus] = useState<DiscountStatus>("available");
  const [tab, setTab] = useState(0);

  useEffect(() => {
  const fetchDiscounts = async () => {
    const res = await fetch("/api/discounts", {
      method: "GET",
      credentials: "include", // ✅ ensures session cookies are sent
    });

    const data = await res.json();
    setDiscountCodes(data);
  };

  if (status === "authenticated") {
    fetchDiscounts();
  }
}, [status]);


  function updateCode(id: number, field: keyof DiscountCode, value: number | string | string[]) {
    setDiscountCodes((codes) =>
      codes.map((code) => (code.id === id ? { ...code, [field]: value } : code))
    );
  }

  function deleteCode(id: number) {
    setDiscountCodes((codes) => codes.filter((c) => c.id !== id));
  }

  function toggleNewItem(item: string) {
    setNewItems((items) =>
      items.includes(item) ? items.filter((i) => i !== item) : [...items, item]
    );
  }

  function addNewCode() {
    if (
      !newCode.trim() ||
      newDiscount <= 0 ||
      newViewsRequired <= 0 ||
      newItems.length === 0 ||
      !newExpiryDate.trim() ||
      !newLocation.trim()
    ) {
      alert("Please fill in all fields correctly.");
      return;
    }

    setNewCode("");
    setNewDiscount(10);
    setNewViewsRequired(5000);
    setNewItems([]);
    setNewExpiryDate("");
    setNewLocation("Amsterdam, NL");
    setNewStatus("available");
  }

  const filteredCodes =
    filterStatus === "all"
      ? discountCodes
      : discountCodes.filter((code) => code.code === filterStatus);
  console.log(discountCodes)

  if (status === "loading") {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!session) {
    return <div className="text-center mt-10 text-red-600 font-semibold">Unauthorized</div>;
  }

  if (session.user.userType !== "business") {
    return <div className="text-center mt-10 text-red-600 font-semibold">Access denied</div>;
  }
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-white flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-6xl">
        <RestaurantToolbar tab={tab} setTab={setTab} />
        <div className="flex justify-between items-center border-b-2 border-emerald-700 pb-4 mb-8">
          <h1 className="text-2xl font-bold text-emerald-800">Focacceria Milano Discount Dashboard</h1>
          <div className="text-sm font-semibold text-emerald-900 border border-emerald-600 bg-emerald-100 px-4 py-1 rounded">
            Logged in as <span className="text-emerald-800">Restaurant Admin</span>
          </div>
        </div>

        {/* FILTER */}
        <div className="mb-6">
          <label className="font-medium text-emerald-900">
            Filter by status:
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as DiscountStatus | "all")}
              className="ml-2 p-2 border border-emerald-300 rounded focus:ring-emerald-500"
            >
              <option value="all">All</option>
              <option value="open">Open</option>
              <option value="awarded">Awarded</option>
              <option value="used">Used</option>
              <option value="expired">Expired</option>
            </select>
          </label>
        </div>

        {/* Discount Table */}
        <div className="overflow-x-auto border border-emerald-200 rounded shadow">
          <table className="min-w-[1100px] w-full text-sm">
            <thead className="bg-emerald-700 text-white">
              <tr>
                <th className="p-3 border border-emerald-800">Code</th>
                <th className="p-3 border border-emerald-800">Discount % / Views</th>
                <th className="p-3 border border-emerald-800">Items</th>
                <th className="p-3 border border-emerald-800">Expiry</th>
                <th className="p-3 border border-emerald-800">Location</th>
                <th className="p-3 border border-emerald-800">Status</th>
                <th className="p-3 border border-emerald-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* ROWS */}
              {filteredCodes.map((code) => (
                <tr key={code.id} className="border-b border-emerald-100">
                  <td className="p-2 border border-emerald-100">
                    <input
                      type="text"
                      value={code.code}
                      onChange={(e) => updateCode(code.id, "code", e.target.value)}
                      className="w-full p-2 rounded border border-emerald-300 bg-white text-emerald-900"
                    />
                  </td>
                  <td className="p-2 border border-emerald-100">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={code.id}
                        onChange={(e) => updateCode(code.id, "id", Number(e.target.value))}
                        className="w-16 p-2 rounded border border-emerald-300 text-emerald-900"
                      />
                      <span>% for</span>
                      <input
                        type="number"
                        value={""}
                        onChange={(e) => updateCode(code.id, "code", Number(e.target.value))}
                        className="w-20 p-2 rounded border border-emerald-300 text-emerald-900"
                      />
                      <span>views</span>
                    </div>
                  </td>
                  <td className="p-2 border border-emerald-100">
                    <div className="flex flex-wrap gap-2">
                      {availableItems.map((item) => {
                        const selected = code.code === item;
                        return (
                          <label
                            key={item}
                            className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
                              selected
                                ? "bg-emerald-100 border-2 border-emerald-600"
                                : "bg-gray-50 border border-gray-300"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={selected}
                              onChange={() => {
                                // const newItems = selected
                                //   ? code.items.filter((i) => i !== item)
                                //   : [...code.items, item];
                                // updateCode(code.id, "id", newItems);
                              }}
                              className="mr-2"
                            />
                            {item}
                          </label>
                        );
                      })}
                    </div>
                  </td>
                  <td className="p-2 border border-emerald-100">
                    <input
                      type="date"
                      value={""}
                      onChange={(e) => updateCode(code.id, "id", e.target.value)}
                      className="w-full p-2 rounded border border-emerald-300 text-emerald-900"
                    />
                  </td>
                  <td className="p-2 border border-emerald-100">
                    <input
                      type="text"
                      value={""}
                      onChange={(e) => updateCode(code.id, "id", e.target.value)}
                      className="w-full p-2 rounded border border-emerald-300 text-emerald-900"
                    />
                  </td>
                  <td className="p-2 border border-emerald-100">
                    <select
                      value={code.code}
                      onChange={(e) => updateCode(code.id, "id", e.target.value as DiscountStatus)}
                      className="w-full p-2 rounded border border-emerald-300 text-emerald-900"
                    >
                      <option value="open">Open</option>
                      <option value="awarded">Awarded</option>
                      <option value="used">Used</option>
                      <option value="expired">Expired</option>
                    </select>
                  </td>
                  <td className="p-2 border border-emerald-100 text-center">
                    <button
                      onClick={() => deleteCode(code.id)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add New Discount Code */}
        <section className="mt-10 bg-emerald-50 border border-emerald-300 p-6 rounded-lg">
          <h2 className="text-emerald-800 text-xl font-semibold mb-4">Add New Discount Code</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              placeholder="Discount Code"
              className="p-2 border border-emerald-300 rounded text-emerald-900"
            />
            <input
              type="number"
              value={newDiscount}
              onChange={(e) => setNewDiscount(Number(e.target.value))}
              placeholder="Discount %"
              className="p-2 border border-emerald-300 rounded text-emerald-900"
            />
            <input
              type="number"
              value={newViewsRequired}
              onChange={(e) => setNewViewsRequired(Number(e.target.value))}
              placeholder="Views Required"
              className="p-2 border border-emerald-300 rounded text-emerald-900"
            />
            <input
              type="date"
              value={newExpiryDate}
              onChange={(e) => setNewExpiryDate(e.target.value)}
              className="p-2 border border-emerald-300 rounded text-emerald-900"
            />
            <input
              type="text"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              placeholder="Location"
              className="p-2 border border-emerald-300 rounded text-emerald-900"
            />
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value as DiscountStatus)}
              className="p-2 border border-emerald-300 rounded text-emerald-900"
            >
              <option value="open">Open</option>
              <option value="awarded">Awarded</option>
              <option value="used">Used</option>
              <option value="expired">Expired</option>
            </select>
          </div>

          <div className="mt-6">
            <label className="font-medium text-emerald-800">Applicable Items:</label>
            <div className="flex flex-wrap gap-3 mt-2">
              {availableItems.map((item) => {
                const selected = newItems.includes(item);
                return (
                  <label
                    key={item}
                    className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
                      selected
                        ? "bg-emerald-100 border-2 border-emerald-600"
                        : "bg-gray-50 border border-gray-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggleNewItem(item)}
                      className="mr-2"
                    />
                    {item}
                  </label>
                );
              })}
            </div>
          </div>

          <button
            onClick={addNewCode}
            className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded font-bold"
          >
            Add Discount Code
          </button>
        </section>
      </div>
    </main>
  );
}
