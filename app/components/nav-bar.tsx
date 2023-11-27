'use client'

import Image from 'next/image';
import Link from 'next/link';
import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faInstagram,
  faGithub
} from '@fortawesome/free-brands-svg-icons';

const navigation = [
  { name: 'Home', href: '/homepage' },
  { name: 'Blogs', href: '/blogs' },
  { name: 'About Us', href: '/about' },
  { name: 'Lawyers', href:'/lawyers'}
];

export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-red z1 shadow-sm">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-8 lg:px-12 bg-transparent">
            <div className="flex justify-between h-20">
              <div className="flex items-center">
                <span className='mr-5'>
                  <Image
                    src="/legalSahara.svg"
                    alt="Legal Sahara Logo"
                    width={100}
                    height={100}
                  />
                </span>

                <div className=" hidden md:flex flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                  {navigation.map(({ name, href }) => (
                    <Link legacyBehavior href={href} key={name}>
                      <button type='button' className='inline-block p-4 text-gray-600 rounded bg-gray-50 active dark:bg-white-800 dark:text-gray-500 mx-1'>
                      <a>
                        <span>{name}</span>
                      </a>
                      </button>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex">
                <div className="flex items-center md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md text-zinc-400 hover:text-zinc-600 duration-300">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-7 w-7" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-7 w-7" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden border-t-2 border-zinc-200">
            <div className="px-10 py-8 space-y-8">
              {navigation.map(({ name, href }) => (
                <Link legacyBehavior href={href} key={name}>
                  <Disclosure.Button
                    as="a"
                    className="group flex justify-between cursor-pointer"
                  >
                    <span className="text-zinc-600 font-medium group-hover:translate-x-2 duration-300">
                      {name}
                    </span>
                    <ChevronRightIcon className="text-zinc-400 group-hover:text-zinc-600 block h-7 w-7 duration-300" />
                  </Disclosure.Button>
                </Link>
              ))}


              <div className="flex items-center justify-center space-x-6">
                <a
                  href="https://www.github.com/robinvriens"
                  target="_blank"
                  rel="noreferrer"
                  className="text-2xl text-zinc-400 hover:text-zinc-600 duration-300"
                >
                  <FontAwesomeIcon icon={faGithub} />
                </a>
                <a
                  href="https://www.instagram.com/robinvriens"
                  target="_blank"
                  rel="noreferrer"
                  className="text-2xl text-zinc-400 hover:text-zinc-600 duration-300"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a
                  href="https://www.twitter.com/robinvriens"
                  target="_blank"
                  rel="noreferrer"
                  className="text-2xl text-zinc-400 hover:text-zinc-600 duration-300"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}