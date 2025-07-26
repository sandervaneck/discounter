'use client';

import React, { useEffect, useState } from "react";
import { RestaurantToolbar } from "../components/Toolbar";
import { useSession } from "next-auth/react";
import { DiscountCode, DiscountStatus, Item } from "@/generated/client";


type DiscountForm = {
  code: string;
  discount: number;
  requirements: DiscountRequirements[];
  items: Item[];
  wait: number;
  expiryDate: string;
  status: DiscountStatus;

}

type DiscountRequirements = {
  platform: string;
  views: number;
  likes: number;
  comments: number;
  reposts: number;
}

const emptyForm: DiscountForm = {
  code: "",
  wait: 0,
  discount: 10,
  requirements: [
    {
      platform: "Instagram",
      views: 5000,
      likes: 1000,
      comments: 100,
      reposts: 50,
    },
  ],
  items: [],
  expiryDate: "",
  status: "available",
};

export default function RestaurantDiscountDashboard() {
  const { data: session, status } = useSession();
  const [form, setForm] = useState<DiscountForm>(emptyForm);
  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>([]);
  const [filterStatus, setFilterStatus] = useState<DiscountStatus | "all">("all");
  const [availableItems, setAvailableItems] = useState<Item[]>([]);
  const [itemsByDiscountId, setItemsByDiscountId] = useState<Record<number, Item[]>>({});
const [user, setUser] = useState<{ email: string } | null>(null);
  const [tab, setTab] = useState(0);
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});

  const toggleRow = (id: number) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  function updateCode(id: number, field: keyof DiscountCode, value: number | string | string[]) {
    setDiscountCodes((codes) =>
      codes.map((code) => (code.id === id ? { ...code, [field]: value } : code))
    );
  }

  async function deleteCode(id: number) {
    try {
      const res = await fetch("/api/discounts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        const error = await res.json();
        console.error("Delete error:", error);
        alert("Failed to delete discount.");
        return;
      }

      setDiscountCodes((codes) => codes.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Unexpected delete error:", err);
      alert("Something went wrong deleting discount.");
    }
  }

 useEffect(() => {
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

    const fetchDiscounts = async () => {
      const res = await fetch("/api/discounts", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setDiscountCodes(data);

      const fetchedMap: Record<number, Item[]> = {};
      for (const discount of data) {
        const res = await fetch(`/api/discounts/${discount.id}/items`, {
          method: "GET",
          credentials: "include",
        });
        const items = await res.json();
        fetchedMap[discount.id] = items;
      }
      setItemsByDiscountId(fetchedMap);
    };

    const fetchItems = async () => {
      const res = await fetch("/api/items", {
        method: "GET",
        credentials: "include",
      });
      const items = await res.json();
      setAvailableItems(items);
    };

    if (status === "authenticated") {
      fetchDiscounts();
      fetchItems();
    }
  }, [status]);
  async function addNewCode() {
    const activationTime = new Date();


    if (
      !form.code.trim() ||
      !form.expiryDate.trim() ||
      form.discount <= 0 ||
      form.items.length === 0
    ) {
      alert("Please fill all fields correctly.");
      return;
    }

    try {
      const res = await fetch("/api/discounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          code: form.code,
          discountPercent: form.discount,
          activationTime: activationTime.toISOString(),
          expirationTime: new Date(form.expiryDate).toISOString(),
          requirements: JSON.stringify(form.requirements),
          applicableItemIds: form.items,
          status: form.status,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        console.error("Create error:", error);
        alert("Failed to add discount.");
        return;
      }

      const newDiscount = await res.json();
      setDiscountCodes([...discountCodes, newDiscount]);
      setForm(emptyForm);
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Something went wrong. Check console for details.");
    }
  }

  const filteredCodes =
    filterStatus === "all"
      ? discountCodes
      : discountCodes.filter((code) => code.code === filterStatus);


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
            Logged in as <span className="text-emerald-800">{user && user.email}</span>
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
                <th className="p-3 border border-emerald-800">Discount % </th>
                <th className="p-3 border border-emerald-800">Items</th>
                <th className="p-3 border border-emerald-800">Expiry</th>
                <th className="p-3 border border-emerald-800">Status</th>
                <th className="p-3 border border-emerald-800">Details</th>
                <th className="p-3 border border-emerald-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* ROWS */}
              {filteredCodes.map((code) => (
                <>
                <tr key={code.id} className="border-b border-emerald-100">
                  <td className="p-2 border border-emerald-100">
                    <span className="inline-block bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full mr-2 mb-2">
                        {code.code}
                      </span>
                  </td>
                  <td className="p-2 border border-emerald-100">
                    <span className="inline-block bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full mr-2 mb-2">
                        {code.discountPercent}%
                      </span>
                  </td>
                  <td className="p-2 border border-emerald-100">
                    {(itemsByDiscountId[code.id] || []).map((item, idx) => (
                      <span key={idx} className="inline-block bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full mr-2 mb-2">
                        {item.name}
                      </span>
                    ))}
                  </td>
                  <td className="p-2 border border-emerald-100">
                    <span className="inline-block bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full mr-2 mb-2">
                        {code.expirationTime
                          ? new Date(code.expirationTime).toLocaleDateString()
                          : "No expiry"}
                      </span>
                  </td>
                  <td className="p-2 border border-emerald-100">
                    <span className="inline-block bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full mr-2 mb-2">
                        {code.status.charAt(0).toUpperCase() + code.status.slice(1)}
                      </span>
                  </td>
                  <td className="p-2 border border-emerald-100 text-center">
                    <button
                      onClick={() => toggleRow(code.id)}
                      className="bg-emerald-200 text-emerald-800 px-2 py-1 rounded mr-2"
                    >
                      {expandedRows[code.id] ? 'Hide' : 'Show'}
                    </button>
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
                
                
                {expandedRows[code.id] && (
                  <tr className="bg-emerald-50 border-b border-emerald-100">
                    <td colSpan={7} className="p-3">
                      <div className="flex flex-wrap gap-4">
                        {(
                          Array.isArray(code.requirements)
                            ? code.requirements
                            : typeof code.requirements === "string"
                              ? (() => {
                                  try {
                                    const parsed = JSON.parse(code.requirements);
                                    return Array.isArray(parsed) ? parsed : [];
                                  } catch {
                                    return [];
                                  }
                                })()
                              : []
                        ).map((req: any, idx: number) => (
                          <div key={idx} className="border rounded p-2 bg-white shadow-sm">
                            <div className="font-semibold text-emerald-700 mb-1">
                              {req.platform}
                            </div>
                            <div className="text-sm text-gray-700">
                              Views: {req.views}<br />
                              Likes: {req.likes}<br />
                              Comments: {req.comments}<br />
                              Reposts: {req.reposts}
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
                </>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add New Discount Code */}
        <section className="mt-10 bg-emerald-50 border border-emerald-300 p-6 rounded-lg">
  <h2 className="text-emerald-800 text-xl font-semibold mb-4">Add New Discount Code</h2>
  <div className="grid md:grid-cols-2 gap-6">
    <label className="flex flex-col text-emerald-900 font-medium">
      Code
      <input
        type="text"
        value={form.code}
        onChange={(e) => setForm({ ...form, code: e.target.value })}
        placeholder="Discount Code"
        className="p-2 border border-emerald-300 rounded text-emerald-900 mt-1"
      />
    </label>
    <label className="flex flex-col text-emerald-900 font-medium">
      Discount %
      <input
        type="number"
        value={form.discount}
        onChange={(e) => setForm({ ...form, discount: Number(e.target.value) })}
        placeholder="Discount %"
        className="p-2 border border-emerald-300 rounded text-emerald-900 mt-1"
      />
    </label>
    <label className="flex flex-col text-emerald-900 font-medium">
      Days till Activation
      <input
        type="number"
        value={form.wait}
        onChange={(e) => setForm({ ...form, wait: Number(e.target.value) })}
        className="p-2 border border-emerald-300 rounded text-emerald-900 mt-1"
      />
    </label>
    <label className="flex flex-col text-emerald-900 font-medium">
      Expiry Date
      <input
        type="date"
        value={form.expiryDate}
        onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
        className="p-2 border border-emerald-300 rounded text-emerald-900 mt-1"
      />
    </label>
    
    <label className="flex flex-col text-emerald-900 font-medium col-span-2">
      Status
      <select
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value as DiscountStatus })}
        className="p-2 border border-emerald-300 rounded text-emerald-900 mt-1"
      >
        <option value="available">Available</option>
        <option value="awarded">Awarded</option>
        <option value="used">Used</option>
        <option value="expired">Expired</option>
        <option value="expired">Coming</option>
      </select>
    </label>
  </div>

  <div className="mt-6">
    <label className="font-medium text-emerald-800">Applicable Items:</label>
    <div className="flex flex-wrap gap-3 mt-2">
      {availableItems.map((item, idx) => {
        
        const selected = form.items.includes(item);
        return (
          <label
            key={idx}
            className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
              selected
                ? "bg-emerald-100 border-2 border-emerald-600"
                : "bg-gray-50 border border-gray-300"
            }`}
          >
            <input
              type="checkbox"
              checked={selected}
              onChange={() => selected ?
                setForm({
                  ...form,
                  items: form.items.filter((i) => i !== item)
                }) :
                setForm({
                  ...form,
                  items: [...form.items, item]
                })
              }
              className="mr-2"
            />
            {item.name}
          </label>
        );
      })}
    </div>
  </div>

  <div className="mt-10 border-t border-emerald-300 pt-6">
    <h3 className="text-lg font-semibold text-emerald-800 mb-4">Requirements</h3>
    {form.requirements.map((req, index) => (
      <div key={index} className="grid md:grid-cols-3 gap-4 mb-4">
        <label className="flex flex-col text-emerald-900 font-medium">
      Platform
        <select
          value={req.platform}
          onChange={(e) => {
            const newReqs = [...form.requirements];
            newReqs[index].platform = e.target.value;
            setForm({ ...form, requirements: newReqs });
          }}
          className="p-2 border border-emerald-300 rounded text-emerald-900"
        >
          <option value="Instagram">Instagram</option>
          <option value="TikTok">TikTok</option>
        </select>
        </label>
        <label className="flex flex-col text-emerald-900 font-medium">
      #Views
        <input
          type="number"
          placeholder="Views"
          value={req.views}
          onChange={(e) => {
            const newReqs = [...form.requirements];
            newReqs[index].views = Number(e.target.value);
            setForm({ ...form, requirements: newReqs });
          }}
          className="p-2 border border-emerald-300 rounded text-emerald-900"
        />
        </label>
        <label className="flex flex-col text-emerald-900 font-medium">
      #Likes
        <input
          type="number"
          placeholder="Likes"
          value={req.likes}
          onChange={(e) => {
            const newReqs = [...form.requirements];
            newReqs[index].likes = Number(e.target.value);
            setForm({ ...form, requirements: newReqs });
          }}
          className="p-2 border border-emerald-300 rounded text-emerald-900"
        />
        </label>
        <label className="flex flex-col text-emerald-900 font-medium">
      #Comments
        <input
          type="number"
          placeholder="Comments"
          value={req.comments}
          onChange={(e) => {
            const newReqs = [...form.requirements];
            newReqs[index].comments = Number(e.target.value);
            setForm({ ...form, requirements: newReqs });
          }}
          className="p-2 border border-emerald-300 rounded text-emerald-900"
        />
        </label>
        <label className="flex flex-col text-emerald-900 font-medium">
      #Reposts
        <input
          type="number"
          placeholder="Reposts"
          value={req.reposts}
          onChange={(e) => {
            const newReqs = [...form.requirements];
            newReqs[index].reposts = Number(e.target.value);
            setForm({ ...form, requirements: newReqs });
          }}
          className="p-2 border border-emerald-300 rounded text-emerald-900"
        />
        </label>
        
      </div>
    ))}
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
