import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { LoginModal } from "./components/LoginModal";

function App() {
  // state שמכיל את שם המשתמש או null אם לא מחובר
  const [user, setUser] = useState<string | null>(null);
  // state לבקרת הופעת חלון ההתחברות
  const [showLogin, setShowLogin] = useState(false);

  // בעצם componentDidMount: טוען מה־localStorage
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(saved);
  }, []);

  // קוראים לו מ־LoginModal
  const handleLogin = (username: string) => {
    setUser(username);                  // מעדכן state
    localStorage.setItem("user", username); // שומר בדפדפן
  };

  // קוראים לו מכפתור התנתק ב־Navbar
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <>
      {/* Navbar מקבל פונקציות להתחבר/להתנתק ואת השם */}
      <Navbar
        onLoginClick={() => setShowLogin(true)}
        onLogoutClick={handleLogout}
        username={user}
      />

      {/* אם showLogin=true, מציגים את חלון ההרשמה */}
      {showLogin && (
        <LoginModal
          onLogin={handleLogin}
          onClose={() => setShowLogin(false)}
        />
      )}

      <main style={{ padding: "2rem" }}>
        {/* ברכת שלום */}
        <h1>ברוך הבא לאפליקציה</h1>
        {!user && <p>על מנת להזמין או לפרסם חניה, התחבר למערכת</p>}
      </main>
    </>
  );
}

export default App;
