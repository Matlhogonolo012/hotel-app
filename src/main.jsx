import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { store } from '/src/redux-state-management/store.jsx';
import { Provider } from "react-redux";
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import App from './App.jsx'
import './index.css'

const initialOptions = {
  "client-id": "YOUR_PAYPAL_CLIENT_ID",
  currency: "USD",
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <PayPalScriptProvider options={initialOptions}>
        <App />
      </PayPalScriptProvider>
    </Provider>
  </StrictMode>,
)