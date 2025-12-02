import React from "react";
import useWindowSize from "./useWindowSize";

const WindowSizeDisplay = () => {
  const { width, height } = useWindowSize();

  return (
    <div style={{ textAlign: "center", marginTop: 30 }}>
      <h3>Window Size Hook</h3>
      <p>Width: {width}px</p>
      <p>Height: {height}px</p>
    </div>
  );
};

export default WindowSizeDisplay;
