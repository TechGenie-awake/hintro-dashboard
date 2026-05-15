import { useState } from "react";
import styles from "./FeedbackModal.module.css";

export default function FeedbackModal({ onClose }) {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!text.trim()) return;
    const existing = JSON.parse(localStorage.getItem("hintro_feedback") || "[]");
    existing.push({ text, date: new Date().toISOString() });
    localStorage.setItem("hintro_feedback", JSON.stringify(existing));
    setSubmitted(true);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {submitted ? (
          <div className={styles.success}>
            <p className={styles.successIcon}>🎉</p>
            <h3 className={styles.successTitle}>Thanks for your feedback!</h3>
            <button className={styles.closeSuccessBtn} onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div className={styles.header}>
              <h3 className={styles.title}>Share Feedback</h3>
              <button className={styles.closeBtn} onClick={onClose}>✕</button>
            </div>
            <textarea
              className={styles.textarea}
              placeholder="Tell us what you think..."
              value={text}
              onChange={e => setText(e.target.value)}
            />
            <button className={styles.submitBtn} onClick={handleSubmit}>
              Submit
            </button>
          </>
        )}
      </div>
    </div>
  );
}