import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./lib/Provider";
import Navbar from "./_comps/Navbar";
import LogoutModal from "./_comps/LogoutModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s / Alpstein",
    default: "Alsptein",
  },
  icons: {
    icon: "/logo.svg",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body
        id="root-container"
        className={`${geistSans.variable} ${geistMono.variable} relative bg-[var(--background)] antialiased`}
      >
        <Navbar />
        <LogoutModal />
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
