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
  const [travelers, setTravelers] = useState({ adults: 1, children: 0, infants: 0 });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentView, setCurrentView] = useState('flights');
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const [tripType, setTripType] = useState('one-way');
  const [toLocations, setToLocations] = useState([]);
  const [fromLocations, setFromLocations] = useState([]);
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [flightOffers, setFlightOffers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [hotelOffers, setHotelOffers] = useState([]);

  const { user } = useAuth();
  const token = user?.apiToken || '';

  useEffect(() => {
    setFromLocations([]);
    setToLocations([]);
  }, []);

  const fetchLocations = async (keyword, type) => {
    if (!user) {
      console.log("No token available.");
      return;
    }

    try {
      console.log("Fetching locations for keyword:", keyword);

      const response = await axios.get(`https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY&keyword=${keyword}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const locationData = response.data.data;
      console.log("Locations fetched:", locationData);
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

  const swapValues = () => {
    setFromValue(toValue);
    setToValue(fromValue);
  };

  const handleTripTypeChange = (type) => {
    setTripType(type);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleIncrement = (key) => {
    setTravelers((prevState) => ({
      ...prevState,
      [key]: prevState[key] + 1,
    }));
  };

  const handleDecrement = (key) => {
    if (travelers[key] > 0) {
      setTravelers((prevState) => ({
        ...prevState,
        [key]: prevState[key] - 1,
      }));
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    setErrorMessage(''); // Clear previous error messages

    if (currentView === 'flights') {
        if (!fromValue || !toValue || !departureDate || (tripType === 'round-trip' && !returnDate)) {
            setErrorMessage('Please fill in all required fields for flights.');
            setLoading(false);
            return;
        }

        try {
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
        if (!toValue || !departureDate || !returnDate) {
            setErrorMessage('Please fill in all required fields for hotels.');
            setLoading(false);
            return;
        }

        try {
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


  const handleApply = () => {
    setDropdownOpen(false);
  };


  const today = new Date().toISOString().split('T')[0];

  const totalPassengers = travelers.adults + travelers.children + travelers.infants;

  return (
    <div>
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      <div className="absolute inset-0 mt-20 md:mt-60 flex flex-col items-center justify-center space-y-0">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-0 md:space-y-0 md:space-x-2">
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
        {currentView === 'flights' ? (
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-11/12 md:w-[50%]">
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
            <div className="flex flex-col md:flex-row gap-4 md:gap-2 w-full">
              <div className='flex relative flex-col md:w-w-1/2 w-full'>
                <input
                  className="flex w-full md:w-full rounded-lg p-5 md:p-5 border-2 text-sm md:text-xl"
                  value={fromValue}
                  placeholder='From'
                  onChange={(e) => setFromValue(e.target.value)}
                />
                <FaSearch onClick={() => fetchLocations(fromValue, "from")} className=' absolute opacity-50 top-6 right-4 h-6 w-6' />
                {fromLocations.length > 0 && (
                  <>
                    <MdClose onClick={() => setFromLocations([])} className=' absolute opacity-50 top-6 right-12 h-6 w-6' />
                    <div className='border h-[200px] overflow-y-scroll'>
                      {fromLocations.length > 0 ? (
                        fromLocations.map((location, index) => (
                          <p key={index} className='border-b p-2 cursor-pointer' value={location.iataCode} onClick={() => setFromValue(location.iataCode)}>
                            {location.name}
                          </p>
                        ))
                      ) : (
                        <p className='p-2 text-center'>No Airports Found, Try Another</p>
                      )}
                    </div>
                  </>
                )}
              </div>
              <button className="w-10 md:w-14 h-10 md:h-14 rounded-full flex justify-center items-center" onClick={swapValues}>
                <FaArrowRightArrowLeft className="w-6 mt-3 md:w-10 h-6 md:h-10 text-slate-500 hover:text-slate-700" />
              </button>
              <div className='flex flex-col relative md:w-full'>
                <input
                  className="flex w-full md:w-full rounded-lg p-5 md:p-5 border-2 text-sm md:text-xl"
                  value={toValue}
                  placeholder='To'
                  onChange={(e) => setToValue(e.target.value)}
                />
                <FaSearch onClick={() => fetchLocations(toValue)} className=' absolute opacity-50 top-6 right-4 h-6 w-6' />
                {toLocations.length > 0 &&
                  <>
                    <MdClose onClick={() => setToLocations([])} className=' absolute opacity-50 top-6 right-12 h-6 w-6' />
                    <div className=' border h-[200px] overflow-y-scroll'>
                      {toLocations?.map((location, index) => (
                        <p key={index} className='border-b p-2 cursor-pointer' value={location.iataCode} onClick={() => setToValue(location.iataCode)}>
                          {location.name}
                        </p>
                      ))}
                    </div>
                  </>
                }
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <div className="flex-1">
                <input
                  onFocus={(e) => (e.target.type = 'date')}
                  onBlur={(e) => (e.target.type = 'text')}
                  type="text"
                  placeholder='Depart'
                  className="w-full rounded-lg p-3 md:p-5 border-2 text-sm md:text-xl"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  min={today}
                />
              </div>
              {tripType === 'round-trip' && (
                <div className="flex-1">
                  <input
                    onFocus={(e) => (e.target.type = 'date')}
                    onBlur={(e) => (e.target.type = 'text')}
                    type="text"
                    placeholder='Return'
                    className="w-full rounded-lg p-3 md:p-5 border-2 text-sm md:text-xl"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    min={departureDate}
                  />
                </div>
              )}
            </div>
            <div className="relative mt-4 flex items-center justify-center">
              <button
                className="relative w-full md:w-11/12 rounded-lg p-3 md:p-5 border-2 text-sm md:text-xl bg-white"
                onClick={toggleDropdown}
              >
                {totalPassengers} {totalPassengers === 1 ? 'Traveler' : 'Travelers'}
              </button>
              {dropdownOpen && (
                <div className="absolute top-full left-0 md:left-12 w-full md:w-11/12 bg-white border-2 mt-2 p-4 rounded-lg z-10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm md:text-xl">Adults</span>
                    <div className="flex items-center space-x-2">
                      <button onClick={() => handleDecrement('adults')}>-</button>
                      <span>{travelers.adults}</span>
                      <button onClick={() => handleIncrement('adults')}>+</button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm md:text-xl">Children</span>
                    <div className="flex items-center space-x-2">
                      <button onClick={() => handleDecrement('children')}>-</button>
                      <span>{travelers.children}</span>
                      <button onClick={() => handleIncrement('children')}>+</button>
                    </div>
                  </div>
                  <button
                    className="bg-indigo-700 text-white px-4 py-2 mt-4 rounded-lg w-full md:w-auto"
                    onClick={handleApply}
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>
            <div className="mt-4 flex items-center justify-center">
              <button
                className="w-full md:w-11/12 bg-indigo-700 hover:bg-indigo-600 text-white text-lg md:text-xl font-bold py-2 md:py-4 rounded-lg"
                onClick={handleSearch} 
              >
                Search Flights
              </button>
            </div>
            {errorMessage && <ErrorModal message={errorMessage} />}
          </div>
        ) : (
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-11/12 md:w-[50%]">
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <div className='flex flex-col relative'>
                <input
                  className="flex w-full md:w-full rounded-lg p-5 md:p-5 border-2 text-sm md:text-xl"
                  value={toValue}
                  placeholder='Destination'
                  onChange={(e) => setToValue(e.target.value)}
                />
                <FaSearch onClick={() => fetchLocations(toValue)} className=' absolute opacity-50 top-6 right-4 h-6 w-6' />
                {toLocations.length > 0 &&
                  <>
                    <MdClose onClick={() => setToLocations([])} className=' absolute opacity-50 top-6 right-12 h-6 w-6' />
                    <div className=' border h-[200px] overflow-y-scroll'>
                      {toLocations?.map((location, index) => (
                        <p key={index} className='border-b p-2 cursor-pointer' value={location.iataCode} onClick={() => setToValue(location.iataCode)}>
                          {location.name}
                        </p>
                      ))}
                    </div>
                  </>
                }
              </div>
              <div className="flex-1">
                <input
                  onFocus={(e) => (e.target.type = 'date')}
                  onBlur={(e) => (e.target.type = 'text')}
                  type="text"
                  placeholder='Check In'
                  className="w-full rounded-lg p-3 md:p-5 border-2 text-sm md:text-xl"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  min={today}
                />
              </div>
              <div className="flex-1">
                <input
                  onFocus={(e) => (e.target.type = 'date')}
                  onBlur={(e) => (e.target.type = 'text')}
                  type="text"
                  placeholder='Check Out'
                  className="w-full rounded-lg p-3 md:p-5 border-2 text-sm md:text-xl"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  min={today}
                />
              </div>
            </div>
            <div className="relative mt-4">
              <button
                className="relative w-full md:w-11/12 rounded-lg p-3 md:p-5 border-2 text-sm md:text-xl bg-white"
                onClick={toggleDropdown}
              >
                {totalPassengers} {totalPassengers === 1 ? 'Traveler' : 'Travelers'}
              </button>
              {dropdownOpen && (
                <div className="absolute top-full left-0 w-full md:w-11/12 bg-white border-2 mt-2 p-4 rounded-lg z-10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm md:text-xl">Adults</span>
                    <div className="flex items-center space-x-2">
                      <button onClick={() => handleDecrement('adults')}>-</button>
                      <span>{travelers.adults}</span>
                      <button onClick={() => handleIncrement('adults')}>+</button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm md:text-xl">Children</span>
                    <div className="flex items-center space-x-2">
                      <button onClick={() => handleDecrement('children')}>-</button>
                      <span>{travelers.children}</span>
                      <button onClick={() => handleIncrement('children')}>+</button>
                    </div>
                  </div>
                  <button
                    className="bg-indigo-700 text-white px-4 py-2 mt-4 rounded-lg w-full md:w-auto"
                    onClick={handleApply}
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>
            <div className="mt-4">
              <button
                className="w-full md:w-11/12 bg-indigo-700 hover:bg-indigo-600 text-white text-lg md:text-xl font-bold py-2 md:py-4 rounded-lg"
                onClick={handleSearch}
              >
                Search Hotels
              </button>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600"></div>
            <div className="absolute inset-0 flex items-center justify-center text-indigo-600 text-lg font-bold">
              Loading...
            </div>
          </div>
        </div>

      ) : (
        modalVisible && (
          currentView === 'flights' ? (
            <FlightOffersModal
              flightOffers={flightOffers}
              setModalVisible={setModalVisible}
            />
          ) : (
            <HotelOffersModal
              hotelOffers={hotelOffers}
              setModalVisible={setModalVisible}
            />
          )
        ))}
      {errorMessage && (
        <ErrorModal errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
      )}
    </div>
  );
}

export default Booking;
