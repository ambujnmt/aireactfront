import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    company_name: '',
    company_email: '',
    phone: '',
    shop_address: '',
    country: '',
    company_copy_right: '',
    footer_content: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('https://site2demo.in/ai-beauty/api/settings/update', settings);

      if (res.data?.status) {
        Swal.fire('Success', 'Settings updated successfully', 'success');
      } else {
        Swal.fire('Error', res.data.message || 'Failed to update settings', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Something went wrong!', 'error');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-body">
          <h4 className="mb-4 text-center">Configuration Settings</h4>

          <form onSubmit={handleSubmit} className="px-md-5">
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

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={settings.phone}
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

            <div className="mb-3">
              <label className="form-label fw-semibold">Shop Address</label>
              <textarea
                className="form-control"
                name="shop_address"
                rows="2"
                value={settings.shop_address}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Footer Content</label>
              <textarea
                className="form-control"
                name="footer_content"
                rows="2"
                value={settings.footer_content}
                onChange={handleChange}
              ></textarea>
            </div>

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

            <div className="text-end">
              <button
                type="submit"
                className="btn btn-primary px-4"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Saving...
                  </>
                ) : (
                  'Save Settings'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
