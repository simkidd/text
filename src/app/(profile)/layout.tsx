import LoadingSpinner from "@/components/LoadingSpinner";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Suspense } from "react";
import HeaderShop from "../(ecommerce)/components/HeaderShop";
import "../globals.scss";
import { Providers } from "../providers";
import ProfileSidebar from "./components/ProfileSidebar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Account",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NextTopLoader
          color="#9dc900"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
        />
        <Providers>
          <Suspense fallback={<LoadingSpinner />}>
            <HeaderShop />
            <div className="min-h-screen light bg-[#f1f1f1] dark:bg-[#2a2b2f]">
              <div className="w-full container max-w-[1100px] mx-auto px-2 py-4 grid grid-cols-1 lg:grid-cols-4 gap-5">
                <div className="col-span-1">
                  <ProfileSidebar />
                </div>
                <main className="w-full lg:col-span-3 light bg-white dark:bg-[#222327] font-dmsans">
                  {children}
                </main>
              </div>
            </div>
            <Footer />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
