import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getMakeupById, updateMakeup } from "../../../../src/utils/fetchAdminApi";

const EditMakeup = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState(null); // show old/new image
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  // ✅ Fetch existing record
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMakeupById(id);
        const data = res.data?.data || {};
        setFormData({
          title: data.title || "",
          description: data.description || "",
          image: null,
        });
        setPreview(data.image_url || null); // backend should return full image URL
      } catch (err) {
        toast.error("Failed to load makeup details");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Handle text
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input + preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    if (formData.image) {
      form.append("image", formData.image);
    }

    try {
      await updateMakeup(id, form);
      toast.success("Makeup updated successfully!");
      navigate(-1);
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors || {});
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  // if (loading) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="container py-4">
      <div className="card shadow-lg border-0 rounded-2 p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="fw-bold mb-1">Edit Makeup</h2>
            <p className="text-muted">Edit makeup item</p>
          </div>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Title */}
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={formData.title}
                  onChange={handleInputChange}
                />
                {errors.title && <div className="text-danger">{errors.title[0]}</div>}
              </div>

              {/* Description */}
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="3"
                  value={formData.description}
                  onChange={handleInputChange}
                />
                {errors.description && (
                  <div className="text-danger">{errors.description[0]}</div>
                )}
              </div>

              {/* Image */}
              <div className="mb-3">
                <label className="form-label">Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="form-control"
                  onChange={handleFileChange}
                />
                {preview && (
                  <div className="mt-2">
                    <img
                      src={preview}
                      alt="preview"
                      style={{ width: "150px", height: "auto", borderRadius: "8px" }}
                    />
                  </div>
                )}
                {errors.image && <div className="text-danger">{errors.image[0]}</div>}
              </div>

              {/* Submit */}
              <button type="submit" className="btn btn-success mt-3">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMakeup;
