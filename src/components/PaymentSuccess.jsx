import React from 'react';
import { SiTicktick } from 'react-icons/si';
import { Link } from 'react-router-dom';

function PaymentSuccess() {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex items-center justify-center">
        <div className="flex justify-center items-center h-[200px] w-[300px] shadow-xl rounded-lg bg-slate-300 text-center">
          <h1 className="text-green-500 font-mono text-2xl font-bold flex">
            Payment Success <SiTicktick className="text-3xl ml-2" />
          </h1>
        </div>
        <Link to="/" className="text-blue-800 font-extrabold mb-2">
          Click here to Continue Booking
          <i className="bx bx-right-arrow-alt font-extrabold m-1 transition duration-300 ease-in-out"></i>
        </Link>
      </div>
    </div>
  );
}

export default PaymentSuccess;
