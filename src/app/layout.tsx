import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Maitso',
  description: 'A Resturant wesbite designed for TSA',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="lg:px-10 font-body flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 bg-background text-text flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
