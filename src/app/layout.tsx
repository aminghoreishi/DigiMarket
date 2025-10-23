import Header from "@/components/module/Header/Header";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body lang="fa" dir="rtl">
        <Header />
        {children}
      </body>
    </html>
  );
}
