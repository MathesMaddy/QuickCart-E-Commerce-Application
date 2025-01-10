import localFont from "next/font/local";
import { Inter } from 'next/font/google'
import "./globals.css";
import { ProductsContextProvider } from "@/components/ProductContext";

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

export const metadata = {
  title: "QuickCart E-Commerce Application",
  description: "Discover a seamless shopping experience with our curated collection of products. Fast, secure, and user-friendly — shop your favorites with ease.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ProductsContextProvider>
          {children}
        </ProductsContextProvider>
      </body>
    </html>
  );
}
