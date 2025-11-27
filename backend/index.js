// const express = require("express");
// const cors = require("cors");
// const multer = require("multer");

// const app = express();
// app.use(cors());
// app.use(express.json());

// const upload = multer({ dest: "uploads/" });

// let positions = [];

// app.post("/positions", upload.single("image"), (req, res) => {
//   try {
//     const { title, content, cost, categoryId } = req.body;
//     const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

//     const newPosition = {
//       id: Date.now(),
//       title,
//       content,
//       cost: Number(cost),
//       categoryId,
//       imageUrl,
//     };

//     positions.push(newPosition);

//     res.json(newPosition); // важный момент — верни объект JSON
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// });

// // GET /positions?categoryId=...
// app.get("/positions", (req, res) => {
//   const { categoryId } = req.query;
//   if (categoryId) {
//     res.json(positions.filter(p => p.categoryId === categoryId));
//   } else {
//     res.json(positions);
//   }
// });

// // DELETE /positions/:id
// app.delete("/positions/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const index = positions.findIndex((p) => p.id === id);

//   if (index === -1) {
//     return res.status(404).json({ message: "Position not found" });
//   }

//   const deleted = positions.splice(index, 1)[0];
//   res.json(deleted);
// });

// let categories = [];

// app.post("/categories", upload.single("image"), (req, res) => {
//   const { title } = req.body;
//   const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

//   const newCategory = {
//     id: Date.now(),
//     title,
//     imageUrl,
//   };

//   categories.push(newCategory);
//   res.json(newCategory);
// });

// // DELETE /categories/:id
// app.delete("/categories/:id", (req, res) => {
//   const id = Number(req.params.id); // или String, если id хранится как строка
//   const index = categories.findIndex((cat) => cat.id === id);

//   if (index === -1) {
//     return res.status(404).json({ message: "Category not found" });
//   }

//   const deletedCategory = categories.splice(index, 1)[0];
//   res.json(deletedCategory);
// });

// app.use("/uploads", express.static("uploads"));

// app.listen(5000, () => console.log("Server running on port 5000"));

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());
const upload = multer({ dest: "uploads/" });
require("./auth")(app);

app.use("/uploads", express.static("uploads"));

// ===================== CATEGORIES =====================

// Добавление категории
app.post("/categories", upload.single("image"), (req, res) => {
  const { title } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
  const stmt = db.prepare(
    "INSERT INTO categories (title, imageUrl) VALUES (?, ?)"
  );
  const info = stmt.run(title, imageUrl);
  res.json({ id: info.lastInsertRowid, title, imageUrl });
});

// Получение всех категорий
app.get("/categories", (req, res) => {
  const rows = db.prepare("SELECT * FROM categories").all();
  res.json(rows);
});

// Удаление категории
app.delete("/categories/:id", (req, res) => {
  const id = Number(req.params.id);
  const stmt = db.prepare("DELETE FROM categories WHERE id = ?");
  const info = stmt.run(id);
  if (info.changes === 0)
    return res.status(404).json({ message: "Category not found" });
  res.json({ id });
});

// ===================== POSITIONS =====================

// Добавление позиции
app.post("/positions", upload.single("image"), (req, res) => {
  const { title, content, cost, categoryId } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
  const stmt = db.prepare(`
    INSERT INTO positions (title, content, cost, categoryId, imageUrl) 
    VALUES (?, ?, ?, ?, ?)
  `);
  const info = stmt.run(title, content, cost, categoryId, imageUrl);
  res.json({
    id: info.lastInsertRowid,
    title,
    content,
    cost,
    categoryId,
    imageUrl,
  });
});

// Получение позиций по категории
app.get("/positions", (req, res) => {
  const { categoryId } = req.query;
  const rows = categoryId
    ? db.prepare("SELECT * FROM positions WHERE categoryId = ?").all(categoryId)
    : db.prepare("SELECT * FROM positions").all();
  res.json(rows);
});

// Удаление позиции
app.delete("/positions/:id", (req, res) => {
  const id = Number(req.params.id);
  const stmt = db.prepare("DELETE FROM positions WHERE id = ?");
  const info = stmt.run(id);
  if (info.changes === 0)
    return res.status(404).json({ message: "Position not found" });
  res.json({ id });
});

app.listen(5000, () => console.log("Server running on port 5000"));
