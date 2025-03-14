"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { House, MapPin, MoveRight } from "lucide-react";

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
        className="flex flex-col items-center bg-background rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="relative w-full"
          style={{ height: "280px" }}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={image}
            alt={city}
            layout="fill"
            className="object-cover"
          />
          {/* Add a subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-40"></div>
          
          {/* Add a small "eco-friendly" badge */}
          <div className="absolute top-4 right-4 bg-green-600/90 text-white text-xs px-2 py-1 rounded-full flex items-center">
						<House className="w-3 h-3 mr-1" />
            Plant-Based
          </div>
        </motion.div>
        
        <motion.div
          className="w-full p-5 border-t border-gray-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-2 text-primary font-heading flex items-center">
            {city}
            <span className="ml-2 text-primary">
							<MapPin className="w-5 h-5"/>
            </span>
          </h2>
          <p className="text-text mb-4">{description}</p>
          <div className="flex justify-between items-center">
            <span className="text-primary font-medium text-sm flex items-center">
              Learn more
							<MoveRight className="w-4 h-4 ml-1" />
            </span>
          </div>
        </motion.div>
      </motion.div>
    </Link>
  );
}

export default CityCard;