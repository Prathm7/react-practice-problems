import React, { useContext } from "react";
import { AuthContext } from "./auth-context";

export default function AuthButton() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div style={{ textAlign: "center", marginTop: 20 }}>
      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <span style={{ color: "#555" }}>Not logged in</span>
      )}
    </div>
  );
}
