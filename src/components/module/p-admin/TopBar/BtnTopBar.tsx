"use client";
import { useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
import SideBar from "../SideBar/SideBar";

export default function BtnTopBar() {
  const [isClick, setIsClick] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center">
        <button onClick={() => setIsClick((prev) => !prev)}>
          <IoMenuOutline size={20} />
        </button>
      </div>

      <SideBarMenu setIsClick={setIsClick} isClick={isClick} />
    </>
  );
}

const SideBarMenu = ({
  setIsClick,
  isClick,
}: {
  setIsClick: React.Dispatch<React.SetStateAction<boolean>>;
  isClick: boolean;
}) => {
  return (
    <>
      {/* Overlay */}
      {isClick && (
        <div
          onClick={() => setIsClick(false)}
          className="fixed inset-0 bg-black/60 z-40"
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 bottom-0 right-0 z-50
          w-full max-lg:max-w-[65%] max-w-[300px]
          bg-white shadow-2xl
          transition-transform duration-300
          ${isClick ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <SideBar />
      </div>
    </>
  );
};
