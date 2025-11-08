import "./styles/globals.css";

import ClientProviders from "./providers";

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
      </body>
    </html>
  );
}
