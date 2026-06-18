"use client";

import React from "react";
import { Users, Star, PackageCheck } from "lucide-react";

const STATS = [
  {
    icon: Users,
    value: "5000+",
    label: "Happy Customers",
    color: "text-blue-600",
    bg: "from-blue-50 to-blue-100",
  },
  {
    icon: Star,
    value: "4.8/5",
    label: "Customer Rating",
    color: "text-yellow-500",
    bg: "from-yellow-50 to-yellow-100",
  },
  {
    icon: PackageCheck,
    value: "10000+",
    label: "Watches Delivered",
    color: "text-green-600",
    bg: "from-green-50 to-green-100",
  },
];

function SocialProof() {
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-4">
      {STATS.map(({ icon: Icon, value, label, color, bg }) => (
        <div
          key={label}
          className={`flex flex-col items-center justify-center text-center rounded-2xl border border-gray-200 bg-gradient-to-br ${bg} px-2 py-4 sm:py-6 shadow-sm`}
        >
          <Icon className={`w-5 h-5 sm:w-6 sm:h-6 mb-1.5 ${color}`} strokeWidth={2.25} />
          <p className="text-base sm:text-xl font-bold text-gray-800 leading-tight">
            {value}
          </p>
          <p className="text-[11px] sm:text-xs text-gray-600 leading-tight mt-0.5">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}

export default SocialProof;
