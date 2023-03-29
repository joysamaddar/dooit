"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <main className="w-full flex flex-col items-center justify-center min-h-[90vh] mt-[-5vh]">
      <h2 className="font-bold text-2xl text-red-600 mb-2">Oops! Something went wrong.</h2>
      <p className="text-dblack">We are at work and will be back shortly</p>
    </main>
  );
}
