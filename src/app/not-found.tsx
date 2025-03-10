"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
  text: { opacity: 0, x: -50 },
  textVisible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

export default function NotFound() {
  return (
    <div className="min-h-full flex-grow flex flex-col justify-center items-center text-center p-4">
      <motion.h1
        className="text-6xl font-heading"
        variants={variants}
        initial="hidden"
        animate="visible"
      >
        404
      </motion.h1>
      <motion.p
        className="text-xl mt-4"
        variants={variants}
        initial="text"
        animate="textVisible"
      >
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </motion.p>
      <Link href="/" className="btn btn-primary mt-4 rounded-full">
        Go Home
      </Link>
    </div>
  );
}