import React from 'react';
import AdminRoutes from '../routes/adminRoutes';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <AdminRoutes />
      {/* ✅ Add this once to enable toast messages globally */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
