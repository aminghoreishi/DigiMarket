"use client";
import { useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
function MenuMobile() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div>
      <div onClick={() => setIsOpen((pre) => !pre)}>
        <IoMenuOutline size={20} />
      </div>

      {isOpen && (
        <div className="fixed right-0 min-h-screen top-0 bottom-0">
          <div>dgggggd</div>
        </div>
      )}
    </div>
  );
}

export default MenuMobile;
