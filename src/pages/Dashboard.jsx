import { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import RecentCalls from "../components/RecentCalls";
import LogoutModal from "../components/LogoutModal";
import { fetchProfile, fetchStats, fetchCallHistory } from "../api/api";

function formatDuration(seconds) {
  if (!seconds) return "0";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}sec`;
}

function timeAgo(isoArray) {
  if (!isoArray || isoArray.length === 0) return "—";
  const diff = Date.now() - new Date(isoArray[0]);
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}

export default function Dashboard({ userId, onLogout }) {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [calls, setCalls] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    fetchProfile(userId).then(setProfile);
    fetchStats(userId).then(setStats);
    fetchCallHistory(userId, 10).then(d => setCalls(d.callSessions || []));
  }, [userId]);

  const firstName = profile?.firstName || "there";

  return (
    <div className={styles.layout}>
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={() => setShowLogout(true)}
      />

      {sidebarOpen && (
        <div
          className={styles.overlay}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={`${styles.main} ${sidebarOpen ? styles.mainShifted : ""}`}>

        {/* Topbar */}
        <div className={styles.topbar}>
          <button
            className={styles.hamburger}
            onClick={() => setSidebarOpen(true)}
          >☰</button>
          <h2 className={styles.pageTitle}>Dashboard</h2>
          <div className={styles.topbarRight}>
            <button className={styles.tutorialBtn}>▶ Watch Tutorial</button>
            <div className={styles.userMenuWrapper}>
              <button
                className={styles.avatarBtn}
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className={styles.avatar}>{firstName[0]}</div>
                <span>▾</span>
              </button>
              {showUserMenu && (
                <div className={styles.userMenu}>
                  <button
                    className={styles.userMenuItem}
                    onClick={() => { setShowLogout(true); setShowUserMenu(false); }}
                  >
                    ↪ Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={styles.content}>
          <div className={styles.welcomeRow}>
            <div>
              <h1 className={styles.welcomeTitle}>
                Hi, {firstName} 👋 Welcome to Hintro
              </h1>
              <p className={styles.welcomeSub}>
                Ready to make your next call smarter?
              </p>
            </div>
            <button className={styles.startCallBtn}>Start New Call</button>
          </div>

          <div className={styles.statsGrid}>
            <StatCard
              icon="📊" iconBg="#fde8e8"
              label="Total Sessions"
              value={stats?.totalSessions ?? 0}
            />
            <StatCard
              icon="🕐" iconBg="#e0f5f5"
              label="Average Duration"
              value={stats ? formatDuration(stats.averageDuration) : "0"}
            />
            <StatCard
              icon="✨" iconBg="#e8f5e8"
              label="AI Used"
              value={stats ? `${stats.totalAIInteractions} times` : "0"}
            />
            <StatCard
              icon="📅" iconBg="#ede9fe"
              label="Last Session"
              value={stats ? timeAgo(stats.lastSession) : "—"}
            />
          </div>

          <RecentCalls calls={calls} />
        </div>
      </div>

      {showLogout && (
        <LogoutModal
          onCancel={() => setShowLogout(false)}
          onConfirm={onLogout}
        />
      )}
    </div>
  );
}