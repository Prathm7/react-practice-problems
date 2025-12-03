import React, { useContext, useState } from "react";
import { AuthContext } from "./auth-context";

export default function AuthLoginForm() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email });
    setEmail("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 360,
        margin: "20px auto",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <h3>Login</h3>

      <input
        type="email"
        placeholder="Enter your email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button type="submit">Login</button>
    </form>
  );
}
