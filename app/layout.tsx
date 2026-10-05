import type { Metadata } from "next";
import "./globals.css";
// import BackgroundMusic from "./BackgroundMusic";
import { WeddingAudioProvider } from "./WeddingAudioContext";

export const metadata: Metadata = {
  title: "#moFeranAde’26",
  description:
    "Wedding invitation for Soje Anuoluwapo Feranmi & Emmanuel Segun Ademola — A celebration of love, faith, and friendship.",
  icons: {
    icon: { url: "/favicon.png", type: "image/png", sizes: "192x192" },
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-sans">
        <WeddingAudioProvider>
          {/* <BackgroundMusic /> */}
          {children}
        </WeddingAudioProvider>
      </body>
    </html>
  );
}
