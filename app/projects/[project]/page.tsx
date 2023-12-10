
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
        <section className="text-gray-600 body-font py-10">
        <div className="container px-5 py-20 mx-auto flex flex-col">
            <div className="lg:w-4/6 mx-auto">
            <div className="rounded-lg h-full overflow-hidden flex-grow">
                <div>
                    <h1 className="text-3xl font-medium title-font text-gray-900">{project?.name}</h1>
                </div>
                
               
            </div>
            <div className="flex flex-col items-center text-center justify-center mb-5">
                <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10" viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </div>
                {/*@ts-ignore */}
                    <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">{project.author}</h2>
                    <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                </div>
            <img alt="image" className="lg:w-4/6 mx-auto w-full object-cover object-center rounded" src={project.image} />
            <div>

            </div>
            <div className="flex flex-row  mt-20">
                <div className="sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <div className="leading-relaxed text-lg mb-4">
                    <PortableText value={project.content} />
                </div>
                </div>
            </div>
            <Form _id={project._id}/>
            
            <div className="container px-5 py-24 mx-auto flex flex-col">
            <h2 className="text-4xl font-extrabold">
                Comments
            </h2>
        {
            comments.map((comment:any) => (
                <div className="py-4" key={comment._id}>
                    <div className="bg-gray-100 mb-1 p-5 rounded-md" >
                        <h1 className="text-xl font-regular title-font text-gray-900">{comment.name}</h1>
                        <h2 className="text-md font-light title-font text-gray-400">{comment.email}</h2>
                        <div className="leading-relaxed text-lg">
                            {comment.comment}
                        </div>
                    </div>
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