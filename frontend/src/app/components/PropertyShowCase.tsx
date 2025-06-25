"use client";

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
          <img
            src={img}
            alt={`home-${index}`}
            className="object-cover w-full h-64"
          />
        </div>
      ))}
    </div>
  );
}
