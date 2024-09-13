import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { Calendar, ArrowRight } from "lucide-react";

interface Blog {
  name: string;
  content: any;
  image: string;
  slug: string;
  _createdAt: string;
  _id: string;
}

export default function BlogDetail({ project }: { project: Blog }) {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-4">
      <div className="h-full bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
        <div className="relative h-48 md:h-64">
          <Image
            fill
            className="object-cover object-center"
            src={project.image}
            alt={project.name}
          />
        </div>
        <div className="p-6">
          <div className="flex items-center mb-2">
            <Calendar className="w-4 h-4 mr-2 text-gray-500" />
            <span className="text-sm text-gray-500">
              {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: '2-digit' }).format(new Date(project._createdAt))}
            </span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
            {project.name}
          </h2>
          <div className="text-gray-600 mb-4 line-clamp-3">
            <PortableText value={project.content} />
          </div>
          <Link href={`/projects/${project.slug}`} passHref>
            <div className="flex items-center text-green-600 font-medium">
              Read More
              <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}