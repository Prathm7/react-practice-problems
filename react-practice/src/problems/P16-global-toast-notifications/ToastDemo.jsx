import React from "react";
import { useToast } from "./toast-context";

export default function ToastDemo() {
  const { showToast } = useToast();

  return (
    <div style={{ padding: 20 }}>
      <h3>Toast Demo</h3>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button
          onClick={() => showToast("This is an info toast", { type: "info" })}
        >
          Info
        </button>

        <button
          onClick={() => showToast("Saved successfully", { type: "success" })}
        >
          Success
        </button>

        <button
          onClick={() =>
            showToast("Something went wrong", { type: "error", duration: 6000 })
          }
        >
          Error (6s)
        </button>

        <button
          onClick={() =>
            showToast("Heads up! Warning here", { type: "warning" })
          }
        >
          Warning
        </button>
      </div>
    </div>
  );
}
