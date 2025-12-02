import React, { useState } from "react";

export default function Tabs({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div style={{ width: 400, margin: "20px auto" }}>
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid #ccc",
          paddingBottom: "12px",
        }}
      >
        {children.map((child, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            style={{
              flex: 1,
              padding: "10px",
              cursor: "pointer",
              background: activeIndex === index ? "#050000ff" : "grey",
              border: "none",
              borderBottom:
                activeIndex === index
                  ? "2px solid black"
                  : "2px solid transparent",
              margin: "4px",
            }}
          >
            {child.props.label}
          </button>
        ))}
      </div>

      <div style={{ padding: "15px" }}>{children[activeIndex]}</div>
    </div>
  );
}
