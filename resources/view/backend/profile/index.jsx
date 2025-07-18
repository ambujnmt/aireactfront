import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AdminProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    image: '',
    role: '',
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setProfile({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        image: user.avatar || '',
        role: user.role || 'Administrator',
      });
    }
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setProfile({
        ...profile,
        image: URL.createObjectURL(file), // for preview
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', profile.name);
      formData.append('email', profile.email);
      formData.append('phone', profile.phone);
      if (imageFile) {
        formData.append('avatar', imageFile);
      }

      const res = await axios.post(
        'http://localhost:8000/api/admin/update-profile',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (res.data?.status) {
        Swal.fire('Success', 'Profile updated successfully', 'success');
        const updatedUser = {
          ...profile,
          avatar: res.data.avatar || profile.image,
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } else {
        Swal.fire('Error', 'Failed to update profile', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Something went wrong!', 'error');
      console.error(error);
    }
  };

  return (
    <div className="container py-4">
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-body">
          <div className="text-center mb-4">
            <img
              src={profile.image || 'https://i.pravatar.cc/120?img=12'}
              alt="Admin Avatar"
              className="rounded-circle shadow"
              width="120"
              height="120"
            />
            <h4 className="mt-3 mb-0">{profile.name}</h4>
            <p className="text-muted">{profile.role}</p>
          </div>

          <form onSubmit={handleSubmit} className="px-md-5" encType="multipart/form-data">
            <div className="row">
              <div className="col-md-12 mb-3">
                <label className="form-label fw-semibold">Profile Image</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  name="avatar"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={profile.email}
                  disabled
                />
                <div className="form-text">Email cannot be changed</div>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Role</label>
                <input
                  type="text"
                  className="form-control"
                  value={profile.role}
                  disabled
                />
              </div>
            </div>

            <div className="text-end">
              <button type="submit" className="btn btn-primary px-4">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
