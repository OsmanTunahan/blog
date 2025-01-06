import type { Metadata } from "next";
import localFont from "next/font/local";
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
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
