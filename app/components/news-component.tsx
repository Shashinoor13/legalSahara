import { getNews } from "@/sanity/sanity-utils";

interface News {
    title: string;
    description: string;
    image: string;
    url: string;
}


export default async function NewsList() {
    const news: [News] = await getNews();

    return (
        <>
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col">
                    {news.map((news) => (
                        <span key={news.description}>
                            {news.title}
                        </span>
                    ))}
                </div>
            </div>
        </>
    );
}