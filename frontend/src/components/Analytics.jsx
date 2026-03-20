import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    plugins
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);
import { Bar, Pie } from 'react-chartjs-2';

const Analytics = ({ products }) => {
    const barData = {
        labels: products.map(p => p.name),
        datasets: [
            {
                label: 'Stock Quantity',
                data: products.map(p => p.qty),
                backgroundColor: 'rgba(79, 70, 229, 0.6)',
                borderColor: 'rgba(79, 70, 229, 1)',
                borderWidth: 1,
            },
        ],
    };

    const lowStock = products.filter(p => p.qty < 5).length;
    const healthyStock = products.length - lowStock;

    const pieData = {
        labels: ['Low Stock', 'Healthy Stock'],
        datasets: [
            {
                data: [lowStock, healthyStock],
                backgroundColor: ['#ef4444', '#10b981'],
                hoverOffset: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {position: 'bottom'},
        },
    };

    return (
        <div className="analytics-section">
            <header>
                <h1>Stock Analytics</h1>
            </header>

            <div className="analytics-grid">
                {/* Bar Chart Card */}
                <div className="card chart-card">
                    <h3>Inventory Levels</h3>
                    {products.length > 0 ? (
                        <Bar data={barData} options={options}/>
                    ) : (
                        <p>No data available to display charts.</p>
                    )}
                </div>

                {/* Pie Chart Card */}
                <div className="card chart-card">
                    <h3>Stock Status Distribution</h3>
                    {products.length > 0 ? (
                        <div style={{ width: '80%', margin: ' 0 auto' }}>
                            <Pie data={pieData} options={options}/>
                        </div>
                    ) : (
                        <p>No data available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Analytics;