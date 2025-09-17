import axios from "axios";

const baseURL = "https://site2demo.in/ai-beauty";

export const getPrivacyPolicy = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/v1/privacy`);
    // Optional: check if data exists
    if (res.data && res.data.status) {
      return res.data;
    } else {
      return { status: false, message: "No data found", data: "" };
    }
  } catch (error) {
    console.error("Error fetching privacy policy:", error.response || error.message);
    return { status: false, message: "API call failed", data: "" };
  }
};