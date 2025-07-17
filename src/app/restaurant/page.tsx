'use client';
import React, { useState } from "react";
import { RestaurantToolbar } from "../components/Toolbar";

type DiscountStatus = "open" | "awarded" | "used" | "expired";

interface DiscountCode {
  id: number;
  code: string;
  discount: number;
  viewsRequired: number;
  items: string[];
  expiryDate: string; // YYYY-MM-DD
  location: string;
  status: DiscountStatus;
}

// Example items that discounts can apply to:
const availableItems = [
  "Focaccia Classic",
  "Focaccia Cheese",
  "Focaccia Vegan",
  "Panini",
  "Salad Bowl",
];

const initialDiscountCodes: DiscountCode[] = [
  {
    id: 1,
    code: "FOCA-9H2L1KX3",
    discount: 20,
    viewsRequired: 5000,
    items: ["Focaccia Classic", "Focaccia Cheese"],
    expiryDate: "2025-12-31",
    location: "Amsterdam, NL",
    status: "open",
  },
  {
    id: 2,
    code: "FOCA-X4V7ZJQ9",
    discount: 10,
    viewsRequired: 10000,
    items: ["Panini"],
    expiryDate: "2025-08-15",
    location: "Amsterdam, NL",
    status: "awarded",
  },
  {
    id: 3,
    code: "FOCA-WK73NDX8",
    discount: 15,
    viewsRequired: 8000,
    items: ["Salad Bowl"],
    expiryDate: "2024-06-30",
    location: "Amsterdam, NL",
    status: "used",
  },
];

