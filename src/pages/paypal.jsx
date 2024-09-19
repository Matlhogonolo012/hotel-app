import React from 'react';
import { useLocation } from 'react-router-dom';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PAYPAL_CLIENT_ID = "AcFIfsL5dtM6rXxjSddZpMlkO-r_dhpYH6ICeYQe7RQT9YO7NtqTck6mr-uZqR1S-7knxjdVN0iRLvvi";

const PaymentPage = () => {
  const location = useLocation();
  const { combinedData } = location.state || {};

  const handlePaymentSuccess = (details) => {
    alert(`Payment successful! Transaction ID: ${details.id}`);
  };

  const handlePaymentFailure = (err) => {
    alert(`Payment failed. Please try again. Error: ${err.message}`);
  };

  return (
    <div>
      <h1>Payment Confirmation</h1>
      {combinedData ? (
        <div>
          <h2>User Details:</h2>
          <p>Email: {combinedData.email}</p>
          <p>User ID: {combinedData.userId}</p>
          {combinedData.booking ? (
            <div>
              <h2>Booking Details:</h2>
              <p>Check-in: {combinedData.booking.checkIn}</p>
              <p>Check-out: {combinedData.booking.checkOut}</p>
              <p>Guests: {combinedData.booking.guests}</p>
              <p>Rooms: {combinedData.booking.rooms}</p>
            </div>
          ) : (
            <p>No bookings found.</p>
          )}

          <h2>Payment</h2>
          <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID }}>
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: combinedData.booking ? combinedData.booking.amount : "0.00",
                      },
                    },
                  ],
                });
              }}
              onApprove={async (data, actions) => {
                const details = await actions.order.capture();
                handlePaymentSuccess(details);
              }}
              onError={(err) => {
                handlePaymentFailure(err);
              }}
            />
          </PayPalScriptProvider>
        </div>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default PaymentPage;
