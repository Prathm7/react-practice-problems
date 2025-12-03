import React, { useContext } from "react";
import { AuthContext } from "./auth-context";

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <main style={{ padding: 20 }}>
      {user ? (
        <div>
          <h2>Welcome back, {user.name}!</h2>
          <p>Your email: {user.email}</p>
        </div>
      ) : (
        <div>
          <h2>Public Home</h2>
          <p>Please sign in to access protected content.</p>
        </div>
      )}
    </main>
  );
}
