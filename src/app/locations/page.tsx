"use client";

import React, { useState } from "react";
import CityCard from "@/components/CityCard";
import Map from "@/components/Map";

const Locations = () => {
  const [selectedCity, setSelectedCity] = useState("Seattle");

  const handleCityClick = (city) => {
    setSelectedCity(city);
  };

  return (
    <>
      <div className="grid grid-cols-4 min-h-[90vh]">
        <div className="col-span-1 grid grid-rows-4 bg-primary-darker">
          <CityCard
            city="Seattle"
            image="/img/cities/Seattle.jpg"
            onArrowClick={handleCityClick}
            isSelected={selectedCity === "Seattle"}
          />
          <CityCard
            city="Chicago"
            image="/img/cities/Chicago.jpg"
            onArrowClick={handleCityClick}
            isSelected={selectedCity === "Chicago"}
          />
          <CityCard
            city="Los Angeles"
            image="/img/cities/Los Angeles.jpeg"
            onArrowClick={handleCityClick}
            isSelected={selectedCity === "Los Angeles"}
          />
          <CityCard
            city="New York"
            image="/img/cities/New York.jpeg"
            onArrowClick={handleCityClick}
            isSelected={selectedCity === "New York"}
          />
        </div>
        <div className="col-span-3 bg-background p-4">
          {selectedCity ? (
            <Map city={selectedCity} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <p>Select a location to view its map</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Locations;
