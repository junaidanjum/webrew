import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BrewTime",
  description: "BrewTime",
};

import { Geist } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const font = Geist({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>{children}</body>
    </html>
  );
}
