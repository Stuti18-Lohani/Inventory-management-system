import React, { useState, useEffect } from 'react';
import './App.css';

// 1. Components Import
import Dashboard from "./components/Dashboard";
import Inventory from "./components/Inventory";
import Analytics from "./components/Analytics";

function App() {
  // 2. Saari States yahan define hongi
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', qty: '', price: '' });
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // 3. API se data fetch karne ka logic
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/products');
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 4. Save/Add Product function
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const isEditing = editingProduct !== null;
    const url = isEditing
      ? `http://127.0.0.1:5000/api/products/${editingProduct.id}`
      : 'http://127.0.0.1:5000/api/products';

    try {
      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newProduct.name,
          qty: parseInt(newProduct.qty),
          price: parseFloat(newProduct.price)
        })
      });

      if (response.ok) {
        fetchProducts();
        setShowModal(false);
        setEditingProduct(null);
        setNewProduct({ name: '', qty: '', price: '' });
      }
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  // 5. Edit aur Delete logic
  const handleEditClick = (product) => {
    setEditingProduct(product);
    setNewProduct({ name: product.name, qty: product.qty, price: product.price });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await fetch(`http://127.0.0.1:5000/api/products/${id}`, { method: 'DELETE' });
      fetchProducts();
    }
  };

  // 6. Return Statement (UI)
  return (
    <div className="dashboard-container">
      <nav className="sidebar">
        <h2>StockHero</h2>
        <ul>
          <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>Dashboard</li>
          <li className={activeTab === 'inventory' ? 'active' : ''} onClick={() => setActiveTab('inventory')}>Inventory</li>
          <li className={activeTab === 'analytics' ? 'active' : ''} onClick={() => setActiveTab('analytics')}>Analytics</li>
        </ul>
      </nav>

      <div className="main-content">
        {activeTab === 'dashboard' && <Dashboard products={products} />}

        {activeTab === 'inventory' && (
          <Inventory 
            products={products} 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm}
            onEdit={handleEditClick}
            onDelete={handleDelete}
            onAddClick={() => { setEditingProduct(null); setNewProduct({name:'', qty:'', price:''}); setShowModal(true); }}
          />
        )}

        {activeTab === 'analytics' && <Analytics products={products} />}

        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <form onSubmit={handleAddProduct}>
                <input type="text" placeholder='Product Name' value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} required />
                <input type="number" placeholder='Quantity' value={newProduct.qty} onChange={(e) => setNewProduct({ ...newProduct, qty: e.target.value })} required />
                <input type="number" placeholder='Price' value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} required />
                <div className="modal-actions">
                  <button type='button' className='cancel-btn' onClick={() => {setShowModal(false); setEditingProduct(null);}}>Cancel</button>
                  <button type='submit' className='save-btn'>{editingProduct ? 'Update Product' : 'Save Product'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;