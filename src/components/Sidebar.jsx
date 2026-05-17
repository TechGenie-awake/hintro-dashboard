import { useState } from "react";
import {
  LayoutDashboard, Phone, FileText,
  MessageSquare, Globe, Info,
  Inbox, Gift, X
} from "lucide-react";
import styles from "./Sidebar.module.css";
import FeedbackModal from "./FeedbackModal";

const navItems = [
  { key: "dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
  { key: "call-insights", icon: <Phone size={18} />, label: "Call Insights" },
  { key: "knowledge-base", icon: <FileText size={18} />, label: "Knowledge Base", soon: true },
  { key: "prompts", icon: <MessageSquare size={18} />, label: "Prompts", soon: true },
  { key: "boxy-controls", icon: <Globe size={18} />, label: "Boxy Controls", soon: true },
];

export default function Sidebar({ activePage, onNavigate, open, onClose }) {
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <>
      <div className={`${styles.sidebar} ${open ? styles.open : ""}`}>
        <div className={styles.header}>
          <span className={styles.logo}>Hintro</span>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={18} />
          </button>
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
              {item.soon && <Info size={15} className={styles.soonIcon} />}
            </div>
          ))}
        </nav>

        <div className={styles.bottom}>
          <button
            className={styles.bottomBtn}
            onClick={() => onNavigate && onNavigate("feedback-history")}
          >
            <Inbox size={18} /> Feedback History
          </button>
          <button
            className={styles.bottomBtn}
            onClick={() => setShowFeedback(true)}
          >
            <Gift size={18} /> Feedback
          </button>
          <button className={styles.upgradeBtn}>Upgrade</button>
        </div>
      </div>

      {showFeedback && (
        <FeedbackModal onClose={() => setShowFeedback(false)} />
      )}
    </>
  );
}