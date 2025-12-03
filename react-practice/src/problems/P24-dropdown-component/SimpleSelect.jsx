import React, { useEffect, useRef, useState } from "react";

export default function SimpleSelect({
  options = [],
  value,
  onChange,
  placeholder = "Select...",
}) {
  const [open, setOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const rootRef = useRef(null);

  const handleSelect = (option) => {
    onChange?.(option);
    setOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (!rootRef.current?.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (!open) {
      if (e.key === "Enter" || e.key === "ArrowDown") {
        setOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        setHighlightIndex((i) => (i + 1) % options.length);
        break;

      case "ArrowUp":
        setHighlightIndex((i) => (i - 1 + options.length) % options.length);
        break;

      case "Enter":
        handleSelect(options[highlightIndex]);
        break;

      case "Escape":
        setOpen(false);
        break;

      default:
        break;
    }
  };

  return (
    <div ref={rootRef} style={{ position: "relative", width: 200 }}>
      <div
        tabIndex={0}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleKeyDown}
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: 6,
          background: "rgb(62 62 75)",
          cursor: "pointer",
        }}
      >
        {value || <span style={{ color: "#777" }}>{placeholder}</span>}
      </div>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            width: "100%",
            background: "rgb(62 62 75)",
            border: "1px solid #ccc",
            borderRadius: 6,
            marginTop: 4,
            zIndex: 999,
          }}
        >
          {options.map((opt, i) => (
            <div
              key={opt}
              onMouseEnter={() => setHighlightIndex(i)}
              onClick={() => handleSelect(opt)}
              style={{
                padding: "8px 10px",
                background:
                  i === highlightIndex ? "rgb(83 83 92)" : "rgb(62 62 75)",
                cursor: "pointer",
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
