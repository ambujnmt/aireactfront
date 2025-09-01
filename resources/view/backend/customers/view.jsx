import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CustomerDetail = () => {
  const [customer, setCustomer] = useState(null);
  const { id } = useParams();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/user-detail/${id}`) // ✅ fixed API path
      .then((response) => {
        console.log("API Response:", response.data);
        setCustomer(response?.data?.data || null);
      })
      .catch((error) => {
        console.error('Error fetching customer:', error);
        setCustomer(null);
      });
  }, [id]);

  if (!customer) {
    return (
      <div className="container-fluid py-4">
        <div className="card shadow-lg border-0 rounded-2 p-4 text-center">
          <h5 className="mb-0">Customer not found.</h5>
          <button
            className="btn btn-secondary mt-3"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="card shadow-lg border-0 rounded-2 p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="fw-bold mb-1">Customer Details</h2>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>

        <div className="row mb-3">
          <div className="col-md-6 mb-3">
            <label className="form-label fw-semibold">User ID</label>
            <div>{customer.id}</div>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label fw-semibold">Device ID</label>
            <div>{customer.device_id || 'N/A'}</div>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label fw-semibold">Onboarding Status</label>
            <div>
              {customer.onboarding_status === "1" ? (
                <span className="badge bg-success-subtle text-success">Completed</span>
              ) : (
                <span className="badge bg-secondary-subtle text-secondary">Pending</span>
              )}
            </div>
          </div>

          <div className="col-md-12 mb-3">
            <label className="form-label fw-semibold">Onboarding Options</label>
            {customer.onboarding_options ? (
              <ul className="list-group">
                {Object.entries(customer.onboarding_options).map(([key, value], index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between">
                    <strong>{key}</strong>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">No options provided</p>
            )}
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label fw-semibold">Created At</label>
            <div>{new Date(customer.created_at).toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;
