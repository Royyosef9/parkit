// backend/init.ts
import { Pool } from "pg";

const pool = new Pool({
  user: "ROYUSER",
  host: "localhost",
  database: "usersdb",
  password: "0804",
  port: 5432,
});

async function init() {
  try {
    // 1. אם הטבלה לא קיימת, צור אותה
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL
      );
    `);

    // 2. אם אין עמודת password, הוסף אותה
    await pool.query(`
      ALTER TABLE users
      ADD COLUMN IF NOT EXISTS password TEXT;
    `);

    console.log("✅ Table created/updated successfully.");
  } catch (err) {
    console.error("❌ Failed to create/update table:", err);
    process.exit(1);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

init();
