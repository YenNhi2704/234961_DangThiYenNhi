// backend/models/Food.js
const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    foodId: { type: String, required: true, unique: true }, // Không cho phép trùng mã món ăn
    name: { type: String, required: true },
    category: { type: String, required: true },
    cuisine: { type: String, required: true },
    ingredients: { type: [String] }, // Danh sách nguyên liệu (Mảng chuỗi)
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    description: { type: String },
    imageUrl: { type: String }
});

module.exports = mongoose.model('Food', foodSchema);