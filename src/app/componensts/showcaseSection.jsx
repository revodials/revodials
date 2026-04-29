"use client";
import React from "react";
import { FadeIn } from "./fadein";
import { motion } from "framer-motion";
import { ShieldAlert, Zap, Banknote, Sparkles } from "lucide-react";
import { Shield } from "lucide-react";

function ShowcaseSection() {
  return (
    <FadeIn
      direction="up"
      className="flex flex-col items-center justify-center py-16 mx-auto w-full"
    >
      <section className="py-24 w-full bg-black text-white border-y-[6px] border-red-600 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-red-600 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-yellow-500 rounded-full blur-[120px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 uppercase tracking-wider">
              Why 100,000+ Pakistanis <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500">Trust Revo Dials</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 font-medium max-w-3xl mx-auto">
              We don't just sell watches. We sell confidence. Experience premium quality without the ridiculous luxury markup.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {[
              {
                icon: Shield,
                title: "100% Satisfaction",
                desc: "Built to last. Scratch-resistant glass and premium stainless steel cases.",
                color: "text-red-500",
                bg: "bg-red-500/10",
                border: "border-red-500/20"
              },
              {
                icon: Banknote,
                title: "Money Back Gurantee",
                desc: "3 Days Return & Exchange Policy with Easy and Quick Returns",
                color: "text-green-400",
                bg: "bg-green-400/10",
                border: "border-green-400/20"
              },
              {
                icon: Zap,
                title: "Fast Delivery",
                desc: "Free 2-3 day shipping across Pakistan. We process orders within 2 hours.",
                color: "text-yellow-400",
                bg: "bg-yellow-400/10",
                border: "border-yellow-400/20"
              },
              {
                icon: Sparkles,
                title: "24/7 Customer Support",
                desc: "Our team is available 24/7 to assist you with any queries or concerns.",
                color: "text-blue-400",
                bg: "bg-blue-400/10",
                border: "border-blue-400/20"
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-8 rounded-2xl border ${feature.border} bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group`}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${feature.bg} mb-6`}
                >
                  <feature.icon className={`w-10 h-10 ${feature.color} drop-shadow-lg group-hover:scale-110 transition-transform`} />
                </motion.div>
                <h3 className="text-2xl font-bold mb-3 uppercase tracking-wide">{feature.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </FadeIn>
  );
}

export default ShowcaseSection;
