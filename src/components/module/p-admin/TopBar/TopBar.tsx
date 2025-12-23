import { authUser } from "@/utils/auth";

import BtnTopBar from "./BtnTopBar";
import userModel from "@/models/user";
import { auth } from "@/auth";

async function TopBar({
  title,
  isPanelUser,
}: {
  title: string;
  isPanelUser: boolean;
}) {
  const user = await authUser();

  const session = await auth();
  const userFind = await userModel
    .findOne({ email: session?.user.email })
    .select("fullName role");

  console.log(userFind);

  const displayName =
    user.user?.fullName ||
    user.user?.email?.split("@")[0] ||
    userFind?.fullName;

  return (
    <>
      <div className="font-danaMed  flex justify-between">
        <div className="flex items-center gap-5 justify-center">
          <div className="lg:hidden">
            <BtnTopBar isPanelUser={isPanelUser} />
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
