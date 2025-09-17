import React, { useEffect, useState } from "react";
import { getPrivacyPolicy } from "../../../src/utils/fetchApi";
import illustration from "../../../public/assets/images/logo/log.png";

function PrivacyPolicy() {
  const [content, setContent] = useState("");

  useEffect(() => {
    getPrivacyPolicy()
      .then((res) => {
        if (res.status) {
          setContent(res.data); // HTML content directly set करें
        }
      })
      .catch((err) => {
        console.error("Error fetching privacy policy:", err);
      });
  }, []);

  return (
    <div style={styles.wrapper}>
      <div style={styles.right}>
        <div style={styles.card}>
          <img src={illustration} alt="Logo" style={styles.logo} />
          <h2 style={styles.heading}>Privacy Policy</h2>
          <p style={styles.subheading}></p>

          <div
            style={styles.policyContent}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;

// ... styles वही रहेंगे

const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
    background: "#f4f6f8",
  },
  right: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
  },
  card: {
    width: "100%",
    maxWidth: "auto",
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "40px",
    boxShadow: "0 0 25px rgba(0, 0, 0, 0.05)",
    textAlign: "left",
  },
  logo: {
    width: "60px",
    marginBottom: "20px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  heading: {
    marginBottom: "10px",
    fontSize: "24px",
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  subheading: {
    fontSize: "14px",
    color: "#777",
    marginBottom: "30px",
    textAlign: "center",
  },
  policyContent: {
    fontSize: "15px",
    color: "#444",
    lineHeight: "1.6",
  },
};
