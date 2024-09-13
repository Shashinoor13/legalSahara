import { getNews, getProjects, getSubscribedEmails } from "@/sanity/sanity-utils";
import nodemailer from "nodemailer";

export async function GET(req: Request, res: Response) {
    const _news = await getNews();
    const _blogs = await getProjects();
    const _subscribed = await getSubscribedEmails();

    // Get the current month and year
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    // Filter news and blogs by current month
    const topNews = _news.filter((item: { _createdAt: string | number | Date; }) => {
        const itemDate = new Date(item._createdAt);
        return itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear;
    }).slice(0, 3);

    const topBlogs = _blogs.filter(item => {
        const itemDate = new Date(item._createdAt);
        return itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear;
    }).slice(0, 3);

    const gmail_account = process.env.NEXT_PUBLIC_GMAIL_ACCOUNT;
    const gmail_pass = process.env.NEXT_PUBLIC_GMAIL_PASSWORD;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: gmail_account,
            pass: gmail_pass,
        },
    });


    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    console.log(baseUrl, gmail_account);
    // Generate HTML email content
    const generateHtmlEmail = (news: any[], blogs: any[]) => {
        const newsItems = news
            .map(
                (item: { image: { asset: { url: any; }; }; title: any; description: any; }) => `
            <div style="display: flex; margin-bottom: 20px; border-bottom: 1px solid #ecf0f1; padding-bottom: 20px;">
                <img src="${item.image}" alt="${item.title}" style="width: 150px; height: 100px; object-fit: cover; margin-right: 20px; border-radius: 5px;">
                <div>
                    <h2 style="margin-top: 0; color: #3498db;">${item.title}</h2>
                    <p style="margin-bottom: 10px;">${item.description}</p>
                </div>
            </div>
        `
            )
            .join("");

        const blogItems = blogs
            .map(
                (item: { image: { asset: { url: any; }; }; name: any; content: { children: { text: any; }[]; }[]; }) => `
            <div style="display: flex; margin-bottom: 20px; border-bottom: 1px solid #ecf0f1; padding-bottom: 20px;">
                <img src="${item.image}" alt="${item.name}" style="width: 150px; height: 100px; object-fit: cover; margin-right: 20px; border-radius: 5px;">
                <div>
                    <h2 style="margin-top: 0; color: #3498db;">${item.name}</h2>
                    <p style="margin-bottom: 10px;">${item.content[0].children[0].text}</p>
                </div>
            </div>
        `
            )
            .join("");

        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Latest News Updates</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; background-color: #ecf0f1; color: #34495e;">
            <div style="max-width: 800px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <h1 style="background-color: #3498db; color: #fff; padding: 10px; border-radius: 5px; margin-bottom: 20px;">Top 3 Latest Updates</h1>
                ${newsItems}
                <h2 style="background-color: #3498db; color: #fff; padding: 10px; border-radius: 5px; margin-bottom: 20px;">Latest Blog Posts</h2>
                ${blogItems}
                <div style="text-align: center; margin-top: 20px; background-color: #e74c3c; padding: 10px; border-radius: 5px;">
                    <p style="margin: 0;">If you wish to unsubscribe, <a href="${baseUrl}/api/newsletter/unsubscribe?email={{EMAIL}}" style="color: #fff; text-decoration: none;">click here</a>.</p>
                </div>
            </div>
        </body>
        </html>
        `;
    };


    // Iterate over subscribed emails and send an email to each
    for (const subscriber of _subscribed) {
        const emailContent = generateHtmlEmail(topNews, topBlogs).replace('{{EMAIL}}', encodeURIComponent(subscriber.email));

        const mailOptions = {
            from: gmail_account,
            to: subscriber.email,
            subject: "Top 3 News and Blogs",
            html: emailContent,
        };

        // Send the email
        transporter.sendMail(mailOptions, function (error: any, info: { response: string; }) {
            if (error) {
                console.log(`Error sending to ${subscriber.email}: `, error);
            } else {
                console.log(`Email sent to ${subscriber.email}: ` + info.response);
            }
        });
    }

    return new Response(JSON.stringify({ news: topNews, blogs: topBlogs, emails: _subscribed }), {
        headers: {
            "content-type": "application/json",
        },
    });
}
