import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom'; // Routing components
import Register from './components/Register'; // Registration component
import Login from './components/Login'; // Login component
import Home from './components/Home'; // Home component
import PaymentSuccess from './components/PaymentSuccess'; // Import PaymentSuccess component
import { useAuth } from './context/AuthContext'; // Custom hook for authentication context
import Todo from './components/Todo'; // Todo component
import BookingDetails from './components/BookingDetails'; // BookingDetails component

function App() {
  // Get the user from authentication context
  const { user } = useAuth();

  // Routes available to logged-in users
  let loggedInRoutes = (
    <Routes>
      <Route path="/home" element={<Home />} /> {/* Home page */}
      <Route path="/history" element={<BookingDetails />} /> {/* Booking history page */}
      <Route path="/todos" element={<Todo />} /> {/* Todo page */}
      <Route path="/booking/:id" element={<BookingDetails />} /> {/* Booking details page with dynamic ID */}
      <Route path='*' element={<Navigate to={"/home"} />} /> {/* Redirect any other route to home */}
    </Routes>
  );

  // Routes available to logged-out users
  let loggedOutRoutes = (
    <Routes>
      <Route path="/login" element={<Login />} /> {/* Login page */}
      <Route path="/" element={<Register />} /> {/* Registration page */}
      <Route path='*' element={<Navigate to={"/"} />} /> {/* Redirect any other route to registration */}
    </Routes>
  );

  return (
    <>
      {/* Conditionally render routes based on whether the user is logged in */}
      {user ? loggedInRoutes : loggedOutRoutes}
    </>
  );
}

export default App;
