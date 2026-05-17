import { useState } from "react";
import { Star, Menu } from "lucide-react";
import styles from "./FeedbackHistory.module.css";
import FeedbackModal from "../components/FeedbackModal";

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

function formatTime(iso) {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

export default function FeedbackHistory({ onMenuOpen }) {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("hintro_feedback") || "[]").reverse()
  );
  const [showFeedback, setShowFeedback] = useState(false);

  const refresh = () => {
    setItems(JSON.parse(localStorage.getItem("hintro_feedback") || "[]").reverse());
  };

  return (
    <div>
      <div className={styles.topbar}>
        <div className={styles.topbarLeft}>
          <button className={styles.hamburger} onClick={onMenuOpen}>
            <Menu size={22} />
          </button>
          <h2 className={styles.pageTitle}>Feedback History</h2>
        </div>
      </div>

      <div className={styles.page}>
        <p className={styles.sub}>Browse your previous feedback submissions</p>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <p className={styles.emptyText}>No feedbacks yet</p>
            <button
              className={styles.giveFeedbackBtn}
              onClick={() => setShowFeedback(true)}
            >
              Give Feedback
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {items.map((item, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.cardHeader}>
                  <p className={styles.cardTitle}>{item.title}</p>
                  <div className={styles.cardStars}>
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star
                        key={s}
                        size={18}
                        fill={s <= item.rating ? "#eab308" : "#e5e7eb"}
                        color={s <= item.rating ? "#eab308" : "#e5e7eb"}
                        strokeWidth={0}
                      />
                    ))}
                  </div>
                </div>
                {item.description && (
                  <p className={styles.cardDesc}>
                    {item.description.slice(0, 60)}...
                  </p>
                )}
                <p className={styles.cardDate}>
                  <span className={styles.cardDateBlue}>{formatDate(item.date)}</span>
                  {" · "}{formatTime(item.date)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {showFeedback && (
        <FeedbackModal
          onClose={() => setShowFeedback(false)}
          onSubmitted={refresh}
        />
      )}
    </div>
  );
}