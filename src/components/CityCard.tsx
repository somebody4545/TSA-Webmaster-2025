"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface CardProps {
  city: string;
  image: string;
  description: string;
  link: string;
}

function CityCard({ city, image, description, link }: CardProps) {
  return (
		<Link href={link} className="text-lg text-text text-left">
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative w-full"
        style={{ paddingBottom: '100%' }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={image}
          alt={city}
          layout="fill"
          className="object-cover"
        />
      </motion.div>
      <motion.div
        className="mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >


				<h2 className="text-2xl font-bold mb-2 text-primary font-heading">{city}</h2>
        <p className="text-text mb-4">{description}</p>
      </motion.div>
    </motion.div>
		</Link>
  );
}

export default CityCard;