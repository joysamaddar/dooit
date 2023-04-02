"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[90vh] mt-[-5vh]">
      <h2 className="font-bold text-2xl text-red-600 mb-2">
        Oops! Something went wrong.
      </h2>
      <p className="text-dblack">
        {error.message}
      </p>
    </div>
  );
}
