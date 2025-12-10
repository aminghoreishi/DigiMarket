import { authAdmin } from "@/utils/auth";
import { IoMenuOutline } from "react-icons/io5";
import SideBar from "../SideBar/SideBar";
async function TopBar({ title }: { title: string }) {
  const isAdmin = await authAdmin();

  console.log(isAdmin);

  return (
    <>
   

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
