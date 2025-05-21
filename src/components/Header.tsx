"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { UserRound } from 'lucide-react';
import {  signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebase";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isEarnOpen, setIsEarnOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const earnDropdownRef = useRef<HTMLLIElement>(null);
  const lastToggleRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
      setIsEarnOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
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
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (earnDropdownRef.current && !earnDropdownRef.current.contains(event.target as Node)) {
        setIsEarnOpen(false);
      }
    }

    if (isEarnOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEarnOpen]);

  useEffect(() => {
    setIsEarnOpen(false);
  }, [pathname]);
  

  const handleNavigation = () => {
    setIsEarnOpen(false);
  };

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (isEarnOpen && earnDropdownRef.current) {
        const now = Date.now();
        if (now - lastToggleRef.current < 50) {
          return;
        }

        if (!earnDropdownRef.current.contains(e.target as Node)) {
          setIsEarnOpen(false);
        }
      }
    };

    document.addEventListener('click', handleDocumentClick, true);

    return () => {
      document.removeEventListener('click', handleDocumentClick, true);
    };
  }, [isEarnOpen]);

  const headerBackground = isScrolled
    ? "bg-text bg-opacity-80 text-background backdrop-blur-md"
    : "bg-primary text-text";

  return (
    <motion.header
      className={`w-full grain h-20 flex justify-between items-center p-4 lg:px-16 xl:px-32 ${headerBackground} backdrop-blur-md sticky top-0 z-50 transition-all duration-700 shadow-lg`}
      id="start"
    >
      <Link href="/#start">
        <motion.h1
          className="text-2xl font-bold font-heading max-lg:px-4"
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.3 },
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        >
          Maitso
        </motion.h1>
      </Link>        <motion.div
        className="dropdown dropdown-end lg:hidden"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
      >
        <motion.label
          tabIndex={0}
          className="btn btn-ghost"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
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
        </motion.label>
        <ul
          tabIndex={0}
          className="text-text menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 gap-2"
        >
          <motion.li
            initial={{ opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link
              href="/mission"
              onClick={handleNavigation}
              className="relative overflow-hidden group"
            >
              <span className={`${pathname === "/mission" ? "font-bold" : ""} focus:outline-none ${pathname === "/mission" && isScrolled ? "text-background" : ""} transition-colors duration-700`}>Process</span>
              <span className={`absolute bottom-0 left-1/2 w-0 h-0.5 ${isScrolled ? 'bg-background' : 'bg-black'} group-hover:w-full group-hover:left-0 transition-all duration-300`}></span>
            </Link>
          </motion.li>
          <motion.li
            initial={{ opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link
              href="/menu"
              onClick={handleNavigation}
              className="relative overflow-hidden group"
            >
              <span className={`${pathname === "/menu" ? "font-bold" : ""} focus:outline-none ${pathname === "/menu" && isScrolled ? "text-background" : ""} transition-colors duration-700`}>Menu</span>
              <span className={`absolute bottom-0 left-1/2 w-0 h-0.5 ${isScrolled ? 'bg-background' : 'bg-black'} group-hover:w-full group-hover:left-0 transition-all duration-300`}></span>
            </Link>
          </motion.li>
          <motion.li
            initial={{ opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link
              href="/locations"
              onClick={handleNavigation}
              className="relative overflow-hidden group"
            >
              <span className={`${pathname === "/locations" ? "font-bold" : ""} focus:outline-none ${pathname === "/locations" && isScrolled ? "text-background" : ""} transition-colors duration-700`}>Locations</span>
              <span className={`absolute bottom-0 left-1/2 w-0 h-0.5 ${isScrolled ? 'bg-background' : 'bg-black'} group-hover:w-full group-hover:left-0 transition-all duration-300`}></span>
            </Link>
          </motion.li>
          <motion.li
            ref={earnDropdownRef}
            initial={{ opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            className={`${isEarnOpen ? 'z-50' : ''}`}
          >
            <div className="relative">
              <button
                onClick={() => {
                  lastToggleRef.current = Date.now();
                  setIsEarnOpen(!isEarnOpen);
                }}
                onBlur={() => setTimeout(() => setIsEarnOpen(false), 100)}
                className="flex items-center w-full justify-between group relative overflow-hidden"
              >
                <span className="transition-colors duration-700">Earn</span>
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1 transition-colors duration-700"
                  animate={{ rotate: isEarnOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
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
                </motion.svg>
                <span className={`absolute bottom-0 left-1/2 w-0 h-0.5 ${isScrolled ? 'bg-background' : 'bg-black'} group-hover:w-full group-hover:left-0 transition-all duration-300`}></span>
              </button>
              <AnimatePresence>
                {isEarnOpen && (
                  <motion.ul className="text-black p-3 bg-white bg-opacity-95 backdrop-blur-sm shadow-lg absolute top-full left-0 rounded-lg w-48 border border-gray-100"
                    initial={{ opacity: 0, y: -5, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -5, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <motion.li
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: 0.05 }}
                      onClick={() => {
                        setTimeout(() => setIsEarnOpen(false), 100);
                      }}
                    >                      <a href="/rewards" onClick={(e) => { e.preventDefault(); handleNavigation(); window.location.href = '/rewards'; }} className="relative overflow-hidden group hover:bg-green-50 rounded-md transition-colors duration-200 p-2 block">
                        <span className={`${pathname === '/rewards' ? "font-bold" : ""} ${pathname === '/rewards' && isScrolled ? "text-background" : ""} transition-colors duration-700`}>Rewards</span>
                        <span className={`absolute bottom-0 left-1/2 w-0 h-0.5 ${isScrolled ? 'bg-background' : 'bg-black'} group-hover:w-full group-hover:left-0 transition-all duration-300`}></span>
                      </a>
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                      onClick={() => {
                        setTimeout(() => setIsEarnOpen(false), 100);
                      }}
                    >                      <Link href="/gifts" onClick={handleNavigation} className="relative overflow-hidden group hover:bg-green-50 rounded-md transition-colors duration-200 p-2 block">
                        <span className={`${pathname === '/gifts' ? "font-bold" : ""} ${pathname === '/gifts' && isScrolled ? "text-background" : ""} transition-colors duration-700`}>Gifts</span>
                        <span className={`absolute bottom-0 left-1/2 w-0 h-0.5 ${isScrolled ? 'bg-background' : 'bg-black'} group-hover:w-full group-hover:left-0 transition-all duration-300`}></span>
                      </Link>
                    </motion.li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </motion.li>
          <motion.li
            initial={{ opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link
              href="/references"
              onClick={handleNavigation}
              className="relative overflow-hidden group"
            >
              <span className={`${pathname === "/references" ? "font-bold" : ""} focus:outline-none ${pathname === "/references" && isScrolled ? "text-background" : ""} transition-colors duration-700`}>References</span>
              <span className={`absolute bottom-0 left-1/2 w-0 h-0.5 ${isScrolled ? 'bg-background' : 'bg-black'} group-hover:w-full group-hover:left-0 transition-all duration-300`}></span>
            </Link>
          </motion.li>
        </ul>
      </motion.div>

      <motion.nav
        className="hidden lg:flex"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
      >
        <ul className="menu menu-horizontal p-0 gap-4">
          <motion.li
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link
              href="/mission"
              onClick={handleNavigation}
              className={`relative overflow-hidden group px-3 py-2 rounded-md ${pathname === "/mission" ? "font-bold" : ""} active:!bg-green-950`}
            >
              <span className={`${isScrolled && pathname === "/mission" ? "text-background" : ""} transition-colors duration-700`}>Process</span>
              <span className={`absolute bottom-0 left-1/2 w-0 h-0.5 ${isScrolled ? 'bg-background' : 'bg-black'} group-hover:w-full group-hover:left-0 transition-all duration-300`}></span>
            </Link>
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link
              href="/menu"
              onClick={handleNavigation}
              className={`relative overflow-hidden group px-3 py-2 rounded-md ${pathname === "/menu" ? "font-bold" : ""} active:!bg-green-950`}
            >
              <span className={`${isScrolled && pathname === "/menu" ? "text-background" : ""} transition-colors duration-700`}>Menu</span>
              <span className={`absolute bottom-0 left-1/2 w-0 h-0.5 ${isScrolled ? 'bg-background' : 'bg-black'} group-hover:w-full group-hover:left-0 transition-all duration-300`}></span>
            </Link>
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link
              href="/locations"
              onClick={handleNavigation}
              className={`relative overflow-hidden group px-3 py-2 rounded-md ${pathname === "/locations" ? "font-bold" : ""} active:!bg-green-950`}
            >
              <span className={`${isScrolled && pathname === "/locations" ? "text-background" : ""} transition-colors duration-700`}>Locations</span>
              <span className={`absolute bottom-0 left-1/2 w-0 h-0.5 ${isScrolled ? 'bg-background' : 'bg-black'} group-hover:w-full group-hover:left-0 transition-all duration-300`}></span>
            </Link>
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link
              href="/references"
              onClick={handleNavigation}
              className={`relative overflow-hidden group px-3 py-2 rounded-md ${pathname === "/references" ? "font-bold" : ""} active:!bg-green-950`}
            >
              <span className={`${isScrolled && pathname === "/references" ? "text-background" : ""} transition-colors duration-700`}>References</span>
              <span className={`absolute bottom-0 left-1/2 w-0 h-0.5 ${isScrolled ? 'bg-background' : 'bg-black'} group-hover:w-full group-hover:left-0 transition-all duration-300`}></span>
            </Link>
          </motion.li>
          {isLoggedIn ? (
          <motion.li
            ref={earnDropdownRef}
            className={`relative ${isEarnOpen ? 'z-50' : ''}`}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            onMouseLeave={() => setIsEarnOpen(false)}
          >
            <button
              onClick={() => {
                lastToggleRef.current = Date.now();
                setIsEarnOpen(!isEarnOpen);
              }}
              onBlur={() => setTimeout(() => setIsEarnOpen(false), 100)}
              className={`relative overflow-hidden group px-3 py-2 rounded-md flex items-center active:!bg-green-950`}
            >
              <UserRound className="size-5"/>
              <span className={`${isScrolled ? "text-background" : ""} transition-colors duration-700`}>
                Account
              </span>
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1 ${isScrolled ? "text-background" : ""} transition-colors duration-700`}
                animate={{ rotate: isEarnOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
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
              </motion.svg>
              <span className={`absolute bottom-0 left-1/2 w-0 h-0.5 ${isScrolled ? 'bg-background' : 'bg-black'} group-hover:w-full group-hover:left-0 transition-all duration-300`}></span>
            </button>            <AnimatePresence>
              {isEarnOpen && (
                <motion.ul className="text-black p-4 bg-white bg-opacity-95 backdrop-blur-sm shadow-lg absolute top-full left-0 rounded-lg min-w-40 border border-gray-100"
                  initial={{ opacity: 0, y: -5, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -5, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <motion.li
                    whileHover={{ scale: 1.05, x: 3 }}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.05 }}
                    onClick={() => {
                      setTimeout(() => setIsEarnOpen(false), 100);
                    }}                  >                    <a href="/rewards" onClick={(e) => { e.preventDefault(); handleNavigation(); window.location.href = '/rewards'; }} className="relative overflow-hidden group px-3 py-2 block hover:bg-green-50 rounded-md transition-colors duration-200">
                      <span className={`${pathname === '/rewards' ? "font-bold" : ""} ${pathname === '/rewards' && isScrolled ? "text-background" : ""} transition-colors duration-700`}>Rewards</span>
                      <span className={`absolute bottom-0 left-1/2 w-0 h-0.5 ${isScrolled ? 'bg-background' : 'bg-black'} group-hover:w-full group-hover:left-0 transition-all duration-300`}></span>
                    </a>
                  </motion.li>                  <motion.li
                    whileHover={{ scale: 1.05, x: 3 }}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                    onClick={() => {
                      setTimeout(() => setIsEarnOpen(false), 100);
                    }}
                  >                    <Link href="/gifts" onClick={handleNavigation} className="relative overflow-hidden group px-3 py-2 block hover:bg-green-50 rounded-md transition-colors duration-200">
                      <span className={`${pathname === '/gifts' ? "font-bold" : ""} ${pathname === '/gifts' && isScrolled ? "text-background" : ""} transition-colors duration-700`}>Gifts</span>
                      <span className={`absolute bottom-0 left-1/2 w-0 h-0.5 ${isScrolled ? 'bg-background' : 'bg-black'} group-hover:w-full group-hover:left-0 transition-all duration-300`}></span>
                    </Link>
                  </motion.li>
                  <motion.li
                    whileHover={{ scale: 1.05, x: 3 }}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.05 }}
                    onClick={() => {
                      setTimeout(() => setIsEarnOpen(false), 100);
                    }}                  >                    
                    <button onClick={handleLogout} className="relative overflow-hidden group px-3 py-2 block hover:bg-green-50 rounded-md transition-colors duration-200">
                      <span className={`${pathname === '/rewards' && isScrolled ? "text-background" : ""} transition-colors duration-700`}>Log Out</span>
                      <span className={`absolute bottom-0 left-1/2 w-0 h-0.5 ${isScrolled ? 'bg-background' : 'bg-black'} group-hover:w-full group-hover:left-0 transition-all duration-300`}></span>
                    </button>
                  </motion.li>
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.li>) : (<motion.li
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link
              href="/rewards"
              onClick={handleNavigation}
              className={`relative overflow-hidden group px-3 py-2 rounded-md ${pathname === "/rewards" ? "font-bold" : ""} active:!bg-green-950`}
            >
              <span className={`${isScrolled && pathname === "/rewards" ? "text-background" : ""} transition-colors duration-700`}>Sign In / Join</span>
              <span className={`absolute bottom-0 left-1/2 w-0 h-0.5 ${isScrolled ? 'bg-background' : 'bg-black'} group-hover:w-full group-hover:left-0 transition-all duration-300`}></span>
            </Link>
          </motion.li>)}
        </ul>
      </motion.nav>
    </motion.header>
  );
}