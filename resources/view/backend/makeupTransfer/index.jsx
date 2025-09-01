import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { getMakeupTransferList } from "../../../../src/utils/fetchAdminApi";
import { toast } from "react-toastify";

const MakeupTransferList = () => {
  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  // Fetch API
  const fetchTransfers = async () => {
    try {
      const res = await getMakeupTransferList();
      console.log("RAW RESPONSE:", res);

      if (res.data?.status) {
        const apiData = res.data.data;

        // ✅ Flatten payload into rows for table
        const allRows = apiData.flatMap((item) =>
          item.payload.map((step) => ({
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
          }))
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
                    <th>Device ID</th>
                    <th>Step</th>
                    <th>Selfie Image</th>
                    <th>Refrence</th>
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
                          {row.referenceUrl && (
                            <img
                              src={row.referenceUrl}
                              alt="Reference"
                               width="60"
                              className="rounded"
                            />
                          )}
                        </td>
                        <td>
                          {row.selfieUrl && (
                            <img
                              src={row.selfieUrl}
                              alt="Selfie"
                               width="60"
                              className="rounded"
                            />
                          )}
                        </td>
                        <td>
                          <img
                            src={row.image}
                            alt={row.product}
                            width="60"
                            className="rounded"
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
                      <td colSpan="7" className="text-center py-3">
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
    </div>
  );
};

export default MakeupTransferList;
