import styles from "./LogoutModal.module.css";

export default function LogoutModal({ onCancel, onConfirm }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3 className={styles.title}>Leaving already?</h3>
        <hr className={styles.divider} />
        <p className={styles.desc}>
          You can log back in anytime to continue your meetings with Hintro.
        </p>
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onCancel}>Cancel</button>
          <button className={styles.logoutBtn} onClick={onConfirm}>Log out</button>
        </div>
      </div>
    </div>
  );
}