import React from "react";

export default function ProductList({ products = [] }) {
  if (!products.length) {
    return <p style={{ color: "#666" }}>No products found.</p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {products.map((p) => (
        <li
          key={p.id}
          style={{ padding: "8px 0", borderBottom: "1px solid #eee" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div>
              <strong>{p.name}</strong>
              <div style={{ fontSize: 13, color: "#666" }}>{p.category}</div>
            </div>
            <div>₹{p.price}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}
