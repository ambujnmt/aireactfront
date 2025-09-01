// Imports remain unchanged
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { confirmDelete } from '../../../../src/utils/confirmDelete';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import Pagination from '@mui/material/Pagination';

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const customersPerPage = 10;

  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/user-list`);
      const customerData = response?.data?.data || [];
      setCustomers(customerData);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (id) => navigate(`/dashboard/customer/view/${id}`);
  const handleEdit = (id) => navigate(`/dashboard/customer/edit/${id}`);
  const handleDelete = (id) => confirmDelete(`${BASE_URL}/delete/user/${id}`, fetchCustomers);

  const filteredCustomers = customers.filter((customer) =>
    customer.device_id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * customersPerPage;
  const indexOfFirst = indexOfLast - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  return (
    <div className="container-fluid py-4">
      <div className="card shadow-lg border-0 rounded-2 p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="fw-bold mb-1">Customer List</h2>
            <p className="text-muted mb-0">Overview of all registered customers</p>
          </div>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>← Back</button>
        </div>

        <div className="card shadow-sm">
          <div className="card-header bg-brand text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Registered Customers</h5>
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
                style={{ width: '60px', height: '60px' }}
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
                      <th>Onboarding Options</th>
                      <th>Account</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCustomers.length > 0 ? (
                      currentCustomers.map((customer, index) => (
                        <tr key={customer.id}>
                          <td>{indexOfFirst + index + 1}</td>
                          <td>{customer.device_id || 'N/A'}</td>
                          <td>
                            {customer.onboarding_options ? (
                              <ul className="mb-0 ps-0" style={{ listStyle: 'none' }}>
                                {Object.entries(
                                  typeof customer.onboarding_options === 'string'
                                    ? JSON.parse(customer.onboarding_options)
                                    : customer.onboarding_options
                                ).map(([key, value], i) => (
                                  <li key={i}>
                                    <strong>{key}:</strong> {value}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              '-'
                            )}

                          </td>
                          <td>
                            <span
                              className={`badge ${
                                customer.status === 'active'
                                  ? 'bg-success-subtle text-success'
                                  : customer.status === 'inActive'
                                  ? 'bg-secondary-subtle text-secondary'
                                  : customer.status === 'banned'
                                  ? 'bg-danger-subtle text-danger'
                                  : customer.status === 'rejected'
                                  ? 'bg-warning-subtle text-warning'
                                  : 'bg-secondary'
                              }`}
                            >
                              {String(customer.status).charAt(0).toUpperCase() + String(customer.status).slice(1)}
                            </span>
                          </td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleView(customer.id)}> <FaEye /></button>
                            <button className="btn btn-sm btn-outline-success me-2" onClick={() => handleEdit(customer.id)}> <FaEdit /></button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(customer.id)}> <FaTrash /></button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="10" className="text-center py-3">
                          No customers found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="p-3 border-top d-flex justify-content-between align-items-center">
                <span>
                  Showing {indexOfFirst + 1} to {Math.min(indexOfLast, filteredCustomers.length)} of {filteredCustomers.length} entries
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

export default Customer;
