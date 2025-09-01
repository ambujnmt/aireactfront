import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { getMakeupTransferReferences } from "../../../../src/utils/fetchAdminApi";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const MakeupTransferRefrences = () => {
  const { request_id } = useParams();
  console.log(request_id);
  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const rowsPerPage = 10;

  // Fetch API
  const fetchTransfersReferences = async () => {
  try {
    setLoading(true);
    const res = await getMakeupTransferReferences(request_id);
    console.log("RAW RESPONSE:", res.data);

    if (res.data?.status) {
      const item = res.data.data; // 👈 this is an object, not array

      // ✅ Flatten payload into rows
      const allRows = item.payload.map((step) => ({
        id: item.id,
        device_id: item.device_id,
        step: step.step,
        title: step.step_title,
        description: step.step_description,
        image: step.step_product?.image_url || "/placeholder.png",
        product: step.step_product?.product_name || "-",
        product_url: step.step_product?.product_url || "#",
        referenceUrl: item.reference_url,
        selfieUrl: item.selfie_url,
      }));

      setRows(allRows);
    }
  } catch (error) {
    console.error("Error fetching transfers:", error);
    toast.error("Failed to fetch makeup transfer references");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    if (request_id) {
      fetchTransfersReferences();
    }
  }, [request_id]);

  // Close modal with ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Pagination
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentRows = rows.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container py-4">
      <div className="card shadow-lg border-0 rounded-2 p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="fw-bold mb-1">Makeup Transfer References</h2>
            <p className="text-muted">
              For Request ID: <b>{request_id}</b>
            </p>
          </div>
        </div>

        <div className="card shadow-sm">
          <div className="card-header bg-brand text-white">
            <h5 className="mb-0">Transfer Steps</h5>
          </div>

          <div className="card-body p-0">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
              </div>
            ) : (
              <>
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Device ID</th>
                        <th>Step</th>
                        <th>Selfie</th>
                        <th>Reference</th>
                        <th>Image</th>
                        <th>Product</th>
                        <th>Description</th>
                        <th>Link</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentRows.length > 0 ? (
                        currentRows.map((row, index) => (
                          <tr key={`${row.id}-${row.step}-${index}`}>
                            <td>{indexOfFirst + index + 1}</td>
                            <td>{row.device_id}</td>
                            <td>{row.step}</td>
                            <td>
                              {row.selfieUrl && (
                                <img
                                  src={row.selfieUrl}
                                  alt="Selfie"
                                  width="60"
                                  className="rounded"
                                  style={{ cursor: "zoom-in" }}
                                  onClick={() => setSelectedImage(row.selfieUrl)}
                                />
                              )}
                            </td>
                            <td>
                              {row.referenceUrl && (
                                <img
                                  src={row.referenceUrl}
                                  alt="Reference"
                                  width="60"
                                  className="rounded cursor-pointer"
                                  style={{ cursor: "zoom-in" }}
                                  onClick={() =>
                                    setSelectedImage(row.referenceUrl)
                                  }
                                />
                              )}
                            </td>
                            <td>
                              <img
                                src={row.image}
                                alt={row.product}
                                width="60"
                                className="rounded"
                                style={{ cursor: "zoom-in" }}
                                onClick={() => setSelectedImage(row.image)}
                              />
                            </td>
                            <td>{row.product}</td>
                            <td>{row.description}</td>
                            <td>
                              <a
                                href={row.product_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-sm btn-outline-primary"
                              >
                                <FaEye />
                              </a>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="9" className="text-center py-3">
                            No steps found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="p-3 border-top d-flex justify-content-between align-items-center">
                  <span>
                    Showing {rows.length > 0 ? indexOfFirst + 1 : 0} to{" "}
                    {Math.min(indexOfLast, rows.length)} of {rows.length} entries
                  </span>
                  <ul className="pagination mb-0">
                    {[...Array(totalPages)].map((_, index) => (
                      <li
                        key={index}
                        className={`page-item ${
                          currentPage === index + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => paginate(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal for Image Preview */}
      {selectedImage && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.7)" }}
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content bg-transparent border-0">
              <div className="modal-body text-center">
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="img-fluid rounded shadow-lg"
                  style={{ maxHeight: "80vh", cursor: "zoom-in" }}
                />
              </div>
              <div className="modal-footer border-0 justify-content-center">
                <button
                  className="btn btn-light"
                  onClick={() => setSelectedImage(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MakeupTransferRefrences;
