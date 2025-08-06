import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditOnboardingQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const IMAGE_PATH = import.meta.env.VITE_IMAGE_BASE_URL;

  const [formData, setFormData] = useState({
    question_text: '',
    type: 'radio',
    options: [{ name: '', icon: null }]
  });

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get(`${BASE_URL}/onboarding/questions-edit/${id}`)
      .then(res => {
        const data = res.data.data;

        const normalizedOptions = (data.options || []).map(opt => ({
          name: opt.name || '',
          icon: null,
          existingIcon: opt.icon || null,
        }));

        setFormData({
          question_text: data.question_text,
          type: data.type,
          options: normalizedOptions.length ? normalizedOptions : [{ name: '', icon: null }],
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

  const handleOptionChange = (index, key, value) => {
    const updatedOptions = [...formData.options];
    updatedOptions[index][key] = value;
    setFormData({ ...formData, options: updatedOptions });
  };

  const addOption = () => {
    setFormData({ ...formData, options: [...formData.options, { name: '', icon: null }] });
  };

  const removeOption = (index) => {
    const updatedOptions = formData.options.filter((_, i) => i !== index);
    setFormData({ ...formData, options: updatedOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('question_text', formData.question_text);
    form.append('type', formData.type);

    formData.options.forEach((opt, index) => {
      form.append(`options[${index}][name]`, opt.name);
      if (opt.icon instanceof File) {
        form.append(`options[${index}][icon]`, opt.icon);
      } else if (opt.existingIcon) {
        form.append(`options[${index}][existing_icon]`, opt.existingIcon);
      }
    });

    try {
      await axios.post(`${BASE_URL}/onboarding/questions-update/${id}`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success("Question updated successfully!");
      navigate(-1);
    } catch (error) {
      console.error(error);
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors || {});
      } else {
        toast.error("Failed to update question.");
      }
    }
  };

  return (
    <div className="container py-4">
      <div className="card shadow-lg border-0 rounded-2 p-4">
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
                  value={formData.question_text || ''}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
                {errors.question_text && <div className="text-danger">{errors.question_text[0]}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Question Type</label>
                <select
                  name="type"
                  className="form-select"
                  value={formData.type || 'radio'}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                >
                  <option value="radio">Radio</option>
                  <option value="checkbox">Checkbox</option>
                  <option value="select">Select</option>
                </select>
                {errors.type && <div className="text-danger">{errors.type[0]}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Options</label>
                {formData.options.map((opt, idx) => (
                  <div className="mb-3" key={idx}>
                    <div className="d-flex gap-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Option name"
                        value={opt.name}
                        onChange={(e) => handleOptionChange(idx, 'name', e.target.value)}
                        required
                        disabled={loading}
                      />
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => handleOptionChange(idx, 'icon', e.target.files[0])}
                        disabled={loading}
                      />
                      {formData.options.length > 1 && (
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => removeOption(idx)}
                          disabled={loading}
                        >
                          &times;
                        </button>
                      )}
                    </div>

                    {opt.icon && typeof opt.icon === 'object' && (
                      <img
                        src={URL.createObjectURL(opt.icon)}
                        alt="preview"
                        style={{ width: '80px', height: 'auto', marginTop: '6px' }}
                      />
                    )}
                    {opt.existingIcon && !opt.icon && (
                      <img
                        src={`${IMAGE_PATH}/icons/${opt.existingIcon}`}
                        alt="current"
                        style={{ width: '80px', height: 'auto', marginTop: '6px' }}
                      />
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary text-white bg-brand mt-2"
                  onClick={addOption}
                  disabled={loading}
                >
                  + Add Option
                </button>
                {errors.options && <div className="text-danger">{errors.options[0]}</div>}
              </div>

              <button
                type="submit"
                className="btn btn-success mt-3"
                disabled={loading}
              >
                {loading ? 'Please wait...' : 'Update Question'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditOnboardingQuestion;
