// import React, { useState } from 'react';
// import { MdClose } from 'react-icons/md';
// import { FaPlaneDeparture, FaPlaneArrival } from 'react-icons/fa';
// import Payment from '../Payments';

// const FlightOffersModal = ({
//   flightOffers,
//   setModalVisible,
//   currentPage,
//   totalPages,
//   handlePreviousPage,
//   handleNextPage,
// }) => {
//   const [selectedFlight, setSelectedFlight] = useState(null);
//   const [showPayment, setShowPayment] = useState(false);

//   const itemsPerPage = 6;
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentOffers = flightOffers.slice(startIndex, endIndex);

//   const handleSelectFlight = (flight) => {
//     setSelectedFlight(flight);
//     setShowPayment(true);
//   };

//   return (
//     <div className="relative inset-0 bg-black bg-opacity-70 flex justify-center items-center overflow-y-auto z-50">
//       <div className="w-full md:w-3/4 lg:w-[80%] bg-white shadow-lg rounded-lg p-4 text-center mt-5 relative">
//         <button
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//           onClick={() => setModalVisible(false)}
//         >
//           <MdClose className="w-8 h-8" />
//         </button>
//         <h2 className="text-2xl md:text-4xl font-bold font-mono mb-4 text-indigo-500">Select a Flight</h2>
//         {currentOffers.map((offer, index) => (
//           <div
//             key={index}
//             className="flex flex-col md:flex-row items-center border-b border-gray-200 py-6 md:py-10 px-6 md:px-16 mt-6 cursor-pointer justify-center hover:bg-slate-200"
//             onClick={() => handleSelectFlight(offer)}
//           >
//             <img
//               src="https://static.vecteezy.com/system/resources/previews/000/620/372/original/aircraft-airplane-airline-logo-label-journey-air-travel-airliner-symbol-vector-illustration.jpg"
//               alt="Flight Logo"
//               className="w-14 md:w-28 h-16 md:h-28 object-contain flex items-center justify-center"
//             />
//             <div className="flex-1 mt-4 md:mt-0 ml-10">
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
//                 <div>
//                   <p className="text-xl md:text-2xl font-semibold">{offer.itineraries[0].segments[0].departure.iataCode}</p>
//                   <div className="flex gap-5 items-center justify-center mt-2 md:mt-5">
//                     <p className="text-sm md:text-lg text-gray-500">Departure</p>
//                     <FaPlaneDeparture className="text-gray-500" />
//                   </div>
//                   <p className="text-sm md:text-lg text-gray-800">{offer.itineraries[0].segments[0].departure.at}</p>
//                 </div>
//                 <div>
//                   <p className="text-xl md:text-2xl font-semibold">{offer.itineraries[0].segments[0].arrival.iataCode}</p>
//                   <div className="flex gap-5 items-center justify-center mt-2 md:mt-5">
//                     <p className="text-sm md:text-lg text-gray-500">Arrival</p>
//                     <FaPlaneArrival className="text-gray-500" />
//                   </div>
//                   <p className="text-sm md:text-lg text-gray-800">{offer.itineraries[0].segments[0].arrival.at}</p>
//                 </div>
//                 <div>
//                   <p className="text-xl md:text-2xl font-semibold">{offer.itineraries[0].duration}</p>
//                   <p className="text-sm md:text-lg text-gray-500 mt-2 md:mt-5">Duration</p>
//                 </div>
//                 <div>
//                   <p className="text-xl md:text-2xl font-semibold">{offer.travelerPricings[0].price.total}</p>
//                   <p className="text-sm md:text-lg text-gray-500 mt-2 md:mt-5">Price</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//         <div className="flex justify-between items-center mt-8 mb-16">
//           <button
//             className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-200 text-gray-400 ' : 'bg-indigo-500 text-white hover:bg-indigo-700'}`}
//             onClick={handlePreviousPage} // Ensure this function decrements currentPage correctly
//             disabled={currentPage === 1}
//           >
//             Previous
//           </button>
//           <span className="text-sm md:text-lg">
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             className={`px-4 py-2 rounded-md h-10 w-20 ${currentPage === totalPages ? 'bg-gray-200 text-gray-400' : 'bg-indigo-500 text-white hover:bg-indigo-700'}`}
//             onClick={handleNextPage} // Ensure this function increments currentPage correctly
//             disabled={currentPage === totalPages}
//           >
//             Next
//           </button>
//         </div>
//         {showPayment && (
//           <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 ">
//             <div className="bg-white p-8 rounded-lg shadow-lg">
//               <button
//                 className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//                 onClick={() => setShowPayment(false)}
//               >
//                 <MdClose className="w-8 h-8" />
//               </button>
//               <Payment amount={selectedFlight.travelerPricings[0].price.total * 100} />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FlightOffersModal;

