// HotelOffersModal.js

import React from 'react';

const HotelOffersModal = ({ hotelOffers, currentPage, totalPages, handlePreviousPage, handleNextPage }) => {
  const offersPerPage = 6;
  const startIndex = (currentPage - 1) * offersPerPage;
  const currentOffers = hotelOffers.slice(startIndex, startIndex + offersPerPage);

  return (
    <div>
      <h2 className="text-2xl mb-4">Hotel Offers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentOffers.map((offer, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <h3 className="text-xl font-semibold">{offer.hotel.name}</h3>
            <p>{offer.hotel.address.lines.join(', ')}</p>
            <p>{offer.hotel.address.cityName}, {offer.hotel.address.countryCode}</p>
            <p>Price: {offer.offers[0].price.total} {offer.offers[0].price.currency}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HotelOffersModal;
