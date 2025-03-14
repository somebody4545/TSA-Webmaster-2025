"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, MapPin, Clock, Phone, Instagram, Facebook, Twitter, CircleCheck, MoveRight } from "lucide-react";
import { motion } from "framer-motion";

interface MapProps {
  city: string;
  address: string;
  map: string;
  hours: string[];
  contacts: string[];
}

const Map: React.FC<MapProps> = ({ city, address, map, hours, contacts }) => {
  const mapSrc = map || "https://www.google.com/maps";
  const addressNew = address || "Address not available";
  const cityHours = hours || ["Hours not available"];
  const cityContacts = contacts || ["Contact information not available"];
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <>
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={() => router.back()}
          className="flex items-center text-lg text-text bg-background w-full hover:text-primary transition-colors duration-200 px-8 py-8"
        >
          <ChevronLeft className="mr-2" /> Back to Locations
        </button>
      </motion.div>

      <motion.div 
        className="relative bg-background text-primary-darker py-6 mb-8 px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <h1 className="font-heading text-4xl">{city}</h1>
        </div>
        {/* <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-300 to-green-100 opacity-30"></div> */}
      </motion.div>

      <motion.div 
        className="w-full flex flex-col lg:flex-row gap-8 px-8 pb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="w-full lg:w-2/3 rounded-lg overflow-hidden shadow-md"
          variants={itemVariants}
        >
          <iframe
            src={mapSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title={`Map of ${city}`}
          ></iframe>
        </motion.div>

        <motion.div 
          className="w-full lg:w-1/3"
          variants={containerVariants}
        >
          <motion.div 
            className="bg-background rounded-lg overflow-hidden shadow-md border border-green-100 mb-6"
            variants={itemVariants}
          >
            <div className="bg-primary p-5 text-black">
              <h2 className="font-heading text-2xl">Location Details</h2>
            </div>
            
            <div className="p-6 space-y-6">
              <motion.div variants={itemVariants} className="space-y-3">
                <div className="flex items-center text-primary-darker">
                  <Clock className="w-5 h-5 mr-2" />
                  <h3 className="text-xl font-bold">Hours:</h3>
                </div>
                <div className="pl-7 space-y-1">
                  {cityHours.map((day, index) => (
                    <p key={index} className="text-gray-700">{day}</p>
                  ))}
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="space-y-3">
                <div className="flex items-center text-primary-darker">
                  <MapPin className="w-5 h-5 mr-2" />
                  <h3 className="text-xl font-bold">Address:</h3>
                </div>
                <div className="pl-7">
                  <p className="text-gray-700">{addressNew}</p>
                  <Link
                    className="text-primary-darker hover:text-primary-darker/80 underline mt-2 inline-block"
                    target="_blank"
                    href={`https://www.google.com/maps/place/${addressNew}`}
                  >
                    View on Google Maps
                  </Link>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="space-y-3">
                <div className="flex items-center text-primary-darker">
                  <Phone className="w-5 h-5 mr-2" />
                  <h3 className="text-xl font-bold">Contact:</h3>
                </div>
                <div className="pl-7">
                  {cityContacts.map((contact, index) => (
                    <p key={index} className="text-gray-700">{contact}</p>
                  ))}
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="pt-2">
                <div className="flex justify-center space-x-4">
                  <a href="#" className="text-text hover:text-primary-darker transition-colors duration-200">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-text hover:text-primary-darker transition-colors duration-200">
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-text hover:text-primary-darker transition-colors duration-200">
                    <Twitter className="w-6 h-6" />
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-background rounded-lg p-5 border border-green-100 shadow-sm"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold text-primary-darker mb-3">Sustainability Highlights</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CircleCheck className="w-5 h-5 text-primary-darker mr-2 mt-0.5" />
                  
                <span>100% plant-based menu using locally-sourced ingredients</span>
              </li>
              <li className="flex items-start">
							<CircleCheck className="w-5 h-5 text-primary-darker mr-2 mt-0.5" />

                <span>Composting program reduces our waste by 85%</span>
              </li>
              <li className="flex items-start">
							<CircleCheck className="w-5 h-5 text-primary-darker mr-2 mt-0.5" />

                <span>Energy-efficient kitchen and lighting systems</span>
              </li>
            </ul>
            <div className="mt-4">
              <Link 
                href="/mission" 
                className="text-primary-darker hover:text-primary-darker/80 font-medium text-sm flex items-center"
              >
                Learn more about our mission
                <MoveRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Map;