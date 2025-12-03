import React, { useState } from "react";
import usePrevious from "./usePrevious";

export default function CounterWithPrevious() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h3>Current Count: {count}</h3>
      <h4>
        Previous Count: {prevCount !== undefined ? prevCount : "None yet"}
      </h4>

      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
