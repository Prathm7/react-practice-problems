import React, { useState } from "react";

const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export default function PhoneNumbersForm({ onSubmit }) {
  const [phones, setPhones] = useState([{ id: makeId(), value: "" }]);

  const handleChange = (id, newValue) => {
    setPhones((prev) =>
      prev.map((p) => (p.id === id ? { ...p, value: newValue } : p))
    );
  };

  const handleAdd = () => {
    setPhones((prev) => [...prev, { id: makeId(), value: "" }]);
  };

  const handleRemove = (id) => {
    setPhones((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const numbers = phones.map((p) => p.value.trim()).filter((v) => v !== "");
    if (typeof onSubmit === "function") {
      onSubmit(numbers);
    } else {
      console.log("Submitted numbers:", numbers);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: 480, margin: "20px auto", padding: 12 }}
    >
      <h3>Phone Numbers</h3>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {phones.map((p, idx) => (
          <div
            key={p.id}
            style={{ display: "flex", gap: 8, alignItems: "center" }}
          >
            <input
              type="tel"
              inputMode="tel"
              placeholder={idx === 0 ? "Primary phone" : `Phone #${idx + 1}`}
              value={p.value}
              onChange={(e) => handleChange(p.id, e.target.value)}
              style={{ flex: 1, padding: "8px 10px" }}
            />

            <button
              type="button"
              onClick={() => handleRemove(p.id)}
              disabled={phones.length === 1}
              aria-label={`Remove phone ${idx + 1}`}
              style={{
                padding: "6px 10px",
                cursor: phones.length === 1 ? "not-allowed" : "pointer",
                opacity: phones.length === 1 ? 0.5 : 1,
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <button
          type="button"
          onClick={handleAdd}
          style={{ padding: "8px 12px" }}
        >
          + Add phone
        </button>

        <button type="submit" style={{ padding: "8px 12px" }}>
          Submit
        </button>
      </div>
    </form>
  );
}
