'use client';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import logo from '/public/images/logo.png';
import { BsSun, BsMoon } from 'react-icons/bs';

export default function ThemeSwitch(props: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted) return <Image src={logo} width={24} height={24} className="m-3" alt="Dark Ligth Mode" />;

  if (resolvedTheme === 'dark') {
    return <BsSun className={`${props.className} size-6 cursor-pointer`} onClick={() => setTheme('light')} />;
  }

  if (resolvedTheme === 'light') {
    return <BsMoon className={`${props.className} size-6 cursor-pointer`} onClick={() => setTheme('dark')} />;
  }
}
