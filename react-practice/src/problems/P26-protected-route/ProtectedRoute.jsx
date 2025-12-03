import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../P15-auth-context/auth-context";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (user) {
    return children;
  }

  return <Navigate to="/login" replace state={{ from: location }} />;
}
