import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const CreateOnboardingQuestion = () => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [formData, setFormData] = useState({
    subscription_name: '',
    price: '',
    plan_type: '',
    base_plan_id: '',
    tags: '',
    features: ['']
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const updatedfeatures = [...formData.features];
    updatedfeatures[index] = value;
    setFormData({ ...formData, features: updatedfeatures });
  };

  const addOption = () => {
    setFormData({ ...formData, features: [...formData.features, ''] });
  };

  const removeOption = (index) => {
    const updatedfeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: updatedfeatures });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${BASE_URL}/subscription-plan/create`, formData);
      toast.success("Subscription created successfully!");
      navigate(-1); // Go back
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors || {});
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <div className="container py-4">
    <div className="card shadow-lg border-0 rounded-2 p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="fw-bold mb-1">Create Subscription</h2>
          <p className="text-muted">List of Subscription</p>
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
              <div className="col-md-6 mb-3">
                <label className="form-label">Price</label>
                <input
                  type="text"
                  name="price"
                  className="form-control"
                  value={formData.price || ''}
                  onChange={handleInputChange}
                />
                {errors.price && <div className="text-danger">{errors.price[0]}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Subscription Type</label>
                <input
                  type="text"
                  name="plan_type"
                  className="form-control"
                  value={formData.plan_type || ''}
                  onChange={handleInputChange}
                />
                {errors.plan_type && <div className="text-danger">{errors.plan_type[0]}</div>}
              </div>
            </div>


            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Base Plan Id</label>
                <input
                  type="text"
                  name="base_plan_id"
                  className="form-control"
                  value={formData.base_plan_id || ''}
                  onChange={handleInputChange}
                />
                {errors.base_plan_id && <div className="text-danger">{errors.base_plan_id[0]}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Tags</label>
                <input
                  type="text"
                  name="tags"
                  className="form-control"
                  value={formData.tags || ''}
                  onChange={handleInputChange}
                />
                {errors.tags && <div className="text-danger">{errors.tags[0]}</div>}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Feature</label>
              {formData.features.map((opt, idx) => (
                <div className="d-flex mb-2" key={idx}>
                  <input
                    type="text"
                    className="form-control me-2"
                    value={opt}
                    onChange={(e) => handleOptionChange(idx, e.target.value)}
                    
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => removeOption(idx)}
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
              Submit
            </button>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default CreateOnboardingQuestion;
