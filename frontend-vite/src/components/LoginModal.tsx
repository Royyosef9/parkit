// src/components/LoginModal.tsx
import { useState } from "react";
import axios from "axios";

type Props = {
  onLogin: (username: string) => void;
  onClose: () => void;
};

export function LoginModal({ onLogin, onClose }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🔔 LoginModal.handleSubmit fired", { username, password });
    setError("");

    try {
      const res = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });
      console.log("🔔 LoginModal axios response:", res.status, res.data);
      onLogin(res.data.username);
      onClose();
    } catch (err) {
      console.error("🔔 LoginModal axios error", err);
      setError("שגיאה בהתחברות");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{ background: "white", padding: "2rem", borderRadius: "10px" }}
      >
        <h2>התחברות</h2>
        <input
          placeholder="שם משתמש"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="סיסמה"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        {/* חשוב: כפתור הסאבמיט מוגדר type="submit" */}
        <button type="submit">התחבר</button>
        {/* לכפתור ביטול יש type="button" כדי שלא ישלח את הטופס */}
        <button type="button" onClick={onClose}>
          ביטול
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
