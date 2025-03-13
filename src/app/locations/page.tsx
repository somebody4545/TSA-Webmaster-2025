"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import CityCard from "@/components/CityCard";

const Locations = () => {
  return (
    <>
      <div className="bg-black text-background text-xl relative min-h-[500px] max-h-[80vh] h-[80vh] flex flex-col justify-center items-center px-16 z-10 overflow-clip m-8">
        <ParallaxBackground />
        <motion.h1
          className="text-5xl font-heading text-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Locations
        </motion.h1>
        <motion.p
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          International cuisines near you!
        </motion.p>
        <motion.div
          className="absolute bottom-8 animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 p-8 px-60">
        <CityCard
          city="Los Angeles, CA"
          image="/img/cities/Los Angeles.jpeg"
          description="Experience the vibrant culture and cuisine of Los Angeles at our downtown location."
          link="/locations/los-angeles"
        />
        <CityCard
          city="Chicago, IL"
          image="/img/cities/Chicago.jpg"
          description="Enjoy the best of Chicago's culinary scene at our iconic location."
          link="/locations/chicago"
        />
        <CityCard
          city="New York, NY"
          image="/img/cities/New York.jpg"
          description="Dine in style at our New York location, situated in the heart of the city."
          link="/locations/new-york"
        />
        <CityCard
          city="Seattle, WA"
          image="/img/cities/Seattle.jpg"
          description="Discover the flavors of Seattle at our waterfront location."
          link="/locations/seattle"
        />
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
        style={{ filter: "brightness(0.2)" }}
      />
    </motion.div>
  );
}

export default Locations;	