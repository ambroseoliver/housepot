"use client";

import Image from "next/image";

const images = [
  "/homes/1.jpg",
  "/homes/2.jpg",
  "/homes/3.jpg",
  "/homes/4.jpg",
  "/homes/5.jpg",
];

export default function PropertyShowcase() {
  return (
    <div className="flex justify-center gap-4 flex-wrap">
      {images.map((img, index) => (
        <div
          key={index}
          className="rounded-2xl overflow-hidden shadow-lg max-w-xs"
        >
          <Image
            src={img}
            alt={`home-${index}`}
            className="object-cover w-full h-64"
            width={400}
            height={256}
          />
        </div>
      ))}
    </div>
  );
}
