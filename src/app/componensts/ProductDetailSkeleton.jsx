// components/ProductDetailSkeleton.jsx
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function ProductDetailSkeleton() {
  return (
    <div className="w-full flex justify-center px-4 sm:px-6 lg:px-0">
      <div className="flex flex-col lg:flex-row gap-8 w-[95%] max-w-7xl py-12">
        {/* Image Skeleton */}
        <div className="w-full h-[400px] md:w-1/2 relative">
          <Skeleton className="w-full h-full rounded-lg" />
        </div>

        {/* Details Skeleton */}
        <div className="w-full lg:w-1/2 space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <div className="flex gap-4">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-12" />
          </div>

          <Skeleton className="h-4 w-48" />

          <div className="flex flex-col lg:flex-row gap-2">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-40" />
          </div>

          <div className="mt-6 border rounded-lg shadow-sm p-4 space-y-4">
            <Skeleton className="h-4 w-48" />
            <div className="flex justify-between text-center gap-4">
              <Skeleton className="h-20 w-24" />
              <Skeleton className="h-20 w-24" />
              <Skeleton className="h-20 w-24" />
            </div>
          </div>

          <div className="mt-6 border rounded-lg shadow-sm p-4 space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailSkeleton;
