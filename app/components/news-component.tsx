import { getNews } from "@/sanity/sanity-utils";
import { ArrowRight } from "lucide-react";

interface News {
    title: string;
    description: string;
    image: string;
    link: string;
}

export default async function NewsList({showAll = false}) {
    let news: News[] = await getNews();
    if (!showAll) {
      news=  news.slice(0, 3);
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Latest legal News</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((item, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                        <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
                            <p className="text-gray-600 mb-4">{item.description}</p>
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className="flex items-center text-green-600 font-medium">
                                    Read More
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </div>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
