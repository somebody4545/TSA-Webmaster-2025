"use client";

import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const CityCard = ({ city, image, onArrowClick, isSelected }) => {
  const handleArrowClick = () => {
    onArrowClick(city);
  };

  return (
    <motion.div
      className="bg-primary-darker hover:bg-primary-darkest rounded-lg overflow-hidden relative duration-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <motion.h3
        className="text-2xl text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {city}
      </motion.h3>
      <Image
        src={image}
        alt={city}
        layout="fill"
        className="object-cover opacity-10"
      />
      <div className="absolute top-1/2 right-5 transform -translate-y-1/2">
        <motion.div
          className="cursor-pointer text-white"
          onClick={handleArrowClick}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.9 }}
          transition={{
            x: { type: "spring", stiffness: 300 },
            scale: { duration: 0.1 },
          }}
        >
          <ChevronRight />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CityCard;
