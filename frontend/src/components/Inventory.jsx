// Inventory.jsx (Updated File)

import React from 'react';

const Inventory = ({ products, searchTerm, setSearchTerm, onEdit, onDelete, onAddClick }) => {
  // Filter products based on search term
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.id.toString().includes(searchTerm)
  );

  return (
    <>
      <header>
        <h1>Full Inventory</h1>
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="search-input" 
          />
        </div>
        <button className="add-btn" onClick={onAddClick}>
          Add Product
        </button>
      </header>

      {/* Desktop Table View - Hidden on Mobile */}
      <div className="table-container desktop-only">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(p => (
              <tr key={p.id}>
                <td>#{p.id}</td>
                <td>{p.name}</td>
                <td>{p.qty}</td>
                <td>₹{p.price.toLocaleString()}</td>
                <td>
                  <button className='edit-btn' onClick={() => onEdit(p)}>Edit</button>
                  <button className='delete-btn' onClick={() => onDelete(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View - Hidden on Desktop */}
      <div className="mobile-only mobile-inventory-grid">
        {filteredProducts.length === 0 && <p className="no-data">No products found.</p>}
        {filteredProducts.map(p => (
          <div key={p.id} className="card inventory-card">
            <div className="card-header">
              <h3>{p.name}</h3>
              <span className="p-id">#{p.id}</span>
            </div>
            <div className="card-body">
              <p><strong>Quantity:</strong> {p.qty}</p>
              <p><strong>Price:</strong> ₹{p.price.toLocaleString()}</p>
              <span className={p.qty < 5 ? 'badge red' : 'badge green'}>
                {p.qty < 5 ? 'Low Stock' : 'In Stock'}
              </span>
            </div>
            <div className="card-actions">
              <button className='edit-btn' onClick={() => onEdit(p)}>Edit</button>
              <button className='delete-btn' onClick={() => onDelete(p.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Inventory;