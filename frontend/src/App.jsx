import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Mặc định của Vite

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/foods';

function App() {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  
  // State quản lý form Thêm/Sửa
  const [form, setForm] = useState({
    foodId: '', name: '', category: '', cuisine: '', 
    price: '', quantity: '', description: '', imageUrl: ''
  });
  const [editingId, setEditingId] = useState(null);

  // 1. Lấy danh sách món ăn & Tìm kiếm
  const fetchFoods = async (searchQuery = '') => {
    setLoading(true);
    setMessage({ text: '', type: '' });
    try {
      const url = searchQuery ? `${API_URL}?search=${searchQuery}` : API_URL;
      const response = await axios.get(url);
      setFoods(response.data);
    } catch (error) {
      setMessage({ text: 'Lỗi tải danh sách món ăn', type: 'error' });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 2. Thêm hoặc Cập nhật món ăn
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, form);
        setMessage({ text: 'Cập nhật món ăn thành công!', type: 'success' });
      } else {
        await axios.post(API_URL, form);
        setMessage({ text: 'Thêm món ăn mới thành công!', type: 'success' });
      }
      setForm({ foodId: '', name: '', category: '', cuisine: '', price: '', quantity: '', description: '', imageUrl: '' });
      setEditingId(null);
      fetchFoods();
    } catch (error) {
      setMessage({ text: error.response?.data?.message || 'Có lỗi xảy ra!', type: 'error' });
    }
    setLoading(false);
  };

  // 3. Chuẩn bị dữ liệu để Sửa (Xem chi tiết)
  const handleEdit = (food) => {
    setEditingId(food._id);
    setForm({
      foodId: food.foodId, name: food.name, category: food.category, 
      cuisine: food.cuisine, price: food.price, quantity: food.quantity, 
      description: food.description || '', imageUrl: food.imageUrl || ''
    });
    window.scrollTo(0, 0);
  };

  // 4. Xóa món ăn
  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa món này?')) return;
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`);
      setMessage({ text: 'Xóa món ăn thành công!', type: 'success' });
      fetchFoods();
    } catch (error) {
      setMessage({ text: 'Lỗi khi xóa món ăn!', type: 'error' });
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Hệ Thống Quản Lý Món Ăn</h1>
      
      {/* Hiển thị thông báo */}
      {message.text && (
        <div style={{ padding: '10px', marginBottom: '20px', color: message.type === 'error' ? 'red' : 'green', border: `1px solid ${message.type === 'error' ? 'red' : 'green'}` }}>
          {message.text}
        </div>
      )}

      {/* Form Thêm/Sửa */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ccc' }}>
        <h3>{editingId ? 'Cập nhật món ăn' : 'Thêm món ăn mới'}</h3>
        <input name="foodId" placeholder="Mã món (VD: F004)" value={form.foodId} onChange={handleChange} disabled={editingId !== null} required style={{ margin: '5px' }} />
        <input name="name" placeholder="Tên món ăn" value={form.name} onChange={handleChange} required style={{ margin: '5px' }} />
        <input name="category" placeholder="Loại món (VD: Món nước)" value={form.category} onChange={handleChange} required style={{ margin: '5px' }} />
        <input name="cuisine" placeholder="Vùng miền (VD: Miền Nam)" value={form.cuisine} onChange={handleChange} required style={{ margin: '5px' }} />
        <input name="price" type="number" placeholder="Giá bán" value={form.price} onChange={handleChange} required style={{ margin: '5px' }} />
        <input name="quantity" type="number" placeholder="Số lượng" value={form.quantity} onChange={handleChange} required style={{ margin: '5px' }} />
        <input name="description" placeholder="Mô tả" value={form.description} onChange={handleChange} style={{ margin: '5px', width: '300px' }} />
        <button type="submit" disabled={loading} style={{ padding: '5px 15px', cursor: 'pointer' }}>
          {loading ? 'Đang xử lý...' : (editingId ? 'Lưu cập nhật' : 'Thêm món')}
        </button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({foodId: '', name: '', category: '', cuisine: '', price: '', quantity: '', description: '', imageUrl: ''}) }}>Hủy</button>}
      </form>

      {/* Tìm kiếm */}
      <div style={{ marginBottom: '20px' }}>
        <input 
          placeholder="Tìm theo tên, loại, vùng miền..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          style={{ padding: '5px', width: '250px' }}
        />
        <button onClick={() => fetchFoods(search)} style={{ marginLeft: '5px', padding: '5px' }}>Tìm kiếm</button>
        <button onClick={() => { setSearch(''); fetchFoods(); }} style={{ marginLeft: '5px', padding: '5px' }}>Tất cả</button>
      </div>

      {/* Danh sách */}
      {loading ? <p>Đang tải dữ liệu...</p> : (
        <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f4f4f4' }}>
            <tr>
              <th>Mã món</th>
              <th>Tên món ăn</th>
              <th>Loại món</th>
              <th>Vùng miền</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {foods.length > 0 ? foods.map(food => (
              <tr key={food._id}>
                <td>{food.foodId}</td>
                <td><strong>{food.name}</strong><br/><small>{food.description}</small></td>
                <td>{food.category}</td>
                <td>{food.cuisine}</td>
                <td>{food.price.toLocaleString()} VNĐ</td>
                <td>{food.quantity}</td>
                <td>
                  <button onClick={() => handleEdit(food)} style={{ marginRight: '5px', cursor: 'pointer' }}>Sửa / Xem</button>
                  <button onClick={() => handleDelete(food._id)} style={{ color: 'red', cursor: 'pointer' }}>Xóa</button>
                </td>
              </tr>
            )) : <tr><td colSpan="7" style={{ textAlign: 'center' }}>Không có món ăn nào</td></tr>}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;