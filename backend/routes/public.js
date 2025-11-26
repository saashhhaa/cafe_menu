// routes/public.js
const express = require('express');
const Category = require('../models/Category');
const Item = require('../models/Item');
const router = express.Router();

router.get('/categories', async (req, res) => {
  const lang = req.query.lang === 'en' ? 'en' : 'ru';
  const cats = await Category.find().sort({ order: 1 });
  const out = cats.map(c => ({
    id: c._id,
    slug: c.slug,
    imageUrl: c.imageUrl,
    title: c.title[lang],
    description: c.description ? c.description[lang] : ''
  }));
  res.json(out);
});

router.get('/categories/:id/items', async (req, res) => {
  const lang = req.query.lang === 'en' ? 'en' : 'ru';
  const items = await Item.find({ categoryId: req.params.id, available: true }).sort({ order: 1 });
  const out = items.map(i => ({
    id: i._id,
    imageUrl: i.imageUrl,
    name: i.name[lang],
    description: i.description ? i.description[lang] : '',
    price: i.price,
    currency: i.currency
  }));
  res.json(out);
});

module.exports = router;
