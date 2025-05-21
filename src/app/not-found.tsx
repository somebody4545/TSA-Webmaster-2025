"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-full flex-grow flex flex-col justify-center items-center text-center p-4">
      <motion.h1
        className="text-6xl font-heading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        404
      </motion.h1>
      <motion.p
        className="text-xl mt-4"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </motion.p>
      <Link href="/" className="btn btn-shine btn-primary mt-4 rounded-full">
        Go Home
      </Link>
    </div>
  );
}