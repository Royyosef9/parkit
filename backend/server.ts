// backend/server.ts
import express, { Request, Response, NextFunction, RequestHandler } from "express";
import cors from "cors";
import { Pool } from "pg";
import bcrypt from "bcrypt";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "ROYUSER",
  host: "localhost",
  database: "usersdb",
  password: "0804",
  port: 5432,
});

// מגדירים את הטיפוס של ה-handler במפורש
const loginHandler: RequestHandler = async (req, res, next) => {
  const { username, password } = req.body as { username: string; password: string };

  try {
    // בדוק אם המשתמש קיים
    const result = await pool.query<{ password: string }>(
      "SELECT password FROM users WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0) {
      // משתמש חדש: הצפן את הסיסמה ושמור
      const hash = await bcrypt.hash(password, 10);
      await pool.query(
        "INSERT INTO users (username, password) VALUES ($1, $2)",
        [username, hash]
      );
      res.status(201).json({ message: "User created", username });
      return; // מחזירים void
    }

    // משתמש קיים: אמת סיסמה
    const hash = result.rows[0].password;
    const valid = await bcrypt.compare(password, hash);
    if (!valid) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    res.status(200).json({ message: "Login successful", username });
    return;
  } catch (err) {
    console.error("Error in /login:", err);
    res.status(500).json({ error: "Server error" });
    return;
  }
};

app.post("/login", loginHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
