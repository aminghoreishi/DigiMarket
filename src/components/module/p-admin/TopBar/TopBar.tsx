import { authUser } from "@/utils/auth";
import { IoMenuOutline } from "react-icons/io5";

async function TopBar({ title }: { title: string }) {
  const user = await authUser();
  console.log(user);

  const displayName =
    user.user?.fullName || user.user?.email?.split("@")[0] || "کاربر";

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
            سلام ،<span className="text-base text-black">{displayName}</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default TopBar;
