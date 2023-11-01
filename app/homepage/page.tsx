import React from 'react';
import { Jumbotron } from '../components/jumbotron';
import RecentBlogs from '../components/recent-blogs';
import { Services } from '../components/services-section';
import { ContactForm } from '../components/contact-form';
import Navbar from '../components/nav-bar';

const LandingPage: React.FC = () => {
    return (
        <>
        <Navbar />
        <Jumbotron />
        <Services />
        <RecentBlogs />
        <ContactForm/>
        </>
    );
};

export default LandingPage;
