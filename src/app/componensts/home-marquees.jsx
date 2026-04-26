"use client";
import dynamic from "next/dynamic";

const DiagonalMarquee = dynamic(() => import("./DiagonalMarquee"), { ssr: false });

export default function HomeMarquees() {
  return (
    <>
      <div className="h-[40vh] md:h-[60vh] bg-white w-full overflow-hidden flex flex-col md:gap-12 gap-6 items-center justify-center">
        <DiagonalMarquee
          marquees={"animate-marquee2 space-x-16"}
          deg={"rotate-[-5deg]"}
          classNames={"bg-black z-50"}
        />
        <DiagonalMarquee
          deg={"rotate-[7deg] md:rotate-[5deg]"}
          marquees={"animate-marquee space-x-2"}
          borderprops={"border-2 border-black p-3 md:p-8 rounded-full text-black"}
          classNames={"z-10"}
        />
      </div>
    </>
  );
}
