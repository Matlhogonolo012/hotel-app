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
    <div>
      <h1>Booking Confirmation</h1>
      {orderId && <p>Order ID: {orderId}</p>}

      {bookingData && (
        <div>
          <h2>Your Booking Details</h2>
          <p>Check-in: {bookingData.checkIn}</p>
          <p>Check-out: {bookingData.checkOut}</p>
          <p>Room ID: {bookingData.roomId}</p>
          <p>Number of Guests: {bookingData.guests}</p>
          <p>Total Price: USD {bookingData.totalPrice}</p>
          
        </div>
      )}

      <button onClick={handleBackToHome}>Back to Home</button>
    </div>
  );
}

export default Confirmation;
