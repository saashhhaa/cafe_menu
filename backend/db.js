const Database = require("better-sqlite3");
const db = new Database("cafe.db");

db.prepare(`
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titleRu TEXT,
    titleEng TEXT,
    imageUrl TEXT
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS positions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titleRu TEXT,
    titleEng TEXT,
    contentRu TEXT,
    contentEng TEXT,
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

db.prepare(`
  CREATE TABLE IF NOT EXISTS banners (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titleRu TEXT,
    titleEng TEXT,
    imageUrl TEXT
  )
`).run();


module.exports = db;
