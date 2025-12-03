import React, { useEffect, useRef, useState } from "react";

export default function DebouncedSearchAPI() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debounceRef = useRef(null);
  const activeControllerRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!input.trim()) {
      setResults([]);
      setError(null);
      setLoading(false);
      return;
    }

    debounceRef.current = setTimeout(() => {
      if (activeControllerRef.current) activeControllerRef.current.abort();

      const controller = new AbortController();
      activeControllerRef.current = controller;

      const q = encodeURIComponent(input.trim());
      setLoading(true);
      setError(null);

      fetch(`https://jsonplaceholder.typicode.com/posts?title_like=${q}`, {
        signal: controller.signal,
      })
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then((data) => setResults(data.slice(0, 10)))
        .catch((err) => {
          if (err.name !== "AbortError") setError(err.message || "Failed");
        })
        .finally(() => {
          if (activeControllerRef.current === controller) {
            setLoading(false);
            activeControllerRef.current = null;
          }
        });
    }, 500);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [input]);

  return (
    <section style={{ maxWidth: 700, margin: "18px auto", padding: 12 }}>
      <h3>Debounced Search (API)</h3>

      <input
        placeholder="Search post titles..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 10 }}
      />

      {loading && <div>Loading…</div>}
      {error && <div style={{ color: "red" }}>Error: {error}</div>}

      {!loading && !error && results.length === 0 && input.trim() !== "" && (
        <div style={{ color: "#666" }}>No results</div>
      )}

      <ul style={{ paddingLeft: 16 }}>
        {results.map((r) => (
          <li key={r.id} style={{ marginBottom: 8 }}>
            <strong>{r.title}</strong>
            <div style={{ fontSize: 13, color: "#444" }}>{r.body}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
