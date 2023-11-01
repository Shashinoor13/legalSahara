import { getProjects } from "@/sanity/sanity-utils";
import Image from "next/image";
import Link from "next/link";
import LandingPage from "./homepage/page";

export default async function Home() {
  return (
    <LandingPage/>
  )
}
