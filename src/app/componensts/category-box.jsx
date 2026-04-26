"use client"
import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, FreeMode, Navigation } from "swiper/modules"
import { ChevronLeft, ChevronRight } from "lucide-react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import { Flame } from "lucide-react"

function CategoryBox({ category }) {
  return (
    <div className="flex justify-center w-full lg:max-w-[1480px]">
      <div className="lg:w-full xl:w-[91%] w-[97%] px-2 lg:px-20 mt-10">
        <div className="text-center mb-6 px-4">
          <div className="inline-flex items-center justify-center gap-2">
            <Flame className="w-6 h-6 md:w-8 md:h-8 text-red-600 animate-pulse" />
            <h2 className="text-2xl md:text-5xl font-black text-gray-900 uppercase tracking-tight">
              Trending Now
            </h2>
            <Flame className="w-6 h-6 md:w-8 md:h-8 text-red-600 animate-pulse" />
          </div>
        </div>

        <div className="relative group">
          {/* Custom Navigation Buttons */}
          <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-50">
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>

          <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-50">
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>

          <Swiper
            modules={[FreeMode, Navigation, Autoplay]}
            spaceBetween={16}
            slidesPerView="auto"
            freeMode={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: ".swiper-button-prev-custom",
              nextEl: ".swiper-button-next-custom",
            }}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 12,
              },
              480: {
                slidesPerView: 3,
                spaceBetween: 14,
              },
              640: {
                slidesPerView: 4,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 5,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 6,
                spaceBetween: 16,
              },
              1280: {
                slidesPerView: 7,
                spaceBetween: 16,
              },
            }}
            className="py-2"
          >
            {category?.length > 0 ? (
              category.map((cat) => (
                <SwiperSlide key={cat._id} className="!w-auto inline-block border rounded-full px-5 py-2 text-sm font-semibold 
bg-black text-white cursor-pointer 
hover:shadow-md hover:border-gray-400 hover:bg-black/80 
transition-all duration-1400 whitespace-nowrap 
animate-pulse">
                  <Link
                    href={`/collection/${cat._id}?name=${cat.name}`}

                  >
                    {cat.name}
                  </Link>
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <p className="text-center text-gray-500">No categories found</p>
              </SwiperSlide>
            )}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default CategoryBox
