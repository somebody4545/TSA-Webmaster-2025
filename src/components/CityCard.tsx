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
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className={`bg-primary-darkest rounded-lg overflow-hidden relative ${
          isSelected ? "z-10 ring-2 ring-white" : ""
        }`}
      >
        <h3 className="text-2xl text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          {city}
        </h3>
        <Image
          src={image}
          alt={city}
          layout="fill"
          className="object-cover opacity-10"
        />
        <div
          className="absolute top-1/2 right-5 transform -translate-y-1/2 cursor-pointer text-white"
          onClick={handleArrowClick}
        >
          <ChevronRight />
        </div>
      </div>
    </motion.div>
  );
};

export default CityCard;
