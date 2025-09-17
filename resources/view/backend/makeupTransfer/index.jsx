import React, { useEffect, useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { getMakeupTransferList } from "../../../../src/utils/fetchAdminApi";
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';

const MakeupTransferList = () => {
  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const rowsPerPage = 10;

  // Fetch API
  const fetchTransfers = async () => {
    try {
      const res = await getMakeupTransferList();
      console.log("RAW RESPONSE:", res);

      if (res.data?.status) {
        const apiData = res.data.data;

        // ✅ Flatten payload.results.data into rows
        const allRows = apiData.flatMap((item) =>
          (item.payload?.results || []).flatMap((result, resIndex) =>
            (result.data || []).map((img, imgIndex) => ({
              id: item.id,
              device_id: item.device_id,
              request_id: item.request_id,
              step: `Result ${resIndex + 1}`,
              title: img.dst_id || "N/A",
              description: result.custom_info || "-",
              image: item.make_transfer_image || "/placeholder.png",
            }))
          )
        );

        setRows(allRows);
      }
    } catch (error) {
      console.error("Error fetching transfers:", error);
      toast.error("Failed to fetch makeup transfer list");
    }
  };

  useEffect(() => {
    fetchTransfers();
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
            <h2 className="fw-bold mb-1">Makeup Transfer List</h2>
            <p className="text-muted">Overview of all makeup transfer steps</p>
          </div>
        </div>

        <div className="card shadow-sm">
          <div className="card-header bg-brand text-white">
            <h5 className="mb-0">Transfer Steps</h5>
          </div>

          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Device ID</th>
                    <th>Step</th>
                    <th>Request Id</th>
                    <th>Refrences</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows.length > 0 ? (
                    currentRows.map((row, index) => (
                      <tr key={`${row.id}-${index}`}>
                        <td>{indexOfFirst + index + 1}</td>
                        <td>
                          <img
                            src={row.image}
                            alt={row.product}
                            width="45"
                            className="rounded"
                            style={{ cursor: "zoom-in" }}
                            onClick={() => setSelectedImage(row.image)}
                          />
                        </td>
                        <td>{row.device_id}</td>
                        <td>{row.step}</td>
                        <td>{row.request_id}</td>
                        <td>
                          <Link
                            to={`/dashboard/makeup-transfer/references/${row.request_id}`}
                            className="btn btn-sm btn-outline-success me-2"
                          >
                            <FaEye />
                          </Link>
                          {/* <button className="btn btn-sm btn-outline-danger">
                              <FaTrash />
                            </button> */}
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
          </div>
        </div>
      </div>

      {/* 🔥 Modal for Image Preview */}
      {selectedImage && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.7)" }}
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
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

export default MakeupTransferList;
