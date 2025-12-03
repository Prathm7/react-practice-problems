import React from "react";
import { createPortal } from "react-dom";

function Toast({ toast, onClose }) {
  const { message, type } = toast;

  return (
    <div className={`toast toast-${type}`} role="status" aria-live="polite">
      <div className="toast-message">{message}</div>
      <button
        className="toast-close"
        onClick={() => onClose(toast.id)}
        aria-label="Dismiss toast"
      >
        ×
      </button>
    </div>
  );
}

export default function ToastContainer({ toasts = [], onRemove = () => {} }) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="toast-root">
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} onClose={onRemove} />
      ))}
    </div>,
    document.body
  );
}
