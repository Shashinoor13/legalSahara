import { getResources } from "@/sanity/sanity-utils";
import { ArrowRight, FileDown } from "lucide-react";

interface Resource {
    _id: string;
    _createdAt: string;
    title: string;
    description: string;
    link: string;
    slug: string;
    image: string;
    file: string;
}


export default async function ResourcesList({showAll=false}) {
    let resources: Resource[] = await getResources();
    if (!showAll) {
        resources = resources.slice(0, 3);
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map((resource) => (
                    <div
                        key={resource._id}
                        className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
                    >
                        <img
                            src={resource.image}
                            alt={resource.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2 text-gray-800">
                                {resource.title}
                            </h3>
                            <p className="text-gray-600 mb-4">{resource.description}</p>
                            <div className="flex justify-between items-center">
                                {resource.link && (
                                    <a
                                        href={resource.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center text-green-600 font-medium hover:text-green-700"
                                    >
                                        Visit Resource
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </a>
                                )}
                                {resource.file && (
                                    <a
                                        href={resource.file}
                                        download
                                        className="flex items-center text-blue-600 font-medium hover:text-blue-700"
                                    >
                                        Download
                                        <FileDown className="w-4 h-4 ml-2" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
