import "./styles/globals.css";

import ClientProviders from "./providers";
import { Toaster } from "react-hot-toast";

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
        <ClientProviders>{children}</ClientProviders>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            className: "!font-danaMed",
            duration: 3000,
            style: {
              fontSize: "14px",
              fontFamily: "dana",
            },
          }}
        />
      </body>
    </html>
  );
}
