// models/Item.js
const mongoose = require('mongoose');

const LocalizedString = {
  ru: { type: String, required: true },
  en: { type: String, required: true }
};

const ItemSchema = new mongoose.Schema({
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  imageUrl: { type: String },
  name: LocalizedString,
  description: { ru: String, en: String },
  price: { type: Number, required: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Item', ItemSchema);
