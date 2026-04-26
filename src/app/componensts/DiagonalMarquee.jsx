"use client";
import { Fragment, useState } from "react";

const DiagonalMarquee = ({ deg, marquees, classNames, borderprops }) => {
  const [isHover, setIsHover] = useState(false);

  const offers = [
    "Free Shipping",
    "Luxury watches for Luxury People!",
    "Wear the Watch. Own the Style!",
    "Secure Payment",
    "Fast Delivery",
    "Turn Heads, One Tick at a Time!",
    "Branded Watches for Every Occasion!",
    "Extreme Luxury, Extreme Style!",
  ];

  return (
    <div
      className={`flex space-x-16 h-[15vh] md:h-[18vh] items-center whitespace-nowrap ${deg} rounded-full ${classNames} overflow-hidden`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        className={`flex  ${marquees}  transition-all ease-in-out duration-1500`}
      >
        {Array.from({ length: 2 }).map((_, idx) => (
          <Fragment key={idx}>
            {offers.map((item, index) => (
              <span
                key={index}
                className={`text-2xl lg:text-4xl ${
                  borderprops
                    ? `${borderprops} font-semibold`
                    : "text-white font-bold"
                }   hover:text-[#D4AF37] transition-all duration-300 ease-in-out`}
              >
                {item}
              </span>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default DiagonalMarquee;
