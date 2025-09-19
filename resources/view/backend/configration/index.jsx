import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill-new";   // ✅ for React 18/19
import "react-quill-new/dist/quill.snow.css"; // ✅ Quill CSS

const AdminSettings = () => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [settings, setSettings] = useState({
    company_name: "",
    company_email: "",
    company_phone: "",
    company_address: "",
    country: "",
    company_copy_right: "",
    terms_and_conditions: "",
    privacy_policy: "", // ✅ new field
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // ✅ Fetch settings on mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/get-settings`);
        if (res.data?.status) {
          const data = res.data.data;
          setSettings({
            company_name: data.company_name || "",
            company_email: data.company_email || "",
            company_phone: data.company_phone || "",
            company_address: data.company_address || "",
            country: data.country || "",
            company_copy_right: data.company_copy_right || "",
            terms_and_conditions: data.terms_and_conditions || "",
            privacy_policy: data.privacy_policy || "", // ✅ new field
          });
        } else {
          Swal.fire("Error", res.data.message || "Failed to fetch settings", "error");
        }
      } catch (error) {
        Swal.fire("Error", "Something went wrong while fetching settings!", "error");
        console.error(error);
      } finally {
        setFetching(false);
      }
    };
    fetchSettings();
  }, [BASE_URL]);

  // ✅ Handle text input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Handle ReactQuill change
  const handleQuillChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ✅ Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Simple validation
    if (!settings.company_name.trim()) {
      Swal.fire("Validation Error", "Company name is required", "warning");
      return;
    }
    if (!settings.company_email.trim()) {
      Swal.fire("Validation Error", "Company email is required", "warning");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/settings/update`, settings);
      if (res.data?.status) {
        Swal.fire("Success", "Settings updated successfully", "success");
      } else {
        Swal.fire("Error", res.data.message || "Failed to update settings", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong while saving!", "error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="card shadow-lg border-0 rounded-2 p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="fw-bold mb-1">Configuration</h2>
            <p className="text-muted mb-0">Update the customer details</p>
          </div>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Company Name / Email */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Company Name</label>
              <input
                type="text"
                className="form-control"
                name="company_name"
                value={settings.company_name}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Company Email</label>
              <input
                type="email"
                className="form-control"
                name="company_email"
                value={settings.company_email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Phone / Country */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Phone Number</label>
              <input
                type="text"
                className="form-control"
                name="company_phone"
                value={settings.company_phone}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Country</label>
              <input
                type="text"
                className="form-control"
                name="country"
                value={settings.country}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Address */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Shop Address</label>
            <textarea
              className="form-control"
              name="company_address"
              rows="2"
              value={settings.company_address}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Copy Right */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Copyright</label>
            <input
              type="text"
              className="form-control"
              name="company_copy_right"
              value={settings.company_copy_right}
              onChange={handleChange}
            />
          </div>

          {/* Terms And Conditions */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Terms And Conditions</label>
            <div className="border rounded bg-white" style={{ height: "300px" }}>
              <ReactQuill
                theme="snow"
                value={settings.terms_and_conditions}
                onChange={(val) => handleQuillChange("terms_and_conditions", val)}
                placeholder="Enter terms and conditions"
                style={{ height: "240px" }}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image", "video"],
                    ["clean"],
                  ],
                }}
              />
            </div>
          </div>

          {/* Privacy Policy */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Privacy Policy</label>
            <div className="border rounded bg-white" style={{ height: "300px" }}>
              <ReactQuill
                theme="snow"
                value={settings.privacy_policy}
                onChange={(val) => handleQuillChange("privacy_policy", val)}
                placeholder="Enter privacy policy"
                style={{ height: "240px" }}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image", "video"],
                    ["clean"],
                  ],
                }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-end">
            <button
              type="submit"
              className="btn btn-primary px-4"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Saving...
                </>
              ) : (
                "Update Settings"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;
