import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Built by Nature | Celebrate Natural Beauty",
  description:
    "The contest platform celebrating real, natural beauty. No filters, no fakes — just you. Enter contests, vote for your favorites, and win prizes.",
  keywords: [
    "natural beauty",
    "beauty contest",
    "online pageant",
    "photo contest",
    "voting platform",
  ],
  openGraph: {
    title: "Built by Nature | Celebrate Natural Beauty",
    description:
      "The contest platform celebrating real, natural beauty. Enter contests, vote, win prizes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
