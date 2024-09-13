'use client'

import React, { useState, useEffect } from 'react';
import { getLawyers, searchLawyers } from "@/sanity/sanity-utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchCircleIcon, UserCircleIcon } from '@heroicons/react/solid';
import Navbar from '../components/nav-bar';
export default function Lawyers() {
  interface Lawyer {
    _id: string;
    name: string;
    position: string;
    image: string;
    bio: string;
  }

  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedLawyer, setSelectedLawyer] = useState(null);

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
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="max-w-xl mx-auto">
            <div className="flex items-center border-b border-gray-300 py-2">
              <Input
                type="text"
                value={searchInput}
                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setSearchInput(e.target.value)}
                className="flex-grow bg-transparent border-none focus:ring-0"
                placeholder="Search for lawyers..."
              />
              <Button onClick={handleSearch}>
                <SearchCircleIcon className="h-5 w-5 text-gray-400" />
              </Button>
            </div>
          </div>
        </div>

        {lawyers.length === 0 ? (
          <div className="text-center py-12">
            <UserCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No lawyers found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lawyers.map((lawyer) => (
              <Dialog key={lawyer._id}>
                <DialogTrigger asChild>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition duration-500 hover:scale-105">
                    <img
                      src={lawyer.image}
                      alt={lawyer.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h2 className="text-xl font-semibold text-gray-900">{lawyer.name}</h2>
                      <p className="text-sm text-green-600">{lawyer.position}</p>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{lawyer.name}</DialogTitle>
                  </DialogHeader>
                  <div className="mt-4">
                    <img
                      src={lawyer.image}
                      alt={lawyer.name}
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-lg font-medium text-blue-600 mb-2">{lawyer.position}</h3>
                    <p className="text-gray-700">{lawyer.bio}</p>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}