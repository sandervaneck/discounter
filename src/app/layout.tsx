// src/app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Discounts for Social Media Posts",
  description: "Get discounts for your social media posts", 
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <main className="flex-grow">{children}</main>
            <footer className="p-4 text-center text-xs text-gray-500">
              <a
                href="/privacy-policy"
                className="underline hover:text-gray-700"
              >
                Privacy Policy
              </a>
              {" | "}
              <a
                href="/terms-of-service"
                className="underline hover:text-gray-700"
              >
                Terms of Service
              </a>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
