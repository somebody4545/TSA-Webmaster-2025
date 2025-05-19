"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import CityCard from "@/components/CityCard";
import { CircleCheck, ChevronDown } from "lucide-react";

const Locations = () => {
  return (
    <>
      <div className="bg-black text-background relative min-h-[600px] max-h-[90vh] h-[90vh] flex flex-col justify-center items-center px-16 z-10 overflow-clip">
        <ParallaxBackground />
        <motion.div
          className="absolute inset-0 bg-black/30 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="z-10 text-center max-w-3xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h1
            className="text-4xl font-heading text-background mb-4 drop-shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Locations
          </motion.h1>
          <motion.p
            className="text-xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            International cuisines near you!
          </motion.p>
        </motion.div>
        <motion.div
          className="absolute bottom-8 animate-bounce cursor-pointer text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: 'smooth'
            });
          }}
        >
          <p className="text-sm text-center">Scroll Down</p>
          <div className="flex justify-center items-center">
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
              className="feather feather-chevron-down"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </motion.div>

      </div>

      <div className="py-12 bg-primary-50/50">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-heading mb-4 text-primary">
            Our Locations
          </h2>
          <p className="text-gray-700 mb-6">
            Each Maitso location is thoughtfully designed to minimize
            environmental impact while maximizing your dining experience.
            Prioritizing locally-sourced ingredients to result in
            energy-efficient kitchens is a key part of our commitment to
            sustainability.
          </p>
          <div className="flex justify-center space-x-8">
            <div className="flex items-center">
              <CircleCheck className="w-5 h-5 text-primary mr-2" />
              <span>100% Plant-Based</span>
            </div>
            <div className="flex items-center">
              <CircleCheck className="w-5 h-5 text-primary mr-2" />
              <span>Locally Sourced</span>
            </div>
            <div className="flex items-center">
              <CircleCheck className="w-5 h-5 text-primary mr-2" />
              <span>Zero Waste</span>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading mb-12 text-center">
            Find Us In Your City
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CityCard
              city="Los Angeles, CA"
              image="/img/cities/Los Angeles.jpg"
              description="Immerse yourself in the vibrant culture and exquisite cuisine of Los Angeles at our downtown venue."
              link="/locations/los-angeles"
            />
            <CityCard
              city="Chicago, IL"
              image="/img/cities/Chicago.jpg"
              description="Savor the finest of Chicago's culinary delights at our iconic and centrally located establishment."
              link="/locations/chicago"
            />
            <CityCard
              city="New York, NY"
              image="/img/cities/New York.jpg"
              description="Indulge in a sophisticated dining experience at our New York location, nestled in the city's heart."
              link="/locations/new-york"
            />
            <CityCard
              city="Seattle, WA"
              image="/img/cities/Seattle.jpg"
              description="Explore the unique flavors of Seattle at our picturesque waterfront location, a true culinary gem."
              link="/locations/seattle"
            />
          </div>
        </div>
      </div>

      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-heading mb-6 text-center">
            Our Growing Network
          </h2>
          <p className="text-center mb-12 max-w-2xl mx-auto">
            Maitso is expanding to bring sustainable, plant-based dining
            experiences to more cities across the United States.
          </p>
          <div className="h-96 bg-gray-200 rounded-xl relative overflow-hidden">
            <iframe
              src="https://www.google.com/maps/d/u/0/embed?mid=1coOix0I7lA21Jo0i2zQz905t4BWm6yg&ehbc=2E312F&noprof=1"
              width="100%"
              height="100%"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

function ParallaxBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 600]);

  return (
    <motion.div ref={ref} style={{ y }} className="absolute inset-0 -z-10">
      <Image
        src="/img/backgrounds/locationspage.jpg"
        alt="Menu Background"
        layout="fill"
        objectFit="cover"
        style={{ filter: "brightness(0.4)" }}
        priority
      />
    </motion.div>
  );
}

export default Locations;
