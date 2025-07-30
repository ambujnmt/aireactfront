import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from '../resources/view/backend/layouts/AppLayout';
import Dashboard from '../resources/view/backend/Dashboard';
import Login from '../resources/view/backend/inc/Login';
import Logout from '../resources/view/backend/inc/Logout';
import Ai from '../resources/view/backend/ai_feature/index';
import Customer from '../resources/view/backend/customers/index';
import SubscribedCustomer from '../resources/view/backend/customers/SubscribedCustomers';
import Products from '../resources/view/backend/products/index';
import MakeupUpload from '../resources/view/backend/makeup_upload/index';
import Onboarding from '../resources/view/backend/onboarding/index';
import CreateOnboardingQuestion from '../resources/view/backend/onboarding/create';
import EditOnboardingQuestion from '../resources/view/backend/onboarding/edit';
import AdminProfile from '../resources/view/backend/profile/';
import Configration from '../resources/view/backend/configration/index';
import PrivateRoute from './privateRoute';

const UserRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />

      {/* Protected Layout with Nested Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <AppLayout />
          </PrivateRoute>
        }
      >
        {/* These will render inside <Outlet /> in AppLayout */}
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="ai-feature" element={<Ai />} />
        <Route path="products" element={<Products />} />
        <Route path="custom-target-makeup-upload" element={<MakeupUpload />} />
        <Route path="customers" element={<Customer />} />
        <Route path="subscribed-customers" element={<SubscribedCustomer />} />
        <Route path="onboarding" element={<Onboarding />} />
        <Route path="onboarding/create" element={<CreateOnboardingQuestion />} />
        <Route path="onboarding/edit/:id" element={<EditOnboardingQuestion />} />
        <Route path="configration" element={<Configration />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
