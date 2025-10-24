import Header from "@/components/module/Header/Header";
import "./globals.css";
import HeaderMenu from "@/components/module/HeaderMenu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body lang="fa" dir="rtl">
        <Header />
        <HeaderMenu />
        {children}
      </body>
    </html>
  );
}
