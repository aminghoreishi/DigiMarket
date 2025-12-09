import { authAdmin } from "@/utils/auth";
import { IoMenuOutline } from "react-icons/io5";
import SideBar from "../SideBar/SideBar";
async function TopBar({ title }: { title: string }) {
  const isAdmin = await authAdmin();

  console.log(isAdmin);

  return (
    <>
      <div className="fixed top-0 max-md:-right-[300px] lg:right-0 bottom-0 w-full max-sm:max-w-[70%] md:max-w-[40%] lg:max-w-[20%] bg-white shadow-2xl z-50 overflow-hidden  block">
        <SideBar />
      </div>

      <div className="font-danaMed  flex justify-between">
        <div className="flex items-center justify-center">
          <h2>{title}</h2>
          <button>
            <IoMenuOutline size={20} />
          </button>
        </div>
        <div>
          <p className="text-xs text-zinc-500">
            سلام ،<span className="text-base text-black"></span>
          </p>
        </div>
      </div>
    </>
  );
}

export default TopBar;
