import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditOnboardingQuestion = () => {
  const { id } = useParams(); // get ID from route
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    question_text: '',
    question_key: '',
    type: 'radio',
    options: ['']
  });

  const [loading, setLoading] = useState(true);

  // Fetch existing data
  useEffect(() => {
    axios.get(`http://localhost:8000/api/admin/onboarding/questions-edit/${id}`)
      .then(res => {
        const data = res.data.data;
        setFormData({
          question_text: data.question_text,
          question_key: data.question_key,
          type: data.type,
          options: data.options || ['']
        });
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching question:', err);
        toast.error("Failed to load question.");
        setLoading(false);
      });
  }, [id]);

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
      await axios.post(`http://localhost:8000/api/admin/onboarding/questions-update/${id}`, formData);
      toast.success("Question updated successfully!");
      navigate(-1);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update question.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="fw-bold mb-1">Edit Onboarding Question</h2>
          <p className="text-muted">Modify the onboarding form question</p>
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
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Question Key</label>
              <input
                type="text"
                name="question_key"
                className="form-control"
                value={formData.question_key}
                onChange={handleInputChange}
                disabled
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Question Type</label>
              <select
                name="type"
                className="form-select"
                value={formData.type}
                onChange={handleInputChange}
                required
              >
                <option value="radio">Radio</option>
                <option value="checkbox">Checkbox</option>
                <option value="select">Select</option>
              </select>
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
                    required
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
              <button type="button" className="btn btn-sm btn-outline-primary mt-2" onClick={addOption}>
                + Add Option
              </button>
            </div>

            <button type="submit" className="btn btn-success mt-3">Update Question</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditOnboardingQuestion;
