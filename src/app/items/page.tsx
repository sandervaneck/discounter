'use client';

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Trash2 } from "lucide-react";
import { RestaurantToolbar } from "../components/Toolbar";

export default function RestaurantItemsPage() {
    
  const { data: session, status } = useSession();
const [items, setItems] = useState<{ id: number; name: string }[]>([]);
  const [newItem, setNewItem] = useState("");
  const [tab, setTab] = useState(2);

  const deleteItem = async (id: number) => {
    const res = await fetch("/api/items", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch("/api/items", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setItems(data);
    };
    if (status === "authenticated") fetchItems();
  }, [status]);

  const addItem = async () => {
    if (!newItem.trim()) return;
    const res = await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name: newItem }),
    });
    const item = await res.json();
    setItems([...items, item]);
    setNewItem("");
  };

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
             
      <div className="w-full max-w-3xl">
        <RestaurantToolbar tab={tab} setTab={setTab} />
        
        <h1 className="text-2xl font-bold text-emerald-800 mb-6">Manage Menu Items</h1>
        <div className="flex mb-6">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="New item name"
            className="p-2 border border-emerald-300 rounded text-emerald-900 w-full mr-2"
          />
          <button
            onClick={addItem}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded"
          >
            Add Item
          </button>
        </div>
        <ul className="text-emerald-900 divide-y divide-emerald-100 border rounded">
          {items.map((item) => (
            <li key={item.id} className="flex items-center justify-between p-2">
              <span>{item.name}</span>
              <button
                onClick={() => deleteItem(item.id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
