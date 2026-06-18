"use client";

import React from "react";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

function initials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Stars({ rating }) {
  return (
    <div className="flex text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < rating ? "fill-current" : "fill-none text-gray-300"}`}
        />
      ))}
    </div>
  );
}

const DEFAULT_REVIEWS = [
  {
    name: "Ahmed Raza",
    location: "Lahore",
    rating: 5,
    text: "Order kiya tha COD pe, parcel khol ke check kiya pehle, watch exactly jaisi pic mein thi waisi hi mili. Quality bohat acchi hai, packaging bhi premium.",
    image: null,
  },
  {
    name: "Sana Malik",
    location: "Karachi",
    rating: 5,
    text: "Delivery 2 din mein ho gayi, rider ne pehle parcel open karne diya phir payment li. Watch bohat sober and stylish lag rahi hai. Highly recommended!",
    image: null,
  },
  {
    name: "Bilal Hussain",
    location: "Islamabad",
    rating: 4,
    text: "Cash on delivery available hone ki wajah se trust kar ke order kiya. Product genuine quality ka hai, strap thora adjust karna pada but overall satisfied.",
    image: null,
  },
];

function CustomerReviews({ reviews = DEFAULT_REVIEWS }) {
  return (
    <div className="space-y-4">
      {reviews.map((review, idx) => (
        <Card
          key={idx}
          className="border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-start gap-3">
              <Avatar className="w-10 h-10 sm:w-12 sm:h-12 border border-gray-100 flex-shrink-0">
                {review.image ? <AvatarImage src={review.image} alt={review.name} loading="lazy" /> : null}
                <AvatarFallback className="bg-gradient-to-br from-blue-100 to-purple-100 text-gray-700 font-semibold text-sm">
                  {initials(review.name)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <p className="font-semibold text-gray-800 text-sm sm:text-base">
                    {review.name}
                  </p>
                  <span className="text-xs text-gray-400">{review.location}</span>
                </div>
                <div className="mt-1 mb-2">
                  <Stars rating={review.rating} />
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {review.text}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default CustomerReviews;
