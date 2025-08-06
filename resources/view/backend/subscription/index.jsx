import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { confirmDelete } from '../../../../src/utils/confirmDelete';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios';
import imageWrong from '../../../../public/assets/images/wrong.png';

const Subscription = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;
  const navigate = useNavigate(); 
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/subscription-plan/list`);
      if (response.data && response.data.status) {
        const mappedData = response.data.data.map(item => ({
          id: item.id,
          name: item.subscription_name,
          price: item.price,
          planType: item.plan_type,
          status: item.status,
          featureCount: item.features.length,
          image: item.image || 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Green_tick.png',
        }));
        setProducts(mappedData);
      }
    } catch (error) {
      console.error("Failed to fetch subscriptions", error);
    }
  };

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleView = (id) => navigate(`/dashboard/subscription/view/${id}`);
  const handleEdit = (id) => navigate(`/dashboard/subscription/edit/${id}`);
  const handleDelete = (id) => {
    confirmDelete(`${BASE_URL}/delete/subscription/${id}`, fetchSubscriptions);
  };
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container py-4">
      <div className="card shadow-lg border-0 rounded-2 p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="fw-bold mb-1">Subscription Plan List</h2>
            <p className="text-muted">Overview of all Subscription Plans</p>
          </div>
          <Link to="/dashboard/subscription/create" className="btn bg-brand text-white">
            + Create One
          </Link>
        </div>

        <div className="card shadow-sm">
          <div className="card-header bg-brand text-white">
            <h5 className="mb-0">Subscription List</h5>
          </div>

          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Plan Type</th>
                    <th>Features</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.length > 0 ? (
                    currentProducts.map((product, index) => (
                      <tr key={product.id}>
                        <td>{indexOfFirst + index + 1}</td>
                        <td className="activeImage">
                          <img
                            src={product.status == 0 ? imageWrong : product.image}
                            alt={product.name}
                            width="60"
                            className="rounded"
                          />
                        </td>
                        <td>{product.name}</td>
                        <td>${product.price}</td>
                        <td>{product.planType}</td>
                        <td>{product.featureCount}</td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleView(product.id)}>
                            <FaEye />
                          </button>
                          <button className="btn btn-sm btn-outline-success me-2" onClick={() => handleEdit(product.id)}>
                            <FaEdit />
                          </button>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(product.id)}>
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-3">
                        No subscription plans found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-3 border-top d-flex justify-content-between align-items-center">
              <span>
                Showing {indexOfFirst + 1} to {Math.min(indexOfLast, products.length)} of {products.length} entries
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
    </div>
  );
};

export default Subscription;
