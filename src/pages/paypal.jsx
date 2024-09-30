import React from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addBooking } from "/src/redux-state-management/features/firestore-reducer/firestore.jsx";
import '/src/pages/paypal.css'
function PayPal() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    checkIn,
    checkOut,
    roomId,
    guests,
    userId,
    userEmail,
    totalPrice, 
  } = location.state || {};

  const exchangeRate = 0.053; 
  const totalPriceInUSD = (totalPrice * exchangeRate).toFixed(2); 

  const bookingData = {
    checkIn,
    checkOut,
    roomId,
    guests,
    userId,
    userEmail,
    totalPrice: totalPriceInUSD, 
  };

  const handleApprove = (orderId) => {
    console.log("Transaction completed. Order ID: ", orderId);
    dispatch(addBooking(bookingData));
    navigate("/confirmation", { state: { orderId, bookingData } });
  };

  return (
    <div className="paypal-container">
      <h1 className="paypal-header">Proceed to Pay</h1>
      <div className="paypal-details">
        <p className="paypal-detail"><strong>User ID:</strong> {userId}</p>
        <p className="paypal-detail"><strong>Email:</strong> {userEmail}</p>
        <p className="paypal-detail"><strong>Check-in:</strong> {checkIn}</p>
        <p className="paypal-detail"><strong>Check-out:</strong> {checkOut}</p>
        <p className="paypal-detail"><strong>Room ID:</strong> {roomId}</p>
        <p className="paypal-detail"><strong>Guests:</strong> {guests}</p>
        <p className="paypal-detail"><strong>Total Price:</strong> USD {totalPriceInUSD}</p>
      </div>

      <PayPalScriptProvider options={{ "client-id": "AcFIfsL5dtM6rXxjSddZpMlkO-r_dhpYH6ICeYQe7RQT9YO7NtqTck6mr-uZqR1S-7knxjdVN0iRLvvi", currency: "USD" }}>
        <PayPalButtons
          createOrder={(data, actions) => {
            console.log("Creating order with data: ", data);
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: totalPriceInUSD,
                },
              }],
            }).then((orderId) => {
              console.log("Order created with ID: ", orderId);
              return orderId;
            }).catch((error) => {
              console.error("Error creating order: ", error);
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              console.log("Payment approved with details: ", details);
              handleApprove(data.orderID);
            }).catch((error) => {
              console.error("Error capturing order: ", error);
            });
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}

export default PayPal;
