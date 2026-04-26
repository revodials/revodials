import { FaBox, FaBoxOpen, FaPlane } from "react-icons/fa6";
import ShareButton from "./shareBtn";
import Footer from "./footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Star,
  Clock,
  CheckCheck
} from "lucide-react";
import Navbar from "./navbar";
import DetailPageCarousel from "./detail-page-carousel";
import ProductDetailActions from "./product-detail-action-btn";

function ProductDetailClient({ data }) {
  const product = data;
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const aftertwodays = new Date(today);
  aftertwodays.setDate(today.getDate() + 4);




  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 sm:gap-16">
              {/* Product Images Section */}
              <DetailPageCarousel product={product} />

              {/* Product Details Section */}
              <div className="space-y-6 mt-6">
                {/* Product Header */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
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
                    <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg backdrop-blur-sm border-0">
                      <CheckCheck className="w-3 h-3 mr-1" />
                      Allow to open | First Check then Pay
                    </Badge>

                  </div>

                </div>

                {/* ProductDetailActions */}
                <ProductDetailActions product={product} />

                {/* Product Description */}
                <Card className="bg-gradient-to-r from-gray-50/50 to-gray-100/50 border-gray-200 shadow-sm">
                  <CardContent className="p-4 sm:p-8">
                    <h3 className="font-bold text-gray-800 mb-6 text-xl">
                      Product Description
                    </h3>
                    <div
                      className="text-gray-700 prose prose-lg max-w-none leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  </CardContent>
                </Card>
                {/* Delivery Timeline */}
                <Card className="bg-gradient-to-r from-gray-50/50 to-gray-100/50 border-gray-200 shadow-sm">
                  <CardContent className="p-8">
                    <h3 className="font-bold text-gray-800 mb-6 flex items-center text-xl">
                      <Clock className="w-6 h-6 mr-3 text-blue-500" />
                      Estimated Delivery Timeline
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                        <FaBox
                          className="mx-auto mb-4 text-blue-600"
                          size={32}
                        />
                        <p className="text-lg font-semibold text-gray-800 mb-2">
                          Ordered
                        </p>
                        <p className="text-sm text-blue-600">
                          {today.toDateString()}
                        </p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl border border-yellow-200">
                        <FaPlane
                          className="mx-auto mb-4 text-yellow-600"
                          size={32}
                        />
                        <p className="text-lg font-semibold text-gray-800 mb-2">
                          Shipped
                        </p>
                        <p className="text-sm text-yellow-600">
                          {tomorrow.toDateString()}
                        </p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200">
                        <FaBoxOpen
                          className="mx-auto mb-4 text-green-600"
                          size={32}
                        />
                        <p className="text-lg font-semibold text-gray-800 mb-2">
                          Delivered
                        </p>
                        <p className="text-sm text-green-600">
                          {aftertwodays.toDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Share Button */}
                <div className="flex justify-center pt-4">
                  <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200 shadow-sm">
                    <ShareButton
                      url={`${process.env.NEXT_PUBLIC_LOCAL_URI}productdetail?id=${product._id}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductDetailClient;
