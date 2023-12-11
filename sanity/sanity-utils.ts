import { Project } from "@/types/project";
import { createClient, groq } from "next-sanity";

export async function getProjects() : Promise<Project[]>{
    const client = createClient({
        projectId: 's29n91p9',
        dataset: 'production',
        apiVersion: '2023-09-09',
        useCdn: false,
    });


        const data =  client.fetch(
        groq`*[_type == "project"]{
            _id,
            _createdAt,
            name,
            "slug": slug.current,
            "image": image.asset->url,
            url,
            content,
            author,
            authorImage,
        }`
    );
    return data;
}

export async function getProject(slug:string) : Promise<Project>{
    const client = createClient({
        projectId: 's29n91p9',
        dataset: 'production',
        apiVersion: '2023-09-09',
    });


        
    return client.fetch(
        groq`*[_type == "project" && slug.current == $slug][0]{
            _id,
            _createdAt,
            name,
            "slug": slug.current,
            "image": image.asset->url,
            url,
            content,
            author,
            authorImage,
        }`,{slug}
    );
}

export async function createComment(name:String,email:String,comment:String,_id:String){
    console.log("Creating comment", name, email, comment, _id);
    const client = createClient({
        projectId: 's29n91p9',
        dataset: 'production',
        apiVersion: '2023-09-09',
        token:"skueztx7acaprBGqUAYsPkWpkhWvVbwdhvMjzasK7fhvoN6pIdeMNUL3GMaNjIOumYqdX5aGxv7YSOUVaPO7WDxCYDDiP8arHamYCyB68cKxbluUYPVCJuN92sPg183bq9e3aDjX85kyNOveaMoBZdOpwhw2Y1T41UvUzbcni38rhSl1HAL1",
    });

    const data = await client.create({
        _type: 'comment',
        name,
        email,
        comment,
        post:{
            _type:"reference",
            _ref:_id
        }
    });

    console.log(data);
    return data;
        
}

export async function getComments(_id:String){
    const client = createClient({
        projectId: 's29n91p9',
        dataset: 'production',
        apiVersion: '2023-09-09',
    });

    const data = await client.fetch(
        groq`*[_type == "comment" && post._ref == $id]{
            _id,
            _createdAt,
            name,
            email,
            comment,
        }`,{id:_id}
    );

    console.log(data);
    return data;
}

export async function getLawyers(){
    const client = createClient({
        projectId: 's29n91p9',
        dataset: 'production',
        apiVersion: '2023-09-09',
    });

    const data = await client.fetch(
        groq`*[_type == "lawyer"]{
            _id,
            _createdAt,
            name,
            email,
            phone,
            bio,
            "slug": slug.current,
            "image": image.asset->url,
            position,
        }`
    );
    return data;
}

export async function getLawyer(slug:string){
    const client = createClient({
        projectId: 's29n91p9',
        dataset: 'production',
        apiVersion: '2023-09-09',
    });

    const data = await client.fetch(
        groq`*[_type == "lawyer" && slug.current == $slug][0]{
            _id,
            _createdAt,
            name,
            email,
            phone,
            bio,
            "slug": slug.current,
            "image": image.asset->url,
            position,
        }`,{slug}
    );
    return data;
}

export async function searchLawyers(query:string){
    const client = createClient({
        projectId: 's29n91p9',
        dataset: 'production',
        apiVersion: '2023-09-09',
    });

    const data = await client.fetch(
        groq`*[_type == "lawyer" && (name match $query || bio match $query || email match $query || phone match $query || slug.current match $query) || position match $query]{
            _id,
            _createdAt,
            name,
            email,
            phone,
            bio,
            "slug": slug.current,
            "image": image.asset->url,
            position,
        }`,{query}
    );
    return data;
}