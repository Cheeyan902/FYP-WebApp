import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navigation from "./components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Solana Certificate Verification System",
  description: "A decentralized certificate verification system built on Solana blockchain",
  keywords: "Solana, blockchain, certificate verification, digital certificates, SSL/TLS",
  authors: [{ name: "Your Name" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#0284c7", // primary-600 color
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
