import React, { useState } from "react";
import SimpleSelect from "./SimpleSelect";

export default function SimpleSelectDemo() {
  const [country, setCountry] = useState("");

  return (
    <div style={{ padding: 30 }}>
      <h3>Simple Custom Select</h3>

      <SimpleSelect
        options={["India", "USA", "UK", "Germany", "Australia"]}
        value={country}
        onChange={setCountry}
        placeholder="Choose a country"
      />

      <p style={{ marginTop: 20 }}>
        Selected: <strong>{country}</strong>
      </p>
    </div>
  );
}
