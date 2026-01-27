

import "./globals.css";
import type { Metadata } from "next";
import { Poppins, Inter } from 'next/font/google'

import Navbar from "@/components/navigation/Navbar";
import Sidebar from "@/components/navigation/Sidebar";


// Font configurations
const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins'
})

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter'
})

// Metadata for the application
export const metadata = {
  title: {
    template: "%s | iPlayMusic", //%s placeholder will be replaced by the page title defined in each page
    default: "iPlayMusic"
  },
  description: "Stream and discover music",
};


// Root layout component
export default function RootLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return ( 
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}> 
      <body className="antialiased">
        <Navbar />
        <div className="flex pt-16">
          <Sidebar />
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}


