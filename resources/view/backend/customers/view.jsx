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
      .get(`${BASE_URL}/user-detail/${id}`)
      .then((response) => {
      	console.log(response);
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
          <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>← Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="card shadow-lg border-0 rounded-2 p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="fw-bold mb-1">Customer Details</h2>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>← Back</button>
        </div>

        <div className="row mb-3">
          <div className="col-md-6 mb-3">
            <label className="form-label fw-semibold">Device ID</label>
            <div>{ustomer.device_id || 'N/A'}</div>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label fw-semibold">Status</label>
            <div>
              <span className={`badge 
                ${customer.status === 'active' ? 'bg-success-subtle text-success' :
                  customer.status === 'inActive' ? 'bg-secondary-subtle text-secondary' :
                    customer.status === 'banned' ? 'bg-danger-subtle text-danger' :
                      customer.status === 'rejected' ? 'bg-warning-subtle text-warning' :
                        'bg-light text-dark'}`}>
                {(() => {
                  const status = typeof customer.status === 'string' ? customer.status : String(customer.status || '');
                  return status ? status.charAt(0).toUpperCase() + status.slice(1) : '-';
                })()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;
