import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Import the main application component
import './index.css'; // Import global styles
import { AuthProvider } from './context/AuthContext.jsx'; // Import authentication context provider
import { Elements } from '@stripe/react-stripe-js'; // Import Stripe Elements component for Stripe integration
import { loadStripe } from '@stripe/stripe-js'; // Import function to load Stripe
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter for routing

// Initialize Stripe with your public key
const stripePromise = loadStripe('pk_test_51PabFUFifkpKiuXktJzxAhq04UhByVR3kEsOMynZyAVOQMTrFUKmbW4XPyLQjfb28RqFcoIaWtHkafAXloVSMtvW00HQi9Edgq');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Provide authentication context to the application */}
      <AuthProvider>
        {/* Wrap application with Stripe Elements provider */}
        <Elements stripe={stripePromise}>
          {/* Render the main application component */}
          <App />
        </Elements>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
