import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Webrew",
  description:
    "A no-frills brewing timer app, built purely for the love of coffee.",
};


import { Geist } from "next/font/google";
import Head from "next/head";

// If loading a variable font, you don't need to specify the font weight
const font = Geist({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="A no-frills brewing timer app, built purely for the love of coffee."
        />
        <meta name="author" content="Junaid Anjum" />
        <meta property="og:title" content="Webrew" />
        <meta
          property="og:description"
          content="A no-frills brewing timer app, built purely for the love of coffee."
        />
        <meta property="og:image" content="/brew.png" />
        <meta property="og:url" content="https://webrew.vercel.app" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Webrew" />
        <meta
          name="twitter:description"
          content="A no-frills brewing timer app, built purely for the love of coffee."
        />
        <meta name="twitter:image" content="/brew.png" />
      </Head>
      <body className={`${font.className} antialiased`}>{children}</body>
    </html>
  );
}
