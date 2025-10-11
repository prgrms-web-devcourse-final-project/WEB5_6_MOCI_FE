"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import SlideIntro from "./SlideIntro";
import SlideChat from "./SlideChat";
import SlideArchive from "./SlideArchive";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper/modules";

export default function LandingSwiper() {
  return(
    <div className="w-full h-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop
        style={{
          "--swiper-theme-color": "#008b09", 
        } as React.CSSProperties}
        className="w-full h-full"
      >
        <SwiperSlide>
          <SlideIntro/>
        </SwiperSlide>
         <SwiperSlide>
          <SlideChat/>
        </SwiperSlide>
         <SwiperSlide>
          <SlideArchive/>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}