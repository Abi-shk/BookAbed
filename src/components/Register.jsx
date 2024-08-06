import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  // State variables to manage form inputs and errors
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Function to validate form inputs
  const validate = () => {
    const newErrors = {};
    // Check if the first name is provided
    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    // Check if the last name is provided
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    // Validate the email field
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid';
    }
    // Validate the password field
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors; // Return any validation errors
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const newErrors = validate(); // Validate the inputs
    if (Object.keys(newErrors).length === 0) { // No validation errors
      try {
        // Send a POST request to register the user
        const response = await axios.post('https://bookabed-backend.onrender.com/api/register', {
          firstName,
          lastName,
          email,
          password,
        });
        if (response.data.success) {
          // Redirect to login page on successful registration
          navigate('/login');
        } else {
          // Set general error message if registration fails
          setErrors({ general: response.data.message });
        }
      } catch (error) {
        // Handle different error scenarios
        if (error.response && error.response.status === 400 && error.response.data.message === 'Email already exists') {
          setErrors({ email: 'Email already exists' }); // Specific error for duplicate email
        } else {
          console.error('Registration error:', error); // Log unexpected errors
          setErrors({ general: 'An error occurred. Please try again.' });
        }
      }
    } else {
      // Set validation errors if there are any
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
      {/* Container for registration form */}
      <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style={{ maxWidth: '1000px' }}>
        <div className="md:flex w-full">
          {/* Background image for larger screens */}
          <div className="hidden md:block w-1/2 bg-indigo-500 py-10 px-10">
            <img 
              src="https://cdni.iconscout.com/illustration/premium/thumb/woman-booking-hotel-online-3862325-3213896.png" 
              alt="Background"
              className='w-full mt-20'
            />           
          </div>
          {/* Form section */}
          <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
            <div className="text-center mb-5">
              <h1 className="font-extrabold text-3xl text-gray-900">REGISTER</h1>
              <p className='mt-10 font-bold text-lg text-gray-500'>Enter your information to register</p>
            </div>
            <form onSubmit={handleSubmit}>
              {/* First name input */}
              <div className="flex -mx-3">
                <div className="w-1/2 px-3 mb-5">
                  <label htmlFor="firstName" className="text-xs font-semibold px-1">First name</label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                    </div>
                    <input
                      type="text"
                      id="firstName"
                      className={`w-full -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 focus:border-indigo-500 outline-none ${errors.firstName ? 'border-red-500' : 'border-gray-200'}`}
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  {errors.firstName && <p className="text-red-500 text-xs mt-2 ml-2">{errors.firstName}</p>}
                </div>
                {/* Last name input */}
                <div className="w-1/2 px-3 mb-5">
                  <label htmlFor="lastName" className="text-xs font-semibold px-1">Last name</label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                    </div>
                    <input
                      type="text"
                      id="lastName"
                      className={`w-full -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 focus:border-indigo-500 outline-none ${errors.lastName ? 'border-red-500' : 'border-gray-200'}`}
                      placeholder="Smith"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  {errors.lastName && <p className="text-red-500 text-xs mt-2 ml-2">{errors.lastName}</p>}
                </div>
              </div>
              {/* Email input */}
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <label htmlFor="email" className="text-xs font-semibold px-1">Email</label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                    </div>
                    <input
                      type="email"
                      id="email"
                      className={`w-full -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 focus:border-indigo-500 outline-none ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                      placeholder="johnsmith@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-2 ml-2">{errors.email}</p>}
                </div>
              </div>
              {/* Password input */}
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-12">
                  <label htmlFor="password" className="text-xs font-semibold px-1">Password</label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                    </div>
                    <input
                      type="password"
                      id="password"
                      className={`w-full -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 focus:border-indigo-500 outline-none ${errors.password ? 'border-red-500' : 'border-gray-200'}`}
                      placeholder="************"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-2 ml-2">{errors.password}</p>}
                </div>
              </div>
              {/* General error message */}
              {errors.general && <p className="text-red-500 text-xs text-center mb-2">{errors.general}</p>}
              {/* Submit button */}
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <button type="submit" className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">
                    REGISTER NOW
                  </button>
                  {/* Links for existing account and home page */}
                  <div className='mt-3 pl-1 text-center'>
                    <h3 className='mb-3'>Already have an Account?</h3> 
                    <Link to="/login" className='text-blue-800 font-extrabold mb-2'>
                      Login<i className='bx bx-right-arrow-alt font-extrabold m-1 transition duration-300 ease-in-out'></i>
                    </Link>
                  </div>
                  <Link to='/home'>
                    <h1 className="text-indigo-500 text-center text-xl md:text-4xl font-serif font-bold underline mt-24 cursor-pointer">
                      Book<span className="text-red-500">A</span>Bed
                    </h1>
                  </Link> 
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
