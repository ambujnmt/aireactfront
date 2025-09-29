import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from '../resources/view/backend/layouts/AppLayout';
import Dashboard from '../resources/view/backend/Dashboard';
import Login from '../resources/view/backend/inc/Login';
import Logout from '../resources/view/backend/inc/Logout';
import Privacy from '../resources/view/frontend/privacy';

import SubscriptionList from '../resources/view/backend/subscription/index';
import SubscriptionCreate from '../resources/view/backend/subscription/create';
import SubscriptionEdit from '../resources/view/backend/subscription/edit';
import SubscriptionView from '../resources/view/backend/subscription/view';

import Customer from '../resources/view/backend/customers/index';
import CustomerEdit from '../resources/view/backend/customers/edit';
import CustomerView from '../resources/view/backend/customers/view';

import SubscribedCustomer from '../resources/view/backend/customers/SubscribedCustomers';
import SubscribedCustomerView from '../resources/view/backend/customers/SubscribedCustomerView';
import MakeupTransfer from '../resources/view/backend/makeupTransfer/index';
import MakeupTransferReferences from '../resources/view/backend/makeupTransfer/references';

import MakeupUpload from '../resources/view/backend/makeup_upload/index';
import MakeupUploadCreate from '../resources/view/backend/makeup_upload/create';
import MakeupUploadEdit from '../resources/view/backend/makeup_upload/edit';

import Onboarding from '../resources/view/backend/onboarding/index';
import CreateOnboardingQuestion from '../resources/view/backend/onboarding/create';
import EditOnboardingQuestion from '../resources/view/backend/onboarding/edit';

import Notification from '../resources/view/backend/notification/create';
import LoginSession from '../resources/view/backend/loginSession/index';

import MakeupReport from '../resources/view/backend/reports/makeup';
import ProductReport from '../resources/view/backend/reports/products';

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
      <Route path="/privacy" element={<Privacy />} />

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


        <Route path="ai-feature" element={<SubscriptionList />} />
        <Route path="subscription/create" element={<SubscriptionCreate />} />
        <Route path="subscription/edit/:id" element={<SubscriptionEdit />} />
        <Route path="subscription/view/:id" element={<SubscriptionView />} />

        <Route path="makeup-transfer" element={<MakeupTransfer />} />
        <Route path="makeup-transfer/references/:request_id" element={<MakeupTransferReferences />} />

        <Route path="custom-target-makeup-upload" element={<MakeupUpload />} />
        <Route path="custom-target-makeup-upload-create" element={<MakeupUploadCreate />} />
        <Route path="custom-target-makeup-upload-edit/:id" element={<MakeupUploadEdit />} />

        {/*customer*/}
        <Route path="customers" element={<Customer />} />
        <Route path="customer/edit/:id" element={<CustomerEdit />} />
        <Route path="customer/view/:id" element={<CustomerView />} />
        
        {/*SubscribedCustomer*/}
        <Route path="subscribed-customers" element={<SubscribedCustomer />} />
        <Route path="subscribed-customer-view/:id" element={<SubscribedCustomerView />} />

        {/* Notification */}
        <Route path="send-notification" element={<Notification />} />
        <Route path="login-session" element={<LoginSession />} />

        {/* Reports */}

        <Route path="makeup-report" element={<MakeupReport />} />
        <Route path="product-report" element={<ProductReport />} />

        {/*Onboarding*/}
        <Route path="onboarding" element={<Onboarding />} />
        <Route path="onboarding/create" element={<CreateOnboardingQuestion />} />
        <Route path="onboarding/edit/:id" element={<EditOnboardingQuestion />} />

        {/*Configration*/}
        <Route path="configration" element={<Configration />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
