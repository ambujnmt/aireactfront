import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 5;

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://site2demo.in/ai-beauty/api/admin/user-list');
      const customerData = response.data.data || [];
      setCustomers(customerData);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleView = (id) => {
    alert(`View customer with ID: ${id}`);
  };

  const handleEdit = (id) => {
    alert(`Edit customer with ID: ${id}`);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://site2demo.in/ai-beauty/api/admin/delete/user/${id}`);
          Swal.fire('Deleted!', 'Customer has been deleted.', 'success');
          fetchCustomers();
        } catch (error) {
          console.error(error);
          Swal.fire('Failed!', 'There was a problem deleting.', 'error');
        }
      }
    });
  };

  const indexOfLast = currentPage * customersPerPage;
  const indexOfFirst = indexOfLast - customersPerPage;
  const currentCustomers = customers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(customers.length / customersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-2">AI Feature</h2>
      <p className="text-muted mb-4">Overview of all AI Feature</p>

      <div className="card shadow-sm">
        <div className="card-header bg-brand text-white">
          <h5 className="mb-0">AI Feature</h5>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
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
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => handleView(customer.id)}
                        >
                          <FaEye />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-success me-2"
                          onClick={() => handleEdit(customer.id)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(customer.id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-3">
                      No customers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

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
