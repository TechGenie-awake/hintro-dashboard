import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import FeedbackHistory from "./pages/FeedbackHistory";
import Sidebar from "./components/Sidebar";
import styles from "./App.module.css";

export default function App() {
  const [userId, setUserId] = useState(null);
  const [page, setPage] = useState("dashboard");

  const handleLogin = (email) => {
    setUserId(email === "john@example.com" ? "u1" : "u2");
  };

  const handleLogout = () => {
    setUserId(null);
    setPage("dashboard");
  };

  if (!userId) return <Login onLogin={handleLogin} />;

  return (
    <div className={styles.app}>
      <Sidebar
        activePage={page}
        onNavigate={setPage}
        onLogout={handleLogout}
      />
      <div className={styles.content}>
        {page === "dashboard" && (
          <Dashboard userId={userId} onLogout={handleLogout} onNavigate={setPage} />
        )}
        {page === "feedback-history" && (
          <FeedbackHistory />
        )}
      </div>
    </div>
  );
}