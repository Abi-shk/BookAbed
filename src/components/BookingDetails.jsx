import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FaPlaneDeparture, FaPlaneArrival } from 'react-icons/fa';
import Foooter from './Foooter';
import { Link } from 'react-router-dom';
import { MdManageHistory } from 'react-icons/md';

const BookingDetails = () => {
  // Retrieve user context from AuthContext
  const { user } = useAuth();
  
  // State to hold booking data, loading state, and error message
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch booking details when component mounts or user.userId changes
  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        // Fetch data from the backend API using the user's ID
        const response = await axios.get(`https://bookabed-backend.onrender.com/api/booking/all/${user.userId}`);
        setBookings(response.data);  // Set bookings state with fetched data
        setLoading(false);           // Set loading state to false
      } catch (error) {
        setError('Error fetching booking details');  // Set error state if an error occurs
        setLoading(false);                          // Set loading state to false
      }
    };
    fetchBookingDetails();
  }, [user.userId]);

  // Display loading spinner while data is being fetched
  if (loading) {
    return (
      <div className='w-full fixed top-0 left-0 flex justify-center items-center min-h-screen bg-indigo-700'>
        <h1 className='animate-pulse duration-200 ease-in-out text-3xl flex items-center gap-3 font-semibold text-white'>
          <MdManageHistory /> Loading...
        </h1>
      </div>
    );
  }

  // Display error message if there was an error fetching data
  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <>
      {/* Header section with navigation link */}
      <header className="text-start text-3xl pt-10 bg-slate-100 shadow-lg pb-10 font-bold">
        <Link to='/home'>
          <h1 className="text-indigo-500 px-16 text-xl md:text-4xl font-serif font-bold underline cursor-pointer">
            Book<span className="text-red-500">A</span>Bed
          </h1>
          <h1 className='text-center text-4xl font-bold'>Recent Bookings</h1>
        </Link>
      </header>

      {/* Bookings list */}
      <div className="mt-4 flex flex-col items-center space-y-4 w-full mb-12 p-10">
        {bookings.map((booking) => (
          <div key={booking._id} className="w-full border rounded-lg p-8 shadow-md bg-white">
            <div className="flex flex-col md:flex-row items-center border-b border-gray-200 py-6 md:py-10 px-6 md:px-16 cursor-pointer hover:bg-slate-200 w-full">
              {/* Flight Logo */}
              <img
                src="https://static.vecteezy.com/system/resources/previews/000/620/372/original/aircraft-airplane-airline-logo-label-journey-air-travel-airliner-symbol-vector-illustration.jpg"
                alt="Flight Logo"
                className="w-14 md:w-28 h-16 md:h-28 object-contain flex items-center justify-center"
              />
              <div className="flex-1 mt-4 md:mt-0 ml-10 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 w-full">
                  {/* Flight Details */}
                  <div>
                    <p className="text-xl md:text-2xl font-semibold">{booking.from}</p>
                    <div className="flex gap-4 items-center mt-2 md:mt-5">
                      <p className="text-sm md:text-lg text-gray-500">Departure</p>
                      <FaPlaneDeparture className="text-gray-500" />
                    </div>
                    <p className="text-sm md:text-lg text-gray-800">{booking.departureTime}</p>
                  </div>
                  <div>
                    <p className="text-xl md:text-2xl font-semibold">{booking.to}</p>
                    <div className="flex gap-5 items-center mt-2 md:mt-5">
                      <p className="text-sm md:text-lg text-gray-500">Arrival</p>
                      <FaPlaneArrival className="text-gray-500" />
                    </div>
                    <p className="text-sm md:text-lg text-gray-800">{booking.arrivalTime}</p>
                  </div>
                  <div>
                    <p className="text-xl md:text-2xl font-semibold">{booking.duration}</p>
                    <p className="text-sm md:text-lg text-gray-500 mt-2 md:mt-5">Duration</p>
                  </div>
                  <div>
                    <p className="text-xl md:text-2xl font-semibold">{booking.totoalAmount} Rs.</p>
                    <p className="text-sm md:text-lg text-gray-500 mt-2 md:mt-5">Total Amount</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-lg text-gray-500">
                <strong>Booked By:</strong> {booking.orderedBy}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Component */}
      <Foooter />
    </>
  );
};

export default BookingDetails;
