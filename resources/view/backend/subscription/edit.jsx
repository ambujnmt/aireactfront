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
    status: '',
    features: [''],
  });
console.log()
  const [errors, setErrors] = useState({});

  // Fetch existing data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/subscription-plan/edit/${id}`);
        const { subscription_name, price, plan_type, status, features } = res.data.data;
        setFormData({
          subscription_name,
          price,
          plan_type,
          status,
          features: features.length ? features : [''],
        });
      } catch (err) {
        toast.error('Failed to load subscription plan');
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/subscription-plan/update/${id}`, formData);
      toast.success('Subscription updated successfully!');
      navigate(-1);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors || {});
      } else {
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
                  {errors.price && (
                    <div className="text-danger">{errors.price[0]}</div>
                  )}
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
                  {errors.plan_type && (
                    <div className="text-danger">{errors.plan_type[0]}</div>
                  )}
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
				  {errors.status && (
				    <div className="text-danger">{errors.status[0]}</div>
				  )}
				</div>
              </div>

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
                {errors.features && (
                  <div className="text-danger">{errors.features[0]}</div>
                )}
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary text-white bg-brand mt-2"
                  onClick={addOption}
                >
                  + Add Feature
                </button>
              </div>

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
