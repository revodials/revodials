"use client";

import React from "react";
import { Truck, PackageOpen, Banknote, ShieldCheck } from "lucide-react";

const BADGES = [
  {
    icon: Truck,
    label: "Free Delivery",
    sub: "All Over Pakistan",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    icon: PackageOpen,
    label: "Allow Check",
    sub: "Check parcel first",
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-100",
  },
  {
    icon: Banknote,
    label: "Cash On Delivery",
    sub: "Pay when it arrives",
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-100",
  },
  {
    icon: ShieldCheck,
    label: "7 Day Replacement",
    sub: "Hassle-free warranty",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
];

function TrustBadges() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-3">
      {BADGES.map(({ icon: Icon, label, sub, color, bg, border }) => (
        <div
          key={label}
          className={`flex items-center gap-2.5 rounded-xl border ${border} ${bg} px-3 py-2.5 sm:flex-col sm:text-center sm:gap-2 sm:py-4`}
        >
          <div className={`flex-shrink-0 rounded-full bg-white p-2 shadow-sm ${color}`}>
            <Icon className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.25} />
          </div>
          <div className="min-w-0">
            <p className="text-xs sm:text-sm font-semibold text-gray-800 leading-tight">
              {label}
            </p>
            <p className="text-[11px] sm:text-xs text-gray-500 leading-tight">
              {sub}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TrustBadges;
