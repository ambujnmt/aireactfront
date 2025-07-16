import React, { useState, useEffect, useRef } from 'react';
import logo from '../../../../public/assets/images/logo/log.png';
import '../../../../public/assets/css/custom.css';
import LogoutButton from './Logout';
import { Link } from 'react-router-dom';
import { FaBell, FaSearch } from 'react-icons/fa';

function Header() {
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !notifRef.current?.contains(event.target) &&
        !profileRef.current?.contains(event.target)
      ) {
        setShowNotif(false);
        setShowProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
        {/* Left Logo or Title */}
        <div className="d-flex align-items-center gap-2">
          <img src={logo} alt="Logo" height="35" />
          <h5 className="mb-0 fw-bold text-dark d-none d-md-block">AI Beauty</h5>
        </div>

        {/* Center Search */}
        <div className="flex-grow-1 mx-4 d-none d-md-block">
          <div className="input-group">
            <input
              type="search"
              className="form-control form-control-lg"
              placeholder="Search anything..."
            />
            <span className="input-group-text bg-white">
              <FaSearch />
            </span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="d-flex align-items-center gap-4">
          {/* Notification Dropdown */}
          <div className="position-relative" ref={notifRef}>
            <FaBell
              className="fs-5 text-secondary dropdown-toggle"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setShowNotif(!showNotif);
                setShowProfile(false);
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

          {/* Profile Dropdown */}
          <div className="position-relative" ref={profileRef}>
            <img
              src="https://i.pravatar.cc/40?img=12"
              alt="User"
              className="rounded-circle"
              width="40"
              height="40"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotif(false);
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
                <Link className="dropdown-item" to="/profile">👤 Profile</Link>
                <Link className="dropdown-item" to="/settings">⚙️ Settings</Link>
                <hr className="dropdown-divider" />
                <div className="dropdown-item">
                  <LogoutButton />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
