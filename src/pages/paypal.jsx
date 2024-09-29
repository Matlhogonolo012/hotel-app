import React from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addBooking } from "/src/redux-state-management/features/firestore-reducer/firestore.jsx";

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
    totalPrice, // Assuming this is ZAR
  } = location.state || {};

  const exchangeRate = 0.053; // Example exchange rate from ZAR to USD
  const totalPriceInUSD = (totalPrice * exchangeRate).toFixed(2); // Ensure to convert and format

  const bookingData = {
    checkIn,
    checkOut,
    roomId,
    guests,
    userId,
    userEmail,
    totalPrice: totalPriceInUSD, // Store USD price
  };

  const handleApprove = (orderId) => {
    console.log("Transaction completed. Order ID: ", orderId);
    dispatch(addBooking(bookingData));
    navigate("/confirmation", { state: { orderId, bookingData } });
  };

  return (
    <div>
      <h1>Proceed to Pay</h1>
      <p>User ID: {userId}</p>
      <p>Email: {userEmail}</p>
      <p>Check-in: {checkIn}</p>
      <p>Check-out: {checkOut}</p>
      <p>Room ID: {roomId}</p>
      <p>Guests: {guests}</p>
      <p>Total Price: USD {totalPriceInUSD}</p> {/* Display USD total price */}

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
