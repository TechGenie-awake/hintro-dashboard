import styles from "./StatCard.module.css";

export default function StatCard({ icon, iconBg, label, value }) {
  return (
    <div className={styles.card}>
      <div className={styles.iconBox} style={{ background: iconBg }}>
        {icon}
      </div>
      <div>
        <p className={styles.label}>{label}</p>
        <p className={styles.value}>{value}</p>
      </div>
    </div>
  );
}