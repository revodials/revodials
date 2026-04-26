"use client";
import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { CheckCheck, Award } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ChevronLeft } from "lucide-react";

function DetailPageCarousel({ product }) {
    const [image, setImage] = useState("");
    const router = useRouter();

    const discountPercentage = Math.round(
        ((product.price - product.Sellprice) / product.price) * 100
    );


    return (
        <div>
            <div className="sm:space-y-6">
                <div
                    className="mb-4 cursor-pointer flex items-center text-gray-700 hover:text-gray-900"
                    onClick={() => router.push("/")}
                >
                    <ChevronLeft />
                    <div>
                        <p>Back to home</p>
                    </div>
                </div>
                <div className="relative group">
                    <div className="aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-2xl border border-gray-200">
                        <Image
                            src={image ? image : product.images[0]}
                            alt={product.name}
                            width={600}
                            height={600}
                            priority
                            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Floating Badges */}
                    <div className="absolute top-5 left-4 flex flex-col gap-2">
                        <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg backdrop-blur-sm border-0">
                            <CheckCheck className="w-3 h-3 mr-1" />
                            First Check then Pay
                        </Badge>
                        {discountPercentage > 0 && (
                            <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg backdrop-blur-sm border-0">
                                <Award className="w-3 h-3 mr-1" />
                                {discountPercentage}% OFF
                            </Badge>
                        )}
                    </div>
                </div>

                {/* Thumbnail Carousel */}
                {product?.images.length > 1 && (
                    <Carousel className="w-fullmt-6 h-32 sm:h-48 flex items-center justify-center">
                        <CarouselContent className="flex w-full items-center justify-center">
                            {product?.images.map((img, index) => (
                                <CarouselItem
                                    key={index}
                                    className="flex-1 flex justify-center items-center"
                                >
                                    <Image
                                        onClick={() => setImage(img)}
                                        src={img || "/placeholder.svg"}
                                        priority
                                        alt={`Product Image ${index + 1}`}
                                        height={80}
                                        width={80}
                                        className={`w-20 h-20 sm:w-32 sm:h-32 max-h-20 sm:max-h-32 object-cover rounded-lg cursor-pointer transition-transform duration-200 hover:scale-105 border-2 ${image === img ||
                                            (!image && product.images[0] === img)
                                            ? "border-blue-500 shadow-md shadow-blue-300"
                                            : "border-gray-300"
                                            }`}
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-0 bg-white/90 border-gray-300 text-gray-700 hover:bg-gray-50" />
                        <CarouselNext className="right-0 bg-white/90 border-gray-300 text-gray-700 hover:bg-gray-50" />
                    </Carousel>
                )}
            </div>
        </div>
    )
}

export default DetailPageCarousel
