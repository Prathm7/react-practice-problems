import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!email.trim()) newErrors.email = "Email is required";
    if (!password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    console.log("Submitted Values:", { email, password });

    setEmail("");
    setPassword("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: 300,
        margin: "40px auto",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <h2>Login</h2>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <small style={{ color: "red" }}>{errors.email}</small>}
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>Password</label>
        <input
          type="password"
          value={password}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <small style={{ color: "red" }}>{errors.password}</small>
        )}
      </div>

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
