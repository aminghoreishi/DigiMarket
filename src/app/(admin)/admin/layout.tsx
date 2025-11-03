import SideBar from "@/components/module/p-admin/SideBar/SideBar";
import "../../globals.css";

export const metadata = {
  title: "پنل ادمین",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa">
      <body dir="rtl" className="bg-gray-50">
        {/* سایدبار fixed */}
        {/* سایدبار - در موبایل hidden */}
        <div className="fixed top-0 right-0 bottom-0 w-full max-w-[20%] bg-white shadow-2xl z-50 overflow-hidden hidden md:block">
          <SideBar />
        </div>

        {/* محتوا - در موبایل pr-0 */}
        <div className="pr-0 md:pr-[20%] min-h-screen">
          <div className="max-md:p-5 p-8">{children}</div>
        </div>
      </body>
    </html>
  );
}
