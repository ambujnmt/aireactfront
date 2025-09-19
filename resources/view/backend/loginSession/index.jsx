import React, { useEffect, useState } from "react";
import { fetchSessionList } from "../../../../src/utils/fetchAdminApi";
import Pagination from "@mui/material/Pagination";

const SessionList = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const sessionsPerPage = 10;

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    setLoading(true);
    try {
      const res = await fetchSessionList();
      console.log("API Response:", res);

      if (res && Array.isArray(res.data)) {
        setSessions(res.data);
      } else if (res?.data?.data && Array.isArray(res.data.data)) {
        setSessions(res.data.data);
      } else {
        setSessions([]);
      }
    } catch (error) {
      console.error("Error loading sessions:", error);
      setSessions([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter sessions by device_id
  const filteredSessions = sessions.filter((session) =>
    session.device_id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * sessionsPerPage;
  const indexOfFirst = indexOfLast - sessionsPerPage;
  const currentSessions = filteredSessions.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredSessions.length / sessionsPerPage);

  // Format datetime
  const formatDateTime = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  // Calculate total session from login & logout
  const getSessionDuration = (login, logout) => {
    if (!login || !logout) return "0h 0m 0s";

    const loginTime = new Date(login);
    const logoutTime = new Date(logout);
    let diffSeconds = Math.floor((logoutTime - loginTime) / 1000);

    if (diffSeconds < 0) diffSeconds = 0;

    const hours = Math.floor(diffSeconds / 3600);
    const minutes = Math.floor((diffSeconds % 3600) / 60);
    const seconds = diffSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="container-fluid py-4">
      <div className="card shadow-lg border-0 rounded-2 p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="fw-bold mb-1">Session List</h2>
            <p className="text-muted mb-0">Overview of all device sessions</p>
          </div>
        </div>

        <div className="card shadow-sm">
          <div className="card-header bg-brand text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Device Sessions</h5>
            <input
              type="text"
              className="form-control w-50 filterData"
              placeholder="Search By Device ID..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
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
                      <th>Device ID</th>
                      <th>Login Time</th>
                      <th>Logout Time</th>
                      <th>Total Session</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentSessions.length > 0 ? (
                      currentSessions.map((session, index) => (
                        <tr key={session.id || index}>
                          <td>{indexOfFirst + index + 1}</td>
                          <td>{session.device_id}</td>
                          <td>{formatDateTime(session.login_time)}</td>
                          <td>{formatDateTime(session.logout_time)}</td>
                          <td title={`Original duration in minutes: ${
                            session.total_session_time || 0
                          }`}>
                            {getSessionDuration(session.login_time, session.logout_time)}
                          </td>
                          <td>
                            {session.logout_time === null ? (
                              <span className="badge bg-success">Active</span>
                            ) : (
                              <span className="badge bg-secondary">Inactive</span>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center py-3">
                          No sessions found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="p-3 border-top d-flex justify-content-between align-items-center">
                <span>
                  Showing {filteredSessions.length > 0 ? indexOfFirst + 1 : 0} to{" "}
                  {Math.min(indexOfLast, filteredSessions.length)} of {filteredSessions.length} entries
                </span>
                {totalPages > 1 && (
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(e, value) => setCurrentPage(value)}
                    color="primary"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionList;
