"use client";

import React, { useContext } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CartItem } from "@/lib/cart-context";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderCheckout } from "../actions/products";
import { toast } from "sonner";
import Footer from "../componensts/footer";
import { cn } from "@/lib/utils";
import Whatsappbutton from "../componensts/whatsappbutton";

/* =========================
   CHECKOUT VALIDATION
========================= */

const checkoutSchema = z.object({
  contact: z
    .string()
    .trim()
    .refine(
      (value) => {
        const cleaned = value.replace(/[\s-]/g, "");

        return (
          /^03\d{9}$/.test(cleaned) ||
          /^923\d{9}$/.test(cleaned) ||
          /^\+923\d{9}$/.test(cleaned)
        );
      },
      "Enter a valid Pakistani mobile number"
    )
    .transform((value) => {
      const cleaned = value.replace(/[\s-]/g, "");

      // Convert +923123456789 -> 03123456789
      if (cleaned.startsWith("+923")) {
        return "0" + cleaned.substring(3);
      }

      // Convert 923123456789 -> 03123456789
      if (cleaned.startsWith("923")) {
        return "0" + cleaned.substring(2);
      }

      // Already 03XXXXXXXXX
      return cleaned;
    }),

  Name: z
    .string()
    .trim()
    .min(1, "Name is required"),

  address: z
    .string()
    .trim()
    .min(1, "Address is required"),

  city: z
    .string()
    .trim()
    .min(1, "City is required"),
});

/* =========================
   CHECKOUT PAGE
========================= */

