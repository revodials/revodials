"use client";
import React, { useState } from "react";
import SingleProduct from "./SingleProduct";
import { FadeIn } from "./fadein";
import Link from "next/link";
import { Loader2, ShoppingBag, AlertCircle, Flame } from "lucide-react";

export default function ProductSection({ data }) {
  const [products, setProducts] = useState(data);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    setLoading(true);
    try {
      const nextPage = page + 1;
      const res = await fetch(`/api/products?page=${nextPage}&limit=8`);
      const newProducts = await res.json();

      if (newProducts.length === 0) {
        setHasMore(false);
      } else {
        // Filter out duplicates
        setProducts((prev) => {
          const uniqueProducts = newProducts.filter(
            (np) => !prev.some((p) => p._id === np._id)
          );
          return [...prev, ...uniqueProducts];
        });
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center my-6 text-gray-500">
        <AlertCircle className="w-12 h-12 text-gray-400 mb-4" />
        <h2 className="text-lg font-semibold">No Products Found</h2>
      </div>
    );
  }

  return (
    <FadeIn direction="up">
      <div className="py-8 mb-8" id="product">
        <div className="w-full flex justify-center">
          <div className="lg:w-full xl:w-[91%] w-[97%] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8 xl:gap-y-12 px-2 lg:px-20">
            {products.map((item) => (
              <Link href={`/productdetail/${item._id}`} key={item._id} className="block transform transition-transform hover:-translate-y-2">
                <SingleProduct item={item} />
              </Link>
            ))}
          </div>
        </div>

        {/* 🔥 Load More Button */}
        {hasMore && (
          <div className="flex justify-center mt-12">
            <button
              onClick={loadMore}
              disabled={loading}
              className="group relative flex items-center gap-3 px-8 py-4 rounded-full bg-black text-white font-bold text-lg shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center gap-2">
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-6 h-6" />
                    Load More Styles
                  </>
                )}
              </span>
            </button>
          </div>
        )}
      </div>
    </FadeIn>
  );
}