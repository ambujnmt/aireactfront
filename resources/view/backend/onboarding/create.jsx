import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const CreateOnboardingQuestion = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    question_text: '',
    question_key: '',
    type: 'radio',
    options: ['']
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...formData.options];
    updatedOptions[index] = value;
    setFormData({ ...formData, options: updatedOptions });
  };

  const addOption = () => {
    setFormData({ ...formData, options: [...formData.options, ''] });
  };

  const removeOption = (index) => {
    const updatedOptions = formData.options.filter((_, i) => i !== index);
    setFormData({ ...formData, options: updatedOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://site2demo.in/ai-beauty/api/admin/onboarding/questions', formData);
      toast.success("Question created successfully!");
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
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="fw-bold mb-1">Create Onboarding Question</h2>
          <p className="text-muted">List of onboarding form questions</p>
        </div>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>← Back</button>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Question Text</label>
              <input
                type="text"
                name="question_text"
                className="form-control"
                value={formData.question_text}
                onChange={handleInputChange}
              />
              {errors.question_text && (
                <div className="text-danger">{errors.question_text[0]}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Question Key</label>
              <input
                type="text"
                name="question_key"
                className="form-control"
                value={formData.question_key}
                onChange={handleInputChange}
                
              />
              {errors.question_key && (
                <div className="text-danger">{errors.question_key[0]}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Question Type</label>
              <select
                name="type"
                className="form-select"
                value={formData.type}
                onChange={handleInputChange}
                
              >
                <option value="radio">Radio</option>
                <option value="checkbox">Checkbox</option>
                <option value="select">Select</option>
              </select>
              {errors.type && (
                <div className="text-danger">{errors.type[0]}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Options</label>
              {formData.options.map((opt, idx) => (
                <div className="d-flex mb-2" key={idx}>
                  <input
                    type="text"
                    className="form-control me-2"
                    value={opt}
                    onChange={(e) => handleOptionChange(idx, e.target.value)}
                    
                  />
                  {formData.options.length > 1 && (
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
              {errors.options && (
                <div className="text-danger">{errors.options[0]}</div>
              )}
              <button
                type="button"
                className="btn btn-sm btn-outline-primary text-white bg-brand mt-2"
                onClick={addOption}
              >
                + Add Option
              </button>
            </div>

            <button type="submit" className="btn btn-success mt-3">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateOnboardingQuestion;
