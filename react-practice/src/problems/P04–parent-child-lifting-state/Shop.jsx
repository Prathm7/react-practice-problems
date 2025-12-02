import React, { useMemo, useState } from "react";
import FilterPanel from "./FilterPanel";
import ProductList from "./ProductList";

const PRODUCTS = [
  { id: 1, name: "Blue T-shirt", category: "Clothing", price: 399 },
  { id: 2, name: "Black Jeans", category: "Clothing", price: 1299 },
  { id: 3, name: "Running Shoes", category: "Footwear", price: 2499 },
  { id: 4, name: "Coffee Mug", category: "Home", price: 299 },
  { id: 5, name: "Socks (3 pack)", category: "Footwear", price: 199 },
];

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    const set = new Set(PRODUCTS.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    if (selectedCategory === "All") return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div style={{ maxWidth: 800, margin: "24px auto", padding: 16 }}>
      <h2>Shop</h2>

      <FilterPanel
        categories={categories}
        value={selectedCategory}
        onChange={(cat) => setSelectedCategory(cat)}
      />

      <ProductList products={filtered} />
    </div>
  );
}
