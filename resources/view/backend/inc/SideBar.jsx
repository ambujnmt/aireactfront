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

  const isActive = (paths) => {
    if (Array.isArray(paths)) {
      return paths.includes(location.pathname);
    }
    return location.pathname === paths;
  };

  const linkStyle = (paths) =>
    `nav-link d-flex align-items-center gap-2 rounded px-3 py-2 fw-medium ${
      isActive(paths) ? 'bg-brand text-white shadow-sm' : 'text-dark'
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
              <FaStar /> AI Subscription
            </Link>
          </li>
          <li className="nav-item mt-2">
            <Link to="/dashboard/products" className={linkStyle('/dashboard/products')}>
              <FaBox /> Product
            </Link>
          </li>
          <li className="nav-item mt-2">
            <Link to="/dashboard/custom-target-makeup-upload" className={linkStyle('/category')}>
              <FaListAlt />Makeup Upload
            </Link>
          </li>
          <li className="nav-item mt-2">
            <Link to="/dashboard/onboarding" className={linkStyle(['/dashboard/onboarding', '/dashboard/onboarding/create'])}>
              <FaBox /> Onboarding
            </Link>
          </li>
          <li className="nav-item mt-2">
            <Link to="/dashboard/customers" className={linkStyle('/dashboard/customers')}>
              <FaUser /> Customers
            </Link>
          </li>

          {/* Section: Content */}
          {/*<li className="text-uppercase small text-muted mt-4 mb-2 px-2">Content</li>
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
                  <Link to="/dashboard/customers" className={linkStyle('/blog')}>List</Link>
                </li>
                <li className="nav-item">
                  <Link to="/dashboard/customers" className={linkStyle('/blog/create')}>Create</Link>
                </li>
              </ul>
            )}
          </li>*/}

          {/* Section: Other Static Links */}
          <li className="nav-item mt-2">
            <Link to="/dashboard/subscribed-customers" className={linkStyle('/highlights')}>
              <FaStar /> Subscribed 
            </Link>
          </li>
          <li className="nav-item mt-2">
            <Link to="/dashboard/customers" className={linkStyle('/banner')}>
              <FaImage /> Banner
            </Link>
          </li>
          <li className="nav-item mt-2">
            <Link to="/dashboard/customers" className={linkStyle('/pages')}>
              <FaFileAlt /> Pages
            </Link>
          </li>
          <li className="nav-item mt-2">
            <Link to="/dashboard/customers" className={linkStyle('/social-media')}>
              <FaFacebookF /> Social Media
            </Link>
          </li>
          <li className="nav-item mt-2">
            <Link to="/dashboard/configration" className={linkStyle('/configration')}>
              <FaCogs /> Configuration
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
