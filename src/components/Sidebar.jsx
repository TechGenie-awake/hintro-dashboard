import { useState } from "react";
import styles from "./Sidebar.module.css";
import FeedbackModal from "./FeedbackModal";

const navItems = [
  { key: "dashboard", icon: "⊞", label: "Dashboard" },
  { key: "call-insights", icon: "📞", label: "Call Insights" },
  { key: "knowledge-base", icon: "📄", label: "Knowledge Base", soon: true },
  { key: "prompts", icon: "💬", label: "Prompts", soon: true },
  { key: "boxy-controls", icon: "🌐", label: "Boxy Controls", soon: true },
];

export default function Sidebar({ activePage, onNavigate, open, onClose }) {
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <>
      <div className={`${styles.sidebar} ${open ? styles.open : ""}`}>
        <div className={styles.header}>
          <span className={styles.logo}>Hintro</span>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <nav className={styles.nav}>
          {navItems.map(item => (
            <div
              key={item.key}
              onClick={() => onNavigate && onNavigate(item.key)}
              className={`${styles.navItem} ${activePage === item.key ? styles.navItemActive : ""}`}
            >
              <div className={styles.navItemLeft}>
                <span className={styles.navIcon}>{item.icon}</span>
                <span className={styles.navLabel}>{item.label}</span>
              </div>
              {item.soon && <span className={styles.soonIcon}>⏱</span>}
            </div>
          ))}
        </nav>

        <div className={styles.bottom}>
          <button
            className={styles.bottomBtn}
            onClick={() => onNavigate && onNavigate("feedback-history")}
          >
            📥 Feedback History
          </button>
          <button
            className={styles.bottomBtn}
            onClick={() => setShowFeedback(true)}
          >
            🎁 Feedback
          </button>
          <button className={styles.upgradeBtn}>Upgrade</button>
          <p className={styles.footer}>© 2025 Hintro. Made in India 🇮🇳</p>
        </div>
      </div>

      {showFeedback && (
        <FeedbackModal onClose={() => setShowFeedback(false)} />
      )}
    </>
  );
}