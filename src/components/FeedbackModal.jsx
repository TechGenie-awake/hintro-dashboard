import { useState } from "react";
import styles from "./FeedbackModal.module.css";
import { X, ArrowLeft } from "lucide-react";

const getQuestion = (rating) => {
  if (rating <= 2) return "What frustrated you or felt confusing?";
  if (rating === 3) return "What could be improved?";
  return "What did you like the most?";
};

export default function FeedbackModal({ onClose, onSubmitted }) {
  const [step, setStep] = useState(1); // 1 = title, 2 = rating+desc, 3 = success
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [description, setDescription] = useState("");

  const handleNext = () => {
    if (!title.trim()) return;
    setStep(2);
  };

  const handleSubmit = () => {
    if (!rating) return;
    const existing = JSON.parse(
      localStorage.getItem("hintro_feedback") || "[]",
    );
    existing.push({
      title,
      rating,
      description,
      date: new Date().toISOString(),
    });
    localStorage.setItem("hintro_feedback", JSON.stringify(existing));
    setStep(3);
    if (onSubmitted) onSubmitted();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {step === 1 && (
          <>
            <div className={styles.header}>
              <div>
                <h3 className={styles.title}>Give Feedback</h3>
                <p className={styles.sub}>
                  Describe your experience using Hintro...
                </p>
              </div>
              <button className={styles.closeBtn} onClick={onClose}>
                <X size={18} />
              </button>
            </div>
            <label className={styles.fieldLabel}>Feedback Title</label>
            <input
              className={styles.input}
              placeholder="My First Call"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className={styles.actions}>
              <button className={styles.backBtn} onClick={onClose}>
                <X size={14} /> Cancel
              </button>
              <button className={styles.submitBtn} onClick={handleNext}>
                Next →
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className={styles.header}>
              <div>
                <h3 className={styles.title}>Give Feedback</h3>
                <p className={styles.sub}>
                  Describe your experience using Hintro...
                </p>
              </div>
            </div>

            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  className={styles.starBtn}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(0)}
                  onClick={() => setRating(i)}
                >
                  <img
                    src="/starbadge.png"
                    className={styles.starImg}
                    style={{ opacity: i <= (hovered || rating) ? 1 : 0.3 }}
                    alt="star"
                  />
                </button>
              ))}
            </div>

            <label className={styles.fieldLabel}>
              {rating ? getQuestion(rating) : "Rate us first"}
            </label>
            <textarea
              className={styles.textarea}
              placeholder=""
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className={styles.actions}>
              <button className={styles.backBtn} onClick={() => setStep(1)}>
                <ArrowLeft size={14} /> Back
              </button>
              <button className={styles.submitBtn} onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <div className={styles.success}>
            <div className={styles.successIcon}>
              <img src="/starbadge.png" alt="star" style={{ width: 60 }} />
            </div>
            <h3 className={styles.successTitle}>
              Thank you for your feedback!!
            </h3>
            <p className={styles.successSub}>
              Our team reviews every suggestion to improve AI responses,
              workflows, and overall experience.
            </p>
            <button className={styles.closeBtn2} onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
