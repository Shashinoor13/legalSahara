import { PortableTextBlock } from "sanity";

export type Project = {
    author: string;
    _id: string;
    _createdAt: string;
    name: string;
    slug: string;
    image: string;
    url: string;
    content: PortableTextBlock[];
}