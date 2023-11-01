"use client";

import { getLawyers, searchLawyers } from "@/sanity/sanity-utils";
import React, { useState, useEffect } from "react";
import Navbar from "../components/nav-bar";

type Props = {
  lawyers: any;
};

export default function Lawyers({ lawyers }: Props) {
  const [lawyer, setLawyer] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    async function fetchLawyers() {
      try {
        const response = await getLawyers(); // Replace with your actual API endpoint
        setLawyer(response);
      } catch (error) {
        console.error("An error occurred while fetching the lawyers.", error);
      }
    }
    fetchLawyers();
  }, []);

  const handleSearch = async () => {
    try {
        if (!searchInput) {
            const response = await getLawyers(); // Replace with your actual API endpoint
            setLawyer(response);
            return;
        }
      const response = await searchLawyers(searchInput); // Replace with your actual search API endpoint
        setLawyer(response);
    } catch (error) {
      console.error("An error occurred while searching for lawyers.", error);
    }
  };

  const  handleChange = async(e:any) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    console.log(lawyer)
  };

  return (
        <>
        <Navbar />
        <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-20">
            <h1 className="text-2xl font-medium title-font mb-4 text-gray-900">OUR LAWYERS</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven't heard of them.</p>
            </div>
            <div className="flex items-center justify-center m-10 ">
                <input type="text" value={searchInput} onChange={handleChange} className="px-4 py-2 w-80 outline outline-gray rounded mx-1" placeholder="Search For Lawyers..."/>
                <button onClick={handleSearch} className="px-4 text-white bg-gray-600 border-l py-2 rounded-md">Search</button>
            </div>
            <div className="flex items-center justify-center flex-wrap -m-4 ">
                {
                    lawyer.length === 0 ? 
                        <div className="flex items-center align-center justify-center">
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-white-800 dark:text-red-400 " role="alert">
                            <span className="font-medium">Not Found!</span> The lawyer you searched for is not Listed.
                        </div>
                        </div>
                    :
                    lawyer.map((lawyer:any) => (
                        <div className="text-gray-600 body-font h-full bg-gray-100 p-8 rounded m-5 my-10" onClick={
                            () => {
                                window.location.href = `/lawyers/${lawyer.slug.current}`
                            }
                        } key={lawyer._id}>
                <div className="h-full flex flex-col items-center text-center">
                <img alt="team" className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4" src={lawyer.image}/>
                <div className="w-full">
                    <h2 className="title-font font-medium text-lg text-gray-900">{lawyer.name}</h2>
                    <h3 className="text-gray-500 mb-3">{lawyer.position}</h3>
                    <p className="mb-4">{lawyer.bio}</p>
                    <span className="inline-flex">
                    <a className="text-gray-500">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                        </svg>
                    </a>
                    <a className="ml-2 text-gray-500">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                        </svg>
                    </a>
                    <a className="ml-2 text-gray-500">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                        </svg>
                    </a>
                    </span>
                </div>
                </div>
            </div>
                    ))
                        
                }
            
            </div>
        </div>
            </section>
            </>
  );
}
