'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '/public/images/logo.png';
import ThemeSwitch from './ThemeSwitch';
import { Button } from './ui/button';
import Login from './Login';
import { useSession } from 'next-auth/react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  const navLink = [
    { name: 'Anasayfa', href: '/' },
    { name: 'Yardım', href: '/help' },
  ];

  return (
    <header className="bg-white dark:bg-black">
      <nav className="mx-auto flex items-center justify-between px-3 py-3 md:px-8">
        <Image className="size-12 rounded bg-white" src={logo} alt="Gno Calculator" />

        <Button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          variant={'ghost'}
          className="focus:bg-transparent md:hidden"
        >
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
          {navLink.map(({ name, href }, index) => (
            <Link key={index} href={href} className="m-1.5 p-1.5">
              {name}
            </Link>
          ))}
          <ThemeSwitch className="m-3" />
          <Login className="m-1.5 p-1.5" user={session?.user} type={session ? 'signout' : 'signin'} />
        </div>
      </nav>

      <div
        className={`top-50 absolute right-0 z-10 overflow-hidden ${mobileMenuOpen ? 'w-80 px-6 py-4' : 'w-0 p-0'} rounded bg-white ring-2 ring-gray-200 transition-all duration-500 ease-in dark:bg-black dark:ring-gray-800 md:hidden`}
      >
        <ThemeSwitch />
        <div className="flex flex-col divide-y divide-solid">
          <div className="flex flex-col gap-3 py-3 pt-6">
            {navLink.map(({ name, href }, index) => (
              <Link key={index} href={href} className="m-1.5 p-1.5">
                {name}
              </Link>
            ))}
            <Login className="m-1.5 p-1.5" user={session?.user} type={session ? 'signout' : 'signin'} />
          </div>
        </div>
      </div>
    </header>
  );
}
