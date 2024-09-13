export async function GET(req: Request, res: Response) {
    console.log("GET request made to /api/newsletter");
    return new Response("OK");
}