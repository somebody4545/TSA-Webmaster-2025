"use client";

export const SpanishFlag = () => <CircleFlag countryCode="es" height="35" />;
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import GlobalCuisineMap from "@/components/GlobalCuisineMap";

import {
  Citrus,
  Tractor,
  Quote as QuoteIcon,
  ChefHat,
  CookingPot,
  Users,
  Utensils,
} from "lucide-react";

function PartnerCarousel() {
  const [index, setIndex] = useState(0);
  const partners = [1, 2, 3, 4, 5, 6, 7, 8].map((number) => ({
    id: number,
    imageUrl: `/img/partner${number}.png`,
    alt: `Partner ${number} logo`,
    href: `/img/partner${number}`,
  }));

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % partners.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + partners.length) % partners.length);
  };

  return (
    <div className="relative w-full mx-auto h-[400px] py-8">
      <div className="relative flex items-center justify-center h-full">
        {partners.map((partner, i) => {
          const position =
            i === index
              ? "translate-x-0 scale-100 z-30 opacity-100"
              : i === (index + 1) % partners.length
              ? "translate-x-[75%] scale-90 z-20 opacity-20"
              : i === (index - 1 + partners.length) % partners.length
              ? "translate-x-[-75%] scale-90 z-20 opacity-20"
              : "translate-x-0 scale-75 z-10 opacity-0";

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{
                opacity:
                  i === index
                    ? 1
                    : i === (index + 1) % partners.length ||
                      i === (index - 1 + partners.length) % partners.length
                    ? 0.2
                    : 0,
              }}
              transition={{ duration: 0.7 }}
              className={`absolute w-[90%] md:w-[75%] h-[350px] flex flex-col transition-all duration-500 ease-in-out ${position}`}
            >
              <a href={partner.href} className="block h-full w-full">
                <div className="flex items-center justify-center h-full w-full">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={partner.imageUrl}
                      alt={partner.alt}
                      width="450"
                      height="350"
                      className="object-contain transition-transform hover:scale-105 rounded-xl"
                    />
                  </div>
                </div>
              </a>
            </motion.div>
          );
        })}
      </div>

      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between z-50 px-4 pointer-events-none">
        <motion.button
          onClick={prevSlide}
          className="btn btn-circle btn-primary text-background hover:scale-110 transition-transform duration-200 pointer-events-auto shadow-md"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </motion.button>
        <motion.button
          onClick={nextSlide}
          className="btn btn-circle btn-primary text-background hover:scale-110 transition-transform duration-200 pointer-events-auto shadow-md"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </motion.button>
      </div>

      <div className="flex justify-center mt-4 gap-2">
        {partners.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i === index ? "bg-primary" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

const MissionPage = () => {
  const [bikeFlipped, setBikeFlipped] = useState(false);
  const [robotFlipped, setRobotFlipped] = useState(false);
  const [freightFlipped, setFreightFlipped] = useState(false);
  const [waterFlipped, setWaterFlipped] = useState(false);
  const [energyFlipped, setEnergyFlipped] = useState(false);
  const [packagingFlipped, setPackagingFlipped] = useState(false);

  return (
    <div className="min-h-screen">
      <div className="relative w-full h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('img/farmtofork.webp')" }}
        >
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            aria-hidden="true"
          ></div>
        </div>
        <div className="relative flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
            From <span className="text-primary">Farm</span> to{" "}
            <span className="text-primary">Fork</span>
          </h1>
        </div>
      </div>

      <div className="py-12 px-4 bg-background">
        <div className="container mx-auto px-3">
          <div className="flex justify-center mb-12">
            <div className="flex flex-col md:flex-row w-full md:w-11/12 max-w-6xl gap-6">
              <div className="p-6rounded-lg w-full md:w-2/5 md:h-80 flex flex-col justify-center">
                <h3 className="text-3xl font-heading font-bold mb-3 text-primary-darker">
                  Local Farms
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Tractor
                      className="h-12 w-12 text-primary-darker mt-0.5 mr-2 flex-shrink-0"
                      strokeWidth={1.2}
                    />
                    <p className="text-text font-body">
                      We partner with local farmers to ensure you get to enjoy
                      the freshest, most flavorful vegetables and fruits.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <Citrus
                      className="h-12 w-12 text-primary-darker mt-0.5 mr-2 flex-shrink-0"
                      strokeWidth={1.2}
                    />
                    <p className="text-text font-body">
                      We prioritize seasonal produce to ensure peak flavor and
                      nutrition.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <Users
                      className="h-12 w-12 text-primary-darker mt-0.5 mr-2 flex-shrink-0"
                      strokeWidth={1.2}
                    />
                    <p className="text-text font-body">
                      We support environmentally friendly farming practices that
                      strengthen our local food community.
                    </p>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex md:w-3/5 items-center justify-center">
                <div className="w-full h-80">
                  <img
                    src="/img/farmer.jpg"
                    alt="Farm image"
                    width="480"
                    height="270"
                    className="rounded-lg shadow-md object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mb-4">
            <div className="w-full md:w-4/5 max-w-4xl text-center">
              <div className="text-3xl font-heading font-bold text-primary-darker">
                Our Partners
              </div>
            </div>
          </div>
          <div className="flex justify-center mb-12">
            <div className="w-full md:w-11/12 max-w-6xl">
              <PartnerCarousel />
            </div>
          </div>
          <div className="w-full h-screen relative overflow-hidden">
            <div className="absolute inset-0"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h1 className="text-xl md:text-xl lg:text-2xl font-heading font-bold text-primary-darker mb-4 max-w-2xl sm:max-w-2xl text-center">
                Since emissions from transportations account for{" "}
                <span className="text-black font-bold">28%</span> of greenhouse
                gas emissions we use...
              </h1>
            </div>
          </div>

          <div className="flex flex-col gap-10 mt-16">
            <div className="flex flex-col items-center">
              <div className="text-center mb-10">
                <h3 className="text-3xl font-heading font-bold text-primary-darker">
                  Sustainable Transportation
                </h3>
              </div>
              <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  <div
                    className="h-48 md:h-64 relative rounded-lg overflow-hidden cursor-pointer"
                    onMouseEnter={() => setBikeFlipped(true)}
                    onMouseLeave={() => setBikeFlipped(false)}
                  >
                    <div className="absolute w-full h-full">
                      <img
                        src="/img/bikedelivery.jpg"
                        alt="Bike Delivery"
                        width="400"
                        height="300"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-lg md:text-2xl font-heading font-bold text-white">
                          Bike Delivery
                        </p>
                      </div>
                    </div>

                    <motion.div
                      className="absolute w-full h-full bg-primary-darker rounded-lg flex items-center justify-center p-6"
                      initial={{ y: "100%" }}
                      animate={{ y: bikeFlipped ? 0 : "100%" }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-white text-center font-body">
                        We use bikes for quick and eco-friendly deliveries in
                        downtown areas. This keeps our streets less crowded and
                        the air cleaner.
                      </p>
                    </motion.div>
                  </div>

                  <div
                    className="h-48 md:h-64 relative rounded-lg overflow-hidden cursor-pointer"
                    onMouseEnter={() => setRobotFlipped(true)}
                    onMouseLeave={() => setRobotFlipped(false)}
                  >
                    <div className="absolute w-full h-full">
                      <img
                        src="/img/robotdelivery.jpg"
                        alt="Robot Delivery"
                        width="400"
                        height="300"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-lg md:text-2xl font-heading font-bold text-white">
                          Robot Delivery
                        </p>
                      </div>
                    </div>

                    <motion.div
                      className="absolute w-full h-full bg-primary-darker rounded-lg flex items-center justify-center p-6"
                      initial={{ y: "100%" }}
                      animate={{ y: robotFlipped ? 0 : "100%" }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-white text-center font-body">
                        Compact delivery robots bring packages directly to
                        customers without burning any fuel. They offer a
                        futuristic, low-impact way to get goods where they need
                        to go.
                      </p>
                    </motion.div>
                  </div>

                  <div
                    className="h-48 md:h-64 relative rounded-lg overflow-hidden cursor-pointer"
                    onMouseEnter={() => setFreightFlipped(true)}
                    onMouseLeave={() => setFreightFlipped(false)}
                  >
                    <div className="absolute w-full h-full">
                      <img
                        src="/img/greenfreight.jpg"
                        alt="Electric Trucking"
                        width="400"
                        height="300"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-lg md:text-2xl font-heading font-bold text-white">
                          Electric Trucking
                        </p>
                      </div>
                    </div>

                    <motion.div
                      className="absolute w-full h-full bg-primary-darker rounded-lg flex items-center justify-center p-6"
                      initial={{ y: "100%" }}
                      animate={{ y: freightFlipped ? 0 : "100%" }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-white text-center font-body">
                        For larger hauls, we depend on electric trucks built for
                        heavy-duty transport. These vehicles move goods far and
                        wide—without the carbon footprint of diesel engines.
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  <div
                    className="h-48 md:h-64 relative rounded-lg overflow-hidden cursor-pointer"
                    onMouseEnter={() => setWaterFlipped(true)}
                    onMouseLeave={() => setWaterFlipped(false)}
                  >
                    <div className="absolute w-full h-full">
                      <img
                        src="/img/electricvehicles.png"
                        alt="Electric Vehicles"
                        width="400"
                        height="300"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-lg md:text-2xl font-heading font-bold text-white">
                          Electric Vehicles
                        </p>
                      </div>
                    </div>

                    <motion.div
                      className="absolute w-full h-full bg-primary-darker rounded-lg flex items-center justify-center p-6"
                      initial={{ y: "100%" }}
                      animate={{ y: waterFlipped ? 0 : "100%" }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-white text-center font-body">
                        Our electric cars and vans handle mid-range deliveries
                        without relying on gas. By switching to EVs, we cut
                        emissions and reduce noise pollution.
                      </p>
                    </motion.div>
                  </div>

                  <div
                    className="h-48 md:h-64 relative rounded-lg overflow-hidden cursor-pointer"
                    onMouseEnter={() => setEnergyFlipped(true)}
                    onMouseLeave={() => setEnergyFlipped(false)}
                  >
                    <div className="absolute w-full h-full">
                      <img
                        src="/img/greenshipping.jpeg"
                        alt="Green Shipping"
                        width="400"
                        height="300"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-lg md:text-2xl font-heading font-bold text-white">
                          Green Shipping
                        </p>
                      </div>
                    </div>

                    <motion.div
                      className="absolute w-full h-full bg-primary-darker rounded-lg flex items-center justify-center p-6"
                      initial={{ y: "100%" }}
                      animate={{ y: energyFlipped ? 0 : "100%" }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-white text-center font-body">
                        Global imports and exports are powered by low-emission
                        ships and planes. This approach reduces the
                        environmental impact of getting goods from around the
                        world.
                      </p>
                    </motion.div>
                  </div>

                  <div
                    className="h-48 md:h-64 relative rounded-lg overflow-hidden cursor-pointer"
                    onMouseEnter={() => setPackagingFlipped(true)}
                    onMouseLeave={() => setPackagingFlipped(false)}
                  >
                    <div className="absolute w-full h-full">
                      <img
                        src="/img/routeoptimization.jpg"
                        alt="Low-Carbon Logistics"
                        width="400"
                        height="300"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-lg md:text-2xl font-heading font-bold text-white">
                          Low-Carbon Logistics
                        </p>
                      </div>
                    </div>

                    <motion.div
                      className="absolute w-full h-full bg-primary-darker rounded-lg flex items-center justify-center p-6"
                      initial={{ y: "100%" }}
                      animate={{ y: packagingFlipped ? 0 : "100%" }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-white text-center font-body">
                        Through smarter route planning and optimized systems, we
                        avoid unnecessary emissions. Our goal is to rethink
                        every step of delivery to make it as green as possible.
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-8 bg-primary-darker">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-3 flex justify-center">
              <QuoteIcon className="w-10 h-10 text-background-dim" />
            </div>
            <div className="text-lg md:text-xl font-body font-bold italic text-white">
              "Nothing will benefit human health and increase chances for
              survival of life on Earth as much as the evolution to a vegetarian
              diet."
              <div className="text-sm text-background-dim mt-3">
                — Albert Einstein
              </div>
            </div>
          </div>
        </div>
      </div>
      <GlobalCuisineMap />
    </div>
  );
};

export default MissionPage;
