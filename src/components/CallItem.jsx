import { useState } from "react";
import styles from "./CallItem.module.css";

export default function CallItem({ call }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const time = new Date(call.started_at).toLocaleTimeString("en-US", {
    hour: "2-digit", minute: "2-digit"
  });
  const initial = (call.client || "?")[0].toUpperCase();

  return (
    <div className={styles.item}>
      <div className={styles.avatar}>{initial}</div>
      <div className={styles.info}>
        <p className={styles.name}>{call.description || "Call"}</p>
        <p className={styles.participants}>👥👥👥</p>
      </div>
      <span className={styles.time}>{time}</span>
      <div className={styles.menuWrapper}>
        <button
          className={styles.menuBtn}
          onClick={() => setMenuOpen(!menuOpen)}
        >⋮</button>
        {menuOpen && (
          <div className={styles.menu}>
            <button className={styles.menuItem}>View</button>
            <button className={styles.menuItem}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
}