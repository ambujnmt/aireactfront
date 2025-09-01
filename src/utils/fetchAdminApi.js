import axios from "axios";

const baseURL = "https://site2demo.in/ai-beauty"; // no trailing slash

// Create Makeup
export const createMakeup = async (data) => {
  return await axios.post(`${baseURL}/api/admin/makeup-create`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getMakeupList = async () => {
  return await axios.get(`${baseURL}/api/admin/makeup-list`);
};


export const getMakeupById = async (id) => {
  return await axios.get(`${baseURL}/api/admin/makeup-show/${id}`);
};

export const updateMakeup = async (id, data) => {
  return await axios.post(`${baseURL}/api/admin/makeup-update/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getMakeupTransferList = async () => {
  return await axios.get(`${baseURL}/api/admin/makeup-transfer-list`);
};

export const getMakeupTransferReferences = async (request_id) => {
  return await axios.get(`${baseURL}/api/admin/makeup-transfer-references/${request_id}`);
};


// Get customer detail
export const getCustomerDetail = async (id) => {
  return await axios.get(`${baseURL}/api/admin/user-detail/${id}`);
};

// ✅ Update customer details
export const updateCustomer = async (id, formData) => {
  return await axios.put(`${baseURL}/api/admin/user-update/${id}`, formData);
};

export const getCustomerList = async () => {
  return await axios.get(`${baseURL}/api/admin/user-list`);
};

export const getSubscriptionList = async () => {
  return await axios.get(`${baseURL}/api/admin/subscription-plan/list`);
};

export const getSubscribedCustomers = async () => {
  return await axios.get(`${baseURL}/api/admin/subscribed-customers`);
};


