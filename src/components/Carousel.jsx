import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// Import your existing style.css if any

// import required modules
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

export default function Carousel() {
  return (
    <>
      <style>
        {`
          #app { height: 100% }
          html,
          body {
            position: relative;
            height: 100%;
          }

          body {
            background: #eee;
            font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
            font-size: 14px;
            color: #000;
            margin: 0;
            padding: 0;
          }

          .swiper {
            width: 100%;
            padding-top: 50px;
            padding-bottom: 50px;
            text-align: center;
            font-size:25px;
            font-weight:bold;
          }

          .swiper-slide {
            background-position: center;
            background-size: cover;
            width:40%;
            height: auto;
            margin-bottom:80px;
          }

          .swiper-slide img {
            display: block;
            width: 100%;
            border-radius: 20px;
          }
            @media (max-width:400px){
            .swiper-slide {
            background-position: center;
            background-size: cover;
            width:80%;
            height: auto;
          }
            }
        `}
      </style>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="https://img.freepik.com/free-vector/travel-sale-landing-page-theme_23-2148633810.jpg?t=st=1720179037~exp=1720182637~hmac=dda0294af3df21918b1e5e4b6a8c8c7dce409ca60cdd4030b205c12e4903a94b&w=1380" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://img.freepik.com/free-vector/flat-design-airline-company-infographic_23-2149647134.jpg?t=st=1720180128~exp=1720183728~hmac=82bec07b15d66f3975caa748eb6aa2773d6bb72819456004740aa9a7f8e55ccf&w=1380" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://img.freepik.com/free-vector/travel-sale-home-page-with-photo_23-2148627844.jpg?t=st=1720180186~exp=1720183786~hmac=8fd77bec224e0b7b17ce7a6885b2b9e2ffccf4a22709f6f4c8564d8e5574e41d&w=1380" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://img.freepik.com/free-vector/hand-drawn-study-abroad-horizontal-banner_23-2150303527.jpg?t=st=1720180203~exp=1720183803~hmac=f62985ce1d2afca1ca87ed07f3622621edf4cc659cf151ba446e673f248812fe&w=1380" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://img.freepik.com/free-vector/travel-sale-landing-page-template_23-2148626308.jpg?t=st=1720180245~exp=1720183845~hmac=e43a7b27c6d1666643aa3469830ee36abc85c3315a564d668230ce33cb86e468&w=1380" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://img.freepik.com/free-vector/travel-sale-landing-page-theme_23-2148633810.jpg?t=st=1720179037~exp=1720182637~hmac=dda0294af3df21918b1e5e4b6a8c8c7dce409ca60cdd4030b205c12e4903a94b&w=1380" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://img.freepik.com/free-vector/flat-design-airline-company-infographic_23-2149647134.jpg?t=st=1720180128~exp=1720183728~hmac=82bec07b15d66f3975caa748eb6aa2773d6bb72819456004740aa9a7f8e55ccf&w=1380" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://img.freepik.com/free-vector/travel-sale-home-page-with-photo_23-2148627844.jpg?t=st=1720180186~exp=1720183786~hmac=8fd77bec224e0b7b17ce7a6885b2b9e2ffccf4a22709f6f4c8564d8e5574e41d&w=1380" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://img.freepik.com/free-vector/hand-drawn-study-abroad-horizontal-banner_23-2150303527.jpg?t=st=1720180203~exp=1720183803~hmac=f62985ce1d2afca1ca87ed07f3622621edf4cc659cf151ba446e673f248812fe&w=1380" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://img.freepik.com/free-vector/travel-sale-landing-page-template_23-2148626308.jpg?t=st=1720180245~exp=1720183845~hmac=e43a7b27c6d1666643aa3469830ee36abc85c3315a564d668230ce33cb86e468&w=1380" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
