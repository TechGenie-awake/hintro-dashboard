import { useState, useEffect } from "react";
import {
  Clock, Sparkles, CalendarDays,
  Play, LogOut, ChevronDown,
  ChartPie, Menu,
} from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./Dashboard.module.css";
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

export default function Dashboard({ userId, onLogout, onMenuOpen }) {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLogout, setShowLogout] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    Promise.all([
      fetchProfile(userId).then(setProfile),
      fetchStats(userId).then(setStats),
      fetchCallHistory(userId, 10).then((d) => setCalls(d.callSessions || [])),
    ]).finally(() => setLoading(false));
  }, [userId]);

  const firstName = profile?.firstName || "there";

  return (
    <div>
      {/* Topbar */}
      <div className={styles.topbar}>
        <div className={styles.topbarLeft}>
          <button className={styles.hamburger} onClick={onMenuOpen}>
            <Menu size={22} />
          </button>
          <h2 className={styles.pageTitle}>Dashboard</h2>
        </div>
        <div className={styles.topbarRight}>
          <button className={styles.tutorialBtn}>
            <Play size={13} /> Watch Tutorial
          </button>
          <div className={styles.userMenuWrapper}>
            <button
              className={styles.avatarBtn}
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className={styles.avatar}>
                {loading ? <Skeleton circle width={36} height={36} /> : firstName[0]}
              </div>
              <ChevronDown size={16} />
            </button>
            {showUserMenu && (
              <div className={styles.userMenu}>
                <button
                  className={styles.userMenuItem}
                  onClick={() => { setShowLogout(true); setShowUserMenu(false); }}
                >
                  <LogOut size={14} /> Log out
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
              Hi, {loading ? <Skeleton width={80} inline /> : firstName} 👋 Welcome to Hintro
            </h1>
            <p className={styles.welcomeSub}>
              Ready to make your next call smarter?
            </p>
          </div>
          <button className={styles.startCallBtn}>Start New Call</button>
        </div>

        <div className={styles.statsGrid}>
          <StatCard
            icon={<ChartPie size={22} color="#e05c5c" />}
            iconBg="#fde8e8"
            label="Total Sessions"
            value={loading ? <Skeleton width={60} /> : stats?.totalSessions ?? 0}
          />
          <StatCard
            icon={<Clock size={22} color="#2bac8a" />}
            iconBg="#e0f5f5"
            label="Average Duration"
            value={loading ? <Skeleton width={80} /> : stats ? formatDuration(stats.averageDuration) : "0"}
          />
          <StatCard
            icon={<Sparkles size={22} color="#4caf6e" />}
            iconBg="#e8f5e8"
            label="AI Used"
            value={loading ? <Skeleton width={70} /> : stats ? `${stats.totalAIInteractions} times` : "0"}
          />
          <StatCard
            icon={<CalendarDays size={22} color="#7c3aed" />}
            iconBg="#ede9fe"
            label="Last Session"
            value={loading ? <Skeleton width={90} /> : stats ? timeAgo(stats.lastSession) : "—"}
          />
        </div>

        {loading ? (
          <div>
            <Skeleton width={120} height={20} style={{ display: "block", margin: "0 auto 24px" }} />
            {Array(4).fill(0).map((_, i) => (
              <div key={i} style={{
                display: "flex", gap: 14, padding: "12px 0",
                borderBottom: "1px solid var(--color-border)"
              }}>
                <Skeleton width={40} height={40} style={{ borderRadius: 8, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <Skeleton width={160} height={15} style={{ marginBottom: 6 }} />
                  <Skeleton width={80} height={12} />
                </div>
                <Skeleton width={60} height={14} />
              </div>
            ))}
          </div>
        ) : (
          <RecentCalls calls={calls} />
        )}
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