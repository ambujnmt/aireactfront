import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const Dashboard = () => {
  const dummyUploads = [
    {
      id: 1,
      title: 'Smokey Eye Glam Look',
      image: 'https://site2demo.in/ai-beauty/public/admin_assets/images/makeup/Smokey Eye Glam Look.png',
      description: 'A high-contrast makeup image showing bold smokey eyes, matte foundation, and nude lips — commonly used for evening or party looks.',
    },
    {
      id: 2,
      title: 'Korean Dewy Natural Look',
      image: 'https://site2demo.in/ai-beauty/public/admin_assets/images/makeup/Korean Dewy Natural Look.png',
      description: 'Glassy skin, minimal eye makeup, gradient lips, and natural blush — great for daytime or casual looks.',
    },
    {
      id: 3,
      title: 'Bridal Makeup – Traditional Indian',
      image: 'https://site2demo.in/ai-beauty/public/admin_assets/images/makeup/Bridal Makeup – Traditional Indian.png',
      description: 'Dramatic eyeliner, bold red lipstick, and heavy contouring — uploaded by a user preparing for a wedding event.',
    },
    {
      id: 4,
      title: 'Zendaya Red Carpet Look – Met Gala',
      image: 'https://site2demo.in/ai-beauty/public/admin_assets/images/makeup/Zendaya Red Carpet Look – Met Gala.png',
      description: 'Vibrant eye shadow, defined cheekbones, and glossy lips — for a high-fashion transformation.',
    },
    {
      id: 5,
      title: 'Pinterest Nude Tones with Brown Liner',
      image: 'https://site2demo.in/ai-beauty/public/admin_assets/images/makeup/Pinterest Screenshot – Nude Tones with Brown Liner.png',
      description: 'Soft nude tones, bronze shimmer, and brown eyeliner — reflects current minimalist trends.',
    },
    {
      id: 6,
      title: 'Arabic Bridal Makeup',
      image: 'https://site2demo.in/ai-beauty/public/admin_assets/images/makeup/Arabic Bridal Makeup.png',
      description: 'Cut-crease eye shadow, winged liner, and full lashes — popular among users from the Middle East.',
    },
  ];

  const [uploads, setUploads] = useState(dummyUploads);
  const [currentPage, setCurrentPage] = useState(1);
  const uploadsPerPage = 8;

  const indexOfLast = currentPage * uploadsPerPage;
  const indexOfFirst = indexOfLast - uploadsPerPage;
  const currentUploads = uploads.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(uploads.length / uploadsPerPage);

  const handleView = (id) => alert(`View makeup ID: ${id}`);
  const handleEdit = (id) => alert(`Edit makeup ID: ${id}`);
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this makeup upload?')) {
      setUploads(uploads.filter((upload) => upload.id !== id));
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container py-4">
      <div className="card shadow-lg border-0 rounded-2 p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="fw-bold mb-1">Custom Target Makeup Uploads</h2>
            <p className="text-muted">Overview of all uploaded makeup references</p>
          </div>
          <Link to="/dashboard/create" className="btn bg-brand text-white">
            + Create One
          </Link>
        </div>

        <div className="card shadow-sm">
          <div className="card-header bg-brand text-white">
            <h5 className="mb-0">Makeup Upload List</h5>
          </div>

          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUploads.length > 0 ? (
                    currentUploads.map((upload, index) => (
                      <tr key={upload.id}>
                        <td>{indexOfFirst + index + 1}</td>
                        <td>
                          <img src={upload.image} alt={upload.title} width="60" className="rounded" />
                        </td>
                        <td>{upload.title}</td>
                        <td>{upload.description}</td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleView(upload.id)}>
                            <FaEye />
                          </button>
                          <button className="btn btn-sm btn-outline-success me-2" onClick={() => handleEdit(upload.id)}>
                            <FaEdit />
                          </button>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(upload.id)}>
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-3">
                        No uploads found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-3 border-top d-flex justify-content-between align-items-center">
              <span>
                Showing {indexOfFirst + 1} to {Math.min(indexOfLast, uploads.length)} of {uploads.length} entries
              </span>
              <ul className="pagination mb-0">
                {[...Array(totalPages)].map((_, index) => (
                  <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => paginate(index + 1)}>
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
