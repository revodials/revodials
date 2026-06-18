"use client";

import React, { useState, useRef, Suspense, lazy } from "react";
import { FaBox, FaBoxOpen, FaPlane } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Clock, CheckCheck } from "lucide-react";
import Navbar from "./navbar";
import DetailPageCarousel from "./detail-page-carousel";
import ProductDetailActions from "./product-detail-action-btn";
import TrustBadges from "./trust-badges";
const ShareButton = lazy(() => import("./shareBtn"));
const Footer = lazy(() => import("./footer"));
const SocialProof = lazy(() => import("./social-proof"));
const UrgencySection = lazy(() => import("./urgency-section"));
const CustomerReviews = lazy(() => import("./customer-reviews"));

function SectionSkeleton({ heightClass = "h-32" }) {
  return (
    <div className={`w-full ${heightClass} rounded-2xl bg-gray-100 animate-pulse`} />
  );
}

function ProductDetailClient({ data }) {
  const product = data;
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const aftertwodays = new Date(today);
  aftertwodays.setDate(today.getDate() + 4);

  const actionsRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState(() => {
    if (product?.variants?.length > 0 && product?.images?.length > 0) {
      if (product.images.length > product.variants.length) {
        return product.images[1] || product.images[0];
      }
      return product.images[0];
    }
    return product?.images?.[0] || "";
  });

  const handleOrderNowClick = () => {
    actionsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 sm:gap-16">
              {/* Product Images Section */}
              <DetailPageCarousel product={product} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />

              {/* Product Details Section */}
              <div className="space-y-5 mt-4">
                {/* Product Header */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm">
                      (4.8) • 50+ reviews
                    </span>
                  </div>

                  <h1 className="text-2xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight">
                    {product.name}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                        Rs. {Number(product.Sellprice).toLocaleString("en-PK")}
                      </span>
                      <span className="text-xl text-gray-500 line-through">
                        Rs. {Number(product.price).toLocaleString("en-PK")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Trust Badges — directly below price, above the order button */}

                {/* ProductDetailActions — variant selection + order button (untouched logic) */}
                <div ref={actionsRef}>
                  <ProductDetailActions product={product} setSelectedImage={setSelectedImage} />
                </div>
                <TrustBadges />

                {/* Urgency Section */}
                <Suspense fallback={<SectionSkeleton heightClass="h-20" />}>
                  <UrgencySection productId={product?._id} />
                </Suspense>

                {/* Social Proof */}
                <Suspense fallback={<SectionSkeleton heightClass="h-28" />}>
                  <SocialProof />
                </Suspense>

                {/* Product Description */}
                <Card className="bg-gradient-to-r from-gray-50/50 to-gray-100/50 border-gray-200 shadow-sm">
                  <CardContent className="p-4 sm:p-8">
                    <h3 className="font-bold text-gray-800 mb-4 text-xl">
                      Product Description
                    </h3>
                    <div
                      className="text-gray-700 prose prose-lg max-w-none leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  </CardContent>
                </Card>

                {/* Customer Reviews */}
                <div>
                  <h3 className="font-bold text-gray-800 mb-4 text-xl">
                    What Our Customers Say
                  </h3>
                  <Suspense
                    fallback={
                      <div className="space-y-4">
                        <SectionSkeleton heightClass="h-28" />
                        <SectionSkeleton heightClass="h-28" />
                      </div>
                    }
                  >
                    <CustomerReviews />
                  </Suspense>
                </div>

                {/* Share Button */}
                <div className="flex justify-center pt-2">
                  <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200 shadow-sm">
                    <Suspense fallback={<div className="w-32 h-6" />}>
                      <ShareButton
                        url={`${process.env.NEXT_PUBLIC_LOCAL_URI}productdetail?id=${product._id}`}
                      />
                    </Suspense>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>




      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}

export default ProductDetailClient;