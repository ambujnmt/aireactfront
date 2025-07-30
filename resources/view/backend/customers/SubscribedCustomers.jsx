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
	    const dummyData = [
	      {
	        id: 1,
	        user_name: 'Amit',
	        email: 'amit@gmail.com',
	        plan: 'Basic',
	        start_date: '2025-06-01',
	        expiry_date: '2025-02-01',
	        status: 'active',
	        phone_number: '1234567890',
	      },
	      {
	        id: 2,
	        user_name: 'Akku',
	        email: 'akku@gmail.com',
	        plan: 'Pro',
	        start_date: '2025-05-15',
	        expiry_date: '2025-02-01',
	        status: 'inActive',
	        phone_number: '2345678901',
	      },
	      {
	        id: 3,
	        user_name: 'Pankaj',
	        email: 'pankaj@gmail.com',
	        plan: 'Premium',
	        start_date: '2025-07-01',
	        expiry_date: '2025-02-01',
	        status: 'banned',
	        phone_number: '3456789012',
	      },
	      {
	        id: 4,
	        user_name: 'Akash',
	        email: 'akash@gmail.com',
	        plan: 'Enterprise',
	        start_date: '2025-04-20',
	        expiry_date: '2025-02-01',
	        status: 'rejected',
	        phone_number: '4567890123',
	      },
	      {
	        id: 5,
	        user_name: 'Ritesh',
	        email: 'ritesh@gmail.com',
	        plan: 'Basic',
	        start_date: '2025-03-12',
	        expiry_date: '2025-02-01',
	        status: 'active',
	        phone_number: '5678901234',
	      },
	      {
	        id: 6,
	        user_name: 'Fiona Gallagher',
	        email: 'fiona@example.com',
	        plan: 'Pro',
	        start_date: '2025-02-01',
	        expiry_date: '2025-02-01',
	        status: 'active',
	        phone_number: '6789012345',
	      },
	    ];

	    setCustomers(dummyData);
	  } catch (error) {
	    console.error('Error loading dummy customers:', error);
	  } finally {
	    setLoading(false);
	  }
	};


  const handleView = (id) => navigate(`/admin/dashboard/customer/view/${id}`);
  const handleEdit = (id) => navigate(`/admin/dashboard/customer/edit/${id}`);
  const handleDelete = (id) => confirmDelete(`${BASE_URL}/delete/user/${id}`, fetchCustomers);

  const filteredCustomers = customers.filter((customer) =>
    customer.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone_number?.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h2 className="fw-bold mb-1">Subscribed Customers</h2>
            <p className="text-muted mb-0">List of users with active subscriptions</p>
          </div>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>← Back</button>
        </div>

        <div className="card shadow-sm">
          <div className="card-header bg-brand text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Subscribed Customers</h5>
            <input
              type="text"
              className="form-control w-50 filterData"
              placeholder="Search by name, email or phone..."
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
                      <th>Name</th>
                      <th>Email</th>
                      <th>Plan</th>
                      <th>Start Date</th>
                      <th>Expiry Date</th>
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
                          <td>{customer.plan || 'N/A'}</td>
                          <td>
                            <span className="badge text-success bg-success-subtle fw-semibold">{customer.start_date}</span>
                          </td>
                          <td>
                            <span className="badge text-success bg-success-subtle fw-semibold">{customer.expiry_date}</span>
                          </td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleView(customer.id)}>View</button>
                            <button className="btn btn-sm btn-outline-success me-2" onClick={() => handleEdit(customer.id)}>Edit</button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(customer.id)}>Delete</button>
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
