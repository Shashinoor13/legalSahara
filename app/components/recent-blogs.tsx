import { getProjects } from "@/sanity/sanity-utils";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import BlogDetail from "./blog-component";

export default async function RecentBlogs() {
  const blogs = await getProjects();
  if (!blogs) return (<div>
    <h1>There are no blogs</h1>
  </div>)
  const topBlogs = blogs.slice(0, 3);
  return (
    <>
      <div className=" px-5 pt-10 mx-auto bg-gradient-to-b from-blue-100 to-white" id='recent-blogs'>
        <div className="flex flex-col text-center w-full">
          <h1 className="sm:text-3xl  font-large title-font text-gray-900 underline">Recent Blogs</h1>
        </div>
      </div>
      <section className="text-gray-600 body-font">
        <div className=" px-5 mx-auto">
          <div className="flex flex-wrap">
            {topBlogs.map((project) => (
              <BlogDetail project={project} />
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <Link href="/blogs">
            <span className="text-yellow-500 inline-flex items-center mt-4">View All Blogs
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </span>
          </Link>
        </div>
      </section>
    </>
  )
}