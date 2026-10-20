"use client";
import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { CheckCheck, Award } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ChevronLeft } from "lucide-react";

function DetailPageCarousel({ product, selectedImage, setSelectedImage }) {
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
                            src={selectedImage ? selectedImage : product.images[0]}
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
                {product?.images?.length > 1 && (
                    <Carousel
                        opts={{ align: "start", containScroll: "trimSnaps" }}
                        className={`w-full mt-3 h-20 sm:h-24 flex items-center justify-center ${product.images.length > 4 ? "px-8 sm:px-10" : ""
                            }`}
                    >
                        <CarouselContent
                            className={`flex items-center -ml-2 sm:-ml-3 ${product.images.length <= 4 ? "justify-center" : ""
                                }`}
                        >
                            {product.images.map((img, index) => {
                                const isSelected =
                                    selectedImage === img ||
                                    (!selectedImage && product.images[0] === img);
                                return (
                                    <CarouselItem
                                        key={index}
                                        className="pl-2 sm:pl-3 basis-1/4 sm:basis-1/5 md:basis-1/6 flex justify-center items-center"
                                    >
                                        <Image
                                            onClick={() => setSelectedImage(img)}
                                            src={img || "/placeholder.svg"}
                                            priority
                                            alt={`Product Image ${index + 1}`}
                                            height={80}
                                            width={80}
                                            className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-cover rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 border-2 ${isSelected
                                                    ? "border-blue-500 shadow-md shadow-blue-300 ring-2 ring-blue-400/20"
                                                    : "border-gray-300 hover:border-gray-400"
                                                }`}
                                        />
                                    </CarouselItem>
                                );
                            })}
                        </CarouselContent>
                        {product.images.length > 4 && (
                            <>
                                <CarouselPrevious className="left-0 bg-white/90 border-gray-300 text-gray-700 hover:bg-gray-50 w-8 h-8 shadow-sm" />
                                <CarouselNext className="right-0 bg-white/90 border-gray-300 text-gray-700 hover:bg-gray-50 w-8 h-8 shadow-sm" />
                            </>
                        )}
                    </Carousel>
                )}
            </div>
        </div>
    )
}

export default DetailPageCarousel
