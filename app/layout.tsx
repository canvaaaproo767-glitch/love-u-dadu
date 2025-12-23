import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // Header import kiya
import Footer from "@/components/Footer"; // Footer import kiya

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Di's Memories Magazine",
  description: "A collection of cherished moments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable}`}>
      <body className="bg-[#FAF9F6] font-sans text-[#292524] antialiased flex flex-col min-h-screen">
        <Navbar />  {/* Header sabse upar */}
        <div className="flex-grow">
          {children}
        </div>
        <Footer />  {/* Footer sabse neeche */}
      </body>
    </html>
  );
}