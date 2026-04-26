"use client";

import Image from "next/image";
import Navbar from "../componensts/navbar";

export default function Page() {
  return (
    <>
    <Navbar/>
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Zalvox</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Crafting timeless elegance one watch at a time.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <Image
            src="/img.webp" // Make sure the image exists in `public/images/`
            alt="Luxury watch"
            width={600}
            height={400}
            className="rounded-xl shadow-lg bg-center"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-700 mb-4">
            Zalvox was founded with a simple mission: to bring premium quality timepieces
            to watch lovers in Pakistan and beyond, without the luxury markup. Our passion
            lies in blending classic craftsmanship with modern design.
          </p>
          <p className="text-gray-700">
            Every watch we sell is a symbol of precision, durability, and timeless style —
            built to make a statement and last for years. Whether you're dressing up or
            keeping it casual, we’ve got a timepiece that fits your vibe.
          </p>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Why Choose Zalvox?</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          From fast shipping and secure checkout to dedicated support and warranty assurance,
          we strive to make your Zalvox experience as timeless as our watches.
        </p>
      </div>

      <div className="mt-16 grid md:grid-cols-3 gap-6 text-center">
        <div className="bg-neutral-100 p-6 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-2">Premium Quality</h3>
          <p className="text-gray-600 text-sm">Every piece is crafted with precision materials and rigorous QC.</p>
        </div>
        <div className="bg-neutral-100 p-6 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-2">Affordable Luxury</h3>
          <p className="text-gray-600 text-sm">Luxury designs that don’t break the bank — fashion meets value.</p>
        </div>
        <div className="bg-neutral-100 p-6 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-2">Trusted by Customers</h3>
          <p className="text-gray-600 text-sm">Thousands of satisfied customers across Pakistan.</p>
        </div>
      </div>
          <div className="mt-10 text-center bg-neutral-100 p-8 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-2">Need to reach us?</h2>
        <p >
          For business inquiries, support, or questions, feel free to email us anytime.
        </p>
        <p className="mt-4 text-lg font-medium">
         <a href="mailto:info.zalvox@gmail.com" className="underline hover:text-gray-400">info.zalvox@gmail.com</a>
        </p>
      </div>
    </div>
    </>
  );
}
