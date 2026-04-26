"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "../componensts/navbar";
import { useMutation } from "@tanstack/react-query";
import { orderTrackng } from "../actions/products";

const schema = z.object({
  id: z.string().min(6, "Please enter your Order ID or Email"),
});

export default function Page() {
  const [status, setstatus] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: orderTrackng,
    onSuccess: (data) => {
      setstatus(data);
      reset();
    },
    onError: (error) => {
      toast.error(`Order Id fetch failed ${error.message}`);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data.id);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex justify-center items-center p-2 lg:p-4">
        <div className="max-w-xl w-full bg-white p-3 lg:p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">Track Your Order</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input placeholder="Enter your Order ID" {...register("id")} />
            {errors.id && (
              <p className="text-red-500 text-sm">{errors.id.message}</p>
            )}
            <Button type="submit" className="w-full bg-black text-white">
              {mutation.isPending ? "loading..." : "Track Order"}
            </Button>
          </form>

          {status && (
            <Card className="mt-6 bg-gray-100">
              <CardContent className="p-4 sm:p-6 space-y-3">
                <h2 className="text-xl font-bold">Order Summary</h2>
                <p className="text-xl font-bold text-center">
                  Your order status is {status?.status}
                </p>

                <div className="border-t pt-3">
                  <p className="text-center font-semibold">Customer Info</p>

                  {[
                    {
                      label: "Name",
                      value: `${status?.user?.firstName} ${status?.user?.lastName}`,
                    },
                    { label: "Email", value: status?.user?.email },
                    { label: "Phone", value: status?.user?.contact },
                    {
                      label: "Address",
                      value: `${status?.user?.apartment}, ${status?.user?.city}, ${status?.user?.country}`,
                    },
                    { label: "Postal Code", value: status?.user?.postalCode },
                    {
                      label: "Order Date",
                      value: new Date(status?.createdAt).toLocaleString(),
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 mb-2"
                    >
                      <strong>{item.label}:</strong>
                      <span className="text-right">{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-3">
                  <h3 className="font-semibold mb-2">Items</h3>
                  {status?.items?.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row items-start sm:items-center mb-4 gap-3 sm:gap-5"
                    >
                      <div className="relative shrink-0">
                        <img
                          src={item.productId.image}
                          alt="Product"
                          className="w-16 h-16 object-cover rounded-full"
                        />
                        {item.quantity && (
                          <span className="absolute top-1 right-2 bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                            {item.quantity}
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          Rs.{" "}
                          {Number(item.productId.Sellprice * item.quantity).toLocaleString(
                            "en-PK"
                          )}
                          .00 PKR
                        </p>
                      </div>
                    </div>
                  ))}
                  <p className="text-center mt-2">
                    <strong>Total Amount:</strong> Rs. {status?.totalAmount}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
