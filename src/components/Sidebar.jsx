import { useState } from "react";
import styles from "./Sidebar.module.css";
import FeedbackModal from "./FeedbackModal";
import FeedbackHistory from "./FeedbackHistory";

const navItems = [
  { icon: "⊞", label: "Dashboard", active: true },
  { icon: "📞", label: "Call Insights" },
  { icon: "📄", label: "Knowledge Base", soon: true },
  { icon: "💬", label: "Prompts", soon: true },
  { icon: "🌐", label: "Boxy Controls", soon: true },
];

export default function Sidebar({ open, onClose }) {
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

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
              key={item.label}
              className={`${styles.navItem} ${item.active ? styles.navItemActive : ""}`}
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
            onClick={() => setShowHistory(true)}
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
      {showHistory && (
        <FeedbackHistory onClose={() => setShowHistory(false)} />
      )}
    </>
  );
}