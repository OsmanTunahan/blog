import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "@/assets/globals.css";

export const metadata: Metadata = {
  title: "Osman Tunahan ARIKAN's Blog",
  description: "Hello, I'm Osman Tunahan ARIKAN. I'm a full stack developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${GeistSans.variable} ${GeistMono.variable} bg-black text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
