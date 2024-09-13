"use client";

import * as React from "react";

interface EmailTemplateProps {
    firstName: string;
    newsItems: string;
    blogItems: string;
    baseUrl: string;
}

const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    firstName,
    newsItems,
    blogItems,
    baseUrl,
}) => (
    <body style={{ fontFamily: 'Arial, sans-serif', lineHeight: 1.6, margin: 0, padding: 20, backgroundColor: '#ecf0f1', color: '#34495e' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', backgroundColor: '#fff', padding: 20, borderRadius: 5, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <h1 style={{ backgroundColor: '#3498db', color: '#fff', padding: 10, borderRadius: 5, marginBottom: 20 }}>Welcome, {firstName}!</h1>
            <h2 style={{ backgroundColor: '#3498db', color: '#fff', padding: 10, borderRadius: 5, marginBottom: 20 }}>Top 3 Latest Updates</h2>
            <div dangerouslySetInnerHTML={{ __html: newsItems }} />
            <h2 style={{ backgroundColor: '#3498db', color: '#fff', padding: 10, borderRadius: 5, marginBottom: 20 }}>Latest Blog Posts</h2>
            <div dangerouslySetInnerHTML={{ __html: blogItems }} />
            <div style={{ textAlign: 'center', marginTop: 20, backgroundColor: '#e74c3c', padding: 10, borderRadius: 5 }}>
                <p style={{ margin: 0 }}>If you wish to unsubscribe, <a href={`${baseUrl}/api/newsletter/unsubscribe?email={{EMAIL}}`} style={{ color: '#fff', textDecoration: 'none' }}>click here</a>.</p>
            </div>
        </div>
    </body>
);

export default EmailTemplate;