"use client";
import { useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
import SideBar from "../SideBar/SideBar";
import SideBarUserPanel from "../../user-panel/SideBarUserPanel";

export default function BtnTopBar({ isPanelUser }) {
  const [isClick, setIsClick] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center">
        <button onClick={() => setIsClick((prev) => !prev)}>
          <IoMenuOutline size={20} />
        </button>
      </div>

      <SideBarMenu isPanelUser={isPanelUser} setIsClick={setIsClick} isClick={isClick} />
    </>
  );
}

const SideBarMenu = ({
  setIsClick,
  isClick,
  isPanelUser
}: {
  setIsClick: React.Dispatch<React.SetStateAction<boolean>>;
  isClick: boolean;
  isPanelUser:boolean
}) => {
  return (
    <>
      {isClick && (
        <div
          onClick={() => setIsClick(false)}
          className="fixed inset-0 bg-black/60 z-40"
        />
      )}

      <div
        className={`
          fixed top-0 bottom-0 right-0 z-50
          w-full max-lg:max-w-[65%] max-w-[300px]
          bg-white shadow-2xl
          transition-transform duration-300
          ${isClick ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {!isPanelUser ? <SideBar /> : <SideBarUserPanel />}
        <SideBar />
      </div>
    </>
  );
};
