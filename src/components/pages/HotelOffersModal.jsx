import React from 'react';
import PropTypes from 'prop-types';

function HotelOffersModal({ hotelOffers, setModalVisible }) {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-2/3 relative">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl font-bold"
          onClick={() => setModalVisible(false)}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Hotel Offers</h2>
        <div className="space-y-4">
          {hotelOffers.length > 0 ? (
            hotelOffers.map((offer, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h3 className="text-lg font-bold">{offer.name}</h3>
                <p>{offer.address.countryCode}</p>
                <p>Distance: {offer.distance.value} {offer.distance.unit}</p>
                <p>Amenities: {offer.amenities.join(', ')}</p>
                <p>Last Update: {new Date(offer.lastUpdate).toLocaleDateString()}</p>
                <p>Location: {offer.geoCode.latitude}, {offer.geoCode.longitude}</p>
                <button className="bg-indigo-600 text-white px-4 py-2 mt-2 rounded-lg">
                  Book Now
                </button>
              </div>
            ))
          ) : (
            <p>No hotel offers found.</p>
          )}
        </div>
      </div>
    </div>
  );
}



export default HotelOffersModal;
