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
        <div className="product-action-section flex flex-col w-full">
            {product?.variants && product.variants.length > 0 && (
                <div className="product-variant-selector p-3 mt-4 sm:p-4 bg-white rounded-xl border border-gray-100 shadow-sm mb-4">
                    <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">
                        Select Color
                    </h3>

                    <div className="flex flex-wrap items-center gap-2.5">
                        {product?.variants.map((variant, index) => {
                            const isSelected = variants === variant;
                            return (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => handleVariantClick(variant, index)}
                                    className={`
                                        cursor-pointer
                                        px-4 py-2 sm:px-5 sm:py-2.5
                                        rounded-lg
                                        text-sm sm:text-base font-medium
                                        transition-all duration-200
                                        ${isSelected
                                            ? "bg-gray-900 text-white shadow-md border-transparent"
                                            : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
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
            <div className="flex flex-col gap-3 mt-4 w-full">
                {/* Row 1: Quantity + Buy Now */}
                <div className="flex flex-row items-center gap-3 w-full">
                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl h-[48px] w-[110px] sm:w-[120px] shrink-0 shadow-sm overflow-hidden">
                        <button
                            type="button"
                            className="flex-1 flex items-center justify-center h-full text-gray-600 hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer"
                            onClick={() => setQuantity((c) => Math.max(1, c - 1))}
                        >
                            <FaMinus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-semibold text-gray-800 text-base w-8 text-center select-none">
                            {quantity}
                        </span>
                        <button
                            type="button"
                            className="flex-1 flex items-center justify-center h-full text-gray-600 hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer"
                            onClick={() => setQuantity((c) => c + 1)}
                        >
                            <FaPlus className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    {/* Buy Now Button */}
                    <Button
                        size="lg"
                        className="flex-1 h-[48px] bg-gray-900 hover:bg-black text-white font-semibold rounded-xl shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] text-base px-2 sm:px-4"
                        onClick={() => {
                            handleCartItems(product, quantity, variants);
                            router.push("/checkout");
                        }}
                    >
                        <ShoppingCart className="w-5 h-5 mr-2 shrink-0" />
                        <span className="whitespace-nowrap">Buy Now</span>
                    </Button>
                </div>

                {/* Row 2: WhatsApp */}
                <Button
                    size="lg"
                    className="w-full h-[48px] bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold rounded-xl shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] text-base px-2 sm:px-4"
                    onClick={() => sendToWhatsApp(product.name)}
                >
                    <MessageCircle className="w-5 h-5 mr-2 shrink-0" />
                    <span className="whitespace-nowrap">Order on WhatsApp</span>
                </Button>

                {/* Row 3: Add to Cart */}
                <Button
                    variant="outline"
                    size="lg"
                    className="w-full h-[48px] bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 font-medium rounded-xl shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] text-base px-2 sm:px-4"
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
                    <Heart className="w-5 h-5 mr-2 shrink-0" />
                    <span className="whitespace-nowrap">Add to Cart</span>
                </Button>
            </div>
        </div>
    );
}

export default ProductDetailActions;