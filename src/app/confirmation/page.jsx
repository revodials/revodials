import Link from 'next/link';
import React from 'react';

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 text-center">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full">
            <div className="mb-2">
          <img
            src="/tick.gif"
            alt="Order Confirmed"
            className="w-40 mx-auto"
          />
        </div>
        <h1 className="text-3xl font-bold text-green-600 mb-4">Thank You!</h1>
        <p className="text-lg text-gray-700 mb-1">Your order has been confirmed.</p>
        <p className="text-sm text-gray-500 mb-6">
          You’ll receive an email with your order details shortly.
        </p>
        <button
          className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition"
          >
            <Link href="/" className="text-white">
          Continue Shopping
        </Link>
        </button>
        
        
      </div>
    </div>
  );
};

export default Page;
