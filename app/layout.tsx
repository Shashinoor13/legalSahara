'use client'

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/nav-bar'
import NextNProgress from 'nextjs-progressbar';
import Home from './page'


const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Legal Sahara',
//   description: 'Generated by create next app',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={inter.className}>
      <NextNProgress color="#29D" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true}/>
      {children}
      </body>
    </html>
  )
}
