
import { Form } from "@/app/components/comment-form";
import Navbar from "@/app/components/nav-bar";
import { getComments, getProject } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";

type Props = {
    params: {
        project: string;
    }
}

export default async function Project({params}:Props){
    const slug = params.project;
    const project = await getProject(slug);
    const comments = await getComments(project._id);
    return (
    <>
    <Navbar />
        <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-col">
            <div className="lg:w-4/6 mx-auto">
            <div className="rounded-lg h-64 overflow-hidden">
                <div>
                    <h1 className="text-3xl font-medium title-font text-gray-900">{project?.name}</h1>
                </div>
                <img alt="content" className="object-cover object-center h-full w-full" src={project.image}/>
            </div>
            <div className="flex flex-col sm:flex-row mt-10">
                <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10" viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </div>
                <div className="flex flex-col items-center text-center justify-center">
                    <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">{project.author}</h2>
                    <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                </div>
                </div>
                <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <div className="leading-relaxed text-lg mb-4">
                    <PortableText value={project.content} />
                </div>
                </div>
            </div>
            <Form _id={project._id}/>
            <div className="container px-5 py-24 mx-auto flex flex-col">
        
        {
            comments.map((comment:any) => (
                <div className="flex flex-col py-4" key={comment._id}>
                    <h3 className="text-2xl font-medium title-font text-gray-900">{comment.name}</h3>
                    <p className="leading-relaxed text-lg mb-4">{comment.comment}</p>
                </div>
            ))
        }
        </div>
            </div>
        </div>
        
        </section>
       
    </>
        
    );
}