"use client";
import React, { Fragment, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { BsPlus } from "react-icons/bs";

function CarouselMarquee() {
  const arr3 = [
    {
      img: "/logo-4.webp",
      text: "Tissot",
      para: "Tissot is a Swiss luxury watchmaker.",
    },
    {
      img: "/logo-8.webp",
      text: "Rolex",
      para: "Rolex is a luxury watchmaker.",
    },
    {
      img: "/logo-7.webp",
      text: "Patek Philippe",
      para: "Patek Philippe is a Swiss luxury watch manufacturer.",
    },
    {
      img: "/logo-8.webp",
      text: "Tag Heuer",
      para: "Tag Heuer is a Swiss watchmaker known for its sports watches.",
    },
    {
      img: "/logo-2.webp",
      text: "Hublot",
      para: "Hublot is a Swiss luxury watchmaker known for its bold designs.",
    },
  ];
  const [box, setBox] = useState({
    reverse: true,
  });
  const { reverse } = box;
  return (
   <div className=" w-full bg-black flex items-center justify-center my-6">
      <div className="flex-col lg:w-full xl:w-[91%] w-[97%] px-2 md:px-20 lg:w-max-[1480px] lg:justify-center flex lg:flex-row gap-26 lg:gap-2 mt-20 pb-20">
        <div className="w-full lg:w-[55%] h-[50vh] lg:h-[60vh] flex flex-col  justify-center gap-4 lg:px-10">
          <div className="w-fit p-2 border-[1px] border-white bg-black rounded-3xl h-[2rem] flex justify-center items-center gap-1">
            <BsPlus size={28} className="text-white" />
            <p className="font-semibold text-lg text-white">Brands</p>
          </div>
          <p className="font-medium text-4xl md:text-4xl ">
            <span className="text-white text-5xl font-medium xl:text-5xl">
              Crafted for Brand{" "}
              <span className="text-yellow-600">Excellence</span>
            </span>
          </p>
          <p className="text-white/50  text-lg">
            Discover the world’s most renowned watch brands, where precision
            meets artistry. Each brand embodies a legacy of innovation, luxury,
            and timeless design.
          </p>
        </div>
        {/* second div */}
        <div className="w-full lg:w-[45rem] lg:px-4 h-[40vh] lg:h-[60vh]   flex flex-col items-center justify-center">
          <div className="overflow-hidden w-full  ">
            <div className=" flex justify-center lg:w-full">
              <motion.div
                className="flex flex-col gap-6 items-center justify-center  w-full  "
                animate={{
                  y: reverse ? "-50%" : 0,
                }}
                initial={{
                  y: reverse ? "-0%" : 0,
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {Array.from({ length: 2 }).map((_, index) => (
                  <Fragment key={index}>
                    {arr3
                      .slice()
                      .reverse()
                      .map((item, index) => {
                        return (
                          <div
                            className="flex flex-col  justify-center  gap-3 h-[15rem]  lg:h-[14rem] w-full lg:w-[13rem]  md:w-[20rem] md:h-[13rem]  p-4 items-center rounded-3xl bg-neutral-900 "
                            key={index}
                          >
                            <div className=" h-[90px] p-2 bg-white w-[90px]  rounded-full overflow-hidden">
                              <Image
                                src={item.img}
                                height={500}
                                width={500}
                                alt="logo"
                                className="h-full w-full  bg-center object-contain"
                              />
                            </div>
                            <p className="text-white text-xl lg:text-lg font-semibold">
                              {item.text}
                            </p>
                            <p className="text-white/50  text-xs text-center">
                              {item.para}
                            </p>
                          </div>
                        );
                      })}
                  </Fragment>
                ))}
              </motion.div>
              <motion.div
                className="md:flex flex-col gap-6 items-center justify-center w-full hidden "
                animate={{
                  y: reverse ? "3%" : 0,
                }}
                initial={{
                  y: reverse ? "-60%" : 0,
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {Array.from({ length: 2 }).map((_, index) => (
                  <Fragment key={index}>
                    {arr3.map((item, index) => {
                      return (
                        <div
                          className="flex flex-col  justify-center  gap-3 h-[15rem]  lg:h-[14rem] w-full lg:w-[13rem]  md:w-[20rem] md:h-[13rem]  p-4 items-center rounded-3xl bg-neutral-900 "
                          key={index}
                        >
                         <div className=" h-[90px] p-2 bg-white w-[90px]  rounded-full overflow-hidden">
                              <Image
                                src={item.img}
                                height={500}
                                width={500}
                                alt="logo"
                                className="h-full w-full  bg-center object-contain"
                              />
                            </div>
                          <p className="text-white text-xl lg:text-lg font-semibold">
                            {item.text}
                          </p>
                          <p className="text-white/50  text-xs text-center">
                            {item.para}
                          </p>
                        </div>
                      );
                    })}
                  </Fragment>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarouselMarquee;
