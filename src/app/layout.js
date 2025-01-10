import { Inter } from 'next/font/google'
import "./globals.css";
import { ProductsContextProvider } from "@/components/ProductContext";

const inter = Inter({
  weight: "variable",
  subsets: ['latin'],
})

export const metadata = {
  title: "QuickCart E-Commerce Application",
  description: "Discover a seamless shopping experience with our curated collection of products. Fast, secure, and user-friendly — shop your favorites with ease.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ProductsContextProvider>
          {children}
        </ProductsContextProvider>
      </body>
    </html>
  );
}
