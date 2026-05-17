import { useState } from "react";
import { Mail, Eye, EyeOff } from "lucide-react";
import styles from "./Login.module.css";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) onLogin(email);
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Login</h1>
        <form onSubmit={handleSubmit}>

          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>
                <Mail size={16} />
              </span>
              <input
                type="email"
                placeholder="Example@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <div className={styles.inputWrapper}>
              <input
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={styles.inputPassword}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className={styles.eyeBtn}
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>Login</button>
        </form>
        <p className={styles.hint}>
          Tip: use <strong>john@example.com</strong> for empty state,
          any other email for active user
        </p>
      </div>
    </div>
  );
}