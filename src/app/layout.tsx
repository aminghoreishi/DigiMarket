import "./styles/globals.css";
import LoaderProvider from "./providers";
import AuthRefresh from "@/components/module/AuthRefresh";

export const metadata = {
  title: "DigiMarket",
  description: "فروشگاه دیجیتال",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa">
      <body dir="rtl">
        <AuthRefresh />
        <LoaderProvider>{children}</LoaderProvider>
      </body>
    </html>
  );
}
