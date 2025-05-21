"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import GlobalCuisineMap from "@/components/GlobalCuisineMap";

import {
  Citrus,
  Tractor,
  Quote as QuoteIcon,
  ChefHat,
  CookingPot,
  Users,
  Utensils,
  Leaf,
  Sparkles,
  Recycle,
  ChevronDown,
} from "lucide-react";

function CountUp({
  end,
  duration = 2,
  className = "",
}: {
  end: number;
  duration?: number;
  className?: string;
}) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;

    let startTime: number | undefined;
    let animationFrame: number | undefined;

    const updateCount = (timestamp: number): void => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / (duration * 1000), 1);

      setCount(Math.floor(percentage * end));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [end, duration, inView]);

  return (
    <span ref={nodeRef} className={className}>
      {count}
    </span>
  );
}

function PartnerCarousel() {
  const [index, setIndex] = useState(0);
  const partners = [1, 2, 3, 4].map((number) => ({
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
    <div className="relative w-full mx-auto h-[350px] py-8 max-lg:overflow-clip">
      <div className="relative flex items-center justify-center h-full">
        {partners.map((partner, i) => {
          const position =
            i === index
              ? "translate-x-0 scale-100 z-30 opacity-100"
              : i === (index + 1) % partners.length
              ? "translate-x-[60%] scale-90 z-20 opacity-30"
              : i === (index - 1 + partners.length) % partners.length
              ? "translate-x-[-60%] scale-90 z-20 opacity-30"
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
                    ? 0.3
                    : 0,
              }}
              transition={{ duration: 0.7 }}
              className={`absolute w-[85%] md:w-[70%] h-[300px] flex flex-col transition-all duration-500 ease-in-out ${position}`}
            >
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
            </motion.div>
          );
        })}
      </div>

      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between z-40 px-4 pointer-events-none">
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
      <div className="relative w-full min-h-[600px] max-h-[90vh] h-[90vh] flex flex-col justify-center items-center px-16 z-10 overflow-clip">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('img/farmtofork.jpg')",
            filter: "brightness(0.4)",
          }}
        >
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            aria-hidden="true"
          ></div>
        </div>
        <div className="relative flex flex-col items-center justify-center h-full text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4"
          >
            From <span className="text-primary">Farm</span> to{" "}
            <span className="text-primary">Fork</span>
          </motion.h1>
        </div>
        <motion.div
          className="absolute bottom-8 animate-bounce cursor-pointer text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: "smooth",
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

      <div className="py-12 px-4 bg-background">
        <div className="container mx-auto px-3 pt-8">
          <div className="flex justify-center mb-12">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col md:flex-row w-full md:w-11/12 max-w-6xl gap-6"
            >
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="p-6rounded-lg w-full md:w-2/5 md:h-80 flex flex-col justify-center"
              >
                <h3 className="text-3xl font-heading font-bold mb-3 text-text">
                  Local Farms
                </h3>
                <div className="space-y-3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <Tractor
                      className="h-12 w-12 text-primary-darker mt-0.5 mr-2 flex-shrink-0"
                      strokeWidth={1.2}
                    />
                    <p className="text-text font-body">
                      We partner with local farmers to ensure you get to enjoy
                      the freshest, most flavorful vegetables and fruits.
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <Citrus
                      className="h-12 w-12 text-primary-darker mt-0.5 mr-2 flex-shrink-0"
                      strokeWidth={1.2}
                    />
                    <p className="text-text font-body">
                      We prioritize seasonal produce to ensure peak flavor and
                      nutrition.
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <Users
                      className="h-12 w-12 text-primary-darker mt-0.5 mr-2 flex-shrink-0"
                      strokeWidth={1.2}
                    />
                    <p className="text-text font-body">
                      We support environmentally friendly farming practices that
                      strengthen our local food community.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="hidden md:flex md:w-3/5 items-center justify-center"
              >
                <div className="w-full h-80">
                  <img
                    src="/img/farmer.jpg"
                    alt="Farm image"
                    width="480"
                    height="270"
                    className="rounded-lg shadow-md object-cover w-full h-full"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
            className="flex justify-center mb-4"
          >
            <div className="w-full md:w-4/5 max-w-4xl text-center">
              <div className="text-3xl font-heading font-bold text-text">
                Our Partners
              </div>
              <p>(Fictional, Demo only)</p>
            </div>
          </motion.div>
          <div className="flex justify-center mb-12">
            <div className="w-full md:w-11/12 max-w-6xl">
              <PartnerCarousel />
            </div>
          </div>
          <div className="w-full h-[75vh] relative overflow-hidden">
            <div className="absolute inset-0"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.6 }}
                className="text-xl md:text-xl lg:text-2xl font-heading font-bold text-text mb-4 max-w-2xl sm:max-w-2xl text-center"
              >
                Since emissions from transportations account for{" "}
                <span className="text-primary-darker font-bold">
                  <CountUp end={28} duration={1.5} />
                </span>
                <span className="text-primary-darker">%</span> of greenhouse gas
                emissions we use...
              </motion.h1>
            </div>
          </div>

          <div className="flex flex-col gap-10 mt-16 mb-16">
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.2 }}
                className="text-center mb-10"
              >
                <h3 className="text-3xl font-heading font-bold text-text">
                  Sustainable Transportation
                </h3>
                <p>Hover or tap to see info on each of our strategies!</p>
              </motion.div>

              <div className="w-full">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.2,
                      },
                    },
                  }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
                >
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.6 },
                      },
                    }}
                    className="h-48 md:h-64 relative rounded-lg overflow-hidden cursor-pointer"
                    onMouseEnter={() => setBikeFlipped(true)}
                    onMouseLeave={() => setBikeFlipped(false)}
                  >
                    {/* Keep the existing card content */}
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
                  </motion.div>

                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.6 },
                      },
                    }}
                    className="h-48 md:h-64 relative rounded-lg overflow-hidden cursor-pointer"
                    onMouseEnter={() => setRobotFlipped(true)}
                    onMouseLeave={() => setRobotFlipped(false)}
                  >
                    {/* Existing content for robot delivery card */}
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
                  </motion.div>

                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.6 },
                      },
                    }}
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
                  </motion.div>
                </motion.div>
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
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            className="max-w-3xl mx-auto text-center relative"
          >
            {/* Animated quote marks */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-3 flex justify-center"
            >
              <QuoteIcon className="w-10 h-10 text-background-dim" />
            </motion.div>

            {/* Quote text with staggered words */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.03,
                    delayChildren: 0.4,
                  },
                },
              }}
              className="text-lg md:text-xl font-body font-bold italic text-background-dim"
            >
              {'"Nothing will benefit human health and increase chances for survival of life on Earth as much as the evolution to a vegetarian diet."'
                .split(" ")
                .map((word, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.3 },
                      },
                    }}
                    className="inline-block mx-0.5"
                  >
                    {word}
                  </motion.span>
                ))}

              {/* Attribution with fade-in */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 2 }}
                viewport={{ once: true }}
                className="text-sm text-background-dim mt-4"
              >
                — Albert Einstein
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <GlobalCuisineMap />

      {/* Kitchen Section */}
      <div className="py-16 bg-background">
        <div className="container mx-auto px-3">
          <div className="flex justify-center mb-12">
            <div className="w-full md:w-11/12 max-w-6xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.2 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-heading font-bold text-text mb-4">
                  Our Sustainable Kitchen
                </h2>
                <p className="text-text max-w-3xl mx-auto">
                  We believe that a sustainable restaurant begins in the
                  kitchen. Our approach combines traditional cooking techniques
                  with modern eco-conscious practices.
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.2,
                    },
                  },
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6 },
                    },
                  }}
                  className="bg-background rounded-lg shadow-md overflow-hidden"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src="/img/seasonalingredients.jpg"
                      alt="Seasonal Ingredients"
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <ChefHat className="w-6 h-6 text-primary-darker mr-2" />
                      <h3 className="text-xl font-heading font-bold text-text">
                        Seasonal Menu
                      </h3>
                    </div>
                    <p className="text-text">
                      Our menu changes with the seasons to showcase the freshest
                      local ingredients at their peak. This reduces food miles
                      and supports local agricultural biodiversity.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6 },
                    },
                  }}
                  className="bg-background rounded-lg shadow-md overflow-hidden"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src="/img/zerowastecooking.jpg"
                      alt="Zero Waste Cooking"
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <Recycle className="w-6 h-6 text-primary-darker mr-2" />
                      <h3 className="text-xl font-heading font-bold text-text">
                        Zero-Waste Cooking
                      </h3>
                    </div>
                    <p className="text-text">
                      We practice root-to-stem and nose-to-tail cooking
                      philosophies that utilize every part of our ingredients.
                      Vegetable scraps become flavorful stocks, and creative
                      preservation techniques extend the life of seasonal
                      bounty.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6 },
                    },
                  }}
                  className="bg-background rounded-lg shadow-md overflow-hidden"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src="/img/energyefficientkitchen.jpg"
                      alt="Energy Efficient Kitchen"
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <Sparkles className="w-6 h-6 text-primary-darker mr-2" />
                      <h3 className="text-xl font-heading font-bold text-text">
                        Energy Efficiency
                      </h3>
                    </div>
                    <p className="text-text">
                      Our kitchen is equipped with energy-efficient appliances
                      and smart systems that minimize our carbon footprint. We
                      use induction cooking and optimize our operations to
                      reduce energy and water usage.
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true, amount: 0.2 }}
                className="mt-16 flex flex-col md:flex-row items-center"
              >
                <div className="md:w-1/2 pr-0 md:pr-8">
                  <h3 className="text-2xl font-heading font-bold text-text mb-4">
                    The Heart of Our Restaurant
                  </h3>
                  <p className="text-text mb-6">
                    Our kitchen is where global culinary traditions meet
                    sustainable innovation. Led by our talented chefs, we honor
                    time-tested techniques while embracing new approaches that
                    reduce environmental impact without compromising on flavor.
                  </p>
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.2,
                          delayChildren: 0.3,
                        },
                      },
                    }}
                    className="space-y-4"
                  >
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: {
                          opacity: 1,
                          x: 0,
                          transition: { duration: 0.5 },
                        },
                      }}
                      className="flex items-start"
                    >
                      <CookingPot className="w-6 h-6 text-primary-darker mt-1 mr-3 flex-shrink-0" />
                      <p className="text-text">
                        Slow cooking methods that maximize flavor while
                        minimizing energy use
                      </p>
                    </motion.div>

                    <motion.div
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: {
                          opacity: 1,
                          x: 0,
                          transition: { duration: 0.5 },
                        },
                      }}
                      className="flex items-start"
                    >
                      <Utensils className="w-6 h-6 text-primary-darker mt-1 mr-3 flex-shrink-0" />
                      <p className="text-text">
                        Handcrafted preparations that preserve culinary heritage
                        and artisanal quality
                      </p>
                    </motion.div>

                    <motion.div
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: {
                          opacity: 1,
                          x: 0,
                          transition: { duration: 0.5 },
                        },
                      }}
                      className="flex items-start"
                    >
                      <Leaf className="w-6 h-6 text-primary-darker mt-1 mr-3 flex-shrink-0" />
                      <p className="text-text">
                        Plant-forward menu that celebrates vegetables as the
                        star of the plate
                      </p>
                    </motion.div>
                  </motion.div>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="md:w-1/2 h-80 md:h-auto mt-6 md:mt-0"
                >
                  <img
                    src="/img/kitchenteam.jpg"
                    alt="Our Kitchen Team"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-background mb-32">
        <div className="container mx-auto px-3">
          <div className="flex justify-center">
            <div className="w-full md:w-11/12 max-w-6xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-heading font-bold text-text mb-4">
                  The Plant-Based Plate
                </h2>
                <p className="text-text max-w-3xl mx-auto">
                  Our approach to balanced, nutritious meals that nourish both
                  your body and the planet.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.2 }}
                className="relative max-w-2xl mx-auto"
              >
                <motion.svg
                  initial={{ rotate: -90, opacity: 0 }}
                  whileInView={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.2 }}
                  viewBox="0 0 500 500"
                  className="w-full h-auto"
                >
                  <motion.circle
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    cx="250"
                    cy="250"
                    r="240"
                    fill="#F5F5F5"
                    stroke="#E0E0E0"
                    strokeWidth="4"
                  />

                  <motion.path
                    initial={{ scale: 0.7, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 0.85 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    viewport={{ once: true }}
                    d="M250 10 A240 240 0 0 1 490 250 L250 250 Z"
                    fill="#D35400"
                  />

                  <motion.path
                    initial={{ scale: 0.7, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 0.85 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    viewport={{ once: true }}
                    d="M490 250 A240 240 0 0 1 250 490 L250 250 Z"
                    fill="#F4D03F"
                  />

                  <motion.path
                    initial={{ scale: 0.7, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 0.85 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                    viewport={{ once: true }}
                    d="M250 490 A240 240 0 0 1 10 250 L250 250 Z"
                    fill="#27AE60"
                  />

                  <motion.path
                    initial={{ scale: 0.7, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 0.85 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                    viewport={{ once: true }}
                    d="M10 250 A240 240 0 0 1 250 10 L250 250 Z"
                    fill="#9B59B6"
                  />

                  <motion.circle
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 0.85 }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                    viewport={{ once: true }}
                    cx="250"
                    cy="250"
                    r="60"
                    fill="#3498DB"
                    stroke="#F5F5F5"
                    strokeWidth="3"
                  />

                  <motion.g
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          delayChildren: 1.1,
                          staggerChildren: 0.08,
                        },
                      },
                    }}
                  >
                    <motion.text
                      variants={{
                        hidden: { opacity: 0, y: -5 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      x="370"
                      y="150"
                      fontSize="18"
                      fontWeight="bold"
                      fill="#5D4037"
                      textAnchor="middle"
                    >
                      Legumes &amp;
                    </motion.text>

                    <motion.text
                      variants={{
                        hidden: { opacity: 0, y: -5 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      x="370"
                      y="175"
                      fontSize="18"
                      fontWeight="bold"
                      fill="#5D4037"
                      textAnchor="middle"
                    >
                      Plant Proteins
                    </motion.text>

                    <motion.text
                      variants={{
                        hidden: { opacity: 0, y: -5 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      x="370"
                      y="200"
                      fontSize="14"
                      fill="#5D4037"
                      textAnchor="middle"
                    >
                      25%
                    </motion.text>

                    {/* Whole Grains */}
                    <motion.text
                      variants={{
                        hidden: { opacity: 0, y: -5 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      x="370"
                      y="350"
                      fontSize="18"
                      fontWeight="bold"
                      fill="#5D4037"
                      textAnchor="middle"
                    >
                      Whole Grains
                    </motion.text>

                    <motion.text
                      variants={{
                        hidden: { opacity: 0, y: -5 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      x="370"
                      y="375"
                      fontSize="14"
                      fill="#5D4037"
                      textAnchor="middle"
                    >
                      25%
                    </motion.text>

                    {/* Vegetables */}
                    <motion.text
                      variants={{
                        hidden: { opacity: 0, y: -5 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      x="130"
                      y="350"
                      fontSize="18"
                      fontWeight="bold"
                      fill="#5D4037"
                      textAnchor="middle"
                    >
                      Vegetables
                    </motion.text>

                    <motion.text
                      variants={{
                        hidden: { opacity: 0, y: -5 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      x="130"
                      y="375"
                      fontSize="14"
                      fill="#5D4037"
                      textAnchor="middle"
                    >
                      25%
                    </motion.text>

                    {/* Fruits */}
                    <motion.text
                      variants={{
                        hidden: { opacity: 0, y: -5 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      x="130"
                      y="150"
                      fontSize="18"
                      fontWeight="bold"
                      fill="#5D4037"
                      textAnchor="middle"
                    >
                      Fruits
                    </motion.text>

                    <motion.text
                      variants={{
                        hidden: { opacity: 0, y: -5 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      x="130"
                      y="175"
                      fontSize="14"
                      fill="#5D4037"
                      textAnchor="middle"
                    >
                      25%
                    </motion.text>

                    {/* Healthy Fats - last element to appear */}
                    <motion.text
                      variants={{
                        hidden: { opacity: 0, y: -5 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      x="250"
                      y="255"
                      fontSize="14"
                      fontWeight="bold"
                      fill="#FFF"
                      textAnchor="middle"
                    >
                      Healthy Fats
                    </motion.text>
                  </motion.g>
                </motion.svg>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.15,
                    },
                  },
                }}
                className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5 },
                    },
                  }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow:
                      "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="bg-background rounded-lg shadow-md p-6 cursor-pointer"
                >
                  <h3 className="text-xl font-heading font-bold text-text mb-3 flex items-center">
                    <div className="w-4 h-4 rounded-full bg-[#D35400] mr-2"></div>
                    Legumes &amp; Plant Proteins
                  </h3>
                  <p className="text-text">
                    Includes beans, lentils, tofu, tempeh, and other plant-based
                    proteins. These provide essential amino acids, iron, and
                    zinc that would typically come from animal sources.
                  </p>
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5 },
                    },
                  }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow:
                      "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="bg-background rounded-lg shadow-md p-6 cursor-pointer"
                >
                  <h3 className="text-xl font-heading font-bold text-text mb-3 flex items-center">
                    <div className="w-4 h-4 rounded-full bg-[#F4D03F] mr-2"></div>
                    Whole Grains
                  </h3>
                  <p className="text-text">
                    Brown rice, quinoa, oats, and whole wheat provide complex
                    carbohydrates for sustained energy, plus important B
                    vitamins and fiber for digestive health.
                  </p>
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5 },
                    },
                  }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow:
                      "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="bg-background rounded-lg shadow-md p-6 cursor-pointer"
                >
                  <h3 className="text-xl font-heading font-bold text-text mb-3 flex items-center">
                    <div className="w-4 h-4 rounded-full bg-[#27AE60] mr-2"></div>
                    Vegetables
                  </h3>
                  <p className="text-text">
                    The largest portion of our plate includes diverse vegetables
                    for vitamins, minerals, antioxidants, and phytonutrients. We
                    emphasize variety in colors and types.
                  </p>
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5 },
                    },
                  }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow:
                      "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="bg-background rounded-lg shadow-md p-6 cursor-pointer"
                >
                  <h3 className="text-xl font-heading font-bold text-text mb-3 flex items-center">
                    <div className="w-4 h-4 rounded-full bg-[#9B59B6] mr-2"></div>
                    Fruits
                  </h3>
                  <p className="text-text">
                    Rich in vitamins, minerals, and natural sweetness, fruits
                    provide essential nutrients and antioxidants while
                    satisfying cravings for sweeter flavors.
                  </p>
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5 },
                    },
                  }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow:
                      "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="bg-background rounded-lg shadow-md p-6 cursor-pointer"
                >
                  <h3 className="text-xl font-heading font-bold text-text mb-3 flex items-center">
                    <div className="w-4 h-4 rounded-full bg-[#3498DB] mr-2"></div>
                    Healthy Fats
                  </h3>
                  <p className="text-text">
                    Avocados, nuts, seeds, and olive oil provide essential fatty
                    acids, help with nutrient absorption, and add richness and
                    satisfaction to meals.
                  </p>
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5 },
                    },
                  }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow:
                      "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="bg-background rounded-lg shadow-md p-6 cursor-pointer"
                >
                  <h3 className="text-xl font-heading font-bold text-text mb-3 flex items-center">
                    <div className="w-4 h-4 rounded-full bg-[#3498DB] opacity-50 mr-2"></div>
                    Water &amp; Hydration
                  </h3>
                  <p className="text-text">
                    While not shown on the plate, staying hydrated with water,
                    herbal teas, and consuming water-rich fruits and vegetables
                    is essential for optimal health.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionPage;
