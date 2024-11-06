import { getProjects } from "@/sanity/sanity-utils";
import Link from "next/link";
import BlogDetail from "./blog-component";

export default async function RecentBlogs() {
  const blogs = await getProjects();
  if (!blogs) return (<div>
    <h1>There are no blogs</h1>
  </div>)
  const topBlogs = blogs.slice(0, 3);
  return (
    <>
      <div className=" px-5 pt-10 mx-auto " id='recent-blogs'>
        <div className="flex flex-col text-center w-full">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Latest Blogs</h2>
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
