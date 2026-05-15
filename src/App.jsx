import { useEffect } from "react";
import { fetchProfile, fetchDashboard, fetchStats, fetchCallHistory } from "./api/api";

function App() {
  useEffect(() => {
    fetchProfile("u2").then(data => console.log("Profile:", data));
    fetchDashboard("u2").then(data => console.log("Dashboard:", data));
    fetchStats("u2").then(data => console.log("Stats:", data));
    fetchCallHistory("u2", 5).then(data => console.log("Call History:", data));
  }, []);

  return <div>Check console</div>;
}

export default App;