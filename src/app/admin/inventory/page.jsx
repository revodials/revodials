"use client";
import { fetchCatagory, fetchProducts } from "@/app/actions/products";
import { Inventorycolumns } from "@/app/table/columns";
import { InventoryTable } from "@/app/table/inventory-table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const selectedProduct = searchParams.get("catagory") || undefined;
  const selectedStatus = searchParams.get("status") || undefined;
  const [page, setPage] = useState(1);
  const limit = 10;

  // Move all hooks to the top level
  const catagory = useQuery({
    queryKey: ["catagory"],
    queryFn: fetchCatagory,
    refetchOnWindowFocus: false,
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", page, limit, selectedProduct, selectedStatus],
    queryFn: () => fetchProducts(page, limit, selectedProduct, selectedStatus),
    refetchOnWindowFocus: false,
  });

  const handleCityChange = (selectedProduct) => {
    const params = new URLSearchParams(searchParams.toString()); // Use toString() to avoid potential reference issues
    if (selectedProduct === "all") {
      params.delete("catagory");
    } else {
      params.set("catagory", selectedProduct);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  if (isError) {
    return <div>Error: {error?.message || "Failed to load products."}</div>;
  }

  return (
    <div className="container mx-auto py-10 p-3">
      <h1 className="font-bold text-4xl text-center mb-3">Your inventory</h1>

      {isLoading ? (
        <div className="h-[70vh] w-full p-2">
          <Skeleton className={"h-full w-full"} />
        </div>
      ) : !data ? (
        <div>No products found.</div>
      ) : (
        <>
          <div className="flex items-center gap-4">
            <div className="lg:w-[20rem] space-y-1">
              <label className="text-sm font-medium mb-1 block">
                Filter by Product
              </label>
              <Select
                onValueChange={handleCityChange}
                value={selectedProduct || "all"}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All products</SelectItem>
                  {catagory.data && catagory.data.length > 0 ? (
                    catagory.data.map((cat) => (
                      <SelectItem key={cat._id} value={cat._id}>
                        {cat.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem disabled value="No catagory">
                      Not found
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="lg:w-[20rem] space-y-1">
              <label className="text-sm font-medium mb-1 block">
                Filter by Status
              </label>
              <Select
                onValueChange={(value) => {
                  const params = new URLSearchParams(searchParams.toString());
                  if (value === "all") {
                    params.delete("status");
                  } else {
                    params.set("status", value);
                  }
                  replace(`${pathname}?${params.toString()}`);
                }}
                value={searchParams.get("status") || "all"}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="hide">Hide</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <InventoryTable
            columns={Inventorycolumns}
            data={data?.products}
            totalDocs={data?.totalCount}
            catagory={catagory}
          />
        </>
      )}
      {data?.products.length > 9 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          {/* Previous Button */}
          <Button
            variant="outline"
            size="icon"
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          {/* Page Numbers */}
          {Array.from({ length: 3 }, (_, i) => (
            <Button
              key={i}
              variant={page === i + 1 ? "default" : "outline"}
              onClick={() => setPage(i + 1)}
              className="w-10 h-10 p-0"
            >
              {i + 1}
            </Button>
          ))}

          {/* Next Button */}
          <Button
            variant="outline"
            size="icon"
            disabled={page === (data?.totalPages || 1)}
            onClick={() => setPage((prev) => prev + 1)}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
