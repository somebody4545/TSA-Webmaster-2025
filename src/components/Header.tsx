"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { path: "/#start", label: "Home", match: "/" },
    { path: "menu", label: "Menu", match: "/menu" },
    { path: "mission", label: "Mission", match: "/mission" },
    { path: "/locations", label: "Locations", match: "/locations" },
  ];

  const headerBackground = isScrolled
    ? "bg-text bg-opacity-80 text-background"
    : "bg-primary text-text";

  return (
    <header
      className={`w-full grain h-20 flex justify-between items-center p-4 lg:px-16 xl:px-32 ${headerBackground} backdrop-blur-sm sticky top-0 z-50 transition-all duration-700`}
      id="start"
    >
      <Link href="/#start">
        <motion.h1
          className="text-2xl font-bold font-heading max-lg:px-4"
          whileHover={{
            scale: 1,
            transition: { type: "spring", stiffness: 500 },
          }}
          whileTap={{ scale: 0.9 }}
        >
          Maitso
        </motion.h1>
      </Link>

      <div className="dropdown dropdown-end lg:hidden">
        <label tabIndex={0} className="btn btn-ghost">
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
          {navigationItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`hover:underline ${
                  pathname === item.match ? "font-bold" : ""
                } focus:outline-none`}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <a href="/gifts" className={`hover:underline ${pathname === '/gifts' ? "font-bold" : ""} active:!bg-green-950 ${!isScrolled ? "" : "focus:text-white"}`}>Gifts</a>
          </li>
        </ul>
      </div>

      <nav className="hidden lg:flex">
        <ul className="menu menu-horizontal p-0 gap-2">
          {navigationItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`hover:underline ${
                  pathname === item.match ? "font-bold" : ""
                } active:!bg-green-950 ${
                  !isScrolled ? "" : "focus:text-white"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <a href="/gifts" className={`hover:underline ${pathname === '/gifts' ? "font-bold" : ""} active:!bg-green-950 ${!isScrolled ? "" : "focus:text-white"}`}>Gifts</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
