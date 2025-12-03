import React, { useState } from "react";

function HeavyChild({ items }) {
  console.log("%cHeavyChild rendered ❌", "color: red");

  let total = 0;
  for (let i = 0; i < 50_000_000; i++) total += i;

  return (
    <div style={{ padding: 10, border: "1px solid #aaa", marginTop: 10 }}>
      <h4>Heavy Child</h4>
      <p>Items: {items.length}</p>
    </div>
  );
}

export default function UnoptimizedExample() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: 20 }}>
      <h3>P30 – Unoptimized</h3>

      <button onClick={() => setCount((c) => c + 1)}>
        Increment Parent Count: {count}
      </button>

      <HeavyChild items={[1, 2, 3]} />
    </div>
  );
}
