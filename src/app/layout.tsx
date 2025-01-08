import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "@/assets/globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://blog.osmantunahan.com.tr"),
  title: "Osman Tunahan ARIKAN's Blog",
  description:
    "Hey, my name is Osman Tunahan ARIKAN. I am a Cyber Security Expert and Full Stack Developer. This is my blog.",
  openGraph: {
    title: "Osman Tunahan ARIKAN's Blog",
    description:
      "Hey, my name is Osman Tunahan ARIKAN. I am a Cyber Security Expert and Full Stack Developer. This is my blog.",
    url: "https://blog.osmantunahan.com.tr",
    siteName: "Osman Tunahan ARIKAN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Osman Tunahan ARIKAN",
    card: "summary_large_image",
  },
  keywords: [
    "Osman Tunahan ARIKAN",
    "Osman Tunahan",
    "ARIKAN",
    "Osman ARIKAN",
    "Osman",
    "Tunahan",
    "Cyber Security",
    "Expert",
    "Full Stack",
    "Developer",
    "Blog",
    "Cyber Security Blog",
    "Developer Blog"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${GeistSans.variable} ${GeistMono.variable} bg-black text-white antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
