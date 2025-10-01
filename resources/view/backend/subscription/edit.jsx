import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditSubscriptionPlan = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the plan ID from route
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [formData, setFormData] = useState({
    subscription_name: '',
    price: '',
    plan_type: '',
    base_plan_id: '',
    tags: '',
    status: '',
    features: [''],
  });

  const [errors, setErrors] = useState({});

  // Fetch existing data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // Add token if required
        const res = await axios.get(`${BASE_URL}/subscription-plan/edit/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        const {
          subscription_name = '',
          price = '',
          plan_type = '',
          base_plan_id = '',
          tags = '',
          status = '',
          features,
        } = res.data.data;

        setFormData({
          subscription_name,
          price,
          plan_type,
          base_plan_id,
          tags,
          status,
          features: Array.isArray(features) && features.length ? features : [''],
        });
      } catch (err) {
        console.error(err);
        toast.error('Failed to load subscription plan');
      }
    };

    fetchData();
  }, [id]);

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle dynamic feature changes
  const handleOptionChange = (index, value) => {
    const updated = [...formData.features];
    updated[index] = value;
    setFormData({ ...formData, features: updated });
  };

  const addOption = () => {
    setFormData({ ...formData, features: [...formData.features, ''] });
  };

  const removeOption = (index) => {
    const updated = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: updated });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    try {
      const token = localStorage.getItem('token'); // Add token if required
      await axios.post(`${BASE_URL}/subscription-plan/update/${id}`, formData, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      toast.success('Subscription updated successfully!');
      navigate(-1);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors || {});
      } else {
        console.error(error);
        toast.error('Something went wrong!');
      }
    }
  };

  return (
    <div className="container py-4">
      <div className="card shadow-lg border-0 rounded-2 p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="fw-bold mb-1">Edit Subscription</h2>
            <p className="text-muted">Update the subscription plan details</p>
          </div>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>← Back</button>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Subscription Name */}
              <div className="mb-3">
                <label className="form-label">Subscription Name</label>
                <input
                  type="text"
                  name="subscription_name"
                  className="form-control"
                  value={formData.subscription_name}
                  onChange={handleInputChange}
                />
                {errors.subscription_name && (
                  <div className="text-danger">{errors.subscription_name[0]}</div>
                )}
              </div>

              {/* Price, Plan Type, Status */}
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">Price</label>
                  <input
                    type="text"
                    name="price"
                    className="form-control"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                  {errors.price && <div className="text-danger">{errors.price[0]}</div>}
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label">Subscription Type</label>
                  <input
                    type="text"
                    name="plan_type"
                    className="form-control"
                    value={formData.plan_type}
                    onChange={handleInputChange}
                  />
                  {errors.plan_type && <div className="text-danger">{errors.plan_type[0]}</div>}
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label">Status</label>
                  <select
                    name="status"
                    className="form-control"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="">-- Select Status --</option>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                  {errors.status && <div className="text-danger">{errors.status[0]}</div>}
                </div>
              </div>

              {/* Base Plan ID & Tags */}
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Base Plan Id</label>
                  <input
                    type="text"
                    name="base_plan_id"
                    className="form-control"
                    value={formData.base_plan_id}
                    onChange={handleInputChange}
                  />
                  {errors.base_plan_id && (
                    <div className="text-danger">{errors.base_plan_id[0]}</div>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Tags</label>
                  <input
                    type="text"
                    name="tags"
                    className="form-control"
                    value={formData.tags}
                    onChange={handleInputChange}
                  />
                  {errors.tags && <div className="text-danger">{errors.tags[0]}</div>}
                </div>
              </div>

              {/* Features */}
              <div className="mb-3">
                <label className="form-label">Features</label>
                {formData.features.map((feature, index) => (
                  <div className="d-flex mb-2" key={index}>
                    <input
                      type="text"
                      className="form-control me-2"
                      value={feature}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                    />
                    {formData.features.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => removeOption(index)}
                      >
                        &times;
                      </button>
                    )}
                  </div>
                ))}
                {errors.features && <div className="text-danger">{errors.features[0]}</div>}
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary text-white bg-brand mt-2"
                  onClick={addOption}
                >
                  + Add Feature
                </button>
              </div>

              {/* Submit */}
              <button type="submit" className="btn btn-success mt-3">
                Update Subscription
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSubscriptionPlan;
