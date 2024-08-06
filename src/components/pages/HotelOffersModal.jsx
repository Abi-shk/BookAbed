import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import Payment from '../Payments'; // Import the Payment component if needed
import { useAuth } from '../../context/AuthContext'; // Import the authentication context if needed

const HotelOffersModal = ({ hotelOffers, setModalVisible }) => {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of results to display per page
  const { user } = useAuth(); // Access the user context if needed

  // Calculate the total number of pages based on the number of hotel offers
  const totalPages = Math.ceil(hotelOffers.length / itemsPerPage);

  // Determine the starting index for the current page's offers
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOffers = hotelOffers.slice(startIndex, startIndex + itemsPerPage);

  // Handle the selection of a hotel offer
  const handleSelectHotel = async (hotel) => {
    hotel.user = user; // Attach user information to the selected hotel

    // Example payment logic (commented out):
    // const stripe = await loadStripe("your-stripe-public-key");
    // const res = await axios.post("your-payment-endpoint", hotel, {
    //   headers: {
    //     Authorization: `Bearer ${user.accessToken}`
    //   }
    // });
    // if (res.data.status) {
    //   const result = await stripe?.redirectToCheckout({
    //     sessionId: res.data.id
    //   });
    //   if (result?.error) {
    //     console.log(result.error);
    //   }
    // }

    // Display the payment modal
    setSelectedHotel(hotel);
    setShowPayment(true);
  };

  // Handle moving to the previous page in pagination
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Handle moving to the next page in pagination
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="relative inset-0 bg-black bg-opacity-70 flex justify-center items-center overflow-y-auto z-50">
      <div className="w-full md:w-3/4 lg:w-[80%] bg-white shadow-lg rounded-lg p-4 text-center relative">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={() => setModalVisible(false)}
        >
          <MdClose className="w-8 h-8" />
        </button>
        {/* Modal title */}
        <h2 className="text-2xl md:text-4xl font-bold font-mono mb-4 text-indigo-500">Select a Hotel</h2>
        <div className="space-y-4">
          {/* Display hotel offers */}
          {currentOffers.length > 0 ? (
            currentOffers.map((offer, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center border-b border-gray-200 py-6 px-4 md:px-6 cursor-pointer justify-center hover:bg-slate-200"
                onClick={() => handleSelectHotel(offer)}
              >
                <img
                  src={offer.imageUrl || "https://via.placeholder.com/150"} // Placeholder image if no image URL is provided
                  alt="Hotel"
                  className="w-24 md:w-32 h-24 md:h-32 object-cover"
                />
                <div className="flex-1 mt-4 md:mt-0 ml-6">
                  <h3 className="text-lg md:text-xl font-semibold">{offer.name}</h3>
                  <p className="text-sm md:text-lg text-gray-500">{offer.address.countryCode}</p>
                  <p className="text-sm md:text-lg text-gray-800">Distance: {offer.distance.value} {offer.distance.unit}</p>
                  <p className="text-sm md:text-lg text-gray-800">Amenities: {offer.amenities.join(', ')}</p>
                  <p className="text-sm md:text-lg text-gray-500">Last Update: {new Date(offer.lastUpdate).toLocaleDateString()}</p>
                  <p className="text-sm md:text-lg text-gray-800">Location: {offer.geoCode.latitude}, {offer.geoCode.longitude}</p>
                  <p className="text-xl md:text-2xl font-semibold mt-2">Price: {offer.price}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No hotel offers found.</p>
          )}
        </div>
        {/* Pagination controls */}
        <div className="flex justify-between items-center mt-8 mb-4">
          <button
            className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-200 text-gray-400' : 'bg-indigo-500 text-white hover:bg-indigo-700'}`}
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-200 text-gray-400' : 'bg-indigo-500 text-white hover:bg-indigo-700'}`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
        {/* Payment modal (conditionally displayed) */}
        {showPayment && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPayment(false)}
              >
                <MdClose className="w-8 h-8" />
              </button>
              <Payment amount={selectedHotel.price * 100} /> {/* Pass the selected hotel's price to the Payment component */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelOffersModal;
