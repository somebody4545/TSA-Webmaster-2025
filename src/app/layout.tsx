import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: 'Maitso - Plant Powered',
  description: 'A Restaurant Website designed for TSA 2024-2025',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body id="start" className="overflow-x-hidden max-w-screen font-body flex flex-col min-h-screen bg-primary scrollbar scrollbar-w-2 scrollbar-thumb-primary-darker hover:scrollbar-thumb-primary-darkest active:scrollbar-thumb-primary-superdark">
        <Header />
        <main className="flex-1 bg-background text-text flex flex-col">
          {children}
        </main>
        <Footer />
        <Analytics/>
      </body>
    </html>
  );
}
