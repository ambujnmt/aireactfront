import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';
import { getMakeupTransferList, getCustomerList, getSubscriptionList, getSubscribedCustomers } from "../../../src/utils/fetchAdminApi";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Dashboard = () => {
  const [makeupCount, setMakeupCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [subscriptionCount, setSubscriptionCount] = useState(0);
   const [subscribedCount, setSubscribedCustomers] = useState(0);
  const [monthlyCustomers, setMonthlyCustomers] = useState(Array(12).fill(0));

  const user = JSON.parse(localStorage.getItem('user'));
  const userName = user?.name || 'User';

  // Fetch Makeup Count
  useEffect(() => {
    const fetchMakeupCount = async () => {
      try {
        const res = await getMakeupTransferList();
        setMakeupCount(res.data.data?.length || 0);
      } catch (err) {
        console.error('Error fetching makeup list:', err);
      }
    };
    fetchMakeupCount();
  }, []);

  useEffect(() => {
    const fetchSubscribedCount = async () => {
      try {
        const res = await getSubscribedCustomers();
        setSubscribedCustomers(res.data.data?.length || 0);
      } catch (err) {
        console.error('Error fetching subscribed list:', err);
      }
    };
    fetchSubscribedCount();
  }, []);

  // Fetch Customer Count & Monthly Registration
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await getCustomerList();
        const customers = res.data.data || [];
        setCustomerCount(customers.length);

        const monthlyData = Array(12).fill(0);
        customers.forEach(c => {
          if(c.created_at){
            const month = new Date(c.created_at).getMonth(); // 0-11
            monthlyData[month]++;
          }
        });
        setMonthlyCustomers(monthlyData);
      } catch (err) {
        console.error('Error fetching customer list:', err);
      }
    };
    fetchCustomers();
  }, []);

  // Fetch Subscription Count
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const res = await getSubscriptionList();
        setSubscriptionCount(res.data.data?.length || 0);
      } catch (err) {
        console.error('Error fetching subscription list:', err);
      }
    };
    fetchSubscriptions();
  }, []);

  const cardData = [
    { title: 'Makeup Items', value: makeupCount, color: 'primary', icon: 'magic' },
    { title: 'Total Customers', value: customerCount, color: 'success', icon: 'users' },
    { title: 'Subscribed Customers', value: subscribedCount, color: 'warning', icon: 'users' },
    { title: 'Subscription Plans', value: subscriptionCount, color: 'danger', icon: 'list' },
  ];

  const chartData = {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    datasets: [
      {
        label: 'Customers Registered',
        data: monthlyCustomers,
        backgroundColor: '#0d6efd',
        borderRadius: 8
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' }
    }
  };

  return (
    <div className="container-fluid py-4">
      {/* Greeting */}
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
              <div className="d-flex align-items-center justify-content-start">
                <i className={`fa fa-${item.icon} fa-2x`} style={{ opacity: 0.85 }}></i>
              </div>
              <div className="text-start mt-3">
                <h6 className="text-uppercase small mb-1">{item.title}</h6>
                <h4 className="fw-bold mb-0">{item.value}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Monthly Customer Chart */}
      <div className="card shadow-sm mt-4">
        <div className="card-header bg-white">
          <h5 className="mb-0 fw-bold">Monthly Customer Registration</h5>
        </div>
        <div className="card-body">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
