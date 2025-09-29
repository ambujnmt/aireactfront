import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSubscribedCustomerDetail } from "../../../../src/utils/fetchAdminApi";
import Swal from "sweetalert2";

const SubscribedCustomerDetail = () => {
  const { id } = useParams();
  const [subscription, setSubscription] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await getSubscribedCustomerDetail(id);
        if (res.data?.status) {
          setSubscription(res.data.data.subscription);
          setUser(res.data.data.user);
        } else {
          Swal.fire("Error", "Failed to fetch subscription detail", "error");
        }
      } catch (error) {
        console.error("Error fetching subscription detail:", error);
        Swal.fire("Error", "Something went wrong", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  // Placeholder function
  const renderPlaceholder = (width = "50%") => (
    <span className="placeholder-glow">
      <span className="placeholder col-6" style={{ width }}></span>
    </span>
  );

  return (
    <div className="container-fluid py-4">
      <div className="card shadow-lg border-0 rounded-2 p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="fw-bold mb-1">Subscribed Customer Detail</h2>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>

        {/* Subscription Info */}
        <div className="card mb-4">
          <div className="card-header bg-brand text-white">
            Subscription Info
          </div>
          <div className="card-body">
            <p><strong>Product:</strong> {loading ? renderPlaceholder("30%") : subscription?.product_name}</p>
            <p><strong>Plan Type:</strong> {loading ? renderPlaceholder("20%") : subscription?.plan_type}</p>
            <p><strong>Price:</strong> {loading ? renderPlaceholder("15%") : `$${subscription?.payment_price}`}</p>
            <p><strong>Description:</strong> {loading ? renderPlaceholder("80%") : subscription?.description}</p>
            <p><strong>Start Date:</strong> {loading ? renderPlaceholder("40%") : new Date(subscription?.start_date).toLocaleString()}</p>
            <p><strong>Expiry Date:</strong> {loading ? renderPlaceholder("40%") : new Date(subscription?.expiry_date).toLocaleString()}</p>
            <p>
              <strong>Payment:</strong>{" "}
              {loading ? (
                renderPlaceholder("30%")
              ) : (
                <>
                  {subscription?.payment_id} -{" "}
                  <span
                    className={
                      subscription?.payment_status === "success"
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {subscription?.payment_status || "pending"}
                  </span>
                </>
              )}
            </p>
          </div>
        </div>

        {/* User Info */}
        <div className="card">
          <div className="card-header bg-brand text-white">User Info</div>
          <div className="card-body">
            <p><strong>User ID:</strong> {loading ? renderPlaceholder("20%") : user?.id}</p>
            <p><strong>User Type:</strong> {loading ? renderPlaceholder("20%") : user?.user_type}</p>
            <p><strong>Device ID:</strong> {loading ? renderPlaceholder("30%") : user?.device_id}</p>
            <p><strong>Status:</strong> {loading ? renderPlaceholder("20%") : user?.status}</p>
            <p><strong>Onboarding Status:</strong> {loading ? renderPlaceholder("30%") : user?.onboarding_status}</p>
            <p><strong>Created At:</strong> {loading ? renderPlaceholder("40%") : new Date(user?.created_at).toLocaleString()}</p>
            <p><strong>Updated At:</strong> {loading ? renderPlaceholder("40%") : new Date(user?.updated_at).toLocaleString()}</p>

            {user?.onboarding_options && !loading && (
              <div>
                <h6 className="mt-3">Onboarding Options:</h6>
                <ul>
                  {Object.entries(user.onboarding_options).map(([key, value]) => (
                    <li key={key}>
                      <strong>{key}:</strong> {value}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {loading && (
              <div>
                <h6 className="mt-3">Onboarding Options:</h6>
                {renderPlaceholder("60%")}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribedCustomerDetail;
