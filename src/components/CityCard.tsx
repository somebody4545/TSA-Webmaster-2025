"use client"

import React from 'react'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'

const CityCard = ({ city, image }) => {
    const handleArrowClick = () => {
      // Your logic here, for example:
      console.log(city);
      // Or navigate to a city page
      // router.push(`/cities/${city}`);
    };
  
    return (
      <div className="bg-primary-darkest rounded-lg overflow-hidden relative">
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
    );
  };

export default CityCard;