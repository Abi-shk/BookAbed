import React from 'react';
import Foooter from './Foooter';
import Booking from './Booking';
import Carousel from './Carousel';
import Icons from './Icons';
import mainBg from '../assets/mainBg.jpg';



function Home({token}) {

  return (
   

    <div className="relative min-h-screen">
      {/* Container for image */}
      <div className="absolute inset-0">
        <img
          src={mainBg}
          alt=""
          className="w-full h-[400px] md:h-[600px] object-cover"
        />
    

           
    
        {/* Flight Image */}
     
          {/* <img
            src="https://img.freepik.com/free-vector/travel-concept-with-landmarks_1057-4873.jpg?t=st=1718699134~exp=1718702734~hmac=23588318609b7eacddad417b83d143b87436d439d85e9ec175e74c9af7331049&w=826"
            alt="Flight"
            className="w-full object-cover"
          /> */}
        
   
  
      <div className="flex-col items-center justify-center h-full">
          <Icons />
          <Carousel />
      </div>
 
      
         
        
         
      
      </div>
     
      {/* Booking Section */}
     
     <Booking token = {token} />


       {/* Footer  */}

      <Foooter/>

    </div>
  );
}

export default Home;
