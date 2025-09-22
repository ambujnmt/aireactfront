import React, { useEffect, useState } from "react";
import { fetchProductReport } from "../../../../src/utils/fetchAdminApi";

const ProductReport = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    setLoading(true);
    try {
      const res = await fetchProductReport();
      if (res.data && res.data.status && Array.isArray(res.data.data)) {
        setReports(res.data.data);
      } else {
        setReports([]);
      }
    } catch (error) {
      console.error("Error loading product reports:", error);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  // Find highest and lowest total_users
  const maxUsers = reports.length ? Math.max(...reports.map(r => r.total_users)) : 0;
  const minUsers = reports.length ? Math.min(...reports.map(r => r.total_users)) : 0;

  return (
    <div className="container-fluid py-4">
      <div className="card shadow-lg border-0 rounded-2 p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="fw-bold mb-1">Product Usage Report</h2>
            <p className="text-muted mb-0">Unique device usage per product</p>
          </div>
        </div>

        <div className="card shadow-sm">
          <div className="card-header bg-brand text-white">
            <h5 className="mb-0">Reports</h5>
          </div>

          {loading ? (
            <div className="d-flex justify-content-center align-items-center p-5">
              <img
                src="https://i.gifer.com/ZZ5H.gif"
                alt="Loading..."
                style={{ width: "60px", height: "60px" }}
              />
            </div>
          ) : (
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Product Name</th>
                      <th>Total Unique Users</th>
                      <th>Indicator</th> {/* New column */}
                    </tr>
                  </thead>
                  <tbody>
                    {reports.length > 0 ? (
                      reports.map((report, index) => {
                        let indicator = "";
                        if (report.total_users === maxUsers) indicator = "🔺 High";
                        else if (report.total_users === minUsers) indicator = "🔻 Low";

                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{report.product_name}</td>
                            <td>{report.total_users}</td>
                            <td>{indicator}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center py-3">
                          No report data found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductReport;
