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
