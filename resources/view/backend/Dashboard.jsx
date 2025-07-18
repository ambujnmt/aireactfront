import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// Dummy card data
const cardData = [
  { title: 'Weekly Sales', value: '₹714k', color: 'primary', icon: 'shopping-bag' },
  { title: 'New Users', value: '1.35M', color: 'success', icon: 'user' },
  { title: 'Purchase Orders', value: '1.72M', color: 'warning', icon: 'shopping-cart' },
  { title: 'Messages', value: '234', color: 'danger', icon: 'envelope' },
];

// Chart data
const chartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Earnings (₹)',
      data: [12000, 19000, 3000, 5000, 20000, 30000, 25000],
      backgroundColor: '#0d6efd',
      borderRadius: 8,
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

const user = JSON.parse(localStorage.getItem('user'));
const userName = user?.name || 'User';

const Dashboard = () => {
  return (
    <div className="container-fluid py-4">
      {/* Page Title */}
      <div className="mb-4">
        <h2 className="fw-bold">Hi {userName} 👋</h2>
        <p className="text-muted mb-0">Here's your analytics dashboard overview</p>
      </div>

      {/* Stat Cards */}
        <div className="row g-4">
          {cardData.map((item, index) => (
            <div className="col-12 col-sm-6 col-lg-3" key={index}>
              <div
                className={`card text-white bg-${item.color} shadow-sm border-0`}
                style={{
                  minHeight: '160px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '20px',
                  borderRadius: '12px',
                }}
              >
                {/* Top Left Icon */}
                <div className="d-flex align-items-center justify-content-start">
                  <i className={`fa fa-${item.icon} fa-2x`} style={{ opacity: 0.85 }}></i>
                </div>

                {/* Centered Text */}
                <div className="text-start mt-3">
                  <h6 className="text-uppercase small mb-1">{item.title}</h6>
                  <h4 className="fw-bold mb-0">{item.value}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>

      {/* Chart Section */}
      <div className="card shadow-sm mt-4">
        <div className="card-header bg-white">
          <h5 className="mb-0 fw-bold">Earnings Overview</h5>
        </div>
        <div className="card-body">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
