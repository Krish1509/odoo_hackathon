import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReWear - Swap. Save. Sustain.",
  description: "A community-powered platform for swapping clothes and promoting sustainable fashion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-basewhite text-charcoal`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}