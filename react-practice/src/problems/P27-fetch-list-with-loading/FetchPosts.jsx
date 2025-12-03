import React, { useEffect, useState } from "react";

export default function FetchPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async (signal) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        signal,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setPosts(data.slice(0, 12));
    } catch (err) {
      if (err.name !== "AbortError") setError(err.message || "Failed to fetch");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchPosts(controller.signal);
    return () => controller.abort();
  }, []);

  return (
    <section style={{ maxWidth: 700, margin: "18px auto", padding: 12 }}>
      <h3>Posts</h3>

      <div style={{ marginBottom: 10 }}>
        <button
          onClick={() => {
            const c = new AbortController();
            fetchPosts(c.signal);
          }}
        >
          Reload
        </button>
      </div>

      {loading && <div>Loading posts…</div>}

      {error && <div style={{ color: "red" }}>Error: {error}</div>}

      {!loading && !error && (
        <ul style={{ paddingLeft: 16 }}>
          {posts.map((p) => (
            <li key={p.id} style={{ marginBottom: 8 }}>
              <strong>{p.title}</strong>
              <div style={{ fontSize: 13, color: "#444" }}>{p.body}</div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
