"use client";

import React, { useEffect, useState } from "react";
import { Flame, TrendingUp, Eye } from "lucide-react";

// Deterministic pseudo-random viewer count so it's stable for a given
// product within the same hour, rather than randomly jumping on every
// render (which reads as fake/spammy).
function getViewerCount(seed) {
  const hourBucket = Math.floor(Date.now() / (1000 * 60 * 30)); // changes every 30 min
  let hash = 0;
  const str = `${seed}-${hourBucket}`;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return 8 + (Math.abs(hash) % 19); // 8–26 viewers
}

function UrgencySection({ productId }) {
  const [viewers, setViewers] = useState(null);

  useEffect(() => {
    setViewers(getViewerCount(productId || "default"));
  }, [productId]);

  return (
    <div className="rounded-2xl border border-orange-100 bg-gradient-to-r from-orange-50 via-red-50 to-orange-50 p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
        <div className="flex items-center gap-2.5">
          <div className="flex-shrink-0 rounded-full bg-white p-1.5 shadow-sm">
            <Flame className="w-4 h-4 text-orange-500" strokeWidth={2.5} />
          </div>
          <p className="text-sm font-semibold text-gray-800">
            Limited Stock Available
          </p>
        </div>

        <div className="hidden sm:block w-px h-5 bg-orange-200" />

        <div className="flex items-center gap-2.5">
          <div className="flex-shrink-0 rounded-full bg-white p-1.5 shadow-sm">
            <TrendingUp className="w-4 h-4 text-red-500" strokeWidth={2.5} />
          </div>
          <p className="text-sm font-semibold text-gray-800">
            High Demand Product
          </p>
        </div>

        <div className="hidden sm:block w-px h-5 bg-orange-200" />

        <div className="flex items-center gap-2.5">
          <div className="flex-shrink-0 rounded-full bg-white p-1.5 shadow-sm">
            <Eye className="w-4 h-4 text-blue-500" strokeWidth={2.5} />
          </div>
          <p className="text-sm font-semibold text-gray-800">
            {viewers ?? "—"} people viewing this right now
          </p>
        </div>
      </div>
    </div>
  );
}

export default UrgencySection;
