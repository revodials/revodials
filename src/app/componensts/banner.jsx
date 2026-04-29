import React from "react";
import Image from "next/image";
import Link from "next/link";

function Banner() {
  return (
    <section className="relative w-full h-[85vh] min-h-[600px] flex items-center overflow-hidden bg-zinc-950">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Image
          src="/Revodials2.jpg"
          alt="Premium Timepieces"
          fill
          priority
          quality={100}
          className="object-cover object-center lg:object-right transition-transform duration-[20s] ease-out scale-105 hover:scale-110"
        />
        {/* Refined Luxury Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent sm:w-3/4 lg:w-2/3 z-10"></div>
        {/* Extra darkening for mobile readability */}
        <div className="absolute inset-0 bg-black/50 md:hidden z-10"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-20 container mx-auto px-6 sm:px-10 lg:px-16 flex sm:items-center h-full">

        {/* Text Box - Left Aligned for an editorial/magazine look */}
        <div className="max-w-2xl text-left pt-12 relative">

          {/* Subtle Glow behind text to make it pop */}
          <div className="absolute -inset-x-20 -inset-y-20 bg-yellow-900/10 blur-[100px] rounded-full z-0 pointer-events-none"></div>

          <div className="relative z-10">
            {/* Subtle Top Label */}
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="h-[1px] w-16 bg-gradient-to-r from-yellow-600 to-yellow-300"></div>
              <span className="text-yellow-400 font-medium tracking-[0.3em] uppercase text-xs sm:text-sm drop-shadow-md">
                The New Standard
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-[12vw] sm:text-6xl md:text-7xl lg:text-8xl font-light text-white tracking-tighter mb-10 leading-[1.05]">
              <span className="whitespace-nowrap">Upgrade your style</span> <br className="hidden sm:block" />
              <span className="font-medium mt-2 sm:mt-0 text-[12vw] sm:text-6xl md:text-7xl lg:text-7xl text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                WITH REVO DIALS
              </span>
            </h1>

            {/* Highly Attractive Luxury CTA */}
            <div className="flex flex-col sm:flex-row gap-6 items-start mt-4">
              <Link href="#product" className="group w-full sm:w-auto">
                <div className="relative w-full sm:w-auto">
                  {/* Glowing background effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 via-yellow-300 to-yellow-600 opacity-40 group-hover:opacity-80 blur-md transition duration-500 animate-pulse"></div>

                  <button className="w-full sm:w-auto relative bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-3 sm:py-3 rounded font-bold tracking-[0.15em] uppercase text-sm sm:text-base transition-all duration-300 transform group-hover:-translate-y-1 group-hover:shadow-[0_10px_40px_rgba(234,179,8,0.5)] flex items-center justify-center gap-4">
                    <span className="relative whitespace-nowrap z-10">Explore Collection</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </button>
                </div>
              </Link>
            </div>

            {/* Minimal Trust Indicators - Glassmorphism style */}
            <div className="mt-10 flex flex-wrap items-center gap-8 sm:gap-12 border-t border-white/10 pt-8 ">
              <div className="flex items-center gap-3 cursor-default">
                <div className="p-2.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 transition-all duration-300">
                  <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                </div>
                <div className="text-[10px] sm:text-xs text-gray-200 uppercase tracking-[0.2em] font-medium">Premium</div>
              </div>
              <div className="flex items-center gap-3 cursor-default">
                <div className="p-2.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 transition-all duration-300">
                  <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div className="text-[10px] sm:text-xs text-gray-200 uppercase tracking-[0.2em] font-medium">Free Shipping</div>
              </div>
              <div className="flex items-center gap-3 cursor-default">
                <div className="p-2.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 transition-all duration-300">
                  <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                </div>
                <div className="text-[10px] sm:text-xs text-gray-200 uppercase tracking-[0.2em] font-medium">Cash on Delivery</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Banner;
