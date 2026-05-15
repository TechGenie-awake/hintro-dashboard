import { useState } from "react";
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

export default function FeedbackHistory() {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("hintro_feedback") || "[]").reverse()
  );
  const [showFeedback, setShowFeedback] = useState(false);

  const refresh = () => {
    setItems(JSON.parse(localStorage.getItem("hintro_feedback") || "[]").reverse());
  };

  return (
    <div className={styles.page}>
      <p className={styles.sub}>Browse your previous feedback submissions</p>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Rating</th>
              <th>Description</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} className={styles.emptyCell}>
                  <div className={styles.empty}>
                    <p className={styles.emptyText}>No feedbacks yet</p>
                    <button
                      className={styles.giveFeedbackBtn}
                      onClick={() => setShowFeedback(true)}
                    >
                      Give Feedback
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              items.map((item, i) => (
                <tr key={i}>
                  <td>{item.title}</td>
                  <td>{item.rating}/5</td>
                  <td className={styles.descCell}>
                    {item.description
                      ? `- ${item.description.slice(0, 20)}...`
                      : "—"}
                  </td>
                  <td>{formatDate(item.date)}</td>
                  <td>{formatTime(item.date)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
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