"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaTrash } from "react-icons/fa";
import { CartItem } from "@/lib/cart-context";
import { ScrollArea } from "@/components/ui/scroll-area";
import Navbar from "../componensts/navbar";
import { useRouter } from "next/navigation";
import Footer from "../componensts/footer";

export default function CartPage() {
  const router = useRouter();
  const { carts, handleCartItems, removeCartItems, decreaseItem } =
    useContext(CartItem);
  const total = carts?.reduce((acc, item) => {
    return acc + item.Sellprice * item.quantity;
  }, 0);

  return (
    <>
      <Navbar />
      <div className="px-4 py-10 max-w-6xl mx-auto relative h-screen">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        {carts.length === 0 ? (
          <div className="w-full h-[60vh] flex flex-col items-center justify-center bg-gray-50 p-6 rounded-md text-center shadow-inner border border-dashed border-gray-300">
            <img
              src="/empty-cart.png"
              alt="Empty Cart"
              className="w-32 h-32 object-contain mb-4 opacity-70"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Your Cart is Empty
            </h2>
            <p className="text-gray-600 mb-4">
              Looks like you haven’t added any watches yet.
            </p>
            <Button
              onClick={() => router.push("/")}
              className="bg-blue-600 text-white hover:bg-blue-700 transition rounded-full px-6 py-2 text-sm"
            >
              Shop Now
            </Button>
          </div>
        ) : (
          <ScrollArea className="h-[60vh] w-full rounded-md border p-2">
            <div className="flex flex-col gap-6 pb-32">
              {carts.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col md:flex-row lg:items-center justify-between gap-4 border-b pb-4"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={item?.images[0]}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="rounded-lg h-[12vh] w-[12vh] object-cover"
                    />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Rs. {Number(item.Sellprice).toLocaleString("en-PK")}.00
                        PKR
                      </p>
                       {item.selectedVariant && (
                        <div
                          className={`h-fit py-1 px-3 cursor-pointer 
                          bg-black text-white rounded-full w-fit border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200`}
                        >
                          <h4 className="font-semibold text-xs">
                            {item.selectedVariant}
                          </h4>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-10 justify-between">
                    <div className="flex items-center gap-3">
                      <Button
                        onClick={() => decreaseItem(item._id)}
                        className="text-xl"
                      >
                        -
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        onClick={() => handleCartItems(item)}
                        className="text-xl"
                      >
                        +
                      </Button>
                    </div>
                    <Button
                      variant="destructive"
                      onClick={() => removeCartItems(item._id)}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        <div className="absolute bottom-22 left-0 right-0 bg-white p-4 shadow-md">
          {carts.length > 0 && (
            <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-lg font-bold">
                Total: Rs. {Number(total).toLocaleString("en-PK")}.00 PKR
              </div>
              <Button
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
                onClick={() => router.push("/checkout")}
              >
                Proceed to Checkout
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </>
  );
}
