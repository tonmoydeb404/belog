import { AppLayout } from "@/layouts/app-layout";
import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "../styles/main.css";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  variable: "--font-ubuntu",
});

export const metadata: Metadata = {
  title: {
    default: "Belog",
    template: "%s - Belog",
  },
  description: "Your Personal Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${ubuntu.variable}`}>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
