import Image from "next/image";

export default function WhatsAppButton() {
  const number = "254712345678";
  const message = "Hello! I'm interested in one of your listings.";
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition"
      aria-label="Chat on WhatsApp"
    >
      <Image
        src="/icons/whatsapp.svg"
        alt="WhatsApp"
        width={24}
        height={24}
        className="invert"
      />
    </a>
  );
}
