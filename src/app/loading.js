import React from "react";
import Image from "next/image";

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 bg-white">
      <Image src={'/Revodials-loader.png'} alt="Logo" width={150} height={150} className="bg-cover" />
    </div>
  );
}

export default Loading;
