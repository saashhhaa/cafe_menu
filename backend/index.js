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

app.post("/categories", upload.single("image"), (req, res) => {
  const { titleRu, titleEng } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const stmt = db.prepare(`
    INSERT INTO categories (titleRu, titleEng, imageUrl)
    VALUES (?, ?, ?)
  `);

  const info = stmt.run(titleRu, titleEng, imageUrl);

  res.json({
    id: info.lastInsertRowid,
    titleRu,
    titleEng,
    imageUrl,
  });
});

app.get("/categories", (req, res) => {
  const rows = db.prepare("SELECT * FROM categories").all();
  res.json(rows);
});

app.delete("/categories/:id", (req, res) => {
  const id = Number(req.params.id);
  const stmt = db.prepare("DELETE FROM categories WHERE id = ?");
  const info = stmt.run(id);
  if (info.changes === 0)
    return res.status(404).json({ message: "Category not found" });
  res.json({ id });
});

// ===================== POSITIONS =====================

app.post("/positions", upload.single("image"), (req, res) => {
  const { titleRu, titleEng, contentRu, contentEng, cost, categoryId } =
    req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const stmt = db.prepare(`
    INSERT INTO positions (titleRu, titleEng, contentRu, contentEng, cost, categoryId, imageUrl)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const info = stmt.run(
    titleRu,
    titleEng,
    contentRu,
    contentEng,
    cost,
    categoryId,
    imageUrl
  );

  res.json({
    id: info.lastInsertRowid,
    titleRu,
    titleEng,
    contentRu,
    contentEng,
    cost,
    categoryId,
    imageUrl,
  });
});

app.get("/positions", (req, res) => {
  const { categoryId } = req.query;
  const rows = categoryId
    ? db.prepare("SELECT * FROM positions WHERE categoryId = ?").all(categoryId)
    : db.prepare("SELECT * FROM positions").all();
  res.json(rows);
});

app.delete("/positions/:id", (req, res) => {
  const id = Number(req.params.id);
  const stmt = db.prepare("DELETE FROM positions WHERE id = ?");
  const info = stmt.run(id);
  if (info.changes === 0)
    return res.status(404).json({ message: "Position not found" });
  res.json({ id });
});

// banners

app.post("/banners", upload.single("image"), (req, res) => {
  try {
    const { titleRu, titleEng } = req.body;
    const imageUrl = "/uploads/" + req.file.filename;

    const stmt = db.prepare(`
      INSERT INTO banners (titleRu, titleEng, imageUrl)
      VALUES (?, ?, ?)
    `);

    const result = stmt.run(titleRu, titleEng, imageUrl);

    res.json({
      id: result.lastInsertRowid,
      titleRu,
      titleEng,
      imageUrl,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to add banner" });
  }
});

app.get("/banners", (req, res) => {
  const banners = db.prepare("SELECT * FROM banners").all();
  res.json(banners);
});

app.delete("/banners/:id", (req, res) => {
  const { id } = req.params;
  try {
    const stmt = db.prepare("DELETE FROM banners WHERE id = ?");
    const info = stmt.run(id);

    if (info.changes === 0) {
      return res.status(404).json({ error: "Banner not found" });
    }

    res.json({ success: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to delete banner" });
  }
});


app.listen(5000, () => console.log("Server running on port 5000"));
