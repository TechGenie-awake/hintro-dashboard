import styles from "./RecentCalls.module.css";
import CallItem from "./CallItem";
import EmptyState from "./EmptyState";

function groupByDate(calls) {
  return calls.reduce((acc, call) => {
    const date = new Date(call.started_at).toLocaleDateString("en-US", {
      month: "long", day: "numeric"
    });
    if (!acc[date]) acc[date] = [];
    acc[date].push(call);
    return acc;
  }, {});
}

export default function RecentCalls({ calls }) {
  const grouped = groupByDate(calls);
  const dates = Object.keys(grouped);

  return (
    <div>
      <h3 className={styles.heading}>Recent calls</h3>
      {dates.length === 0 ? (
        <EmptyState />
      ) : (
        dates.map(date => (
          <div key={date} className={styles.group}>
            <p className={styles.dateLabel}>{date}</p>
            {grouped[date].map(call => (
              <CallItem key={call._id} call={call} />
            ))}
          </div>
        ))
      )}
    </div>
  );
}