import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const Dashboard = () => {
  // 1. State for storing all customer data
  const [customers, setCustomers] = useState([]);

  // 2. State for current page in pagination
  const [currentPage, setCurrentPage] = useState(1);

  // 3. Number of customers shown per page
  const customersPerPage = 5;

  // 4. Fetch customer data from API when component loads
  useEffect(() => {
    fetchCustomers();
  }, []);

  // 5. Function to call API and save data in state
  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://site2demo.in/ai-beauty/api/admin/user-list');
      const customerData = response.data.data || []; // Make sure data exists
      setCustomers(customerData);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  // 6. Logic for paginating customer list
  const indexOfLast = currentPage * customersPerPage;
  const indexOfFirst = indexOfLast - customersPerPage;
  const currentCustomers = customers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(customers.length / customersPerPage);

  // 7. Action button handlers
  const handleView = (id) => alert(`View customer with ID: ${id}`);
  const handleEdit = (id) => alert(`Edit customer with ID: ${id}`);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      alert(`Customer ${id} deleted`);
    }
  };

  // 8. Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container py-4">
      {/* Page Heading */}
      <h2 className="fw-bold mb-2">Product List</h2>
      <p className="text-muted mb-4">Overview of all Product</p>

      {/* Table Card */}
      <div className="card shadow-sm">
        <div className="card-header bg-brand text-white">
          <h5 className="mb-0">Product List</h5>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Brand</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentCustomers.length > 0 ? (
                  currentCustomers.map((customer, index) => (
                    <tr key={customer.id}>
                      <td>{indexOfFirst + index + 1}</td>
                      <td>{customer.user_name}</td>
                      <td>{customer.email}</td>
                      <td>{customer.phone_number || 'N/A'}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleView(customer.id)}>
                          <FaEye />
                        </button>
                        <button className="btn btn-sm btn-outline-success me-2" onClick={() => handleEdit(customer.id)}>
                          <FaEdit />
                        </button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(customer.id)}>
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-3">No customers found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Section */}
          <div className="p-3 border-top d-flex justify-content-between align-items-center">
            <span>
              Showing {indexOfFirst + 1} to {Math.min(indexOfLast, customers.length)} of {customers.length} entries
            </span>
            <ul className="pagination mb-0">
              {[...Array(totalPages)].map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                >
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
  );
};

export default Dashboard;
