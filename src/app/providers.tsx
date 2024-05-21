'use client';
import { TooltipProvider } from '@/components/ui/tooltip';
import AuthProvider from '@/context/AuthProvider';
import SemesterProvider from '@/context/SemesterContext';
import ToastProvider from '@/context/ToastProvider';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <SemesterProvider>
            <ToastProvider>{children}</ToastProvider>
          </SemesterProvider>
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
