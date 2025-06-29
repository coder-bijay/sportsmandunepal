import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Container from "../common/Container";
import { Navbar } from "../common/components/Layout/Navbar";
import Footer from "../common/components/Layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sports Mandu Nepal",
  description:
    "Top-quality sports gear at wholesale & retail rates. Fast delivery across Nepal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <Navbar />
        <main className="mt-[60px] flex flex-col justify-between lg:px-4 lg:mt-[108px] w-full h-[calc(100vh-60px)] lg:h-[calc(100vh-108px)] ">
          <Container>{children}</Container>
          <Footer />
        </main>
      </body>
    </html>
  );
}
