import { getProjects } from "@/sanity/sanity-utils";
import Image from "next/image";
import Link from "next/link";
import {PortableText} from "@portabletext/react";
import BlogDetail from "./blog-component";

export default async function RecentBlogs() {
    const blogs = await getProjects();
    if(!blogs) return(<div>
        <h1>There are no blogs</h1>
    </div>)
    const topBlogs = blogs.slice(0, 3);
    return(
        <>
        <div className="container px-5 pt-10 mx-auto" id='recent-blogs'>
            <div className="flex flex-col text-center w-full mb-20">
                <h1 className="sm:text-3xl  font-large title-font mb-4 text-gray-900">Recent Blogs</h1>
            </div>
        </div>
        <section className="text-gray-600 body-font">
        <div className="container px-5 py-5 mx-auto">
          <div className="flex flex-wrap">
            {topBlogs.map((project) => (
              <BlogDetail {...project} />
            ))}
          </div>
        </div>
      </section>
        </>
    )
}