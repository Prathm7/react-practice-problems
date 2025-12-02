import React from "react";

export default function FilterPanel({
  categories = [],
  value = "All",
  onChange,
}) {

    return (
    <div
      style={{
        marginBottom: 16,
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <label htmlFor="category-select">Category:</label>

      <select
        id="category-select"
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <button onClick={() => onChange && onChange("All")}>Reset</button>
    </div>
  );
}
