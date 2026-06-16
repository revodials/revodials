"use client";

import React, { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CartItem } from "@/lib/cart-context";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { FaMinus, FaPlus } from "react-icons/fa6";
import { ShoppingCart, Heart, MessageCircle } from "lucide-react";

function ProductDetailActions({ product, setSelectedImage }) {
    const [quantity, setQuantity] = useState(1);
    const [variants, setVariants] = useState(
        product?.variants?.[0] || null
    );

    const handleVariantClick = (variant, index) => {
        setVariants(variant);
        if (product?.images && product.images.length > 0 && setSelectedImage) {
            let targetImageIndex = index;
            if (product.images.length > product.variants.length) {
                targetImageIndex = index + 1;
            }
            if (targetImageIndex < product.images.length) {
                setSelectedImage(product.images[targetImageIndex]);
            } else {
                setSelectedImage(product.images[0]);
            }
        }
    };

    const { handleCartItems } = useContext(CartItem);
    const router = useRouter();

    const sendToWhatsApp = (productName) => {
        const phoneNumber = "923359219333";
        const message = encodeURIComponent(
            `Hello, I want to order "${productName}"`
        );
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    };

    return (
        <div>
            <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 shadow-sm">
                <CardContent className="p-2">
                    <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-800 text-lg">
                            Quantity:
                        </span>
                        <div className="flex items-center sm:space-x-4">
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 rounded-full bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                                onClick={() => setQuantity((c) => Math.max(1, c - 1))}
                            >
                                <FaMinus className="h-4 w-4" />
                            </Button>
                            <span className="text-2xl font-bold text-gray-800 min-w-[3rem] text-center">
                                {quantity}
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 rounded-full bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                                onClick={() => setQuantity((c) => c + 1)}
                            >
                                <FaPlus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
            {product?.variants && product.variants.length > 0 && (
                <div className="p-3 sm:p-4 bg-white rounded-xl border border-gray-100 shadow-sm mb-4">
                    <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">
                        Select Variant
                    </h3>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        {product?.variants.map((variant, index) => {
                            const isSelected = variants === variant;
                            return (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => handleVariantClick(variant, index)}
                                    className={`
                                        cursor-pointer
                                        px-3.5 py-1.5 sm:px-4 sm:py-2
                                        rounded-full
                                        text-xs sm:text-sm font-medium
                                        border transition-all duration-200
                                        ${isSelected
                                            ? "bg-black text-white border-black shadow-md scale-105"
                                            : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
                                        }
                                    `}
                                >
                                    {variant}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4 mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button
                        size="lg"
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 rounded-xl shadow-lg shadow-blue-600/25 transition-all duration-300 hover:shadow-blue-600/40 hover:scale-105"
                        onClick={() => {
                            handleCartItems(product, quantity, variants);
                            router.push("/checkout");
                        }}
                    >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Buy Now
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 font-semibold py-4 rounded-xl bg-white transition-all duration-300 hover:scale-105"
                        onClick={() => {
                            handleCartItems(product, quantity, variants);
                            toast.success("Item added to cart", {
                                description: "Item added to cart successfully",
                                duration: 2000,
                                action: {
                                    label: "Go to Cart",
                                    onClick: () => router.push("/cart"),
                                },
                            });
                        }}
                    >
                        <Heart className="w-5 h-5 mr-2" />
                        Add to Cart
                    </Button>
                </div>
                <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-4 rounded-xl shadow-lg shadow-green-600/25 transition-all duration-300 hover:shadow-green-600/40 hover:scale-105"
                    onClick={() => sendToWhatsApp(product.name)}
                >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Order on WhatsApp
                </Button>
            </div>
        </div>
    );
}

export default ProductDetailActions;