import Image from "next/image";
import Link from "next/link";
import {PortableText} from "@portabletext/react";


interface Blog {
    name: string;
    content: any;
    image: string;
    slug: string;
    _createdAt: string;
    _id: string;
    }

export default function BlogDetail(project:Blog) {
    return (
        <>
        <div className="p-4 md:w-1/3 cursor-default transition-all duration-150 py-10 max-w-full" key={project._id}>
                <Link legacyBehavior id={project._id} href={`/projects/${project.slug}`} >
                    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-150">
                      <Image
                        width={500}
                        height={500}
                        className="lg:h-48 md:h-36 w-full object-cover object-center"
                        src={project.image}
                        alt="blog"
                        />
                      <div className="p-6">
                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
                         {/* {project._createdAt} */}
                         {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: '2-digit' }).format(new Date(project._createdAt))}
                        </h2>
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                          {project.name}
                        </h1>
                        <div className="leading-relaxed mb-3 h-20 overflow-clip">
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
        </>
    )
}