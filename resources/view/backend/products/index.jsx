import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const Dashboard = () => {
  // 1. Dummy product data
  const dummyProducts = [
    {
      id: 1,
      name: 'Lipstick Matte',
      image: 'https://m.media-amazon.com/images/I/7129YHLu44L.jpg',
      price: 299,
      qty: 50,
    },
    {
      id: 2,
      name: 'Eyeliner Waterproof',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXjLb4MDCHy_PQOUD32bI6-_SlIW6IfEASuw&s',
      price: 199,
      qty: 30,
    },
    {
      id: 3,
      name: 'Compact Powder',
      image: 'data:image/jpeg;base64,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',
      price: 249,
      qty: 70,
    },
    {
      id: 4,
      name: 'Face Serum',
      image: 'data:image/jpeg;base64,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',
      price: 499,
      qty: 20,
    },
    {
      id: 5,
      name: 'Nail Polish',
      image: 'data:image/jpeg;base64,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',
      price: 99,
      qty: 120,
    },
    {
      id: 6,
      name: 'Makeup Brush Set',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJBGFnp9DXhvcrciXitqiO525Ggcfg9k8ULg&s',
      price: 899,
      qty: 15,
    },
  ];

  const [products, setProducts] = useState(dummyProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleView = (id) => alert(`View product with ID: ${id}`);
  const handleEdit = (id) => alert(`Edit product with ID: ${id}`);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="fw-bold mb-1">Product List</h2>
          <p className="text-muted">Overview of all Products</p>
        </div>
        <Link to="/dashboard/onboarding/create" className="btn bg-brand text-white">
        + Create One
        </Link>
      </div>

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
                  <th>Product Image</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.length > 0 ? (
                  currentProducts.map((product, index) => (
                    <tr key={product.id}>
                      <td>{indexOfFirst + index + 1}</td>
                      <td>
                        <img src={product.image} alt={product.name} width="60" className="rounded" />
                      </td>
                      <td>{product.name}</td>
                      <td>₹{product.price}</td>
                      <td>{product.qty}</td>
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
                    <td colSpan="6" className="text-center py-3">No products found.</td>
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
  );
};

export default Dashboard;
