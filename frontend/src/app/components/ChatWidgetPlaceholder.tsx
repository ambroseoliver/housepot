"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react"; // Lucide chat icon

export default function ChatWidgetPlaceholder() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-20 right-6 z-50">
      {/* Chat Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg transition-all"
        aria-label="Open Chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Box */}
      {isOpen && (
        <div className="mt-2 w-64 bg-white dark:bg-gray-900 text-sm px-4 py-3 rounded-lg shadow-xl border border-gray-200 dark:border-gray-800">
          <div className="flex justify-between items-center mb-2">
            <strong>💬 Chat Support</strong>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-red-500 text-xs"
            >
              Close
            </button>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            This is a placeholder.  is to be Integrated with Intercom, Crisp, or Tawk.to.
          </p>
        </div>
      )}
    </div>
  );
}
