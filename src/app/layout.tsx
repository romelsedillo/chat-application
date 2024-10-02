import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// import { Toaster } from "react-hot-toast";
import { Toaster } from "@/components/ui/sonner"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Chat Application",
  description: "Chat application in Nextjs and Supabase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="p-4 h-screen bg-slate-500">
          {/* <Toaster position="top-center" reverseOrder={false} /> */}
          {children}
          <Toaster />
        </main>
      </body>
    </html>
  );
}
