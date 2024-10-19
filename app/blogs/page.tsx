import { getProjects } from "@/sanity/sanity-utils";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import Navbar from "../components/nav-bar";
import BlogDetail from "../components/blog-component";
import Footer from "../components/footer";

export default async function Home() {
  const projects = await getProjects();

  const formattedProjects = projects.map(project => ({
    ...project,
    _createdAt: new Date(project._createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' })
  }));
  return (
    <>
      <Navbar />
      <div className="">
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap ">
              {formattedProjects.map((project) => (
                <BlogDetail key={project._id} project={project} />
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
