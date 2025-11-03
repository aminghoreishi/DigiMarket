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
        <div className="admin-layout">
          {/* مثلاً اینجا منوی ادمین یا Sidebar */}
          {children}
        </div>
      </body>
    </html>
  );
}
