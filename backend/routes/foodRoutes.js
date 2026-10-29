// backend/routes/foodRoutes.js
const express = require('express');
const router = express.Router();
const Food = require('../models/Food');

// 1. Lấy danh sách món ăn & Tìm kiếm (GET /api/foods?search=...)
router.get('/', async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};

        // Chức năng tìm kiếm: theo tên, loại món ăn hoặc vùng miền
        if (search) {
            query = {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { category: { $regex: search, $options: 'i' } },
                    { cuisine: { $regex: search, $options: 'i' } }
                ]
            };
        }

        const foods = await Food.find(query);
        res.status(200).json(foods);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
});

// 2. Lấy thông tin một món ăn (GET /api/foods/:id)
router.get('/:id', async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (!food) return res.status(404).json({ message: 'Không tìm thấy món ăn' });
        res.status(200).json(food);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server, ID không hợp lệ', error: error.message });
    }
});

// 3. Thêm món ăn mới (POST /api/foods)
router.post('/', async (req, res) => {
    try {
        const { foodId, name, category, price } = req.body;

        // Kiểm tra dữ liệu đầu vào cơ bản
        if (!foodId || !name || !category || price === undefined) {
            return res.status(400).json({ message: 'Vui lòng nhập đầy đủ Mã món, Tên món, Loại và Giá' });
        }

        // Kiểm tra trùng mã món ăn (foodId)
        const existingFood = await Food.findOne({ foodId });
        if (existingFood) {
            return res.status(400).json({ message: 'Mã món ăn (foodId) đã tồn tại!' });
        }

        const newFood = new Food(req.body);
        const savedFood = await newFood.save();
        res.status(201).json({ message: 'Thêm món ăn thành công', data: savedFood });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi thêm món ăn', error: error.message });
    }
});

// 4. Cập nhật thông tin món ăn (PUT /api/foods/:id)
router.put('/:id', async (req, res) => {
    try {
        // Chặn không cho cập nhật mã foodId để tránh xung đột dữ liệu
        if (req.body.foodId) {
            delete req.body.foodId; 
        }

        const updatedFood = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        
        if (!updatedFood) return res.status(404).json({ message: 'Không tìm thấy món ăn để cập nhật' });
        res.status(200).json({ message: 'Cập nhật thành công', data: updatedFood });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật', error: error.message });
    }
});

// 5. Xóa món ăn (DELETE /api/foods/:id)
router.delete('/:id', async (req, res) => {
    try {
        const deletedFood = await Food.findByIdAndDelete(req.params.id);
        if (!deletedFood) return res.status(404).json({ message: 'Không tìm thấy món ăn để xóa' });
        res.status(200).json({ message: 'Đã xóa món ăn thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa món ăn', error: error.message });
    }
});

module.exports = router;