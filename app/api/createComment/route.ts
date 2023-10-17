import { createComment } from "@/sanity/sanity-utils";


export async function POST(req:Request, res:Response) {
    const body = await req.json();
    const {name, email, comment, _id} = body;
    console.log(body);

    await createComment(name, email, comment, _id);

  return new Response("OK");
  }