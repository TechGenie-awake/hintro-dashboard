import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [userId, setUserId] = useState(null);

  const handleLogin = (email) => {
    setUserId(email === "john@example.com" ? "u1" : "u2");
  };

  const handleLogout = () => setUserId(null);

  if (!userId) return <Login onLogin={handleLogin} />;
  return <Dashboard userId={userId} onLogout={handleLogout} />;
}