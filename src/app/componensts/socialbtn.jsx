"use client";
import { FaFacebook, FaInstagram } from "react-icons/fa6";
import React from "react";

function Socialbtn() {
  return (
    <div className="flex gap-3 justify-center md:justify-start mt-1 items-center">
      <button
        onClick={() => window.open("https://www.facebook.com/people/Zalvox/61576137486304/#", "_blank")}
        aria-label="Facebook"
        className="text-white hover:text-blue-600 transition duration-100"
      >
        <FaFacebook size={23} />
      </button>
      <button
        onClick={() => window.open("https://www.instagram.com/zalvoxwatches?igsh=MTEyM3VqY3V6dHNiNQ==", "_blank")}
        aria-label="Instagram"
        className="text-white hover:text-pink-500 transition duration-100"
      >
        <FaInstagram size={24} />
      </button>
    </div>
  );
}

export default Socialbtn;
