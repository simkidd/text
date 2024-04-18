import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.scss";
import AdminHeader from "@/app/(dashboard)/components/AdminHeader";
import AdminSidebar from "@/app/(dashboard)/components/AdminSidebar";
import { Providers } from "../providers";
import { Suspense } from "react";
import NextTopLoader from "nextjs-toploader";
import LoadingSpinner from "@/components/LoadingSpinner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
            <div className="min-h-screen light bg-[#f1f1f1] dark:bg-[#2a2b2f]">
              <div className="w-full relative">
                <AdminSidebar />
                <div className="lg:w-[calc(100%-220px)] md:w-[calc(100%-80px)] w-full ms-auto transition-all duration-500 ease-linear">
                  <AdminHeader />
                  <main className="py-5 px-2 md:px-5">
                    <div className="container mx-auto px-2">{children}</div>
                  </main>
                </div>
              </div>
            </div>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
