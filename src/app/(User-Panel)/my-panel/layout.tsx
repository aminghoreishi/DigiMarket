import { cookies } from "next/headers";
import "../../styles/globals.css";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SideBarUserPanel from "@/components/module/user-panel/SideBarUserPanel";
export const metadata = {
  title: "پنل کاربری",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const refreshToken = cookieStore.get("refresh-token")?.value;

  const session = await auth();

  if (!token && !refreshToken && session?.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <>
      <div className="fixed top-0  right-0 bottom-0 w-full  lg:max-w-[20%] bg-white shadow-2xl z-50 overflow-hidden  block max-lg:hidden">
        <SideBarUserPanel />
      </div>
      <div className="pr-0 lg:pr-[20%] min-h-screen" dir="rtl">
        <div className="max-sm:p-2 max-md:p-5 p-8">{children}</div>
      </div>
    </>
  );
}
