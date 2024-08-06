import React from 'react';
import Foooter from './Foooter';
import Booking from './Booking';
import Carousel from './Carousel';
import Icons from './Icons';
import mainBg from '../assets/mainBg.jpg';



function Home({ token }) {

  return (

    <div className="relative min-h-screen">
      {/* Container for image */}
      <div className="absolute inset-0">
        <img
          src={mainBg}
          alt=""
          className="w-full h-[400px] md:h-[600px] object-cover"
        />

        <div className="flex-col items-center justify-center h-full">
          <Icons />
          <Carousel />
        </div>

      </div>

      {/* Booking Section */}

      <Booking token={token} />

      {/* Footer  */}

      <Foooter />

    </div>
  );
}

export default Home;
