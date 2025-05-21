"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { UserRound } from 'lucide-react';
import {  signOut } from "firebase/auth";

import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";


export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isEarnOpen, setIsEarnOpen] = useState(false);
  const earnDropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (earnDropdownRef.current && !earnDropdownRef.current.contains(event.target as Node)) {
        setIsEarnOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleLogout = async () => {
    setIsEarnOpen(false);
    try {
      await signOut(auth);
    } catch (err) {
      const error = err as Error; 
    }
  };

  useEffect(() => {
    setIsEarnOpen(false);
  }, [pathname]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const navigationItems = [
    { path: "/#start", label: "Home", match: "/" },
    { path: "/mission", label: "Mission", match: "/mission" },
    { path: "/menu", label: "Menu", match: "/menu" },
    { path: "/locations", label: "Locations", match: "/locations" },
    { path: "/rewards", label: "Rewards", match: "/rewards" },
    { path: "/references", label: "References", match: "/references" },
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
          <li>
            <Link
              href="/mission"
              className={`hover:underline ${pathname === "/mission" ? "font-bold" : ""
                } focus:outline-none`}
            >
              Process
            </Link>
          </li>
          <li>
            <Link
              href="/menu"
              className={`hover:underline ${pathname === "/menu" ? "font-bold" : ""
                } focus:outline-none`}
            >
              Menu
            </Link>
          </li>
          <li>
            <Link
              href="/locations"
              className={`hover:underline ${pathname === "/locations" ? "font-bold" : ""
                } focus:outline-none`}
            >
              Locations
            </Link>
          </li>
          <li ref={earnDropdownRef}>
            <div className="relative">
              <button
                onClick={() => setIsEarnOpen(!isEarnOpen)}
                className="flex items-center w-full justify-between"
              >
                <span>Earn</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ml-1 transition-transform duration-200 ${isEarnOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isEarnOpen && (
                <ul className="text-black p-2 bg-white shadow-md absolute top-full left-0 w-full rounded-md">
                  <li>
                    <Link href="/rewards">Rewards</Link>
                  </li>
                  <li>
                    <Link href="/gifts" className={`hover:underline ${pathname === '/gifts' ? "font-bold" : ""}`}>Gifts</Link>
                  </li>
                </ul>
              )}
            </div>
          </li>
          <li>
            <Link
              href="/references"
              className={`hover:underline ${pathname === "/references" ? "font-bold" : ""
                } focus:outline-none`}
            >
              References
            </Link>
          </li>
        </ul>
      </div>

      <nav className="hidden lg:flex">
        <ul className="menu menu-horizontal p-0 gap-2">
          <li>
            <Link
              href="/mission"
              className={`hover:underline ${pathname === "/mission" ? "font-bold" : ""
                } active:!bg-green-950 ${!isScrolled ? "" : "focus:text-white"
                }`}
            >
              Process
            </Link>
          </li>
          <li>
            <Link
              href="/menu"
              className={`hover:underline ${pathname === "/menu" ? "font-bold" : ""
                } active:!bg-green-950 ${!isScrolled ? "" : "focus:text-white"
                }`}
            >
              Menu
            </Link>
          </li>
          <li>
            <Link
              href="/locations"
              className={`hover:underline ${pathname === "/locations" ? "font-bold" : ""
                } active:!bg-green-950 ${!isScrolled ? "" : "focus:text-white"
                }`}
            >
              Locations
            </Link>
          </li>

          <li>
            <Link
              href="/references"
              className={`hover:underline ${pathname === "/references" ? "font-bold" : ""
                } active:!bg-green-950 ${!isScrolled ? "" : "focus:text-white"
                }`}
            >
              References
            </Link>
          </li>
          {isLoggedIn ? 
          <li ref={earnDropdownRef} className="relative">
            <button
              onClick={() => setIsEarnOpen(!isEarnOpen)}
              className={`hover:underline active:!bg-green-950 ${!isScrolled ? "" : "focus:text-white"} flex items-center`}
            >
              <UserRound className="self-center size-5"/>
              Account
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1 transition-transform duration-200 ${isEarnOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isEarnOpen && (
              <ul className="text-black p-2 bg-white shadow-md absolute top-full left-0 rounded-md min-w-32">
                <li>
                  <Link href="/rewards">Rewards</Link>
                </li>
                <li>
                  <Link href="/gifts" className={`hover:underline ${pathname === '/gifts' ? "font-bold" : ""}`}>Gifts</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="hover:underline">Sign Out</button>
                </li>
              </ul>
            )}
          </li> : 
          <li>
            <Link
              href="/rewards"
              className={`hover:underline ${pathname === "/rewards" ? "font-bold" : ""
                } active:!bg-green-950 ${!isScrolled ? "" : "focus:text-white"
                }`}
            >
              <UserRound className="self-center size-5"/>
              Sign In / Join
            </Link>
          </li>
            }
        </ul>
      </nav>
    </header>
  );
}
