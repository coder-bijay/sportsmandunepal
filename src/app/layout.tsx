import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "../common/components/Navbar";
import Container from "../common/Container";
import Footer from "../common/components/Footer";

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
  description: "All sports solutions in one place",
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
        <Container>
          <main className="mt-[60px] lg:p-4 lg:mt-[108px] w-full h-[calc(100vh-60px)] lg:h-[calc(100vh-108px)] overflow-auto">
            {children}
          </main>
        </Container>
        <Footer />
      </body>
    </html>
  );
}
