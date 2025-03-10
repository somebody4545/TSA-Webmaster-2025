"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import Link from 'next/link';
import { motion } from "framer-motion";

export default function Header() {
  const pathname = usePathname();
  const [isScrolledUp, setIsScrolledUp] = useState(true);

  const handleScroll = useCallback(() => {
    setIsScrolledUp(window.scrollY === 0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const headerClass = `w-full grain h-20 flex justify-between items-center p-4 lg:px-16 xl:px-32 ${isScrolledUp ? "bg-primary text-text" : "bg-text bg-opacity-80 text-background"
    } backdrop-blur-sm sticky top-0 z-50 transition-all duration-700`;

  const linkClass = (path: string) =>
    `hover:underline ${pathname === path ? "font-bold" : ""} active:!bg-green-950 ${!isScrolledUp ? "focus:text-white" : ""}`;

  const navLinks = [
    { href: "/#start", label: "Home", path: "/" },
    { href: "menu", label: "Menu", path: "/menu" },
    { href: "mission", label: "Mission", path: "/mission" },
    { href: "/locations", label: "Locations", path: "/locations" },
    { href: "/gifts", label: "Gifts", path: "/gifts" },
  ];

  return (
    <header className={headerClass} id="start">
      <Link href="/#start">
        <motion.h1
          className="text-2xl font-bold font-heading max-lg:px-4"
          whileHover={{ scale: 1, transition: { type: "spring", stiffness: 500 } }}
          whileTap={{ scale: 0.9 }}
        >
          Maitso
        </motion.h1>
      </Link>

      <div className="dropdown dropdown-end lg:hidden">
        <label tabIndex={0} className="btn btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </label>
        <ul tabIndex={0} className="text-text menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 gap-2">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link href={link.href} className={`hover:underline ${pathname === link.path ? "font-bold" : ""} focus:outline-none`}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <nav className="hidden lg:flex">
        <ul className="menu menu-horizontal p-0 gap-2">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link href={link.href} className={linkClass(link.path)}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
