import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster"

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
    icons: {
        icon: '/icons/icon-128x128.png',
        shortcut: '/icons/icon-128x128.png',
        apple: '/icons/icon-128x128.png',
    },
    openGraph: {
        title: "ELIoT RFID Tracker",
        description: "ELIoT RFID Tracker Application",
        url: 'https://rfid-tracker.eliot.global/',
        siteName: 'RFID Tracker App',
        // images: '/images/og-image.png',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'ELIoT RFID Tracker',
        description: 'ELIoT RFID Tracker Application'
    },
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
                <Toaster />
            </body>
        </html>
    );
}
