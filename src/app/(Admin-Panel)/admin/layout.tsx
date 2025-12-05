import Protect from "@/components/module/p-admin/Protect";
import "../../styles/globals.css";
import SideBar from "@/components/module/p-admin/SideBar/SideBar";

export const metadata = {
  title: "پنل ادمین",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-[20%] bg-white shadow-2xl z-50 overflow-hidden hidden md:block">
        <SideBar />
      </div>

      // <Protect/>
      <div className="pr-0 md:pr-[20%] min-h-screen" dir="rtl">
        <div className="max-md:p-5 p-8">{children}</div>
      </div>
    </>
  );
}
