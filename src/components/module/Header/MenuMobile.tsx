"use client";
import { useState } from "react";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";

function MenuMobile() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="منوی موبایل"
      >
        {isOpen ? <IoCloseOutline size={24} /> : <IoMenuOutline size={24} />}
      </button>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60  z-40 transition-opacity duration-300"
        />
      )}

      <div
        className={`fixed top-0 bottom-0 right-0 w-60 bg-white shadow-2xl z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-5" : "translate-x-[120%]"
        }`}
      >
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">منوی اصلی</h3>
          <ul className="space-y-3">
            <li>
              <a href="#" className="block py-2 hover:text-blue-600 transition">
                خانه
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 hover:text-blue-600 transition">
                محصولات
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 hover:text-blue-600 transition">
                تماس با ما
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MenuMobile;