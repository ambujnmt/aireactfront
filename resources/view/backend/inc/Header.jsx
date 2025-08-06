import React, { useState, useEffect, useRef } from 'react';
import logo from '../../../../public/assets/images/logo/log.png';
import '../../../../public/assets/css/custom.css';
import LogoutButton from './Logout';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaTachometerAlt, FaCog, FaSignOutAlt, FaBell, FaSearch } from 'react-icons/fa';

function Header() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    image: '',
    role: '',
  });

  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const sidebarItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'AI Subscription', path: '/dashboard/ai-feature' },
    { name: 'Makeup Upload', path: '/dashboard/custom-target-makeup-upload' },
    { name: 'Profile', path: '/dashboard/profile' },
    { name: 'Onboarding', path: '/dashboard/onboarding' },
    { name: 'Setting', path: '/dashboard/configration' },
    { name: 'Customer', path: '/dashboard/customers' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !notifRef.current?.contains(event.target) &&
        !profileRef.current?.contains(event.target) &&
        !searchRef.current?.contains(event.target)
      ) {
        setShowNotif(false);
        setShowProfile(false);
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setProfile({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        image: user.avatar
          ? `https://site2demo.in/ai-beauty/public/admin_assets/images/users/${user.avatar}`
          : '',
        role: user.role || 'Administrator',
      });
    }
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 0) {
      const filtered = sidebarItems.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (path) => {
    navigate(path);
    setSearchTerm('');
    setShowSuggestions(false);
  };

  const closeAllDropdowns = () => {
    setShowNotif(false);
    setShowProfile(false);
    setShowSuggestions(false);
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4"
      style={{
        height: '70px',
        position: 'sticky',
        top: 0,
        zIndex: 999,
        borderBottom: '1px solid #eee',
      }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Search */}
        <div className="flex-grow-1 mx-4 d-none d-md-block" ref={searchRef}>
          <div className="input-group position-relative">
            <input
              type="search"
              className="form-control form-control-lg"
              placeholder="Search anything..."
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => {
                if (searchTerm.length > 0) setShowSuggestions(true);
              }}
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul
                className="list-group position-absolute w-100 bg-white shadow rounded mt-1"
                style={{
                  zIndex: 1050,
                  top: '100%',
                  maxHeight: '220px',
                  overflowY: 'auto',
                  border: '1px solid #dee2e6',
                }}
              >
                {suggestions.map((item, index) => (
                  <li
                    key={index}
                    className="list-group-item list-group-item-action px-3 py-2"
                    style={{
                      cursor: 'pointer',
                      borderBottom:
                        index !== suggestions.length - 1 ? '1px solid #eee' : 'none',
                      backgroundColor: '#fff',
                    }}
                    onClick={() => handleSuggestionClick(item.path)}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = '#f8f9fa')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = '#fff')
                    }
                  >
                    🔎 {item.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Right Side */}
        <div className="d-flex align-items-center gap-4">
          {/* Notification */}
          <div className="position-relative" ref={notifRef}>
            <FaBell
              className="fs-5 text-secondary dropdown-toggle"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setShowNotif(!showNotif);
                setShowProfile(false);
                setShowSuggestions(false);
              }}
            />
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style={{ fontSize: '10px' }}
            >
              2
            </span>

            {showNotif && (
              <div
                className="dropdown-menu show shadow rounded mt-2 p-2"
                style={{
                  right: 0,
                  minWidth: '230px',
                  position: 'absolute',
                  top: '100%',
                  zIndex: 1000,
                }}
              >
                <span className="dropdown-item text-wrap">🔔 New message received</span>
                <span className="dropdown-item text-wrap">📢 Server updated successfully</span>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="position-relative" ref={profileRef}>
            <img
              src={profile.image || 'https://i.pravatar.cc/40?img=12'}
              alt="User Avatar"
              className="rounded-circle border shadow"
              width="40"
              height="40"
              style={{
                cursor: 'pointer',
                objectFit: 'cover',
              }}
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotif(false);
                setShowSuggestions(false);
              }}
            />
            {showProfile && (
              <div
                className="dropdown-menu show shadow rounded mt-2 p-2"
                style={{
                  right: 0,
                  minWidth: '180px',
                  position: 'absolute',
                  top: '100%',
                  zIndex: 1000,
                }}
              >
                <Link className="dropdown-item" to="/admin/dashboard" onClick={closeAllDropdowns}>
                  <FaTachometerAlt className="me-2" /> Dashboard
                </Link>
                <Link className="dropdown-item" to="/admin/dashboard/profile" onClick={closeAllDropdowns}>
                  <FaUser className="me-2" /> Profile
                </Link>
                <Link className="dropdown-item" to="/settings" onClick={closeAllDropdowns}>
                  <FaCog className="me-2" /> Settings
                </Link>
                <hr className="dropdown-divider" />
                <Link className="dropdown-item"  onClick={closeAllDropdowns}>
                  <FaSignOutAlt className="me-2" /> <LogoutButton />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
