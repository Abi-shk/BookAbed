import React from 'react';

const FlightOffer = ({ flightOffer }) => {
  const {
    itineraries,
    price,
    carrier,
    departureDate,
    arrivalDate,
    departureAirport,
    arrivalAirport,
    duration,
    numberOfStops,
  } = flightOffer;

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xl font-semibold">{carrier}</p>
          <p className="text-sm text-gray-500">
            {departureAirport} to {arrivalAirport}
          </p>
          <p className="text-sm text-gray-500">
            {departureDate} - {arrivalDate}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xl font-semibold text-indigo-700">${price.total}</p>
          <p className="text-sm text-gray-500">
            {duration} | {numberOfStops} stops
          </p>
        </div>
      </div>
      <div className="mt-2">
        {itineraries.map((itinerary, index) => (
          <div key={index} className="mt-2">
            <p className="text-sm text-gray-600">
              Flight {index + 1}:
            </p>
            <p className="text-sm text-gray-500">
              {itinerary.segments.map(segment => (
                <span key={segment.id}>
                  {segment.departure.iataCode} ({segment.departure.at}) to {segment.arrival.iataCode} ({segment.arrival.at})
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightOffer;
