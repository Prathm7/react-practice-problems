import React, { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
      console.log("Timer cleaned up");
    };
  }, []);

  return (
    <h2 style={{ textAlign: "center", marginTop: "30px" }}>
      {time.toLocaleTimeString()}
    </h2>
  );
}
