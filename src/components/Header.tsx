'use client';
import { useState } from 'react';
import { BsList, BsXLg } from 'react-icons/bs';
import Image from 'next/image';
import Link from 'next/link';
import logo from '/public/images/logo.png';
import ThemeSwitch from './ThemeSwitch';
import { Button } from './ui/button';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header>
      <nav className="mx-auto flex items-center justify-between px-3 py-3 md:px-8">
        <Image className="size-12 rounded bg-white" src={logo} alt="Gno Calculator" />

        <Button onClick={() => setMobileMenuOpen((prev) => !prev)} variant={'ghost'} className="focus:bg-transparent md:hidden">
          <div className="relative flex w-5 flex-col gap-1">
            <div
              className={`absolute h-[2px] w-5 bg-black transition-all duration-1000 dark:bg-white ${mobileMenuOpen ? '-mt-0 rotate-[225deg]' : '-mt-1 rotate-0'}`}
            />
            <div
              className={`absolute h-[2px] w-5 bg-black transition-all duration-1000 dark:bg-white ${mobileMenuOpen ? 'mt-0 -rotate-[45deg]' : 'mt-1 rotate-0'}`}
            />
          </div>
        </Button>

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

      <div
        className={`top-50 absolute right-0 z-10 overflow-hidden ${mobileMenuOpen ? 'w-80 px-6 py-4' : 'w-0 p-0'} rounded bg-white transition-all duration-1000  dark:bg-black md:hidden`}
      >
        <ThemeSwitch />
        <div className="flex flex-col divide-y divide-solid">
          <div className="flex flex-col gap-3 py-3 pt-6">
            <Link href="/" className="block rounded-md text-base font-semibold hover:bg-gray-500/20">
              Home
            </Link>

            <Link href="/" className="block rounded-md text-base font-semibold hover:bg-gray-500/20">
              Contact
            </Link>
            <Link href="/" className="block rounded-md text-base font-semibold hover:bg-gray-500/20">
              Help
            </Link>
          </div>
          <div className="flex justify-between gap-3 pt-3 ">
            <Button variant={'secondary'} className="w-full text-base font-semibold hover:bg-gray-500/20">
              Giriş Yap
            </Button>
            <Button variant={'secondary'} className="w-full text-base font-semibold hover:bg-gray-500/20">
              Kayıt Ol
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
