import React from "react";
import Image from "next/image";
import Link from "next/link";

function Banner() {
  return (
    <div className="relative w-full  flex items-center justify-center overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Revodials2.jpg"
          alt="Premium Watches"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center pt-10">
        {/* Scarcity / Trust Badge */}
        <div className="mb-6 inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/40 backdrop-blur-md shadow-[0_0_20px_rgba(234,179,8,0.25)] hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] hover:scale-105 transition-all duration-500 cursor-default">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-80"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-r from-yellow-300 to-yellow-500 shadow-[0_0_10px_rgba(253,224,71,0.8)]"></span>
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-500 text-sm font-black tracking-[0.25em] uppercase drop-shadow-lg">
            Sale is live
          </span>
        </div>

        {/* Headlines */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-4 leading-tight drop-shadow-2xl">
          UPGRADE YOUR STYLE <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500">
            WITH REVODIALS WATCHES
          </span>
        </h1>

        <p className="max-w-2xl text-lg sm:text-xl md:text-2xl text-gray-300 mb-10 font-medium">
          Casual, Party Wear & Shalwar Kameez Watches. Available at the Best Price
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-16">
          <Link href="#product" className="group relative items-center justify-center w-full sm:w-auto">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 opacity-70 group-hover:opacity-100 blur transition duration-500 group-hover:duration-200 animate-pulse"></div>
            <button className="relative w-full sm:w-auto py-3 cursor-pointer  sm:px-8 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-xl rounded-full shadow-2xl transition-all duration-300 transform group-hover:scale-105 uppercase tracking-wide">
              Shop Now & Save
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Banner;
