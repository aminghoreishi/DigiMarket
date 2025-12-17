"use client";
import { useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
import SideBar from "../SideBar/SideBar";

export default function BtnTopBar() {
  const [isClick, setIsClick] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center">
        <button onClick={() => setIsClick(prev => !prev)}>
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
    <div
      className={`fixed top-0 bottom-0 transition-all ${
        isClick ? "right-0" : "max-sm:-right-72 sm:-right-[300px]"
      } w-full max-lg:max-w-[65%] bg-white shadow-2xl z-50 overflow-hidden`}
    >
      <SideBar />
      <div
        onClick={() => setIsClick(false)}
        className={`bg-black/60 ${isClick ? "fixed inset-0 z-30" : ""}`}
      ></div>
    </div>
  );
};
