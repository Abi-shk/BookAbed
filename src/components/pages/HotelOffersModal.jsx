import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const SelectHotel = ({ setModalVisible }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [hotels, setHotels] = useState([]);
  const { user } = useAuth();
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const accessToken = await getAccessToken();
        const response = await axios.get('https://test.api.amadeus.com/v2/shopping/hotel-offers', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            cityCode: 'NYC', // Replace with the actual city code or make it dynamic
            checkInDate: '2024-07-10', // Replace with actual check-in date
            checkOutDate: '2024-07-15', // Replace with actual check-out date
            roomQuantity: 1,
            adults: 2,
          },
        });
        setHotels(response.data.data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };

    fetchHotels();
  }, []);

  const getAccessToken = async () => {
    const clientId = 'xfP5absRlbBi1oQRWWQd48uvdeXoaiwE';
    const clientSecret = 'bOAO6f3xru5o4HW6';

    try {
      const response = await axios.post(
        'https://test.api.amadeus.com/v1/security/oauth2/token',
        new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: clientId,
          client_secret: clientSecret,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }
      );
      return response.data.access_token;
    } catch (error) {
      console.error('Error fetching access token:', error);
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleSelectHotel = async (hotel) => {
    hotel.user = user;
    // Add your payment handling code here, similar to the FlightOffersModal component
  };

  // Calculate the indexes for the current hotels to be displayed
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentHotels = hotels.slice(startIndex, endIndex);
  const totalPages = Math.ceil(hotels.length / itemsPerPage);

  return (
    <div className="relative inset-0 bg-black bg-opacity-70 flex justify-center items-center overflow-y-auto z-50">
      <div className="w-full md:w-3/4 lg:w-[80%] bg-white shadow-lg rounded-lg p-4 text-center mt-5 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={() => setModalVisible(false)}
        >
          <MdClose className="w-8 h-8" />
        </button>
        <h2 className="text-2xl md:text-4xl font-bold font-mono mb-4 text-indigo-500">Select a Hotel</h2>
        {currentHotels.map((hotel, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center border-b border-gray-200 py-6 md:py-10 px-6 md:px-16 mt-6 cursor-pointer justify-center hover:bg-slate-200"
            onClick={() => handleSelectHotel(hotel)}
          >
            <img
              src={hotel.hotel.media ? hotel.hotel.media[0].uri : 'default-image-url'}
              alt="Hotel"
              className="w-16 md:w-[300px] h-16 md:h-[300px] object-contain mr-4 ml-10"
            />
            <div className="flex-1 mt-4 md:mt-0 ml-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                <div>
                  <p className="text-xl md:text-2xl font-semibold">{hotel.hotel.name}</p>
                  <p className="text-sm md:text-lg text-gray-500 mt-5">{hotel.hotel.address.cityName}</p>
                </div>
                <div>
                  <p className="text-xl md:text-2xl font-semibold">{hotel.offers[0].price.total} .Rs/night</p>
                  <p className="text-sm md:text-lg text-gray-500 mt-5">Price</p>
                </div>
                <div>
                  <p className="text-xl md:text-2xl ">{hotel.hotel.amenities.join(', ')}</p>
                  <p className="text-sm md:text-lg text-gray-500 mt-5">Benefits</p>
                </div>
                <div>
                  <p className="text-xl md:text-2xl font-semibold">{hotel.hotel.rating || 'N/A'}</p>
                  <p className="text-sm md:text-lg text-gray-500 mt-5">Rating</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center mt-8 mb-16">
          <button
            className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-200 text-gray-400 ' : 'bg-indigo-500 text-white hover:bg-indigo-700'}`}
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-sm md:text-lg">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`px-4 py-2 rounded-md h-10 w-20 ${currentPage === totalPages ? 'bg-gray-200 text-gray-400' : 'bg-indigo-500 text-white hover:bg-indigo-700'}`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectHotel;
