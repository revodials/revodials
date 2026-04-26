"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { FadeIn } from "./fadein";

const faqs = [
  {
    question: "Can I open and check the parcel before making payment?",
    answer: "Yes, absolutely! We believe in 100% transparency. You can open your parcel, check the watch, and only pay the rider when you are completely satisfied with the quality."
  },
  {
    question: "How long does delivery take?",
    answer: "We offer lightning-fast delivery across Pakistan. Orders are typically delivered within 2 to 4 working days. You will receive a tracking link via SMS/WhatsApp once your order is dispatched."
  },
  {
    question: "What is your return and warranty policy?",
    answer: "We offer a 7-Day Easy Return Policy if you receive a damaged or wrong item. Additionally, all our premium watches come with a machine warranty. Contact our WhatsApp support for any claims."
  },
  {
    question: "Is there any delivery charge?",
    answer: "No! We offer FREE Delivery all over Pakistan. You only pay the price of the watch."
  },
  {
    question: "How do I know the quality is good?",
    answer: "We source our products directly from top-tier manufacturers. Our 100,000+ happy customers and 4.8/5 star rating speak for our quality. Plus, our 'Check First, Pay Later' policy ensures you take zero risk!"
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <FadeIn direction="up">
      <div className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
              <HelpCircle className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about shopping with Zalvox.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`border-2 rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-black bg-gray-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                >
                  <button
                    className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  >
                    <span className="font-bold text-lg text-gray-900 pr-4">{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-6 h-6 text-black flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                    )}
                  </button>

                  <div
                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center p-8 bg-gray-50 rounded-2xl border border-gray-200">
            <p className="text-lg text-gray-700 font-medium mb-4">Still have questions?</p>
            <a
              href="https://wa.me/923196582699"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-6 sm:px-6 py-3 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-colors duration-300 shadow-lg shadow-green-500/30"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
