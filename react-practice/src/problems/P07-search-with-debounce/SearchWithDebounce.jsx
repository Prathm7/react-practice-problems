import React, { useState, useEffect } from "react";

export default function SearchWithDebounce() {
  const [input, setInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchTerm(input);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [input]);

  return (
    <div style={{ width: 350, margin: "30px auto", textAlign: "center" }}>
      <h3>Debounced Search</h3>

      <input
        type="text"
        value={input}
        placeholder="Type to search..."
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "100%", padding: 8 }}
      />

      <p style={{ marginTop: 20 }}>
        <strong>Debounced Value:</strong> {searchTerm}
      </p>
    </div>
  );
}
