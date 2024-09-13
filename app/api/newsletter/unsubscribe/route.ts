import { unsubscribeEmail } from "@/sanity/sanity-utils";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    const email = searchParams.get('email');
    console.log(email);
    if (!email) {
        return new Response('Email is required', { status: 400 });
    }

    const response = await unsubscribeEmail(email);
    if (response.message) {
        return new Response(response.message, { status: 200 });
    }
    else {
        return new Response("Something went wrong", { status: 500 });
    }
}