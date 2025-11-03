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
      <body dir="rtl">
        <div className="grid grid-cols-12">
          <div className="col-span-2 border-r h-screen">
            <SideBar />
          </div>
          <div className="col-span-10">{children}</div>
        </div>
      </body>
    </html>
  );
}
