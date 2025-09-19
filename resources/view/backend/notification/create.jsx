import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { sendNotification } from "../../../../src/utils/fetchAdminApi"; // <-- API function

const CreateNotification = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendNotification(formData);
      toast.success("Notification sent successfully!");
      navigate(1);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors || {});
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="container py-4">
      <div className="card shadow-lg border-0 rounded-2 p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="fw-bold mb-1">Send Notification</h2>
            <p className="text-muted">Broadcast a promotional notification</p>
          </div>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Subject */}
              <div className="mb-3">
                <label className="form-label">Subject</label>
                <input
                  type="text"
                  name="subject"
                  className="form-control"
                  value={formData.subject}
                  onChange={handleInputChange}
                />
                {errors.subject && (
                  <div className="text-danger">{errors.subject[0]}</div>
                )}
              </div>

              {/* Message */}
              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea
                  name="message"
                  className="form-control"
                  rows="4"
                  value={formData.message}
                  onChange={handleInputChange}
                />
                {errors.message && (
                  <div className="text-danger">{errors.message[0]}</div>
                )}
              </div>

              {/* Submit */}
              <button type="submit" className="btn btn-success mt-3">
                Send Notification
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNotification;
