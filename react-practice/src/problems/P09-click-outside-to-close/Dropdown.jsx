import React, { useState, useRef, useEffect } from "react";

export default function Dropdown() {
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (open && boxRef.current && !boxRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <button onClick={() => setOpen((prev) => !prev)}>Toggle Dropdown</button>

      {open && (
        <div
          ref={boxRef}
          style={{
            marginTop: 10,
            padding: 15,
            border: "1px solid #ccc",
            width: 180,
            marginInline: "auto",
            background: "lightGrey",
            borderRadius: 6,
          }}
        >
          <p style={{ margin: 0, color: 'black' }}>Dropdown Content</p>
        </div>
      )}
    </div>
  );
}
