import React, { useMemo, useState } from "react";

const INITIAL_PRODUCTS = [
  { id: 1, name: "Blue T-shirt", category: "Clothing", price: 399 },
  { id: 2, name: "Black Jeans", category: "Clothing", price: 1299 },
  { id: 3, name: "Running Shoes", category: "Footwear", price: 2499 },
  { id: 4, name: "Coffee Mug", category: "Home", price: 299 },
  { id: 5, name: "Socks (3 pack)", category: "Footwear", price: 199 },
  { id: 6, name: "Desk Lamp", category: "Home", price: 899 },
];

function formatPrice(n) {
  return `₹${n.toLocaleString("en-IN")}`;
}

const comparators = {
  name: (a, b) => a.name.localeCompare(b.name),
  price: (a, b) => a.price - b.price,
};

export default function ProductTable({ products = INITIAL_PRODUCTS }) {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [direction, setDirection] = useState("asc");

  const handleSort = (col) => {
    console.log("Sort:: ", col)
    if (col === sortBy) {
      setDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(col);
      setDirection("asc");
    }
  };

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    console.log("q:: ", q)

    let list = products.filter((p) => {
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        (p.category && p.category.toLowerCase().includes(q))
      );
    });

    const comp = comparators[sortBy] || comparators.name;
    list = [...list].sort((a, b) => {
      const res = comp(a, b);
      return direction === "asc" ? res : -res;
    });

    return list;
  }, [products, query, sortBy, direction]);

  const sortLabel = (col) =>
    `${col} column, sorted ${sortBy === col ? direction : "none"}. Click to ${
      sortBy === col && direction === "asc"
        ? "sort descending"
        : "sort ascending"
    }`;

  return (
    <div style={{ maxWidth: 900, margin: "20px auto", padding: 12 }}>
      <h3>Products</h3>

      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 12,
          alignItems: "center",
        }}
      >
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or category..."
          aria-label="Search products"
          style={{
            padding: "8px 10px",
            flex: 1,
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={() => setQuery("")}
          disabled={!query}
          style={{
            padding: "8px 10px",
            borderRadius: 6,
            cursor: query ? "pointer" : "not-allowed",
            opacity: query ? 1 : 0.6,
          }}
        >
          Clear
        </button>
      </div>

      <div
        style={{ overflowX: "auto", border: "1px solid #eee", borderRadius: 8 }}
      >
        <table
          style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}
        >
          <thead>
            <tr>
              <th style={thStyle}>#</th>

              <th style={thStyle}>
                <button
                  onClick={() => handleSort("name")}
                  aria-label={sortLabel("name")}
                  style={sortButtonStyle}
                >
                  Name{" "}
                  {sortBy === "name" ? (direction === "asc" ? "▲" : "▼") : "↕"}
                </button>
              </th>

              <th style={thStyle}>Category</th>

              <th style={thStyle}>
                <button
                  onClick={() => handleSort("price")}
                  aria-label={sortLabel("price")}
                  style={sortButtonStyle}
                >
                  Price{" "}
                  {sortBy === "price" ? (direction === "asc" ? "▲" : "▼") : "↕"}
                </button>
              </th>
            </tr>
          </thead>

          <tbody>
            {visible.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  style={{ padding: 16, textAlign: "center", color: "#666" }}
                >
                  No products found.
                </td>
              </tr>
            ) : (
              visible.map((p, i) => (
                <tr key={p.id} style={i % 2 === 0 ? rowEvenStyle : rowOddStyle}>
                  <td style={tdStyle}>{p.id}</td>
                  <td style={tdStyle}>{p.name}</td>
                  <td style={tdStyle}>{p.category}</td>
                  <td style={{ ...tdStyle, textAlign: "right" }}>
                    {formatPrice(p.price)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 12, color: "#555", fontSize: 14 }}>
        Showing <strong>{visible.length}</strong> of{" "}
        <strong>{products.length}</strong> products.
      </div>
    </div>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "10px 12px",
  borderBottom: "1px solid #eee",
  background: "#6d5050ff",
  fontWeight: 600,
  color: 'black'
};

const tdStyle = {
  padding: "10px 12px",
  borderBottom: "1px solid #f5f5f5",
  color: "black",
};

const sortButtonStyle = {
  border: "none",
  background: "transparent",
  cursor: "pointer",
  fontSize: 14,
  display: "inline-flex",
  gap: 6,
  alignItems: "center",
  color: "black",
};

const rowEvenStyle = { background: "white" };
const rowOddStyle = { background: "#8e8e97ff" };
