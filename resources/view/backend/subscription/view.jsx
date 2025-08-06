import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const SubscriptionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [plan, setPlan] = useState({
    subscription_name: '',
    price: '',
    plan_type: '',
    features: [],
  });

  useEffect(() => {
    axios
      .get(`${BASE_URL}/subscription-plan/view/${id}`)
      .then((res) => {
        setPlan(res.data.data || {});
      })
      .catch(() => {
        toast.error('Failed to fetch subscription plan');
      });
  }, [id]);

  return (
    <div className="container py-4">
      <div className="card shadow-lg border-0 rounded-2 p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="fw-bold mb-1">Subscription Details</h2>
          </div>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>← Back</button>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            <div className="mb-3">
              <h5 className="text-muted">Subscription Name</h5>
              <p className="fs-5">{plan.subscription_name || 'Loading...'}</p>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <h5 className="text-muted">Price</h5>
                <p className="fs-5">{plan.price ? `₹${plan.price}` : 'Loading...'}</p>
              </div>

              <div className="col-md-6 mb-3">
                <h5 className="text-muted">Plan Type</h5>
                <p className="fs-5">{plan.plan_type || 'Loading...'}</p>
              </div>
            </div>

            <div className="mb-3">
              <h5 className="text-muted">Features</h5>
              <ul className="list-group">
                {Array.isArray(plan.features) && plan.features.length > 0 ? (
                  plan.features.map((feature, idx) => (
                    <li className="list-group-item" key={idx}>
                      ✅ {feature}
                    </li>
                  ))
                ) : (
                  <li className="list-group-item">No features listed</li>
                )}
              </ul>
            </div>

            <button
              className="btn btn-success mt-3"
              onClick={() => navigate(`/dashboard/subscription/edit/${id}`)}
            >
              Edit Subscription
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDetail;
