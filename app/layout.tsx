import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "ELIoT RFID Tracker",
  description: "ELIoT RFID Tracker Application",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["eliot", "eliot.global", "rfid tracker"],
  authors: [
    {
      name: "imvinojanv",
      url: "https://www.linkedin.com/in/imvinojanv/",
    },
  ],
  creator: 'Vinojan Veerapathirathasan',
  publisher: 'Emmanuels Lanka Pvt Ltd.',
  icons: [
    { rel: "apple-touch-icon", url: "/icons/icon-128x128.png" },
    { rel: "icon", url: "/icons/icon-128x128.png" },
  ],
  openGraph: {
    title: "ELIoT RFID Tracker",
    description: "ELIoT RFID Tracker Application",
    url: 'https://rfid-tracker.eliot.global/',
    siteName: 'RFID Tracker App',
    images: [
      {
        url: '/images/og-image.png',
        width: 1280,
        height: 800,
      },
    ],
    locale: 'en_US',
    type: 'website',
  }
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  );
}
