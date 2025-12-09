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
  
      <div className="pr-0 lg:pr-[20%] min-h-screen" dir="rtl">
        <div className="max-md:p-5 p-8">{children}</div>
      </div>
    </>
  );
}
