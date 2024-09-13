'use client'

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Legal Shrot',
  description: 'Nepali Law advisor',
  icons: {
    icon: '/image-invert.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Legal Shrot</title>
        <meta name="description" content="Nepali Law advisor" />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}