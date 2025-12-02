import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [error, setError] = useState('');

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  const decrement = () => {
    if (count === 0 ) {
        setError('The value cannot be less than 0!');
        return;
    }
    setCount((prev) => prev - 1);
  };

  return (
    <div className="basic-counter" style={{ textAlign: "center", marginTop: "20px" }} >
      <h2>Count: {count}</h2>
      <button className="btn btn-primary" onClick={increment}>Increment</button>
      <button className="btn btn-primary" style={{ marginLeft: "10px" }} onClick={decrement}>
        Decrement
      </button>
      {error && error !== '' && (
        <div style={{ color: 'red', marginTop: "8px"}}>{error}</div>
      )}
    </div>
  );
};

export default Counter;
