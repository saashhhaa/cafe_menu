// routes/admin.js
const express = require('express');
const auth = require('../middleware/auth');
const Category = require('../models/Category');
const Item = require('../models/Item');
const router = express.Router();

router.use(auth); // все маршруты ниже защищены

// создать категорию
router.post('/categories', async (req, res) => {
  // ожидать { slug, imageUrl, title: {ru,en}, description: {ru,en}, order }
  const cat = await Category.create(req.body);
  res.json(cat);
});

// удалить категорию
router.delete('/categories/:id', async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  // опционально: удалить все позиции этой категории
  await Item.deleteMany({ categoryId: req.params.id });
  res.json({ ok: true });
});

// создать позицию
router.post('/items', async (req, res) => {
  const item = await Item.create(req.body);
  res.json(item);
});

// редактировать позицию
router.patch('/items/:id', async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
});

module.exports = router;
