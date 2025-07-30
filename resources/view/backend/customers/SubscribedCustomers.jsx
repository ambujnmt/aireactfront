import React, { useState } from 'react';
import { FaEye, FaTrash } from 'react-icons/fa';

const SubscribedCustomers = () => {
  const dummyCustomers = [
    {
      id: 1,
      name: 'Riya Sharma',
      email: 'riya@example.com',
      plan: 'Yearly',
      startDate: '2024-08-01',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Amit Verma',
      email: 'amit@example.com',
      plan: 'Monthly',
      startDate: '2025-01-15',
      status: 'Expired',
    },
    {
      id: 3,
      name: 'Sana Khan',
      email: 'sana@example.com',
      plan: 'Monthly',
      startDate: '2025-06-20',
      status: 'Active',
    },
  ];

  const [customers, setCustomers] = useState(dummyCustomers);

  const handleView = (id) => alert(`View customer ID: ${id}`);
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this subscription?')) {
      setCustomers(customers.filter((cust) => cust.id !== id));
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="card shadow-lg border-0 rounded-2 p-4">
        <h2 className="fw-bold mb-2">Subscribed Customers</h2>
        <p className="text-muted">List of users with active subscriptions</p>

        <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Plan</th>
                <th>Start Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.length > 0 ? (
                customers.map((cust, index) => (
                  <tr key={cust.id}>
                    <td>{index + 1}</td>
                    <td>{cust.name}</td>
                    <td>{cust.email}</td>
                    <td>{cust.plan}</td>
                    <td>{cust.startDate}</td>
                    <td>
                      <span
                        className={`badge ${
                          cust.status === 'Active' ? 'bg-success' : 'bg-secondary'
                        }`}
                      >
                        {cust.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleView(cust.id)}>
                        <FaEye />
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(cust.id)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-3">No subscribed customers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
         </div>
      </div>
    </div>
  );
};

export default SubscribedCustomers;
