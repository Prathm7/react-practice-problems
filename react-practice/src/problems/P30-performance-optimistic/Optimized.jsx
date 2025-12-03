import React, { useMemo, useState } from "react";

const HeavyChild = React.memo(function HeavyChild({ items }) {
  console.log("%cHeavyChild rendered ✔", "color: green");

  let total = 0;
  for (let i = 0; i < 50_000_000; i++) total += i;

  return (
    <div style={{ padding: 10, border: "1px solid #aaa", marginTop: 10 }}>
      <h4>Heavy Child (Optimized)</h4>
      <p>Items: {items.length}</p>
    </div>
  );
});

export default function OptimizedExample() {
  const [count, setCount] = useState(0);

  const items = useMemo(() => [1, 2, 3], []);

  return (
    <div style={{ padding: 20 }}>
      <h3>P30 – Optimized</h3>

      <button onClick={() => setCount((c) => c + 1)}>
        Increment Parent Count: {count}
      </button>

      <HeavyChild items={items} />
    </div>
  );
}
