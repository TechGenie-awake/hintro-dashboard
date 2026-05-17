import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import FeedbackHistory from "./pages/FeedbackHistory";
import ComingSoon from "./components/ComingSoon";
import Sidebar from "./components/Sidebar";
import styles from "./App.module.css";
import { fetchDashboard } from "./api/api";

export default function App() {
  const [userId, setUserId] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [usage, setUsage] = useState(null);

  const handleLogin = (email) => {
    setUserId(email === "john@example.com" ? "u1" : "u2");
  };

  const handleLogout = () => {
    setUserId(null);
    setPage("dashboard");
    setUsage(null);
  };

  useEffect(() => {
    if (userId) {
      fetchDashboard(userId).then((d) => setUsage(d.usage?.kb_files));
    }
  }, [userId]);

  if (!userId) return <Login onLogin={handleLogin} />;

  return (
    <div className={styles.app}>
      <Sidebar
        activePage={page}
        onNavigate={(p) => {
          setPage(p);
          setSidebarOpen(false);
        }}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        usage={usage}
      />
      {sidebarOpen && (
        <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}
      <div className={styles.content}>
        {page === "dashboard" && (
          <Dashboard
            userId={userId}
            onLogout={handleLogout}
            onMenuOpen={() => setSidebarOpen(true)}
          />
        )}
        {page === "feedback-history" && (
          <FeedbackHistory onMenuOpen={() => setSidebarOpen(true)} />
        )}
        {page === "call-insights" && (
          <ComingSoon
            title="Call Insights"
            onMenuOpen={() => setSidebarOpen(true)}
          />
        )}
        {page === "knowledge-base" && (
          <ComingSoon
            title="Knowledge Base"
            onMenuOpen={() => setSidebarOpen(true)}
          />
        )}
        {page === "prompts" && (
          <ComingSoon title="Prompts" onMenuOpen={() => setSidebarOpen(true)} />
        )}
        {page === "boxy-controls" && (
          <ComingSoon
            title="Boxy Controls"
            onMenuOpen={() => setSidebarOpen(true)}
          />
        )}
      </div>
    </div>
  );
}
