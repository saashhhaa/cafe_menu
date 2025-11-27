const Database = require("better-sqlite3");
const db = new Database("cafe.db");

db.prepare(`
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    imageUrl TEXT
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS positions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT,
    cost REAL,
    categoryId INTEGER,
    imageUrl TEXT,
    FOREIGN KEY(categoryId) REFERENCES categories(id) ON DELETE CASCADE
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    login TEXT UNIQUE, 
    password TEXT

  )
`).run();

db.prepare(`
  INSERT OR IGNORE INTO users (login, password)
  VALUES ('admin', '1234')
`).run();



module.exports = db;
