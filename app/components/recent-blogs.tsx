import { getProjects } from "@/sanity/sanity-utils";
import Image from "next/image";
import Link from "next/link";
import {PortableText} from "@portabletext/react";

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
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Recent Blogs</h1>
            </div>
        </div>
        <section className="text-gray-600 body-font">
        <div className="container px-5 py-5 mx-auto">
          <div className="flex flex-wrap">
            {topBlogs.map((project) => (
                <div className="p-4 md:w-1/3" key={project._id}>
                <Link legacyBehavior id={project._id} href={`/projects/${project.slug}`} >
                    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                      <Image
                        width={500}
                        height={500}
                        className="lg:h-48 md:h-36 w-full object-cover object-center"
                        src={project.image}
                        alt="blog"
                        />
                      <div className="p-6">
                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
                         {project._createdAt}
                        </h2>
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                          {project.name}
                        </h1>
                        <div className="leading-relaxed mb-3">
                            <PortableText value={project.content} />
                        </div>
                        <div className="flex items-center flex-wrap ">
                          <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
                            Read More
                            <svg
                              className="w-4 h-4 ml-2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              >
                              <path d="M5 12h14"></path>
                              <path d="M12 5l7 7-7 7"></path>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
        </>
    )
}