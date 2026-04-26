"use client";
import React, { useState, useEffect } from "react";
import { X, Gift } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    // Check if it's already been shown in this session
    const hasSeenPopup = sessionStorage.getItem("hasSeenExitPopup");
    if (hasSeenPopup) {
      setHasTriggered(true);
      return;
    }

    const handleMouseLeave = (e) => {
      // Trigger if mouse leaves top of screen
      if (e.clientY <= 0 && !hasTriggered) {
        setIsVisible(true);
        setHasTriggered(true);
        sessionStorage.setItem("hasSeenExitPopup", "true");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasTriggered]);

  const closePopup = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 px-4 sm:px-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closePopup}
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden z-10 border border-gray-100"
          >
            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 p-2 bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-black rounded-full transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="p-8 md:p-10 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 text-red-600 rounded-full mb-6">
                <Gift className="w-10 h-10" />
              </div>
              
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2 uppercase tracking-tight">
                Wait! Don't leave yet.
              </h2>
              
              <p className="text-lg text-gray-600 mb-6 font-medium">
                We noticed you're about to leave. Complete your order today and enjoy <span className="text-red-600 font-bold">FREE DELIVERY</span> anywhere in Pakistan.
              </p>
              
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-4 mb-8">
                <p className="text-sm text-gray-500 uppercase tracking-widest font-bold mb-1">Promo Code Applied Automatically</p>
                <p className="text-2xl font-black text-black tracking-widest">FREESHIP</p>
              </div>

              <div className="space-y-4">
                <Link href="#product" onClick={closePopup}>
                  <button className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-lg font-bold rounded-xl shadow-lg shadow-red-500/30 transform transition-all hover:scale-105">
                    CLAIM MY OFFER NOW
                  </button>
                </Link>
                
                <button 
                  onClick={closePopup}
                  className="w-full py-3 text-gray-500 font-medium hover:text-black transition-colors"
                >
                  No thanks, I prefer paying for shipping
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
