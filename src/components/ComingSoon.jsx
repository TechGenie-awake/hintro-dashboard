import styles from "./ComingSoon.module.css";
import { Menu, Clock } from "lucide-react";

export default function ComingSoon({ title, onMenuOpen }) {
  return (
    <div>
      <div className={styles.topbar}>
        <div className={styles.topbarLeft}>
          <button className={styles.hamburger} onClick={onMenuOpen}>
            <Menu size={22} />
          </button>
          <h2 className={styles.pageTitle}>{title}</h2>
        </div>
      </div>
      <div className={styles.content}>
        <Clock size={40} color="var(--color-text-muted)" />
        <h3 className={styles.title}>Coming Soon</h3>
        <p className={styles.sub}>This feature is under development.</p>
      </div>
    </div>
  );
}