export default function CheckoutPage() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { carts } = useContext(CartItem);

  const total = carts?.reduce((acc, item) => {
    return acc + item?.Sellprice * item?.quantity;
  }, 0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
  });

  /* =========================
     ORDER MUTATION
  ========================= */

  const mutation = useMutation({
    mutationFn: orderCheckout,

    onSuccess: (data) => {
      toast.success("Order placed successfully");

      queryClient.invalidateQueries("AdminData");
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });

      reset();

      carts.length = 0;

      router.push("/confirmation");
    },

    onError: (error) => {
      toast.error(`Order failed ${error.message}`);
    },
  });

  /* =========================
     GENERATE ORDER ID
  ========================= */

  function generateAlphabetID(length = 6) {
    const letters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    let id = "";

    for (let i = 0; i < length; i++) {
      id += letters.charAt(
        Math.floor(Math.random() * letters.length)
      );
    }

    return id;
  }

  /* =========================
     SUBMIT ORDER
  ========================= */

  const onSubmit = (data) => {
    const items = carts.map((item) => ({
      productId: String(item._id),
      quantity: item.quantity,
      selectedVariant: item.selectedVariant || null,
    }));

    const Id = generateAlphabetID();

    const payload = {
      items,
      totalAmount: total,
      orderId: Id,
      user: data,
    };

    mutation.mutate(payload);
  };

  /* =========================
     UI
  ========================= */

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-8 lg:py-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full"
        >
          {carts.length === 0 ? (
            /* =========================
               EMPTY CART
            ========================= */

            <div className="bg-white p-5 sm:p-8 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center h-fit">
              <img
                src="/empty-cart.png"
                alt="Empty Cart"
                className="w-24 h-24 sm:w-32 sm:h-32 object-contain mb-6 opacity-60"
              />

              <h2 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">
                Your Cart is Empty
              </h2>

              <p className="text-gray-500 mb-6 text-xs sm:text-sm">
                Looks like you haven't added any watches yet.
              </p>

              <Button
                type="button"
                onClick={() => router.push("/")}
                className="bg-black text-white hover:bg-gray-800 transition-colors rounded-lg px-8 py-2.5 text-sm font-medium w-full max-w-[200px]"
              >
                Shop Now
              </Button>
            </div>
          ) : (
            /* =========================
               CHECKOUT
            ========================= */

            <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">

              {/* =========================
                 HEADER
              ========================= */}

              <div className="mb-6 sm:mb-8">
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  Checkout
                </h1>
                <Whatsappbutton props={`Salam! Mujhe is watch ka order place karna hai: ${carts.map((item) => item.name).join(", ")}`} />
                <p className="text-gray-500 text-xs sm:text-sm mt-1">
                  اپنا آرڈر مکمل کرنے کے لیے اپنی تفصیلات درج کریں.
                </p>
              </div>

              <div className="space-y-5 sm:space-y-6">

                {/* =========================
                   CUSTOMER INFORMATION
                ========================= */}

                <div className="space-y-4">

                  {/* Full Name */}

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 block">
                      Full Name / مکمل نام
                      <span className="text-red-500">*</span>
                    </label>

                    <Input
                      type="text"
                      autoComplete="name"
                      className={cn(
                        "w-full h-11 border-gray-200 focus:border-black focus:ring-black transition-colors",
                        errors.Name &&
                        "border-red-500 focus:border-red-500"
                      )}
                      placeholder="Enter your full name"
                      {...register("Name")}
                    />

                    {errors.Name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.Name.message}
                      </p>
                    )}
                  </div>

                  {/* Mobile Number */}

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 block">
                      WhatsApp Mobile Number / موبائل نمبر
                      <span className="text-red-500">*</span>
                    </label>

                    <Input
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      className={cn(
                        "w-full h-11 border-gray-200 focus:border-black focus:ring-black transition-colors",
                        errors.contact &&
                        "border-red-500 focus:border-red-500"
                      )}
                      placeholder="03XXXXXXXXX"
                      {...register("contact")}
                    />

                    {errors.contact && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.contact.message}
                      </p>
                    )}
                  </div>



                  {/* City */}

                  <div className="space-y-1.5">
                    <label
                      htmlFor="city"
                      className="text-sm font-medium text-gray-700 block"
                    >
                      City / شہر
                      <span className="text-red-500">*</span>
                    </label>

                    <Input
                      id="city"
                      type="text"
                      autoComplete="address-level2"
                      className={cn(
                        "w-full h-11 border-gray-200 focus:border-black focus:ring-black transition-colors",
                        errors.city &&
                        "border-red-500 focus:border-red-500"
                      )}
                      placeholder="Enter your city"
                      {...register("city")}
                    />

                    {errors.city && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.city.message}
                      </p>
                    )}
                  </div>

                  {/* Complete Address */}

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 block">
                      Complete Address / مکمل پتہ
                      <span className="text-red-500">*</span>
                    </label>

                    <textarea
                      autoComplete="street-address"
                      className={cn(
                        "w-full border border-gray-200 rounded-md p-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors resize-none",
                        errors.address &&
                        "border-red-500 focus:border-red-500 focus:ring-red-500"
                      )}
                      placeholder="House No., Street, Area, Nearby Landmark"
                      rows={4}
                      {...register("address")}
                    />

                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                </div>



                {/* =========================
                   ORDER SUMMARY
                ========================= */}

                <div className="space-y-4 pt-2 sm:pt-4 border-t border-gray-100 mt-4 sm:mt-6">

                  <h3 className="text-base sm:text-lg font-medium text-gray-900 border-b border-gray-100 pb-2">
                    Order Summary
                  </h3>

                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">

                    <ScrollArea className="max-h-[25vh] pr-2 mb-4">

                      <div className="space-y-3">

                        {carts.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex gap-3 items-center"
                          >

                            {/* Product Image */}

                            <div className="relative flex-shrink-0">

                              <img
                                src={item?.images[0]}
                                alt={item.name || "Product"}
                                className="w-12 h-12 object-cover rounded-md border border-gray-200 bg-white"
                              />

                              {item.quantity && (
                                <span className="absolute top-[-1px] -right-1.5 bg-gray-900 text-white text-[9px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                                  {item.quantity}
                                </span>
                              )}

                            </div>

                            {/* Product Details */}

                            <div className="flex-1 min-w-0">

                              <p className="font-medium text-xs sm:text-sm text-gray-900 truncate">
                                {item.name}
                              </p>

                              {item.selectedVariant && (
                                <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
                                  Variant:{" "}
                                  <span className="font-medium text-gray-700">
                                    {item.selectedVariant}
                                  </span>
                                </p>
                              )}

                            </div>

                            {/* Product Price */}

                            <div className="text-right flex-shrink-0">

                              <p className="font-medium text-xs sm:text-sm text-gray-900">
                                Rs.{" "}
                                {Number(
                                  item.Sellprice * item.quantity
                                ).toLocaleString("en-PK")}
                              </p>

                            </div>

                          </div>
                        ))}

                      </div>

                    </ScrollArea>

                    {/* Price Breakdown */}

                    <div className="border-t border-gray-200 pt-3 space-y-2">

                      <div className="flex justify-between text-xs sm:text-sm text-gray-600">
                        <p>Subtotal</p>

                        <p className="font-medium text-gray-900">
                          Rs.{" "}
                          {Number(total).toLocaleString("en-PK")}
                        </p>
                      </div>

                      <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between items-center">

                        <p className="text-sm font-semibold text-gray-900">
                          Total
                        </p>

                        <p className="text-base font-bold text-gray-900">
                          Rs.{" "}
                          {Number(total).toLocaleString("en-PK")}
                        </p>

                      </div>

                    </div>

                  </div>
                </div>
                {/* =========================
                   PAYMENT METHOD
                ========================= */}

                <div className="space-y-4 pt-2 sm:pt-4">

                  <h3 className="text-base sm:text-lg font-medium text-gray-900 border-b border-gray-100 pb-2">
                    Payment Method
                  </h3>

                  <div className="relative p-3 sm:p-4 border-2 border-black rounded-lg sm:rounded-xl bg-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 cursor-default">

                    <div className="flex items-center gap-3">

                      <div className="w-5 h-5 rounded-full border-4 border-black flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-black rounded-full"></div>
                      </div>

                      <span className="font-medium text-sm sm:text-base text-gray-900">
                        Cash on Delivery (COD)
                      </span>

                    </div>

                    <span className="bg-green-100 text-green-700 text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide w-fit">
                      Free Delivery
                    </span>

                  </div>
                </div>

                {/* =========================
                   SUBMIT BUTTON
                ========================= */}

                <div className="pt-2 sm:pt-4 mt-2 sm:mt-4">

                  <Button
                    disabled={mutation.isPending}
                    type="submit"
                    className="w-full bg-black hover:bg-gray-900 text-white text-base sm:text-lg font-medium rounded-lg sm:rounded-xl h-12 sm:h-14 transition-colors shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {mutation.isPending
                      ? "Processing Order..."
                      : "Complete Order"}
                  </Button>

                </div>

              </div>
            </div>
          )}
        </form>
      </div>

      <Footer />
    </div>
  );
}