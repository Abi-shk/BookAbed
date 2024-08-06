import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Payment from './components/pages/Payment';
import { useAuth } from './context/AuthContext';
import Todo from './components/Todo';
import BookingDetails from './components/BookingDetails';



function App() {

  const { user } = useAuth()

  let loggedInRoutes = (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/history" element={<BookingDetails />} />
      <Route path="/todos" element={<Todo/>} />
      <Route path="/paymentSuccess" element={<Payment/>} />
      <Route path="/booking/:id" element={<BookingDetails />} />
      <Route path='*' element={<Navigate to={"/home"} />} />
    </Routes>
  )

  let loggedOutRoutes = (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Register />} />
      <Route path='*' element={<Navigate to={"/"} />} />
    </Routes>
  )

  return (
    <>
      {user ? loggedInRoutes : loggedOutRoutes}
    </>
  );
}

export default App;
