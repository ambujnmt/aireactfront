import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { getMakeupList } from "../../../../src/utils/fetchAdminApi";
import { toast } from "react-toastify";
import { confirmDelete } from "../../../../src/utils/confirmDelete"; 

const Dashboard = () => {
  const [uploads, setUploads] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const uploadsPerPage = 8;
  const navigate = useNavigate();

  // ✅ Fetch data from API
  const fetchUploads = async () => {
    try {
      const res = await getMakeupList();
      setUploads(res.data.data || []); // assuming response is { data: [...] }
    } catch (error) {
      toast.error("Failed to fetch makeup list");
    }
  };

  useEffect(() => {
    fetchUploads();
  }, []);

  const indexOfLast = currentPage * uploadsPerPage;
  const indexOfFirst = indexOfLast - uploadsPerPage;
  const currentUploads = uploads.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(uploads.length / uploadsPerPage);

  const handleView = (id) => alert(`View makeup ID: ${id}`);
  const handleEdit = (id) => navigate(`/dashboard/custom-target-makeup-upload-edit/${id}`);

  const handleDelete = async (id) => {
    await confirmDelete(`/delete/makeupUpload/${id}`, fetchUploads);
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
          <Link to="/dashboard/custom-target-makeup-upload-create" className="btn bg-brand text-white">
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
                          <img
                            src={upload.image || "/placeholder.png"} // ✅ show full image path
                            alt={upload.title}
                            width="60"
                            className="rounded"
                          />
                        </td>
                        <td>{upload.title}</td>
                        <td>{upload.description}</td>
                        <td>
                          {/* <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => handleView(upload.id)}
                          >
                            <FaEye />
                          </button> */}
                          <button
                            className="btn btn-sm btn-outline-success me-2"
                            onClick={() => handleEdit(upload.id)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger me-2"
                            onClick={() => handleDelete(upload.id)}
                          >
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

            {/* Pagination */}
            <div className="p-3 border-top d-flex justify-content-between align-items-center">
              <span>
                Showing {uploads.length > 0 ? indexOfFirst + 1 : 0} to{" "}
                {Math.min(indexOfLast, uploads.length)} of {uploads.length} entries
              </span>
              <ul className="pagination mb-0">
                {[...Array(totalPages)].map((_, index) => (
                  <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
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