export default function RestaurantDiscountDashboard() {
  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>(initialDiscountCodes);

  // Filters and form state
  const [filterStatus, setFilterStatus] = useState<DiscountStatus | "all">("all");

  const [newCode, setNewCode] = useState("");
  const [newDiscount, setNewDiscount] = useState(10);
  const [newViewsRequired, setNewViewsRequired] = useState(5000);
  const [newItems, setNewItems] = useState<string[]>([]);
  const [newExpiryDate, setNewExpiryDate] = useState("");
  const [newLocation, setNewLocation] = useState("Amsterdam, NL");
  const [newStatus, setNewStatus] = useState<DiscountStatus>("open");
  const [tab, setTab] = useState(0)
  // Helpers

  function updateCode(
    id: number,
    field: keyof DiscountCode,
    value: number | string | string[]
  ) {
    setDiscountCodes((codes) =>
      codes.map((code) =>
        code.id === id ? { ...code, [field]: value } : code
      )
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

    setDiscountCodes((codes) => [
      ...codes,
      {
        id:
          codes.reduce((maxId, c) => (c.id > maxId ? c.id : maxId), 0) + 1,
        code: newCode.trim(),
        discount: newDiscount,
        viewsRequired: newViewsRequired,
        items: newItems,
        expiryDate: newExpiryDate,
        location: newLocation.trim(),
        status: newStatus,
      },
    ]);

    // Reset new code form
    setNewCode("");
    setNewDiscount(10);
    setNewViewsRequired(5000);
    setNewItems([]);
    setNewExpiryDate("");
    setNewLocation("Amsterdam, NL");
    setNewStatus("open");
  }

  // Filter discount codes by status
  const filteredCodes =
    filterStatus === "all"
      ? discountCodes
      : discountCodes.filter((code) => code.status === filterStatus);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: 1200,
        margin: "24px auto",
        padding: "0 16px",
      }}
    >
      <RestaurantToolbar tab={tab} setTab={setTab}/>
      <header
        style={{
          marginBottom: 32,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "2px solid #117a65",
          paddingBottom: 8,
        }}
      >
        <h1 style={{ color: "#117a65", margin: 0 }}>
          Focacceria Milano Discount Dashboard
        </h1>

        <div
          style={{
            fontSize: 14,
            color: "#555",
            fontWeight: "bold",
            border: "1px solid #117a65",
            borderRadius: 6,
            padding: "6px 12px",
            backgroundColor: "#def2f1",
          }}
        >
          Logged in as <span style={{ color: "#0b4a3e" }}>Restaurant Admin</span>
        </div>
      </header>

      {/* Status Filter */}
      <div
        style={{
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <label style={{ fontWeight: "bold" }}>
          Filter by status:{" "}
          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(e.target.value as DiscountStatus | "all")
            }
            style={{
              padding: 6,
              borderRadius: 6,
              border: "1px solid #ccc",
              minWidth: 140,
            }}
          >
            <option value="all">All</option>
            <option value="open">Open</option>
            <option value="awarded">Awarded</option>
            <option value="used">Used</option>
            <option value="expired">Expired</option>
          </select>
        </label>
      </div>

      {/* Discount Codes Table with horizontal scroll on small widths */}
      <div
        style={{
          overflowX: "auto",
          border: "1px solid #ccc",
          borderRadius: 8,
          boxShadow: "0 0 8px rgba(0,0,0,0.05)",
        }}
      >
        <table
          style={{
            width: "100%",
            minWidth: 1100,
            borderCollapse: "collapse",
            fontSize: 14,
          }}
        >
          <thead style={{ backgroundColor: "#117a65", color: "white" }}>
            <tr>
              <th style={{ padding: 12, border: "1px solid #0b4a3e", width: 150 }}>
                Code
              </th>
              <th style={{ padding: 12, border: "1px solid #0b4a3e", width: 220 }}>
                Discount % / Views Required
              </th>
              <th style={{ padding: 12, border: "1px solid #0b4a3e", width: 320 }}>
                Applicable Items
              </th>
              <th style={{ padding: 12, border: "1px solid #0b4a3e", width: 140 }}>
                Expiry Date
              </th>
              <th style={{ padding: 12, border: "1px solid #0b4a3e", width: 130 }}>
                Location
              </th>
              <th style={{ padding: 12, border: "1px solid #0b4a3e", width: 120 }}>
                Status
              </th>
              <th style={{ padding: 12, border: "1px solid #0b4a3e", width: 110 }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCodes.map((code) => (
              <tr key={code.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: 10, border: "1px solid #ccc" }}>
                  <input
  type="text"
  value={code.code}
  onChange={(e) => updateCode(code.id, "code", e.target.value)}
  style={{
    width: "100%",
    padding: 6,
    borderRadius: 4,
    border: "1px solid #bbb",
    fontSize: 14,
    backgroundColor: "#ffffff",  // Ensures white background
    color: "#1f2937",            // Equivalent to Tailwind's text-gray-800
  }}
/>

                </td>

                <td style={{ padding: 10, border: "1px solid #ccc" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      fontSize: 14,
                    }}
                  >
                    <input
  type="number"
  value={code.discount}
  min={0}
  max={100}
  onChange={(e) =>
    updateCode(code.id, "discount", Number(e.target.value))
  }
  style={{
    width: 60,
    padding: 6,
    borderRadius: 4,
    border: "1px solid #bbb",
    backgroundColor: "#ffffff",
    color: "#1f2937", // Tailwind's text-gray-800
  }}
/>
<span>% for</span>
<input
  type="number"
  value={code.viewsRequired}
  min={0}
  onChange={(e) =>
    updateCode(code.id, "viewsRequired", Number(e.target.value))
  }
  style={{
    width: 80,
    padding: 6,
    borderRadius: 4,
    border: "1px solid #bbb",
    backgroundColor: "#ffffff",
    color: "#1f2937", // Tailwind's text-gray-800
  }}
/>

                    <span>views</span>
                  </div>
                </td>

                <td style={{ padding: 10, border: "1px solid #ccc" }}>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 8,
                      fontSize: 13,
                    }}
                  >
                    {availableItems.map((item) => {
                      const selected = code.items.includes(item);
                      return (
                        <label
                          key={item}
                          style={{
                            cursor: "pointer",
                            userSelect: "none",
                            padding: "4px 10px",
                            borderRadius: 20,
                            border: selected ? "2px solid #117a65" : "1px solid #ccc",
                            backgroundColor: selected ? "#def2f1" : "#f9f9f9",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={selected}
                            onChange={() => {
                              const newItems = selected
                                ? code.items.filter((i) => i !== item)
                                : [...code.items, item];
                              updateCode(code.id, "items", newItems);
                            }}
                            style={{ marginRight: 6 }}
                          />
                          {item}
                        </label>
                      );
                    })}
                  </div>
                </td>

                <td style={{ padding: 10, border: "1px solid #ccc" }}>
  <input
    type="date"
    value={code.expiryDate}
    onChange={(e) => updateCode(code.id, "expiryDate", e.target.value)}
    style={{
      padding: 6,
      borderRadius: 4,
      border: "1px solid #bbb",
      width: "100%",
      fontSize: 14,
      backgroundColor: "#ffffff",
      color: "#1f2937", // Tailwind's text-gray-800
    }}
  />
</td>

<td style={{ padding: 10, border: "1px solid #ccc" }}>
  <input
    type="text"
    value={code.location}
    onChange={(e) => updateCode(code.id, "location", e.target.value)}
    style={{
      width: "100%",
      padding: 6,
      borderRadius: 4,
      border: "1px solid #bbb",
      fontSize: 14,
      backgroundColor: "#ffffff",
      color: "#1f2937", // Tailwind's text-gray-800
    }}
  />
</td>


                <td style={{ padding: 10, border: "1px solid #ccc" }}>
                  <select
                    value={code.status}
                    onChange={(e) =>
                      updateCode(code.id, "status", e.target.value as DiscountStatus)
                    }
                    style={{
                      padding: 6,
                      borderRadius: 4,
                      border: "1px solid #bbb",
                      width: "100%",
                      fontSize: 14,
                    }}
                  >
                    <option value="open">Open</option>
                    <option value="awarded">Awarded</option>
                    <option value="used">Used</option>
                    <option value="expired">Expired</option>
                  </select>
                </td>

                <td
                  style={{
                    padding: 10,
                    border: "1px solid #ccc",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  <button
                    onClick={() => deleteCode(code.id)}
                    style={{
                      backgroundColor: "#d9534f",
                      color: "white",
                      border: "none",
                      padding: "8px 14px",
                      borderRadius: 6,
                      cursor: "pointer",
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                    title="Delete discount code"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredCodes.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  style={{
                    textAlign: "center",
                    padding: 20,
                    fontStyle: "italic",
                    color: "#666",
                  }}
                >
                  No discount codes found for selected status.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add new discount code form */}
      <section
        style={{
          marginTop: 48,
          padding: 24,
          border: "1px solid #117a65",
          borderRadius: 8,
          backgroundColor: "#e0f2f1",
        }}
      >
        <h2 style={{ color: "#117a65", marginBottom: 16 }}>
          Add New Discount Code
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 24,
            alignItems: "center",
          }}
        >
          <label>
            Code
            <input
  type="text"
  value={newCode}
  onChange={(e) => setNewCode(e.target.value)}
  placeholder="e.g. FOCA-XXXX1234"
  style={{
    width: "100%",
    padding: 8,
    borderRadius: 6,
    border: "1px solid #117a65",
    fontSize: 14,
    backgroundColor: "#ffffff",
    color: "#1f2937",
  }}
/>
</label>

<label>
  Discount %
  <input
    type="number"
    min={1}
    max={100}
    value={newDiscount}
    onChange={(e) => setNewDiscount(Number(e.target.value))}
    style={{
      width: "100%",
      padding: 8,
      borderRadius: 6,
      border: "1px solid #117a65",
      fontSize: 14,
      backgroundColor: "#ffffff",
      color: "#1f2937",
    }}
  />
</label>

<label>
  Views Required
  <input
    type="number"
    min={1}
    value={newViewsRequired}
    onChange={(e) => setNewViewsRequired(Number(e.target.value))}
    style={{
      width: "100%",
      padding: 8,
      borderRadius: 6,
      border: "1px solid #117a65",
      fontSize: 14,
      backgroundColor: "#ffffff",
      color: "#1f2937",
    }}
  />
</label>

<label>
  Expiry Date
  <input
    type="date"
    value={newExpiryDate}
    onChange={(e) => setNewExpiryDate(e.target.value)}
    style={{
      width: "100%",
      padding: 8,
      borderRadius: 6,
      border: "1px solid #117a65",
      fontSize: 14,
      backgroundColor: "#ffffff",
      color: "#1f2937",
    }}
  />
</label>

<label>
  Location
  <input
    type="text"
    value={newLocation}
    onChange={(e) => setNewLocation(e.target.value)}
    style={{
      width: "100%",
      padding: 8,
      borderRadius: 6,
      border: "1px solid #117a65",
      fontSize: 14,
      backgroundColor: "#ffffff",
      color: "#1f2937",
    }}
  />
</label>


          <label>
            Status
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value as DiscountStatus)}
              style={{
                width: "100%",
                padding: 8,
                borderRadius: 6,
                border: "1px solid #117a65",
                fontSize: 14,
              }}
            >
              <option value="open">Open</option>
              <option value="awarded">Awarded</option>
              <option value="used">Used</option>
              <option value="expired">Expired</option>
            </select>
          </label>

          <div>
            <label style={{ fontWeight: "bold" }}>Applicable Items</label>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginTop: 6,
              }}
            >
              {availableItems.map((item) => {
                const selected = newItems.includes(item);
                return (
                  <label
                    key={item}
                    style={{
                      cursor: "pointer",
                      userSelect: "none",
                      padding: "6px 12px",
                      borderRadius: 20,
                      border: selected ? "2px solid #117a65" : "1px solid #ccc",
                      backgroundColor: selected ? "#def2f1" : "#f9f9f9",
                      whiteSpace: "nowrap",
                      fontSize: 14,
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggleNewItem(item)}
                      style={{ marginRight: 8 }}
                    />
                    {item}
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        <button
          onClick={addNewCode}
          style={{
            marginTop: 32,
            padding: "14px 28px",
            backgroundColor: "#117a65",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 16,
            fontWeight: "bold",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) =>
            ((e.target as HTMLButtonElement).style.backgroundColor = "#0b4a3e")
          }
          onMouseOut={(e) =>
            ((e.target as HTMLButtonElement).style.backgroundColor = "#117a65")
          }
        >
          Add Discount Code
        </button>
      </section>
    </div>
  );
}
