import React, { useState, useEffect } from 'react';
import { FaArrowRightArrowLeft } from 'react-icons/fa6';
import Header from './Header';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { fetchFlightOffers, fetchHotelOffers } from './Api/amadeusAPI';
import FlightOffersModal from './pages/FlightOffersModal';
import { FaSearch } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import ErrorModal from './pages/ErrorModal';
import HotelOffersModal from './pages/HotelOffersModal';

function Booking() {
  // State variables
  const [travelers, setTravelers] = useState({ adults: 1, children: 0, infants: 0 });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentView, setCurrentView] = useState('flights'); // 'flights' or 'hotels'
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const [tripType, setTripType] = useState('one-way'); // 'one-way' or 'round-trip'
  const [toLocations, setToLocations] = useState([]);
  const [fromLocations, setFromLocations] = useState([]);
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [flightOffers, setFlightOffers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [hotelOffers, setHotelOffers] = useState([]);

  const { user } = useAuth(); // Retrieve user context
  const token = user?.apiToken || ''; // Get API token from user context

  useEffect(() => {
    // Reset location lists when the component mounts or updates
    setFromLocations([]);
    setToLocations([]);
  }, []);

  // Function to fetch location data based on keyword and type ('from' or 'to')
  const fetchLocations = async (keyword, type) => {
    if (!user) {
      console.log("No token available.");
      return;
    }

    try {
      console.log("Fetching locations for keyword:", keyword);

      // Fetch location data from Amadeus API
      const response = await axios.get(`https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY&keyword=${keyword}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const locationData = response.data.data;
      console.log("Locations fetched:", locationData);
      
      // Update state based on the type ('from' or 'to')
      if (type === "from") {
        setFromLocations(locationData);
      } else {
        setToLocations(locationData);
      }
    } catch (error) {
      console.error('Error fetching locations:', error);
      setErrorMessage('Error fetching locations. Please try again later.');
    }
  };

  // Function to swap departure and destination values
  const swapValues = () => {
    setFromValue(toValue);
    setToValue(fromValue);
  };

  // Function to handle trip type change ('one-way' or 'round-trip')
  const handleTripTypeChange = (type) => {
    setTripType(type);
  };

  // Function to toggle the visibility of the dropdown menu for travelers
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Function to increment the number of travelers
  const handleIncrement = (key) => {
    setTravelers((prevState) => ({
      ...prevState,
      [key]: prevState[key] + 1,
    }));
  };

  // Function to decrement the number of travelers
  const handleDecrement = (key) => {
    if (travelers[key] > 0) {
      setTravelers((prevState) => ({
        ...prevState,
        [key]: prevState[key] - 1,
      }));
    }
  };

  // Function to handle the search based on current view ('flights' or 'hotels')
  const handleSearch = async () => {
    setLoading(true);
    setErrorMessage(''); // Clear previous error messages

    if (currentView === 'flights') {
        // Validate flight search fields
        if (!fromValue || !toValue || !departureDate || (tripType === 'round-trip' && !returnDate)) {
            setErrorMessage('Please fill in all required fields for flights.');
            setLoading(false);
            return;
        }

        try {
            // Fetch flight offers from Amadeus API
            const flightResults = await fetchFlightOffers(
                fromValue,
                toValue,
                departureDate,
                tripType === 'round-trip' ? returnDate : null,
                travelers.adults,
                travelers.children,
                travelers.infants
            );
            setFlightOffers(flightResults);
            setModalVisible(true);
        } catch (error) {
            console.error('Error fetching flight offers:', error);
            setErrorMessage('Error fetching flight offers. Please try again later.');
        } finally {
            setLoading(false);
        }
    } else if (currentView === 'hotels') {
        // Validate hotel search fields
        if (!toValue || !departureDate || !returnDate) {
            setErrorMessage('Please fill in all required fields for hotels.');
            setLoading(false);
            return;
        }

        try {
            // Fetch hotel offers from Amadeus API
            const hotelResults = await fetchHotelOffers(
                toValue,
                departureDate,
                returnDate,
                travelers.adults
            );
            setHotelOffers(hotelResults);
            setModalVisible(true);
        } catch (error) {
            console.error('Error fetching hotel offers:', error);
            setErrorMessage('Error fetching hotel offers. Please try again later.');
        } finally {
            setLoading(false);
        }
    }
};

  // Function to apply changes in traveler count and close the dropdown
  const handleApply = () => {
    setDropdownOpen(false);
  };

  // Get today's date for date inputs
  const today = new Date().toISOString().split('T')[0];

  // Calculate the total number of passengers
  const totalPassengers = travelers.adults + travelers.children + travelers.infants;

  return (
    <div>
      {/* Header component */}
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      
      {/* Main content area */}
      <div className="absolute inset-0 mt-20 md:mt-60 flex flex-col items-center justify-center space-y-0">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-0 md:space-y-0 md:space-x-2">
          {/* View selection buttons */}
          <div className="flex">
            <button
              className={`rounded-tl-lg md:mb-0 w-28 md:w-40 h-10 md:h-14 ${currentView === 'flights' ? 'bg-white text-green-600' : 'backdrop-brightness-50 text-white'
                } font-bold text-lg md:text-2xl hover:bg-white hover:text-green-600`}
              onClick={() => setCurrentView('flights')}
            >
              <i className="bx bxs-plane-alt mr-2 text-2xl md:text-3xl"></i>
              Flights
            </button>
            <button
              className={`rounded-tr-lg md:mb-0 w-28 md:w-40 h-10 md:h-14 ${currentView === 'hotels' ? 'bg-white text-green-600' : 'backdrop-brightness-50 text-white'
                } font-bold text-lg md:text-2xl hover:bg-white hover:text-green-600`}
              onClick={() => setCurrentView('hotels')}
            >
              <i className="bx bx-building-house mr-2 text-2xl md:text-3xl"></i>
              Hotels
            </button>
          </div>
        </div>

        {/* Conditional rendering based on current view */}
        {currentView === 'flights' ? (
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-11/12 md:w-[50%]">
            {/* Trip type selection */}
            <div className="flex mb-4 space-x-3">
              <button className={`w-24 md:w-32 h-8 md:h-10 font-medium text-sm md:text-xl hover:bg-indigo-500 hover:text-white rounded-full ${tripType === 'one-way' ? 'bg-indigo-700 text-black' : 'bg-indigo-400 text-white'
                }`} onClick={() => handleTripTypeChange('one-way')}>
                One-Way
              </button>
              <button className={`w-24 md:w-32 h-8 md:h-10 font-medium text-sm md:text-xl hover:bg-indigo-500 hover:text-white rounded-full ${tripType === 'round-trip' ? 'bg-indigo-700 text-black' : 'bg-indigo-400 text-white'
                }`} onClick={() => handleTripTypeChange('round-trip')}>
                Round Trip
              </button>
            </div>

            {/* Flight search fields */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col">
                <label htmlFor="from" className="text-lg font-semibold">From</label>
                <input
                  type="text"
                  id="from"
                  placeholder="Departure City"
                  className="border border-gray-300 p-2 rounded-lg"
                  value={fromValue}
                  onChange={(e) => setFromValue(e.target.value)}
                  onBlur={() => fetchLocations(fromValue, 'from')}
                />
                <div className="mt-2">
                  {fromLocations.map((location) => (
                    <div key={location.iataCode} className="p-2 border border-gray-200 rounded-lg cursor-pointer" onClick={() => setFromValue(location.iataCode)}>
                      {location.name}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="to" className="text-lg font-semibold">To</label>
                <input
                  type="text"
                  id="to"
                  placeholder="Destination City"
                  className="border border-gray-300 p-2 rounded-lg"
                  value={toValue}
                  onChange={(e) => setToValue(e.target.value)}
                  onBlur={() => fetchLocations(toValue, 'to')}
                />
                <div className="mt-2">
                  {toLocations.map((location) => (
                    <div key={location.iataCode} className="p-2 border border-gray-200 rounded-lg cursor-pointer" onClick={() => setToValue(location.iataCode)}>
                      {location.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Dates and travelers */}
            <div className="flex flex-col md:flex-row gap-4 my-4">
              <div className="flex flex-col w-full">
                <label htmlFor="departureDate" className="text-lg font-semibold">Departure Date</label>
                <input
                  type="date"
                  id="departureDate"
                  className="border border-gray-300 p-2 rounded-lg"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  min={today}
                />
              </div>
              {tripType === 'round-trip' && (
                <div className="flex flex-col w-full">
                  <label htmlFor="returnDate" className="text-lg font-semibold">Return Date</label>
                  <input
                    type="date"
                    id="returnDate"
                    className="border border-gray-300 p-2 rounded-lg"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    min={today}
                  />
                </div>
              )}
              <div className="flex flex-col w-full">
                <label htmlFor="travelers" className="text-lg font-semibold">Travelers</label>
                <button
                  onClick={toggleDropdown}
                  className="border border-gray-300 p-2 rounded-lg flex justify-between items-center"
                >
                  {totalPassengers} Travelers
                  <FaArrowRightArrowLeft className="ml-2" />
                </button>
                {dropdownOpen && (
                  <div className="absolute bg-white border border-gray-300 rounded-lg p-2 mt-1 shadow-lg w-48">
                    <div className="flex justify-between">
                      <span>Adults</span>
                      <div>
                        <button onClick={() => handleDecrement('adults')} className="p-1">-</button>
                        <span>{travelers.adults}</span>
                        <button onClick={() => handleIncrement('adults')} className="p-1">+</button>
                      </div>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span>Children</span>
                      <div>
                        <button onClick={() => handleDecrement('children')} className="p-1">-</button>
                        <span>{travelers.children}</span>
                        <button onClick={() => handleIncrement('children')} className="p-1">+</button>
                      </div>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span>Infants</span>
                      <div>
                        <button onClick={() => handleDecrement('infants')} className="p-1">-</button>
                        <span>{travelers.infants}</span>
                        <button onClick={() => handleIncrement('infants')} className="p-1">+</button>
                      </div>
                    </div>
                    <button
                      onClick={handleApply}
                      className="mt-2 w-full bg-indigo-500 text-white p-2 rounded-lg"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Search button */}
            <button
              onClick={handleSearch}
              className="bg-green-500 text-white p-2 rounded-lg w-full flex justify-center items-center"
              disabled={loading}
            >
              {loading ? <span>Loading...</span> : <><FaSearch className="mr-2" /> Search</>}
            </button>
          </div>
        ) : (
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-11/12 md:w-[50%]">
            {/* Hotel search fields */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label htmlFor="destination" className="text-lg font-semibold">Destination</label>
                <input
                  type="text"
                  id="destination"
                  placeholder="Destination City"
                  className="border border-gray-300 p-2 rounded-lg"
                  value={toValue}
                  onChange={(e) => setToValue(e.target.value)}
                  onBlur={() => fetchLocations(toValue, 'to')}
                />
                <div className="mt-2">
                  {toLocations.map((location) => (
                    <div key={location.iataCode} className="p-2 border border-gray-200 rounded-lg cursor-pointer" onClick={() => setToValue(location.iataCode)}>
                      {location.name}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col w-full">
                <label htmlFor="checkInDate" className="text-lg font-semibold">Check-In Date</label>
                <input
                  type="date"
                  id="checkInDate"
                  className="border border-gray-300 p-2 rounded-lg"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  min={today}
                />
              </div>

              <div className="flex flex-col w-full">
                <label htmlFor="checkOutDate" className="text-lg font-semibold">Check-Out Date</label>
                <input
                  type="date"
                  id="checkOutDate"
                  className="border border-gray-300 p-2 rounded-lg"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  min={today}
                />
              </div>

              {/* Number of travelers */}
              <div className="flex flex-col">
                <label htmlFor="hotelTravelers" className="text-lg font-semibold">Travelers</label>
                <button
                  onClick={toggleDropdown}
                  className="border border-gray-300 p-2 rounded-lg flex justify-between items-center"
                >
                  {totalPassengers} Travelers
                  <FaArrowRightArrowLeft className="ml-2" />
                </button>
                {dropdownOpen && (
                  <div className="absolute bg-white border border-gray-300 rounded-lg p-2 mt-1 shadow-lg w-48">
                    <div className="flex justify-between">
                      <span>Adults</span>
                      <div>
                        <button onClick={() => handleDecrement('adults')} className="p-1">-</button>
                        <span>{travelers.adults}</span>
                        <button onClick={() => handleIncrement('adults')} className="p-1">+</button>
                      </div>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span>Children</span>
                      <div>
                        <button onClick={() => handleDecrement('children')} className="p-1">-</button>
                        <span>{travelers.children}</span>
                        <button onClick={() => handleIncrement('children')} className="p-1">+</button>
                      </div>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span>Infants</span>
                      <div>
                        <button onClick={() => handleDecrement('infants')} className="p-1">-</button>
                        <span>{travelers.infants}</span>
                        <button onClick={() => handleIncrement('infants')} className="p-1">+</button>
                      </div>
                    </div>
                    <button
                      onClick={handleApply}
                      className="mt-2 w-full bg-indigo-500 text-white p-2 rounded-lg"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Search button */}
            <button
              onClick={handleSearch}
              className="bg-green-500 text-white p-2 rounded-lg w-full flex justify-center items-center"
              disabled={loading}
            >
              {loading ? <span>Loading...</span> : <><FaSearch className="mr-2" /> Search</>}
            </button>
          </div>
        )}
      </div>

      {/* Modals for flight and hotel offers */}
      {modalVisible && currentView === 'flights' && (
        <FlightOffersModal flightOffers={flightOffers} onClose={() => setModalVisible(false)} />
      )}
      {modalVisible && currentView === 'hotels' && (
        <HotelOffersModal hotelOffers={hotelOffers} onClose={() => setModalVisible(false)} />
      )}

      {/* Error modal */}
      {errorMessage && (
        <ErrorModal message={errorMessage} onClose={() => setErrorMessage('')} />
      )}
    </div>
  );
}

export default Booking;
