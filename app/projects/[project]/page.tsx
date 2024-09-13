import { Form } from "@/app/components/comment-form";
import Navbar from "@/app/components/nav-bar";
import { getComments, getProject } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { UserCircle, Calendar, MessageCircle } from "lucide-react";

type Props = {
    params: {
        project: string;
    }
}

export default async function Project({ params }: Props) {
    const slug = params.project;
    const project = await getProject(slug);
    const comments = await getComments(project._id);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
                <article className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="relative h-64 md:h-96">
                        <Image
                            src={project.image}
                            alt={project.name}
                            layout="fill"
                            objectFit="cover"
                            className="transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                    <div className="p-6 md:p-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{project.name}</h1>
                        <div className="flex items-center mb-6">
                            <UserCircle className="w-6 h-6 text-gray-500 mr-2" />
                            <span className="text-gray-600 font-medium">{project.author.toString()}</span>
                            <span className="mx-2 text-gray-300">|</span>
                            <Calendar className="w-5 h-5 text-gray-500 mr-2" />
                            <span className="text-gray-600">
                                {new Date(project._createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                        </div>
                        <div className="prose max-w-none">
                            <PortableText value={project.content} />
                        </div>
                    </div>
                </article>

                <section className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <MessageCircle className="w-6 h-6 mr-2" />
                        Comments ({comments.length})
                    </h2>
                    <Form _id={project._id} />
                    <div className="space-y-6 mt-8">
                        {comments.map((comment: any) => (
                            <div key={comment._id} className="bg-white p-6 rounded-lg shadow">
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-indigo-500 font-semibold">{comment.name.charAt(0).toUpperCase()}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{comment.name}</h3>
                                        <p className="text-sm text-gray-500">{comment.email}</p>
                                    </div>
                                </div>
                                <p className="text-gray-700">{comment.comment}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}