import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { FaPlaneDeparture, FaPlaneArrival } from 'react-icons/fa';
import Payment from '../Payments';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const FlightOffersModal = ({
  flightOffers,
  setModalVisible,
  currentPage,
  totalPages,
  handlePreviousPage,
  handleNextPage,
}) => {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  const { user } = useAuth()

  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOffers = flightOffers.slice(startIndex, endIndex);

  const handleSelectFlight = async (flight) => {
    flight.user = user;

    const stripe = await loadStripe("pk_test_51PabFUFifkpKiuXktJzxAhq04UhByVR3kEsOMynZyAVOQMTrFUKmbW4XPyLQjfb28RqFcoIaWtHkafAXloVSMtvW00HQi9Edgq");
    const res = await axios.post(`http://localhost:3000/api/payment/create-checkout-session`, flight, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`
      }
    })
    console.log(res.data)
    if (res.data.status) {
      const result = await stripe?.redirectToCheckout({
        sessionId: res.data.id
      })

      if (result?.error) {
        console.log(result.error)
      }
    }
  };

  return (
    <div className="relative inset-0 bg-black bg-opacity-70 flex justify-center items-center overflow-y-auto z-50">
      <div className="w-full md:w-3/4 lg:w-[80%] bg-white shadow-lg rounded-lg p-4 text-center mt-5 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={() => setModalVisible(false)}
        >
          <MdClose className="w-8 h-8" />
        </button>
        <h2 className="text-2xl md:text-4xl font-bold font-mono mb-4 text-indigo-500">Select a Flight</h2>
        {currentOffers.map((offer, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center border-b border-gray-200 py-6 md:py-10 px-6 md:px-16 mt-6 cursor-pointer justify-center hover:bg-slate-200"
            onClick={() => handleSelectFlight(offer)}
          >
            <img
              src="https://static.vecteezy.com/system/resources/previews/000/620/372/original/aircraft-airplane-airline-logo-label-journey-air-travel-airliner-symbol-vector-illustration.jpg"
              alt="Flight Logo"
              className="w-14 md:w-28 h-16 md:h-28 object-contain flex items-center justify-center"
            />
            <div className="flex-1 mt-4 md:mt-0 ml-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                <div>
                  <p className="text-xl md:text-2xl font-semibold">{offer.itineraries[0].segments[0].departure.iataCode}</p>
                  <div className="flex gap-5 items-center justify-center mt-2 md:mt-5">
                    <p className="text-sm md:text-lg text-gray-500">Departure</p>
                    <FaPlaneDeparture className="text-gray-500" />
                  </div>
                  <p className="text-sm md:text-lg text-gray-800">{offer.itineraries[0].segments[0].departure.at}</p>
                </div>
                <div>
                  <p className="text-xl md:text-2xl font-semibold">{offer.itineraries[0].segments[0].arrival.iataCode}</p>
                  <div className="flex gap-5 items-center justify-center mt-2 md:mt-5">
                    <p className="text-sm md:text-lg text-gray-500">Arrival</p>
                    <FaPlaneArrival className="text-gray-500" />
                  </div>
                  <p className="text-sm md:text-lg text-gray-800">{offer.itineraries[0].segments[0].arrival.at}</p>
                </div>
                <div>
                  <p className="text-xl md:text-2xl font-semibold">{offer.itineraries[0].duration}</p>
                  <p className="text-sm md:text-lg text-gray-500 mt-2 md:mt-5">Duration</p>
                </div>
                <div>
                  <p className="text-xl md:text-2xl font-semibold">{offer.travelerPricings[0].price.total}</p>
                  <p className="text-sm md:text-lg text-gray-500 mt-2 md:mt-5">Price</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center mt-8 mb-16">
          <button
            className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-200 text-gray-400 ' : 'bg-indigo-500 text-white hover:bg-indigo-700'}`}
            onClick={handlePreviousPage} // Ensure this function decrements currentPage correctly
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-sm md:text-lg">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`px-4 py-2 rounded-md h-10 w-20 ${currentPage === totalPages ? 'bg-gray-200 text-gray-400' : 'bg-indigo-500 text-white hover:bg-indigo-700'}`}
            onClick={handleNextPage} // Ensure this function increments currentPage correctly
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
        {showPayment && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 ">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPayment(false)}
              >
                <MdClose className="w-8 h-8" />
              </button>
              <Payment amount={selectedFlight.travelerPricings[0].price.total * 100} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightOffersModal;
