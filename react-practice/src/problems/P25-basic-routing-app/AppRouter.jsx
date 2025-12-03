import React, { useContext } from "react";
import {
  BrowserRouter,
  NavLink,
  Routes,
  Route,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "../P15-auth-context/auth-context";
import ProtectedRoute from "../P26-protected-route/ProtectedRoute";

function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Home</h2>
      <p>Welcome to the home page.</p>
    </div>
  );
}

function About() {
  return (
    <div style={{ padding: 20 }}>
      <h2>About</h2>
      <p>Simple about page.</p>
    </div>
  );
}

function UserPage() {
  const { id } = useParams();
  return (
    <div style={{ padding: 20 }}>
      <h2>User: {id}</h2>
      <p>This is a protected user page for user id {id}.</p>
    </div>
  );
}

function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = async () => {
    await login({ email: "demo@me" });
    navigate(from, { replace: true });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>
      <p>You must sign in to continue.</p>
      <button onClick={handleLogin}>Sign in (demo)</button>
    </div>
  );
}

function Navbar() {
  const activeStyle = {
    fontWeight: 700,
    textDecoration: "underline",
  };

  return (
    <nav
      style={{
        padding: 12,
        borderBottom: "1px solid #eee",
        display: "flex",
        gap: 12,
      }}
    >
      <NavLink
        to="/"
        end
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        Home
      </NavLink>

      <NavLink
        to="/about"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        About
      </NavLink>

      <NavLink
        to="/users/1"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        User 1 (protected)
      </NavLink>

      <NavLink
        to="/users/2"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        User 2 (protected)
      </NavLink>

      <div style={{ marginLeft: "auto" }}>
        <AuthStatus />
      </div>
    </nav>
  );
}

function AuthStatus() {
  const { user, logout } = useContext(AuthContext);

  if (!user) return <NavLink to="/login">Login</NavLink>;

  return (
    <span style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
      <span style={{ color: "#333" }}>Hi, {user.name ?? user.email}</span>
      <button onClick={() => logout()}>Logout</button>
    </span>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/users/:id"
            element={
              <ProtectedRoute>
                <UserPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={
              <div style={{ padding: 20 }}>
                <h2>404 — Not Found</h2>
              </div>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
