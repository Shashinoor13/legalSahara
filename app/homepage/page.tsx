import React from 'react';
import { Jumbotron } from '../components/jumbotron';
import RecentBlogs from '../components/recent-blogs';
import { Services } from '../components/services-section';
import { ContactForm } from '../components/contact-form';
import Navbar from '../components/nav-bar';
import Footer from '../components/footer';
import NewsList from '../components/news-component';

const LandingPage: React.FC = () => {
    return (
        <>
            <Navbar />
            <Jumbotron />
            <RecentBlogs />
            <NewsList />
            <Services />
            <ContactForm />
            <Footer />
        </>
    );
};

export default LandingPage;
