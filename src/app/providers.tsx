'use client';
import SemesterProvider from '@/context/SemesterContext';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SemesterProvider>{children}</SemesterProvider>
    </ThemeProvider>
  );
}
