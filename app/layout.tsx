import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { IdleTimeout } from "@/components/ui/IdleTimeout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bridget Children Foundation For Quality Education",
  description: "A philanthropic initiative dedicated to expanding educational opportunities for talented students from disadvantaged backgrounds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased`}
      >
        <IdleTimeout />
        {children}
      </body>
    </html>
  );
}
