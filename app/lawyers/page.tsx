'use client'

import React, { useState, useEffect } from 'react';
import { getLawyers, searchLawyers } from "@/sanity/sanity-utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, UserIcon, Mail, Phone, BookOpen, Award } from 'lucide-react';
import Navbar from '../components/nav-bar';
import Footer from '../components/footer';
import Link from 'next/link';

interface Lawyer {
  _id: string;
  name: string;
  position: string;
  image: string;
  bio: string;
  email: string;
  phoneNumber: string;
  specialization: string;
  experience: string;
}

export default function Lawyers() {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetchLawyers();
  }, []);

  const fetchLawyers = async () => {
    try {
      const response = await getLawyers();
      setLawyers(response);
    } catch (error) {
      console.error("An error occurred while fetching the lawyers.", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = searchInput ? await searchLawyers(searchInput) : await getLawyers();
      setLawyers(response);
    } catch (error) {
      console.error("An error occurred while searching for lawyers.", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Our Legal Experts</h1>

        <div className="mb-8 flex">
          <div className="w-full">
            <div className="flex items-center bg-white rounded-lg shadow-sm w-full">
              <Input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="flex-grow border-none focus:ring-2 focus:ring-blue-500 w-full"
                placeholder="Search for lawyers..."
              />
              <Button onClick={handleSearch} className="ml-2">
                <SearchIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <Link href="/lawyers/join" className="ml-4">
            <Button className="bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300">
              Join Our Legal Team
            </Button>
          </Link>
        </div>

        {lawyers.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <UserIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No lawyers found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lawyers.map((lawyer) => (
              <Dialog key={lawyer._id}>
                <DialogTrigger asChild>
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transform transition duration-300 hover:shadow-md hover:-translate-y-1">
                    <img
                      src={lawyer.image || '/placeholder-lawyer.jpg'}
                      alt={lawyer.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h2 className="text-xl font-semibold text-gray-900">{lawyer.name}</h2>
                      <p className="text-sm text-blue-600">{lawyer.position || 'N/A'}</p>
                      <p className="text-sm text-gray-500 mt-1">{lawyer.specialization || 'N/A'}</p>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="w-11/12 max-w-5xl h-[90vh]">
                  <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-gray-900">{lawyer.name}</DialogTitle>
                  </DialogHeader>
                  <div className="mt-6 flex flex-col md:flex-row h-full overflow-y-auto">
                    <div className="md:w-1/3 pr-6">
                      <img
                        src={lawyer.image || '/placeholder-lawyer.jpg'}
                        alt={lawyer.name}
                        className="w-full h-64 object-cover rounded-lg mb-4"
                      />
                      <h3 className="text-xl font-semibold text-blue-600 mb-2">{lawyer.position || 'N/A'}</h3>
                      <div className="space-y-2">
                        <p className="flex items-center text-gray-700">
                          <Award className="w-5 h-5 mr-2" />
                          <span><strong>Specialization:</strong> {lawyer.specialization || 'N/A'}</span>
                        </p>
                        <p className="flex items-center text-gray-700">
                          <BookOpen className="w-5 h-5 mr-2" />
                          <span><strong>Experience:</strong> {lawyer.experience || 'N/A'} years</span>
                        </p>
                        <p className="flex items-center text-gray-700">
                          <Mail className="w-5 h-5 mr-2" />
                          <span><strong>Email:</strong> {lawyer.email || 'N/A'}</span>
                        </p>
                        <p className="flex items-center text-gray-700">
                          <Phone className="w-5 h-5 mr-2" />
                          <span><strong>Phone:</strong> {lawyer.phoneNumber || 'N/A'}</span>
                        </p>
                        <a
                          href={`mailto:${lawyer.email}`}
                          className="mt-4 inline-block w-full"
                        >
                          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2">
                            <Mail className="w-4 h-4" />
                            Get in Touch
                          </Button>
                        </a>
                      </div>
                    </div>
                    <div className="md:w-2/3 mt-6 md:mt-0">
                      <h4 className="text-2xl font-semibold text-gray-900 mb-4">Biography</h4>
                      <p className="text-gray-700 whitespace-pre-line break-words">{lawyer.bio || 'N/A'}</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}