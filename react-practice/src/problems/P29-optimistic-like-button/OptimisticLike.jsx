import React, { useState } from "react";

export default function OptimisticLike({ initialCount = 10, postId = 1 }) {
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(false);
  const [saving, setSaving] = useState(false);

  let showToast = null;
  try {
    const ctx = require("../P16-global-toast-notifications/toast-context");
    if (ctx && ctx.useToast) {
    }
  } catch (e) {
  }

  const notify = (msg) => {
    if (typeof window !== "undefined" && window.__SHOW_TOAST) {
      window.__SHOW_TOAST(msg);
      return;
    }
    // fallback
    alert(msg);
  };

  const handleLike = async () => {
    if (saving) return;

    const newLiked = !liked;
    const delta = newLiked ? 1 : -1;
    setLiked(newLiked);
    setCount((c) => c + delta);
    setSaving(true);

    try {
      await new Promise((res) => setTimeout(res, 700));

      if (Math.random() < 0.2) throw new Error("Network error");

    } catch (err) {
      setLiked((prev) => !prev);
      setCount((c) => c - delta);
      notify(
        `Failed to ${newLiked ? "like" : "unlike"}: ${err.message || "Error"}`
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "18px auto", padding: 12 }}>
      <h3>Optimistic Like</h3>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button
          onClick={handleLike}
          disabled={saving}
          style={{ padding: "8px 12px" }}
        >
          {liked ? "♥ Liked" : "♡ Like"}
        </button>

        <div>
          <strong>{count}</strong> {count === 1 ? "like" : "likes"}
        </div>
      </div>

      {saving && (
        <div style={{ fontSize: 13, color: "#666", marginTop: 8 }}>Saving…</div>
      )}
    </div>
  );
}
