"use client";

import { useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
import SideBar from "../SideBar/SideBar";

function BtnTopBar() {
  const [isClick, setIsClick] = useState(false);
  return (
    <>
      <div className="flex flex-col items-center">
        <button onClick={() => setIsClick(!isClick)}>
          <IoMenuOutline size={20} />
        </button>
      </div>

      <SIdeBarMenu setIsClick={setIsClick} isClick={isClick} />
    </>
  );
}

const SIdeBarMenu = ({
  setIsClick,
  isClick,
}: {
  setIsClick: (value: boolean) => void;
  isClick: boolean;
}) => {
  return (
    <div
      className={`fixed top-0 transition-all ${isClick ? "right-0" : "-right-60"}  bottom-0 w-full  max-md:max-w-[65%] bg-white shadow-2xl z-50 overflow-hidden  block md:hidden`}
    >
      <SideBar />
      <div
        onClick={() => setIsClick(false)}
        className={`bg-black/60 ${isClick ? "fixed inset-0 -z-30" : ""}`}
      ></div>
    </div>
  );
};

export default BtnTopBar;
