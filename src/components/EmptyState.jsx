import { CalendarDays } from "lucide-react";
import styles from "./EmptyState.module.css";

export default function EmptyState() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.iconBox}>
        <CalendarDays size={26} color="var(--color-accent)" />
      </div>
      <h4 className={styles.title}>No Recent Calls</h4>
      <p className={styles.desc}>
        Connect your Google Calendar to see upcoming meetings,
        get reminders, and join calls directly from Hintro.
      </p>
      <button className={styles.btn}>Start a Call</button>
    </div>
  );
}