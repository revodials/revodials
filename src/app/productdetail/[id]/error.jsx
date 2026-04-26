"use client";

export default function Error({ error, reset }) {
  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <h1 className="text-3xl font-bold text-red-600">Something went wrong</h1>
      <p className="text-gray-600 mt-2">
        {error?.message || "Unexpected error occurred."}
      </p>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
      >
        Try Again
      </button>
    </div>
  );
}
