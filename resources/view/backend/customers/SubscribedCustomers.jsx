import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import Pagination from '@mui/material/Pagination';
import { getSubscribedCustomers } from '../../../../src/utils/fetchAdminApi';
import { confirmDelete } from '../../../../src/utils/confirmDelete';
import Swal from 'sweetalert2';

const SubscribedCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const customersPerPage = 10;

  const navigate = useNavigate();

  // Fetch subscribed customers
  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await getSubscribedCustomers();
      if (res.data?.status) {
        setCustomers(res.data.data || []);
      } else {
        setCustomers([]);
      }
    } catch (error) {
      console.error('Error fetching subscribed customers:', error);
      Swal.fire('Error', 'Failed to load customers', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleView = (id) => navigate(`/admin/dashboard/customer/view/${id}`);
  const handleEdit = (id) => navigate(`/admin/dashboard/customer/edit/${id}`);
  const handleDelete = (id) => confirmDelete(`/api/admin/delete/user/${id}`, fetchCustomers);

  // Filter and paginate
  const filteredCustomers = customers.filter(
    (c) =>
      c.device_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.subscription_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.payment_type?.toLowerCase().includes(searchTerm.toLowerCase())
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
            <p className="text-muted mb-0">List of active subscription users</p>
          </div>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>← Back</button>
        </div>

        <div className="card shadow-sm">
          <div className="card-header bg-brand text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Subscribed Customers</h5>
            <input
              type="text"
              className="form-control w-50"
              placeholder="Search by device, plan or payment type..."
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
                      <th>Subscription</th>
                      <th>Plan Type</th>
                      <th>Price</th>
                      <th>Features</th>
                      <th>Payment</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCustomers.length > 0 ? (
                      currentCustomers.map((customer, index) => (
                        <tr key={customer.id}>
                          <td>{indexOfFirst + index + 1}</td>
                          <td>{customer.device_id}</td>
                          <td>{customer.subscription_name}</td>
                          <td>{customer.plan_type}</td>
                          <td>${customer.price}</td>
                          <td>{customer.features}</td>
                          <td>
                            {customer.payment_type} ({customer.payment_mode}) -{' '}
                            <span className={customer.payment_status === 'success' ? 'text-success' : 'text-danger'}>
                              {customer.payment_status}
                            </span>
                          </td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleView(customer.id)}><FaEye /></button>
                            <button className="btn btn-sm btn-outline-success me-2" onClick={() => handleEdit(customer.id)}><FaEdit /></button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(customer.id)}><FaTrash /></button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center py-3">
                          No subscribed customers found.
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

export default SubscribedCustomers;
