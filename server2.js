// server2.js
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());

// Avaa/luo SQLite-tietokanta tämän tiedoston viereen
const dbFile = path.join(__dirname, "database.db");
const db = new sqlite3.Database(dbFile, (err) => {
  if (err) {
    console.error("SQLite error:", err.message);
    process.exit(1);
  }
  console.log("Connected to SQLite database.");
  // Luo taulu jos ei ole
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL
  )`);
});

// Perusreitti
app.get("/", (req, res) => {
  res.send("Hello from server2.js");
});

// Hae kaikki käyttäjät
app.get("/users", (req, res) => {
  db.all("SELECT id, name, email FROM users", [], (err, rows) => {
    if (err) return res.status(500).json({error: err.message});
    res.json(rows);
  });
});

// Lisää käyttäjä: { "name": "...", "email": "..." }
app.post("/users", (req, res) => {
  const {name, email} = req.body || {};
  if (!name || !email) {
    return res.status(400).json({error: "name and email are required"});
  }
  db.run(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email],
    function (err) {
      if (err) return res.status(500).json({error: err.message});
      res.status(201).json({id: this.lastID, name, email});
    }
  );
});

// Käynnistä palvelin
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
