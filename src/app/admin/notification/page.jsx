'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { sendDirectEmail } from '@/app/actions/email-sending';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(1, 'Message is required'),
});

export default function Page() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const res = await sendDirectEmail(data);
    setResult(res.message);
    setLoading(false);
    reset();
  };

  return (
    <div className="max-w-xl mx-auto  p-4 bg-white rounded-3xl shadow-xl border border-gray-200">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-900 tracking-tight">Send Email to Customers</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">Name</label>
          <input
            type="text"
            {...register('name')}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Your full name"
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors?.name?.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">Email</label>
          <input
            type="email"
            {...register('email')}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="your@email.com"
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors?.email?.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">Message</label>
          <textarea
            rows={5}
            {...register('message')}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            placeholder="Type your message here..."
          />
          {errors.message && (
            <p className="text-sm text-red-500 mt-1">{errors?.message?.message}</p>
          )}
        </div>

        <div className="w-fit mx-auto">
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-2 px-8 rounded-xl shadow hover:from-blue-700 hover:to-blue-800 transition duration-200 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </div>

        {result && (
          <p className="text-center text-sm mt-4 text-green-600 font-medium">{result}</p>
        )}
      </form>
    </div>
  );
}
