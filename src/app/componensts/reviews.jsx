

"use client";

import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React from "react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/effect-cards";

import { cn } from "@/lib/utils";

const Skiper50 = () => {
const images = [
  {
    src: "/reviews/r1.jpeg",
    alt: "Illustrations by my fav AarzooAly",
    code: "# 23",
  },
  {
    src: "/reviews/r2.jpeg",
    alt: "Illustrations by my fav AarzooAly",
    code: "# 23",
  },
  {
    src: "/reviews/r3.jpeg",
    alt: "Illustrations by my fav AarzooAly",
    code: "# 23",
  },
  {
    src: "/reviews/r4.jpeg",
    alt: "Illustrations by my fav AarzooAly",
    code: "# 23",
  },
  {
    src: "/reviews/r5.jpeg",
    alt: "Illustrations by my fav AarzooAly",
    code: "# 23",
  },
  {
    src: "/reviews/r6.jpeg",
    alt: "Illustrations by my fav AarzooAly",
    code: "# 23",
  },
  {
    src: "/reviews/r7.jpeg",
    alt: "Illustrations by my fav AarzooAly",
    code: "# 23",
  },
  {
    src: "/reviews/r8.jpeg",
    alt: "Illustrations by my fav AarzooAly",
    code: "# 23",
  },
  {
    src: "/reviews/r9.jpeg",
    alt: "Illustrations by my fav AarzooAly",
    code: "# 23",
  },
  {
    src: "/reviews/r10.jpeg",
    alt: "Illustrations by my fav AarzooAly",
    code: "# 23",
  },
  {
    src: "/reviews/r11.jpeg",
    alt: "Illustrations by my fav AarzooAly",
    code: "# 23",
  },
  {
    src: "/reviews/r12.jpeg",
    alt: "Illustrations by my fav AarzooAly",
    code: "# 23",
  },
  {
    src: "/reviews/r13.jpeg",
    alt: "Illustrations by my fav AarzooAly",
    code: "# 23",
  },
  {
    src: "/reviews/r14.jpeg",
    alt: "Illustrations by my fav AarzooAly",
    code: "# 23",
  },
  {
    src: "/reviews/r15.jpeg",
    alt: "Illustrations by my fav AarzooAly",
    code: "# 23",
  },
  {
    src: "/reviews/r16.jpeg",
    alt: "Illustrations by my fav AarzooAly",
    code: "# 23",
  },
  {
    src: "/reviews/r17.jpeg",
    alt: "Illustrations by my fav AarzooAly",
    code: "# 23",
  },
  {
    src: "/reviews/r18.jpeg",
    alt: "Illustrations by my fav AarzooAly",
    code: "# 23",
  },
  {
    src: "/reviews/r19.jpeg",
    alt: "Illustrations by my fav AarzooAly",
    code: "# 23",
  },
  {
    src: "/reviews/r20.jpeg",
    alt: "Illustrations by my fav AarzooAly",
    code: "# 23",
  },
  {
    src: "/reviews/r21.jpeg",
    alt: "Illustrations by my fav AarzooAly",
    code: "# 23",
  },
  {
    src: "/reviews/r22.jpeg",
    alt: "Illustrations by my fav AarzooAly",
    code: "# 23",
  },
  {
    src: "/reviews/r23.jpeg",
    alt: "Illustrations by my fav AarzooAly",
    code: "# 23",
  },

 
];

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-[#f5f4f3]">
      <Carousel_003 className="" images={images} showPagination loop />
    </div>
  );
};

export { Skiper50 };

const Carousel_003 = ({
  images,
  className,
  showPagination = false,
  showNavigation = false,
  loop = true,
  autoplay = false,
  spaceBetween = 0,
}) => {
  const css = `
  .Carousal_003 {
    width: 100%;
    height: 350px;
    padding-bottom: 50px !important;
  }
  
  .Carousal_003 .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
  }

  .swiper-pagination-bullet {
    background-color: #000 !important;
  }

`;
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.5,
      }}
      className={cn("relative lg:w-full xl:w-[91%] w-[97%] px-2 md:px-20 pb-2 lg:w-max-[1480px] py-20", className)}
    >
      <style>{css}</style>
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Our Reviews
      </h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <Swiper
          spaceBetween={spaceBetween}
          autoplay={
            autoplay
              ? {
                  delay: 1500,
                  disableOnInteraction: true,
                }
              : false
          }
          effect="coverflow"
          grabCursor={true}
          slidesPerView="auto"
          centeredSlides={true}
          loop={loop}
          coverflowEffect={{
            rotate: 40,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={
            showPagination
              ? {
                  clickable: true,
                }
              : false
          }
          navigation={
            showNavigation
              ? {
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }
              : false
          }
          className="Carousal_003"
          modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="bg-white rounded-lg">
              <img
                className="h-full w-full object-bottom object-contain rounded-lg"
                src={image.src}
                alt={image.alt}
              />
            </SwiperSlide>
          ))}
          {showNavigation && (
            <div>
              <div className="swiper-button-next after:hidden">
                <ChevronRightIcon className="h-6 w-6 text-white" />
              </div>
              <div className="swiper-button-prev after:hidden">
                <ChevronLeftIcon className="h-6 w-6 text-white" />
              </div>
            </div>
          )}
        </Swiper>
      </motion.div>
    </motion.div>
  );
};

export { Carousel_003 };

