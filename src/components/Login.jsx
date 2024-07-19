import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        const response = await axios.post('https://bookabed-backend.onrender.com/api/login', { email, password });
        if (response.data.success) {
          login(response.data);
          setLoading(false);
        } else {
          setErrors({ general: 'Invalid email or password' });
          setLoading(false);
          alert("Invalid email or password");
        }
      } catch (error) {
        setErrors({ general: 'An error occurred. Please try again.' });
        setLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5 relative">
      {loading && (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-90 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <svg aria-hidden="true" class="w-20 h-20 mb-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
            <p className="text-white text-2xl font-semibold">Logging in...</p>
          </div>
        </div>
      )}
      {!loading && (
        <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style={{ maxWidth: '1000px' }}>
          <div className="md:flex w-full">
            <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
              <div className="text-center mb-5">
                <h1 className="font-extrabold text-3xl text-gray-900">LOGIN</h1>
                <p className='mt-10 font-bold text-lg text-gray-500'>Enter your credentials to login</p>
              </div>
              <form onSubmit={handleSubmit}>
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
                        className="w-full -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="johnsmith@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-2 ml-2">{errors.email}</p>}
                  </div>
                </div>
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
                        className="w-full -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="************"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-2 ml-2">{errors.password}</p>}
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <button type="submit" className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">
                      LOGIN
                    </button>
                    <div className='mt-3 pl-1 text-center'>
                      <h3 className='mb-3'>Don't have an Account?</h3>
                      <Link to="/" className='text-blue-800 font-extrabold'>
                        Create an Account<i className='bx bx-right-arrow-alt font-extrabold m-1'></i>
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
            <div className="hidden md:block w-1/2 bg-indigo-500 py-10 px-10">
              <img
                src="https://cdn3.iconfinder.com/data/icons/hotel-service-staff-chef-waiter-and-receptionist/66/47-256.png"
                alt="Background"
                style={{ width: '100%', height: 'full' }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
