import React from "react";
import VirtualizedList from "./VirtualizedList";

function makeItems(n = 5000) {
  return Array.from({ length: n }, (_, i) => ({
    id: i + 1,
    text: `Item #${i + 1}`,
  }));
}

export default function VirtualizedListItems() {
  const items = React.useMemo(() => makeItems(5000), []);

  return (
    <div style={{ padding: 20 }}>
      <h3>Virtualized list (5000 items)</h3>
      <VirtualizedList
        items={items}
        height={400}
        itemHeight={46}
        overscan={6}
        renderItem={(item, idx) => (
          <div style={{ width: "100%" }}>
            <strong>{item.text}</strong>
            <div style={{ fontSize: 12, color: "#666" }}>Index: {idx}</div>
          </div>
        )}
      />
    </div>
  );
}
