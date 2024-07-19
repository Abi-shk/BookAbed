import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FaPlaneDeparture, FaPlaneArrival } from 'react-icons/fa';
import Foooter from './Foooter';
import { Link } from 'react-router-dom';

const BookingDetails = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/booking/all/${user.userId}`);
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching booking details');
        setLoading(false);
      }
    };
    fetchBookingDetails();
  }, [user.userId]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <>
      <header className="text-start text-3xl pt-10 bg-slate-100 shadow-lg pb-10 font-bold">
        <Link to='/home'>
          <h1 className="text-indigo-500 px-16 text-xl md:text-4xl font-serif font-bold underline cursor-pointer">
            Book<span className="text-red-500">A</span>Bed
          </h1>
          <h1 className='text-center text-4xl font-bold'>Recent Bookings</h1>

        </Link>

      </header>
      <div className="mt-4 flex flex-col items-center space-y-4 w-full mb-12 p-10">
        {bookings.map((booking) => (
          <div key={booking._id} className="w-full border rounded-lg p-8 shadow-md bg-white">
            <div className="flex flex-col md:flex-row items-center border-b border-gray-200 py-6 md:py-10 px-6 md:px-16 cursor-pointer hover:bg-slate-200 w-full">
              <img
                src="https://static.vecteezy.com/system/resources/previews/000/620/372/original/aircraft-airplane-airline-logo-label-journey-air-travel-airliner-symbol-vector-illustration.jpg"
                alt="Flight Logo"
                className="w-14 md:w-28 h-16 md:h-28 object-contain flex items-center justify-center"
              />
              <div className="flex-1 mt-4 md:mt-0 ml-10 w-full">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 w-full">
                  <div>
                    <p className="text-xl md:text-2xl font-semibold">{booking.from}</p>
                    <div className="flex  gap-4 items-center  mt-2 md:mt-5">
                      <p className="text-sm md:text-lg text-gray-500">Departure</p>
                      <FaPlaneDeparture className="text-gray-500" />
                    </div>
                    <p className="text-sm md:text-lg text-gray-800">{booking.departureTime}</p>
                  </div>
                  <div>
                    <p className="text-xl md:text-2xl font-semibold">{booking.to}</p>
                    <div className="flex gap-5 items-center  mt-2 md:mt-5">
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
      <Foooter />
    </>
  );
};

export default BookingDetails;
