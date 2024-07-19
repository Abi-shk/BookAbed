import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { BrowserRouter } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51PabFUFifkpKiuXktJzxAhq04UhByVR3kEsOMynZyAVOQMTrFUKmbW4XPyLQjfb28RqFcoIaWtHkafAXloVSMtvW00HQi9Edgq'); // Replace with your public key

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
      <Elements stripe={stripePromise}>
      <App />
    </Elements>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
