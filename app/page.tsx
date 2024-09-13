import LandingPage from "./homepage/page";
import RootLayout from "./layout";
import { Toaster, toast } from 'sonner'
import React from "react";


export default function Home() {
  return (
    <RootLayout>
      <Toaster richColors position="top-right" />
      <LandingPage />
    </RootLayout>
  )
}
