import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-[100dvh] flex flex-col" style={{ backgroundColor: '#0A0E1A' }}>
      <Navbar />
      {/* Spacer for fixed navbar */}
      <div style={{ height: '56px' }} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
