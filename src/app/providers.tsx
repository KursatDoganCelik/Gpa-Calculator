'use client';
import { TooltipProvider } from '@/components/ui/tooltip';
import AuthProvider from '@/context/AuthProvider';
import SemesterProvider from '@/context/SemesterContext';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <SemesterProvider>{children}</SemesterProvider>
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
