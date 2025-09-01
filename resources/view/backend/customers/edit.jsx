import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCustomerDetail, updateCustomer } from "../../../../src/utils/fetchAdminApi";

const CustomerEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    device_id: "",
    status: "",
    onboarding_options: {},
  });

  // Fetch customer detail
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await getCustomerDetail(id);
        if (res.data?.status) {
          const customer = res.data.data;
          setFormData({
            device_id: customer.device_id || "",
            status: customer.status || "",
            onboarding_options: customer.onboarding_options || {},
          });
        }
      } catch (err) {
        console.error("Error fetching customer:", err);
        toast.error("Failed to load customer");
      } finally {
        setLoading(false);
      }
    };
    fetchCustomer();
  }, [id]);

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle onboarding options change
  const handleOptionChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      onboarding_options: {
        ...prev.onboarding_options,
        [key]: value,
      },
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCustomer(id, formData);
      toast.success("Customer updated successfully");
      navigate(-1);
    } catch (err) {
      console.error("Error updating customer:", err.response?.data || err);
      toast.error(err.response?.data?.message || "Failed to update customer");
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="card shadow-lg border-0 rounded-2 p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="fw-bold mb-1">Edit Customer</h2>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="text-center mb-3">
            <div className="spinner-border text-primary" role="status" />
            <p className="mt-2">Loading customer data...</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            {/* Device ID */}
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Device ID</label>
              <input
                type="text"
                name="device_id"
                readOnly
                value={formData.device_id || ""}
                className="form-control"
              />
            </div>

            {/* Status */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Status</label>
              <select
                name="status"
                className="form-control"
                value={formData.status || ""}
                onChange={handleChange}
              >
                <option value="">-- Select Status --</option>
                <option value="active">Active</option>
                <option value="inActive">Inactive</option>
                <option value="banned">Banned</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Onboarding Options */}
            <div className="col-md-12 mb-3">
              <label className="form-label fw-semibold">Onboarding Options</label>
              {!loading ? (
                Object.entries(formData.onboarding_options || {}).map(
                  ([key, value], index) => (
                    <div key={index} className="d-flex mb-2">
                      <input type="text" className="form-control me-2" value={key} readOnly />
                      <input
                        type="text"
                        className="form-control"
                        value={value || ""}
                        onChange={(e) => handleOptionChange(key, e.target.value)}
                      />
                    </div>
                  )
                )
              ) : (
                <p className="text-muted">Fetching options...</p>
              )}
              {!loading &&
                Object.keys(formData.onboarding_options || {}).length === 0 && (
                  <p className="text-muted">No onboarding options found.</p>
                )}
            </div>
          </div>

          {/* Save Button */}
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Please wait..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerEdit;
