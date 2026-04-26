import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function SingleProductSkeleton() {
  return (
    <div className="rounded h-[45vh] md:h-[57vh] lg:h-[63vh] xl:h-[53vh]">
      <div className="relative">
        <Skeleton className="w-full h-48 md:h-68 rounded-t-2xl" />
        <div className="absolute bottom-2 left-2">
          <Skeleton className="w-12 h-5 rounded-md" />
        </div>
      </div>

      <div className="p-3 space-y-2">
        <Skeleton className="h-5 w-3/4 mx-auto" />
        <Skeleton className="h-3 w-1/4 mx-auto" />
        <div className="flex justify-center gap-2 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-4 rounded-full" />
          ))}
        </div>
        <div className="flex flex-col xl:flex-row gap-2 items-center justify-evenly mt-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
}

export default SingleProductSkeleton;
