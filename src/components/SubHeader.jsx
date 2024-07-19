import React, { useState, useEffect } from 'react';
import { FaUserPlus } from 'react-icons/fa6';
import { IoMdLogIn } from 'react-icons/io';
import { IoMdLogOut } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';

function SubHeader({ currentView, setCurrentView }) {
  const [showFLDropdown, setShowFLDropdown] = useState(false);
  const [showENDropdown, setShowENDropdown] = useState(false);
  const [showINRDropdown, setShowINRDropdown] = useState(false);
  const [selectedFL, setSelectedFL] = useState('FL');
  const [selectedEN, setSelectedEN] = useState('ENG');
  const [selectedINR, setSelectedINR] = useState('INR');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleFLSelect = (country) => {
    setSelectedFL(country);
    setShowFLDropdown(false); // Close dropdown after selection
  };

  const handleENSelect = (language) => {
    setSelectedEN(language);
    setShowENDropdown(false); // Close dropdown after selection
  };

  const handleINRSelect = (currency) => {
    setSelectedINR(currency);
    setShowINRDropdown(false); // Close dropdown after selection
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/home');
  };

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center h-20 md:h-40 p-4 z-20 bg-white shadow-lg">
      {/* Logo and BookABed Button */}
      <div className="flex items-center justify-around w-1/2 md:w-1/3">
        <i className="bx bx-notepad text-2xl md:text-4xl cursor-pointer text-indigo-500"></i>
        <Link to='/home'>
          <h1 className="text-indigo-500 text-center text-xl md:text-4xl font-serif font-bold underline cursor-pointer">
            Book<span className="text-red-500">A</span>Bed
          </h1>
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <button
            className={`text-lg md:text-2xl font-bold text-black p-2 hover:text-indigo-500 hover:border-b-4 border-indigo-500 h-[60px] md:h-[120px] ${currentView === 'flights' ? 'text-indigo-500 border-b-4 border-indigo-00' : 'text-black bg-transparent'}`}
            onClick={() => setCurrentView('flights')}
          >
            Flights
          </button>
          <button
            className={`text-lg md:text-2xl font-bold text-black p-2 hover:text-indigo-500 hover:border-b-4 border-indigo-500 h-[60px] md:h-[120px] ${currentView === 'hotels' ? 'text-indigo-500 border-b-4 border-indigo-500' : 'text-black bg-transparent'}`}
            onClick={() => setCurrentView('hotels')}
          >
            Hotels
          </button>
        </div>
      </div>

      {/* Language and Currency */}
      <div className="md:flex w-1/2 md:w-1/3 justify-end items-center space-x-0.5 hidden">
        {/* FL Dropdown */}
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

        {/* EN Dropdown */}
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
                onClick={() => handleENSelect('English')}
              >
                English
              </button>
              <button
                className="block w-full text-left px-3 py-1 hover:bg-gray-100"
                onClick={() => handleENSelect('Spanish')}
              >
                Spanish
              </button>
              <button
                className="block w-full text-left px-3 py-1 hover:bg-gray-100"
                onClick={() => handleENSelect('French')}
              >
                French
              </button>
            </div>
          )}
        </div>

        {/* INR Dropdown */}
        <div className="relative">
          <button
            className="w-14 md:w-20 h-10 bg-slate-400 hover:bg-slate-300 rounded-br-full rounded-tr-full"
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

      {/* Login and Logout Buttons */}
      <div className="flex w-1/3 justify-start items-center space-x-5">
        {isLoggedIn ? (
          <button
            className="w-32 flex justify-center items-center h-10 bg-red-500 hover:bg-red-700 text-white rounded-full ml-5"
            onClick={handleLogout}
          >
            <IoMdLogOut className="mr-2" /> LOGOUT
          </button>
        ) : (
          <Link to="/login">
            <IoMdLogIn className='flex cursor-pointer w-8 h-8 text-indigo-500 md:hidden' />
            <button
              className={`w-32 hidden md:flex justify-center items-center h-10 hover:bg-slate-300 border-2 border-slate-200  hover:text-black rounded-full ml-5`}
            >
              LOGIN
            </button>
          </Link>
        )}
        {!isLoggedIn && (
          <Link to="/">
            <FaUserPlus className='flex cursor-pointer w-8 h-8 text-indigo-500 md:hidden' />
            <button className="w-40 hidden md:flex justify-center items-center h-10 bg-indigo-500 hover:bg-indigo-700 text-white rounded-full">
              GET STARTED
            </button>
          </Link>
        )}
      </div>
    </header>
  );
}

export default SubHeader;
