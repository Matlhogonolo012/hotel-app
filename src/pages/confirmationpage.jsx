import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();

  const { orderId, bookingData } = location.state || {};

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="confirmation-container">
      <h1 className="confirmation-header">Booking Confirmation</h1>
      {orderId && <p className="confirmation-order-id">Order ID: {orderId}</p>}

      {bookingData && (
        <div className="confirmation-details">
          <h2 className="confirmation-subheader">Your Booking Details</h2>
          <p className="confirmation-detail"><strong>Check-in:</strong> {bookingData.checkIn}</p>
          <p className="confirmation-detail"><strong>Check-out:</strong> {bookingData.checkOut}</p>
          <p className="confirmation-detail"><strong>Room ID:</strong> {bookingData.roomId}</p>
          <p className="confirmation-detail"><strong>Number of Guests:</strong> {bookingData.guests}</p>
          <p className="confirmation-detail"><strong>Total Price:</strong> USD {bookingData.totalPrice}</p>
        </div>
      )}

      <button className="confirmation-button" onClick={handleBackToHome}>Back to Home</button>
    </div>
  );
}

export default Confirmation;
