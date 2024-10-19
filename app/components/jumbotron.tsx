'use client'

import { addEmailToNewsletter } from "@/sanity/sanity-utils";
import { MailIcon } from "@heroicons/react/solid";
import React from "react";
import { toast } from "sonner";


export function Jumbotron() {


    const _addEmailToNewsletter = async (email: string) => {
        try {
            const response = await addEmailToNewsletter(email);
            return;

        } catch (error) {
            console.error('An error occurred while adding email to newsletter', error);
            toast.error('An error occurred. Please try again later');
        }
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = (e.currentTarget.elements[0] as HTMLInputElement).value;
        _addEmailToNewsletter(email);
        toast.success("You have successfully subscribed to our newsletter");
        toggleModal();
    }


    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const listener = (event: any) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsModalOpen(false);
            }
        };
        document.addEventListener('mousedown', listener);
        return () => {
            document.removeEventListener('mousedown', listener);
        };
    }, [ref]);




    return (
        <section className="bg-center bg-no-repeat bg-[url('https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-gray-700 bg-blend-multiply">
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50 "></div>
                    <div
                        ref={ref} id="flex  info-popup" className=" overflow-y-auto overflow-x-hidden z-50 backdrop-blur-sm w-full h-full flex items-center justify-center">
                        <div className="relative p-4 w-full max-w-lg h-full md:h-auto">
                            <div
                                className="relative bg-gradient-to-b from-green-100 to-white bg-white  p-4 rounded-lg shadow  md:p-8">
                                <button
                                    onClick={toggleModal}
                                    className="absolute top-0 right-0 p-4 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                                <div className="mb-4 text-sm font-light text-green-500 dark:text-gray-400">
                                    <h3 className="mb-3 text-2xl font-bold text-green-900 ">Subscribe to our Newsletter</h3>
                                    <p>
                                        Recieve timely updates on your email. We promise not to spam you.
                                    </p>
                                </div>
                                <form
                                    onSubmit={handleFormSubmit}
                                    className="space-b-4"
                                >
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block mb-2 text-sm font-medium text-green-900 dark:text-green-800"
                                        >
                                            Your Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="block w-full p-3 text-sm text-green-900 bg-gray-50 rounded-lg border border-green-200 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-green-200 dark:border-green-300 dark:placeholder-green-400 dark:text-green dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                            placeholder="example@example.com"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-3 mt-4 font-medium text-white rounded-lg bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                                    >
                                        Subscribe
                                    </button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">Legal Shrot</h1>
                <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">Legal Shrot your online Law advisor and Consultant</p>
                <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                    <a
                        onClick={toggleModal}
                        href="#" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900">
                        Subscribe to our Newsletter
                        <MailIcon className="w-5 h-5 ml-2" />
                    </a>
                    <a href="#contact-section" className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
                        Contact Us
                    </a>
                </div>
            </div>
        </section>
    );
}