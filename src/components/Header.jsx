import React, { useEffect, useState } from 'react';
import { FaUserPlus, FaBars, FaTimes } from 'react-icons/fa';
import { IoMdLogIn, IoMdLogOut } from 'react-icons/io';
import { RxAvatar } from "react-icons/rx";
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header({ currentView, setCurrentView }) {
  // State variables to manage scroll position, dropdowns, and mobile menu visibility
  const [scrolled, setScrolled] = useState(false);
  const [showFLDropdown, setShowFLDropdown] = useState(false);
  const [showENDropdown, setShowENDropdown] = useState(false);
  const [showINRDropdown, setShowINRDropdown] = useState(false);
  const [selectedFL, setSelectedFL] = useState('FL');
  const [selectedEN, setSelectedEN] = useState('ENG');
  const [selectedINR, setSelectedINR] = useState('INR');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  const { logout, user } = useAuth();  // Destructure logout function and user object from AuthContext

  // Handle scroll event to apply a shadow to the header when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);  // Set scrolled state based on window scroll position
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);  // Clean up event listener on unmount
    };
  }, []);

  // Functions to handle selection changes in dropdowns
  const handleFLSelect = (country) => {
    setSelectedFL(country);
    setShowFLDropdown(false);
  };

  const handleENSelect = (language) => {
    setSelectedEN(language);
    setShowENDropdown(false);
  };

  const handleINRSelect = (currency) => {
    setSelectedINR(currency);
    setShowINRDropdown(false);
  };

  // Function to handle logout
  const handleLogout = () => {
    logout();
  };

  // Toggle the mobile menu visibility
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full flex justify-between items-center h-20 md:h-40 p-4 z-20 gap-3 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent'
        }`}
    >
      {/* Logo and Navigation Buttons */}
      <div className="flex items-center justify-around w-1/2 md:w-1/3">
        <Link to={'/todos'}>
          <i
            className={`bx bx-notepad text-2xl md:text-4xl cursor-pointer ${scrolled ? 'text-indigo-500' : 'text-white'
              }`}
          ></i>
        </Link>
        <Link to='/home'>
          <h1 className="text-indigo-500 text-center text-xl md:text-4xl font-serif font-bold underline cursor-pointer">
            Book<span className="text-red-500">A</span>Bed
          </h1>
        </Link>
        {scrolled && (
          <div className="hidden md:flex items-center space-x-6">
            {/* Buttons to switch between Flights and Hotels views */}
            <button
              className={`text-lg md:text-2xl font-bold text-black p-2 hover:text-indigo-500 hover:border-b-4 border-indigo-500 h-[60px] md:h-[120px] ${currentView === 'flights' ? 'text-indigo-500 border-b-4 border-green-60' : 'text-black bg-transparent'
                }`}
              onClick={() => setCurrentView('flights')}
            >
              Flights
            </button>
            <button
              className={`text-lg md:text-2xl font-bold text-black p-2 hover:text-indigo-500 hover:border-b-4 border-indigo-500 h-[60px] md:h-[120px] ${currentView === 'hotels' ? 'text-indigo-500 border-b-4 border-green-60' : 'text-black bg-transparent'
                }`}
              onClick={() => setCurrentView('hotels')}
            >
              Hotels
            </button>
          </div>
        )}
      </div>

      {/* Language and Currency Dropdowns */}
      <div className="md:flex w-1/2 md:w-1/3 justify-end items-center space-x-0.5 hidden">
        {/* Country Dropdown */}
        <div className="relative">
          <button
            className="w-14 md:w-20 h-10 bg-slate-400 hover:bg-slate-300 rounded-tl-full rounded-bl-full"
            onClick={() => setShowFLDropdown(!showFLDropdown)}
          >
            {selectedFL}
            <i className="bx bxs-down-arrow ml-1 text-slate-500"></i>
          </button>
          {showFLDropdown && (
            <div className="absolute top-full left-0 w-28 bg-white shadow-lg rounded-b-lg border border-gray-200">
              <button
                className="block w-full text-left px-3 py-1 hover:bg-gray-100"
                onClick={() => handleFLSelect('India')}
              >
                India
              </button>
              <button
                className="block w-full text-left px-3 py-1 hover:bg-gray-100"
                onClick={() => handleFLSelect('USA')}
              >
                USA
              </button>
              <button
                className="block w-full text-left px-3 py-1 hover:bg-gray-100"
                onClick={() => handleFLSelect('UK')}
              >
                UK
              </button>
            </div>
          )}
        </div>

        {/* Language Dropdown */}
        <div className="relative">
          <button
            className="w-14 md:w-20 h-10 bg-slate-400 hover:bg-slate-300"
            onClick={() => setShowENDropdown(!showENDropdown)}
          >
            {selectedEN}
            <i className="bx bxs-down-arrow ml-1 text-slate-500"></i>
          </button>
          {showENDropdown && (
            <div className="absolute top-full left-0 w-28 bg-white shadow-lg rounded-b-lg border border-gray-200">
              <button
                className="block w-full text-left px-3 py-1 hover:bg-gray-100"
                onClick={() => handleENSelect('Eng')}
              >
                English
              </button>
              <button
                className="block w-full text-left px-3 py-1 hover:bg-gray-100"
                onClick={() => handleENSelect('Span')}
              >
                Spanish
              </button>
              <button
                className="block w-full text-left px-3 py-1 hover:bg-gray-100"
                onClick={() => handleENSelect('Fren')}
              >
                French
              </button>
            </div>
          )}
        </div>

        {/* Currency Dropdown */}
        <div className="relative">
          <button
            className="w-14 md:w-20 h-10 bg-slate-400 hover:bg-slate-300 rounded-tr-full rounded-br-full"
            onClick={() => setShowINRDropdown(!showINRDropdown)}
          >
            {selectedINR}
            <i className="bx bxs-down-arrow ml-1 text-slate-500"></i>
          </button>
          {showINRDropdown && (
            <div className="absolute top-full left-0 w-28 bg-white shadow-lg rounded-b-lg border border-gray-200">
              <button
                className="block w-full text-left px-3 py-1 hover:bg-gray-100"
                onClick={() => handleINRSelect('INR')}
              >
                INR
              </button>
              <button
                className="block w-full text-left px-3 py-1 hover:bg-gray-100"
                onClick={() => handleINRSelect('USD')}
              >
                USD
              </button>
              <button
                className="block w-full text-left px-3 py-1 hover:bg-gray-100"
                onClick={() => handleINRSelect('EUR')}
              >
                EUR
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Toggle Button */}
      <button
        className="md:hidden text-white text-3xl"
        onClick={toggleMobileMenu}
      >
        {showMobileMenu ? <FaTimes /> : <FaBars className='text-indigo-700'/>}
      </button>

      {/* Login, Logout, and Get Started Buttons */}
      <div className="w-1/3 justify-start items-center space-x-5 hidden md:flex">
        {user ? (
          <>
            <button className="w-40 gap-2 flex justify-center items-center h-10 bg-blue-400 hover:bg-blue-300 text-white rounded-full">
              <RxAvatar className="text-white font-mono font-bold text-xl" />
              <span className="text-white font-mono font-bold text-lg">{user.firstName}</span>
            </button>
            <button
              className="w-32 flex justify-center items-center h-10 bg-red-500 hover:bg-red-700 text-white rounded-full ml-5"
              onClick={handleLogout}
            >
              <IoMdLogOut className="mr-2" /> LOGOUT
            </button>
            <Link to="/history">
              <FaUserPlus className="flex cursor-pointer w-8 h-8 text-indigo-500 md:hidden" />
              <button className="w-40 hidden md:flex justify-center items-center h-10 bg-indigo-500 hover:bg-indigo-700 text-white rounded-full">
                Bookings
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">
              <IoMdLogIn className="flex cursor-pointer w-8 h-8 text-indigo-500 md:hidden" />
              <button
                className={`w-32 hidden md:flex justify-center items-center h-10 hover:bg-slate-300 hover:text-black rounded-full ${scrolled ? 'bg-white text-black border border-blue-200' : 'backdrop-brightness-50 text-white'
                  }`}
              >
                LOGIN
              </button>
            </Link>
            <Link to="/">
              <FaUserPlus className="flex cursor-pointer w-8 h-8 text-indigo-500 md:hidden" />
              <button className="w-40 hidden md:flex justify-center items-center h-10 bg-indigo-500 hover:bg-indigo-700 text-white rounded-full">
                GET STARTED
              </button>
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex flex-col items-center justify-center z-30 md:hidden">
          {user ? (
            <>
              <button className="w-40 gap-2 flex justify-center items-center h-10 bg-blue-400 hover:bg-blue-300 text-white rounded-full mb-4">
                <RxAvatar className="text-white font-mono font-bold text-xl" />
                <span className="text-white font-mono font-bold text-lg">{user.firstName}</span>
              </button>
              <button
                className="w-32 flex justify-center items-center h-10 bg-red-500 hover:bg-red-700 text-white rounded-full mb-4"
                onClick={handleLogout}
              >
                <IoMdLogOut className="mr-2" /> LOGOUT
              </button>
              <Link to="/history" onClick={toggleMobileMenu}>
                <button className="w-40 flex justify-center items-center h-10 bg-indigo-500 hover:bg-indigo-700 text-white rounded-full mb-4">
                  Bookings
                </button>
              </Link>
              <Link to="/">
                <button className="w-32 md:flex justify-center items-center h-10 bg-red-800 hover:bg-red-600 text-white rounded-full mt-24">
                  Cancel
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" onClick={toggleMobileMenu}>
                <button
                  className={`w-32 flex justify-center items-center h-10 hover:bg-slate-300 hover:text-black rounded-full mb-4 ${scrolled ? 'bg-white text-black border border-blue-200' : 'backdrop-brightness-50 text-white'
                    }`}
                >
                  LOGIN
                </button>
              </Link>
              <Link to="/" onClick={toggleMobileMenu}>
                <button className="w-40 flex justify-center items-center h-10 bg-indigo-500 hover:bg-indigo-700 text-white rounded-full mb-4">
                  GET STARTED
                </button>
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
