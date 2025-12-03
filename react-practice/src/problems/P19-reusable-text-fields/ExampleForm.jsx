import React, { useState } from "react";
import TextField from "./TextField";

export default function ExampleForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};
    if (!values.name.trim()) err.name = "Name is required";
    if (!values.email.includes("@")) err.email = "Enter a valid email";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    console.log("Submitted:", values);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 400,
        margin: "24px auto",
        padding: 20,
        border: "1px solid #ddd",
        borderRadius: 8,
      }}
    >
      <h3>Reusable TextField Demo</h3>

      <TextField
        label="Full Name"
        name="name"
        value={values.name}
        onChange={handleChange}
        placeholder="Enter your full name"
        error={errors.name}
        helperText="Please enter your real name"
      />

      <TextField
        label="Email"
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        placeholder="you@example.com"
        error={errors.email}
      />

      <button type="submit" style={{ padding: "8px 12px", marginTop: 10 }}>
        Submit
      </button>
    </form>
  );
}
