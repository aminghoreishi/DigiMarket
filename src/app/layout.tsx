import "./styles/globals.css";

import ClientProviders from "./providers";
import { Toaster } from "react-hot-toast";

export const metadata = {
  icons: {
    icon: "/image/logo (1).png",
  },
  title: "فروشگاه دیجی استار",
  description: "فروشگاهی برای لوازم دیجیتال",
  authors: [
    {
      name: "Amin",
      url: "https://your-site.com",
    },
  ],
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
