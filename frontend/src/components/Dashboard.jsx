import React from 'react';

const Dashboard = ({ products }) => {
  // Calculations
  const totalItems = products.length;
  const lowStockCount = products.filter(p => p.qty < 5).length;
  const totalValue = products.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);

  return (
    <>
      <header>
        <h1>Dashboard Overview</h1>
      </header>

      <div className="stats-grid">
        <div className="card">
          <h3>Total Items</h3>
          <p>{totalItems}</p>
        </div>
        <div className="card alert">
          <h3>Low Stock</h3>
          <p>{lowStockCount}</p>
        </div>
        <div className="card">
          <h3>Total Value</h3>
          <p>₹{totalValue.toLocaleString()}</p>
        </div>
      </div>

      <div className="table-container">
        <h3>Recent Stock Updates</h3>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {products.slice(0, 5).map(p => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.qty}</td>
                <td>₹{p.price.toLocaleString()}</td>
                <td>
                  <span className={p.qty < 5 ? 'badge red' : 'badge green'}>
                    {p.qty < 5 ? 'Low Stock' : 'In Stock'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;