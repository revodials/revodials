import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

function SingleProduct({ item, onClick }) {
  const discountPercent =
    item?.price && item?.Sellprice
      ? Math.round(((item.price - item.Sellprice) / item.price) * 100)
      : 0;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl border shadow-sm transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Image Hover Area Only */}
      <div className="relative w-full aspect-[3/4] sm:aspect-[4/3] md:aspect-[5/4] lg:aspect-[4/4] group overflow-hidden">
        <Image
          src={item.images[0]}
          alt={item.name}
          priority
          fill
          className={cn(
            "object-cover w-full h-full transition-transform duration-500 transform",
            item.images[1] && "group-hover:opacity-0",
            "group-hover:scale-105" // <- hover zoom effect
          )}
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
        />
        {item.images[1] && (
          <Image
            src={item.images[1]}
            alt={`${item.name} alternate`}
            priority
            fill
            className="object-cover w-full h-full absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 border-2 border-gray-100 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
          />
        )}
      </div>

      {/* Details */}
      <div className="p-1 sm:p-2 text-center flex flex-col gap-1">
        <h3 className="text-sm font-medium text-gray-900 leading-tight">
          {item.name.length > 22 ? item.name.slice(0, 22) + "..." : item.name}
        </h3>
        <p className="text-xs text-black font-semibold">Revodials</p>

        {/* Rating */}
        <div className="flex justify-center gap-0.5 text-yellow-400 mt-1">
          {Array(5)
            .fill()
            .map((_, i) => (
              <Star key={i} size={14} fill="currentColor" stroke="none" />
            ))}
        </div>

        {/* Price */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-1 mt-1">
          <span className="text-xs line-through text-gray-400">
            Rs. {Number(item.price).toLocaleString("en-PK")}.00
          </span>
          <span className="text-sm font-semibold text-black">
            Rs. {Number(item.Sellprice).toLocaleString("en-PK")}.00
          </span>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
