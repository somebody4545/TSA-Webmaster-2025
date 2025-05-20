"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, MapPin, Clock, Phone, Instagram, Facebook, Twitter, MoveRight, Star, CalendarDays, Utensils } from "lucide-react";
import { motion } from "framer-motion";

interface MapProps {
  city: string;
  address: string;
  map: string;
  hours: string[];
  contacts: string[];
  thingsToDo: {
    title: string;
    description: string;
    distance: string;
    image: string;
  }[];
}

const Map: React.FC<MapProps> = ({ city, address, map, hours, contacts, thingsToDo }) => {
  const mapSrc = map || "https://www.google.com/maps";
  const addressNew = address || "Address not available";
  const cityHours = hours || ["Hours not available"];
  const cityContacts = contacts || ["Contact information not available"];
  const cityThingsToDo = thingsToDo || [];
  const router = useRouter();

  // Get current day of week
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDay = daysOfWeek[new Date().getDay()];

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
      {/* Hero Section */}
      <div className="relative h-[50vh] bg-black text-white">
        <div className="absolute inset-0 z-10 bg-black/50" />
        <div className="absolute inset-0 z-0">
          <Image 
            src={`/img/cities/${city.split(',')[0]}.jpg`} 
            alt={city} 
            layout="fill" 
            objectFit="cover"
            priority
            className="opacity-80"
          />
        </div>
        
        <div className="relative z-20 h-full container mx-auto px-4 flex flex-col justify-center items-center text-center">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute top-8 left-8"
          >
            <button
              onClick={() => router.back()}
              className="flex items-center text-white hover:text-primary transition-colors duration-200"
            >
              <ChevronLeft className="mr-1" /> Back
            </button>
          </motion.div>

          <motion.h1 
            className="text-5xl lg:text-6xl font-heading mb-4 tracking-tight"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            {city}
          </motion.h1>
          
          <motion.div
            className="flex items-center gap-2 text-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Star className="w-5 h-5 fill-primary text-primary" />
            <Star className="w-5 h-5 fill-primary text-primary" />
            <Star className="w-5 h-5 fill-primary text-primary" />
            <Star className="w-5 h-5 fill-primary text-primary" />
            <Star className="w-5 h-5 fill-primary text-primary" />
            <span className="ml-2 text-white text-sm">Sustainable Plant-Based Dining</span>
          </motion.div>
        </div>
      </div>

      {/* Location Info Section */}
      <div className="bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Column - Map */}
            <motion.div 
              className="w-full lg:w-2/3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                className="bg-white rounded-xl overflow-hidden shadow-lg h-[400px] lg:h-[500px]"
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
                className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
                variants={containerVariants}
              >
                <motion.div 
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border-l-4 border-primary"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <CalendarDays className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-heading text-lg font-bold mb-2">Open Daily</h3>
                  <p className="text-gray-600">Experience our sustainable menu every day of the week</p>
                </motion.div>
                
                <motion.div 
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border-l-4 border-primary"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Utensils className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-heading text-lg font-bold mb-2">Full Menu</h3>
                  <p className="text-gray-600">Enjoy our complete plant-based menu with global influences</p>
                </motion.div>
                
                <motion.div 
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border-l-4 border-primary"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <MapPin className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-heading text-lg font-bold mb-2">Central Location</h3>
                  <p className="text-gray-600">Conveniently located in the heart of {city.split(',')[0]}</p>
                </motion.div>
              </motion.div>
            </motion.div>
            
            {/* Right Column - Info */}
            <motion.div 
              className="w-full lg:w-1/3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                className="bg-white rounded-xl overflow-hidden shadow-lg mb-8"
                variants={itemVariants}
              >
                <div className="bg-primary p-6 text-white">
                  <h2 className="font-heading text-2xl font-bold">Location Details</h2>
                </div>
                
                <div className="p-6 space-y-8">
                  <motion.div variants={itemVariants} className="space-y-3">
                    <div className="flex items-center text-primary">
                      <Clock className="w-5 h-5 mr-3" />
                      <h3 className="text-xl font-bold font-heading">Hours</h3>
                    </div>
                    <div className="pl-8 space-y-2 text-gray-700">
                      {cityHours.map((day, index) => {
                        // Check if the current hour string contains the current day of week
                        const isCurrentDay = day.includes(currentDay);
                        return (
                          <p key={index} className={`${isCurrentDay ? 'border-l-4 pl-2 border-primary' : ''}`}>
                            {day}
                          </p>
                        );
                      })}
                    </div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="space-y-3">
                    <div className="flex items-center text-primary">
                      <MapPin className="w-5 h-5 mr-3" />
                      <h3 className="text-xl font-bold font-heading">Address</h3>
                    </div>
                    <div className="pl-8">
                      <p className="text-gray-700 mb-2">{addressNew}</p>
                      <Link
                        className="inline-flex items-center text-primary hover:text-primary-darker font-medium transition-colors"
                        target="_blank"
                        href={`https://www.google.com/maps/place/${addressNew}`}
                      >
                        Get directions
                        <MoveRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="space-y-3">
                    <div className="flex items-center text-primary">
                      <Phone className="w-5 h-5 mr-3" />
                      <h3 className="text-xl font-bold font-heading">Contact</h3>
                    </div>
                    <div className="pl-8">
                      {cityContacts.map((contact, index) => (
                        <p key={index} className="text-gray-700">{contact}</p>
                      ))}
                    </div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <div className="flex justify-center space-x-5 pt-4">
                      <a href="#" className="bg-background rounded-full p-2 text-primary hover:bg-primary hover:text-white transition-colors duration-200">
                        <Facebook className="w-5 h-5" />
                      </a>
                      <a href="#" className="bg-background rounded-full p-2 text-primary hover:bg-primary hover:text-white transition-colors duration-200">
                        <Instagram className="w-5 h-5" />
                      </a>
                      <a href="#" className="bg-background rounded-full p-2 text-primary hover:bg-primary hover:text-white transition-colors duration-200">
                        <Twitter className="w-5 h-5" />
                      </a>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Things to Do Nearby - Full Width Section */}
          {cityThingsToDo.length > 0 && (
            <div className="mt-16">
              <div className="w-full bg-primary rounded-t-xl px-8 py-6">
                <h2 className="font-heading text-3xl font-bold text-white">Things to Do Nearby</h2>
              </div>
              <div className="w-full bg-white rounded-b-xl shadow-lg px-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {cityThingsToDo.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ y: -5, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
                      className="border-l-4 border-primary pl-4 pr-4 py-4 bg-background rounded-lg shadow-md hover:shadow-xl transition-all duration-200 flex flex-col h-full"
                    >
                      <div className="w-full h-40 relative mb-4 rounded-md overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          priority={index === 0}
                        />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
                      <p className="text-gray-600 flex-1">{item.description}</p>
                      <p className="text-primary text-sm mt-4 font-semibold">{item.distance}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Map;