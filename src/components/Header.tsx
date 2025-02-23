"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from 'next/link';

export default function Header() {
  const pathname = usePathname();
  const [isScrolledUp, setIsScrolledUp] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsScrolledUp(true);
      } else {
        setIsScrolledUp(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Check scroll position on mount
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`w-full flex justify-between items-center p-4 lg:px-16 xl:px-32 ${
        isScrolledUp ? "bg-primary" : "bg-primary bg-opacity-80"
      } text-text backdrop-blur-sm sticky top-0 z-50 transition-all duration-700`}
    >
      <Link href="/"><h1 className="text-2xl font-bold font-heading max-lg:px-4 transition-all">Maitso</h1></Link>
      <div className="dropdown dropdown-end lg:hidden">
        <label tabIndex={0} className="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="text-text menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 gap-2"
        >
          <li>
            <Link
              href="/"
              className={`hover:underline ${pathname === "/" ? "font-bold" : ""} focus:outline-none`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="menu"
              className={`hover:underline ${pathname === "/menu" ? "font-bold" : ""} focus:outline-none`}
            >
              Menu
            </Link>
          </li>
          <li>
            <Link
              href="mission"
              className={`hover:underline ${pathname === "/mission" ? "font-bold" : ""} focus:outline-none`}
            >
              Mission
            </Link>
          </li>
        </ul>
      </div>
      <nav className="hidden lg:flex">
        <ul className="menu menu-horizontal p-0 gap-2">
          <li>
            <Link
              href="/"
              className={`hover:underline ${pathname === "/" ? "font-bold" : ""} active:!bg-green-950`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="menu"
              className={`hover:underline ${pathname === "/menu" ? "font-bold" : ""} active:!bg-green-950`}
            >
              Menu
            </Link>
          </li>
          <li>
            <Link
              href="mission"
              className={`hover:underline ${pathname === "/mission" ? "font-bold" : ""} active:!bg-green-950`}
            >
              Mission
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
