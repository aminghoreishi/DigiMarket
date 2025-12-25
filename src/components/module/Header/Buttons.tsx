import { FaRegUser } from "react-icons/fa6";
import { authUser } from "@/utils/auth";
import { auth } from "@/auth";
import db from "@/config/db";
import userModel from "@/models/user";
import Link from "next/link";
import { LuUser } from "react-icons/lu";
import { BsBasket } from "react-icons/bs";
import { RiAdminLine } from "react-icons/ri";
import SignOut from "./SignOut";
import Cart from "./Cart";

async function Buttons() {
  await db();

  const user = await authUser();
  const isLoggedIn = !!user.user;
  const isAdmin = user.user?.role === "ADMIN";

  const session = await auth();
  const sessionUser = session?.user;

  const userFind = sessionUser?.email
    ? await userModel.findOne({ email: sessionUser.email }, "role fullName")
    : null;

  const displayName =
    user.user?.fullName ||
    user.user?.email?.split("@")[0] ||
    userFind?.fullName ||
    "کاربر";
  return (
    <div className="flex items-center font-danaMed gap-3">
      {isLoggedIn || session?.user ? (
        <>
          <div className="flex relative group items-center gap-x-2 border-2 p-2 rounded-xl border-gray-300 cursor-pointer">
            <p className="text-xs">حساب کاربری</p>
            <FaRegUser />

            <div className="absolute transition-all duration-300 opacity-0 invisible group-hover:visible group-hover:opacity-100 bg-white top-10  shadow-lg rounded-xl p-4 w-52 -right-24 border-2 border-gray-200">
              <ul className="text-sm flex flex-col gap-4 *:transition-colors *:hover:text-orange-500">
                <li className="flex items-center gap-2">
                  <LuUser />
                  <p>{displayName}</p>
                </li>
                <li className="flex items-center gap-2">
                  <BsBasket />
                  <p>سفارش ها</p>
                </li>
                {userFind?.role !== "ADMIN" && user.user.role === "USER" && (
                  <Link href="/my-panel">
                    <li className="flex items-center gap-2">
                      <BsBasket />
                      <p>پنل کاربری</p>
                    </li>
                  </Link>
                )}

                {userFind?.role === "ADMIN" || isAdmin ? (
                  <Link href="/admin">
                    <li className="flex items-center gap-2">
                      <RiAdminLine />
                      <p>پنل ادمین</p>
                    </li>
                  </Link>
                ) : null}

                <SignOut />
              </ul>
            </div>
          </div>
          <div>
            <Cart />
          </div>
        </>
      ) : (
        <div>
          <Link href="/login">
            <button className="text-sm border-2 text-orange-500 transition-all hover:bg-orange-500 hover:text-white cursor-pointer border-orange-500 px-3 py-2 rounded-xl">
              وارد شوید
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Buttons;
