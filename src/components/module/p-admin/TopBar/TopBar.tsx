import { authUser } from "@/utils/auth";

import BtnTopBar from "./BtnTopBar";

async function TopBar({ title }: { title: string }) {
  const user = await authUser();
  console.log(user);

  const displayName =
    user.user?.fullName || user.user?.email?.split("@")[0] || "کاربر";

  return (
    <>
      <div className="font-danaMed  flex justify-between">
        <div className="flex items-center gap-5 justify-center">
          <div className="lg:hidden">
            <BtnTopBar />
          </div>
          <h2 className="max-sm:text-sm">{title}</h2>
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
