'use client';
import { TooltipProvider } from '@/components/ui/tooltip';
import SemesterProvider from '@/context/SemesterContext';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <SemesterProvider>{children}</SemesterProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
