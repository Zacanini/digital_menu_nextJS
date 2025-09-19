import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

import { Header } from "../components/shared/Header";
import { Footer } from "../components/shared/Footer";
import { CartSidebar } from "../components/shared/CartSidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Fontes customizadas para Sapore
const playfairDisplay = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sapore - Menu Digital",
  description: "Menu digital elegante para uma experiência gastronômica italiana premium",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} ${inter.variable} antialiased font-body`}
      >
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <CartSidebar />
      </body>
    </html>
  );
}
