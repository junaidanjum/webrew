import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Webrew",
  description:
    "A no-frills brewing timer app, built purely for the love of coffee.",
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
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="A no-frills brewing timer app, built purely for the love of coffee."
        />
        <meta name="author" content="Junaid Anjum" />
        <meta name="og:title" content="Webrew" />
        <meta
          name="og:description"
          content="A no-frills brewing timer app, built purely for the love of coffee."
        />
        <meta name="og:image" content="/icon.png" />
      </head>
      <body className={`${font.className} antialiased`}>{children}</body>
    </html>
  );
}
