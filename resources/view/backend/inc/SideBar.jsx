import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt, FaUser, FaBox, FaBlog, FaChevronDown, FaChevronUp,
  FaStar, FaImage, FaListAlt, FaFileAlt, FaCogs, FaFacebookF
} from 'react-icons/fa';
import illustration from '../../../../public/assets/images/logo/log.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const SideBar = () => {
  const location = useLocation();
  const [isBlogOpen, setIsBlogOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const linkStyle = (path) =>
    `nav-link d-flex align-items-center gap-2 rounded px-3 py-2 fw-medium ${
      isActive(path) ? 'bg-brand text-white shadow-sm' : 'text-dark'
    }`;

  return (
    <div
      className="d-flex flex-column shadow-sm"
      style={{
        width: '260px',
        height: '100vh',
        position: 'fixed',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e6e6e6',
      }}
    >
      {/* Fixed Logo Header */}
      <div
        className="px-4 py-3 border-bottom"
        style={{
          flexShrink: 0,
          position: 'sticky',
          top: 0,
          background: '#fff',
          zIndex: 10,
        }}
      >
        <div className="d-flex align-items-center gap-2">
          <img src={illustration} alt="Logo" height={35} />
          <h5 className="mb-0 fw-bold text-dark">AI Beauty</h5>
        </div>
      </div>

      {/* Scrollable Menu */}
      <div
        className="px-3 py-2"
        style={{
          flexGrow: 1,
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <ul className="nav flex-column">
          {/* Section: Main */}
          <li className="text-uppercase small text-muted mt-4 mb-2 px-2">Main</li>
          <li className="nav-item">
            <Link to="/dashboard" className={linkStyle('/dashboard')}>
              <FaTachometerAlt /> Dashboard
            </Link>
          </li>
          <li className="nav-item mt-2">
            <Link to="/dashboard/ai-feature" className={linkStyle('/dashboard/ai-feature')}>
              <FaStar /> AI Feature
            </Link>
          </li>
          <li className="nav-item mt-2">
            <Link to="/dashboard/products" className={linkStyle('/dashboard/products')}>
              <FaBox /> Product
            </Link>
          </li>

          {/* Section: Content */}
          <li className="text-uppercase small text-muted mt-4 mb-2 px-2">Content</li>
          <li className="nav-item">
            <button
              className="nav-link btn text-start w-100 d-flex align-items-center gap-2 text-dark px-3 py-2 fw-medium"
              onClick={() => setIsBlogOpen(!isBlogOpen)}
              style={{ background: 'transparent', border: 'none' }}
            >
              <FaBlog /> Blog
              <span className="ms-auto">{isBlogOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
            </button>

            {isBlogOpen && (
              <ul className="nav flex-column ms-4">
                <li className="nav-item">
                  <Link to="/blog" className={linkStyle('/blog')}>List</Link>
                </li>
                <li className="nav-item">
                  <Link to="/blog/create" className={linkStyle('/blog/create')}>Create</Link>
                </li>
              </ul>
            )}
          </li>

          {/* Section: Other Static Links */}
          <li className="nav-item mt-2">
            <Link to="/highlights" className={linkStyle('/highlights')}>
              <FaStar /> Highlights
            </Link>
          </li>
          <li className="nav-item mt-2">
            <Link to="/category" className={linkStyle('/category')}>
              <FaListAlt /> Category
            </Link>
          </li>
          <li className="nav-item mt-2">
            <Link to="/banner" className={linkStyle('/banner')}>
              <FaImage /> Banner
            </Link>
          </li>
          <li className="nav-item mt-2">
            <Link to="/pages" className={linkStyle('/pages')}>
              <FaFileAlt /> Pages
            </Link>
          </li>
          <li className="nav-item mt-2">
            <Link to="/dashboard/customers" className={linkStyle('/dashboard/customers')}>
              <FaUser /> Customers
            </Link>
          </li>
          <li className="nav-item mt-2">
            <Link to="/social-media" className={linkStyle('/social-media')}>
              <FaFacebookF /> Social Media
            </Link>
          </li>
          <li className="nav-item mt-2">
            <Link to="/configuration" className={linkStyle('/configuration')}>
              <FaCogs /> Configuration
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
