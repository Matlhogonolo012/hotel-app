import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';

function PayPal() {
  return (
    <div className="App">
      <h1>PayPal Integration</h1>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: '0.01',
              },
            }],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            alert('Transaction completed by ' + details.payer.name.given_name);
          });
        }}
      />
    </div>
  );
}

export default PayPal;
