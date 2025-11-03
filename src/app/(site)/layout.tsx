import "./globals.css";
import Header from "@/components/module/Header/Header";
import HeaderMenu from "@/components/module/HeaderMenu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
      <body dir="rtl">
        <Header />
        <HeaderMenu />
        {children}
      </body>
    </html>
  );
}
