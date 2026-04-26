"use client";

import { useState } from "react";
import Link from "next/link";
import SingleProduct from "./SingleProduct";
import { fetchProductsbyCategoriesId } from "@/app/actions/products";
import { Loader2, Plus } from "lucide-react";

export default function LoadMoreProducts({ initialProducts, id }) {
  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    if (loading) return;

    setLoading(true);

    const newProducts = await fetchProductsbyCategoriesId(
      id && id !== "all" ? id : undefined,
      page
    );

    if (newProducts.length === 0) {
      setHasMore(false);
    } else {
      setProducts((prev) => [...prev, ...newProducts]);
      setPage((prev) => prev + 1);
    }

    setLoading(false);
  };

  return (
    <>
      {products.map((item, index) => (
        <Link href={`/productdetail/${item._id}`} key={index}>
          <SingleProduct item={item} />
        </Link>
      ))}

      {hasMore && (
        <div className="col-span-full flex justify-center mt-6">
        <button
          onClick={loadMore}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium rounded-xl shadow-md transition-all duration-200"
            >
        {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading...
         </>
  ) : (
    <>
      <Plus className="w-4 h-4" />
      Load More
    </>
  )}
</button>
        </div>
      )}

      {!hasMore && (
        <p className="col-span-full text-center text-gray-500 mt-4">
          No more products
        </p>
      )}
    </>
  );
}