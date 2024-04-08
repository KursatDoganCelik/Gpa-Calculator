'use client';
import { useState } from 'react';
import { BsList, BsXLg } from 'react-icons/bs';
import Image from 'next/image';
import Link from 'next/link';
import logo from '/public/images/logo.png';
import ThemeSwitch from './ThemeSwitch';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-black">
      <nav className="mx-auto flex items-center justify-between px-3 py-3 md:px-8">
        <Image className="size-12 rounded bg-white" src={logo} alt="Gno Calculator" />

        <button onClick={() => setMobileMenuOpen(true)} className="flex cursor-pointer p-3 md:hidden">
          <BsList className="size-6 text-black dark:text-white" />
        </button>

        <div className="hidden text-sm font-semibold leading-6 text-black dark:text-white md:flex md:gap-6">
          <Link href="/" className="m-2 p-1">
            Home
          </Link>
          <Link href="/" className="m-2 p-1">
            Contact
          </Link>
          <Link href="/" className="m-2 p-1">
            Help
          </Link>
          <ThemeSwitch className="m-3" />
          <Link href="/" className="m-2 p-1">
            Login
          </Link>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed right-0 top-0 z-10 w-60 rounded bg-black px-6 py-6 dark:bg-white sm:w-80 md:hidden">
          <div className="flex items-center justify-between">
            <ThemeSwitch className="text-white dark:text-black" />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-black dark:text-white"
            >
              <BsXLg className="size-6 text-white dark:text-black" />
            </button>
          </div>

          <div className="divide-y text-white dark:text-black ">
            <div className="space-y-2 pt-6">
              <Link href="/" className="-mx-3 block rounded-md px-3 py-2 text-base font-semibold hover:bg-gray-500/20">
                Home
              </Link>
              <Link href="/" className="-mx-3 block rounded-md px-3 py-2 text-base font-semibold hover:bg-gray-500/20">
                Contact
              </Link>
              <Link href="/" className="-mx-3 block rounded-md px-3 py-2 text-base font-semibold hover:bg-gray-500/20">
                Help
              </Link>
            </div>

            <Link
              href="/"
              className="-mx-3 mt-2 block rounded-md px-3 py-2.5 text-base font-semibold hover:bg-gray-500/20"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
