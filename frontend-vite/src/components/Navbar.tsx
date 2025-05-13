type Props = {
  onLoginClick: () => void;
  onLogoutClick: () => void;
  username?: string | null;
};

export function Navbar({ onLoginClick, onLogoutClick, username }: Props) {
  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "1rem", background: "#eee" }}>
      <div><strong>🚗 שיתוף חניה</strong></div>
      <div>
        {username ? (
          <>  {/* אם מחובר */}
            <span style={{ marginRight: "1rem" }}>שלום, {username}</span>
            <button onClick={onLogoutClick}>התנתק</button>
          </>
        ) : (
          <button onClick={onLoginClick}>התחבר</button>
        )}
      </div>
    </nav>
  );
}
