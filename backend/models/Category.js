// models/Category.js
const mongoose = require('mongoose');

const LocalizedString = {
  ru: { type: String, required: true },
  en: { type: String, required: true }
};

const CategorySchema = new mongoose.Schema({
  imageUrl: { type: String },
  title: LocalizedString,
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Category', CategorySchema);
