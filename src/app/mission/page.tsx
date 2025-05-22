/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useAnimation,
  useMotionValue,
  animate,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import GlobalCuisineMap from "@/components/GlobalCuisineMap";
import dynamic from "next/dynamic";
import { PIE_DATA } from "@/components/TwoDPlate";
import Image from "next/image";

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
  ShoppingCart,
  Send,
  PackageCheck,
} from "lucide-react";

// Add styles for 3D flip effect
const styles = `
  .perspective-1000 {
    perspective: 1000px;
  }
  .transform-style-3d {
    transform-style: preserve-3d;
  }
  .backface-hidden {
    backface-visibility: hidden;
  }
  .rotate-y-180 {
    transform: rotateY(180deg);
  }
`;

const TwoDPlate = dynamic(() => import("@/components/TwoDPlate"), {
  ssr: false,
});
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
      } else {
        setCount(end); // Ensure it reaches the final number
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
                  <Image
                    src={partner.imageUrl}
                    alt={partner.alt}
                    width={450}
                    height={350}
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
  const [selected, setSelected] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const circleX = useMotionValue(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const controls = useAnimation();
  const [timelineCardFlipped, setTimelineCardFlipped] = useState<boolean[]>(
    new Array(3).fill(false)
  );
  const [animationComplete, setAnimationComplete] = useState(false);
  const [currentFlippingCard, setCurrentFlippingCard] = useState<number>(0);

  // Create refs for each card
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  const isContainerInView = useInView(containerRef, {
    once: true,
    amount: 0.5,
  });

  useEffect(() => {
    if (!isContainerInView || !containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;

    // Animate the drone using circleX instead of controls
    controls.start({
      x: containerWidth - 100,
      transition: {
        duration: 5,
        ease: "linear",
        onComplete: () => {
          setAnimationComplete(true);
        },
      },
    });
  }, [controls, isContainerInView]);
  // Track the drone position and set animation complete when it reaches the end
  useMotionValueEvent(circleX, "change", (latestX) => {
    if (!containerRef.current) return;

    const circle = circleRef.current;
    if (!circle) return;

    const containerWidth = containerRef.current.offsetWidth;

    // If drone is near the end position, set animation as complete
    if (latestX >= containerWidth - 120) {
      setAnimationComplete(true);
    }

    // Check each card's position during animation
    [card1Ref, card2Ref, card3Ref].forEach((cardRef, index) => {
      const card = cardRef.current;
      if (!card) return;

      // Get positions relative to the parent container
      const containerRect = containerRef.current!.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();

      // Calculate the card position relative to the container
      const cardPosX = cardRect.left - containerRect.left;

      // Normalize positions by using percentage of container width
      const normalizedDronePos = latestX / containerWidth;
      const normalizedCardPos = cardPosX / containerWidth;

      // Add a small offset to flip the card slightly before the drone reaches it
      const offsetPercent = 0.05;
      const adjustedCardPos = normalizedCardPos - offsetPercent;

      // Card should flip when drone passes directly over it (with offset)
      // Only flip if the current card is the same as the index (sequential flipping)
      if (
        normalizedDronePos >= adjustedCardPos &&
        !timelineCardFlipped[index] &&
        index === currentFlippingCard
      ) {
        setTimelineCardFlipped((prev) => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });

        // Set the next card as the current flipping card
        if (index < 2) {
          setTimeout(() => {
            setCurrentFlippingCard(index + 1);
          }, 500);
        }
      }
    });
  });

  // Handle manual flipping of timeline cards
  const handleTimelineCardFlip = (index: number) => {
    if (!animationComplete) return; // Only allow flipping after animation completes

    // Once animation is complete, allow flipping any card freely
    setTimelineCardFlipped((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div className="min-h-screen">
      <style>{styles}</style>
      <div className="relative w-full min-h-[600px] max-h-[90vh] h-[90vh] flex flex-col justify-center items-center px-16 z-10 overflow-clip">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        >
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            aria-hidden="true"
          ></div>
        </div>
        <ParallaxBackground />
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
              className="flex flex-col w-full md:w-11/12 max-w-6xl gap-6"
            >
              <div className="flex flex-col md:flex-row w-full gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-lg w-full md:w-3/5 flex flex-col justify-center"
                >
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-text leading-tight">
                    Ingredients from Local Farms
                  </h3>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="hidden md:flex md:w-2/5 items-center justify-center"
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
              </div>

              {/* Flash Cards Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="relative h-[300px] perspective-1000"
                >
                  <div
                    className={`w-full h-full transition-transform duration-500 transform-style-3d ${
                      bikeFlipped ? "rotate-y-180" : ""
                    }`}
                  >
                    {/* Front of card */}
                    <div className="absolute w-full h-full backface-hidden bg-background rounded-lg shadow-lg p-4 md:p-6 flex flex-col items-center justify-center">
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="h-16 w-16 md:h-24 md:w-24 mb-4 flex items-center justify-center bg-primary-darker/10 rounded-full p-3">
                          <Tractor
                            className="h-24 w-24 text-primary-darker mb-4"
                            strokeWidth={1.2}
                          />
                        </div>
                        <h4 className="text-2xl font-heading font-bold text-text text-center">
                          Local Partnerships
                        </h4>
                        <div className="mt-3 w-16 h-1 bg-primary-darker rounded-full"></div>
                      </div>
                      <button
                        onClick={() => setBikeFlipped(!bikeFlipped)}
                        className="absolute bottom-4 right-4 p-2 rounded-full bg-primary-darker text-white hover:bg-primary transition-colors"
                      >
                        <ChevronDown className="w-6 h-6" />
                      </button>
                    </div>
                    {/* Back of card */}
                    <div className="absolute w-full h-full backface-hidden bg-primary-darker rounded-lg shadow-lg p-4 md:p-6 flex flex-col items-center justify-center rotate-y-180">
                      <p className="text-white text-center font-body text-base md:text-lg leading-tight md:leading-normal mx-1 font-medium">
                        We partner with local farmers to ensure that our dishes
                        are made with the most fresh as well as flavorful
                        vegetables and fruits.
                      </p>
                      <button
                        onClick={() => setBikeFlipped(!bikeFlipped)}
                        className="absolute bottom-4 right-4 p-2 rounded-full bg-white text-primary-darker hover:bg-background transition-colors"
                      >
                        <ChevronDown className="w-6 h-6 rotate-180" />
                      </button>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="relative h-[300px] perspective-1000"
                >
                  <div
                    className={`w-full h-full transition-transform duration-500 transform-style-3d ${
                      robotFlipped ? "rotate-y-180" : ""
                    }`}
                  >
                    {/* Front of card */}
                    <div className="absolute w-full h-full backface-hidden bg-background rounded-lg shadow-lg p-4 md:p-6 flex flex-col items-center justify-center">
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="h-16 w-16 md:h-24 md:w-24 mb-4 flex items-center justify-center bg-primary-darker/10 rounded-full p-3">
                          <Citrus
                            className="h-24 w-24 text-primary-darker mb-4"
                            strokeWidth={1.2}
                          />
                        </div>
                        <h4 className="text-2xl font-heading font-bold text-text text-center">
                          Seasonal Produce
                        </h4>
                        <div className="mt-3 w-16 h-1 bg-primary-darker rounded-full"></div>
                      </div>
                      <button
                        onClick={() => setRobotFlipped(!robotFlipped)}
                        className="absolute bottom-4 right-4 p-2 rounded-full bg-primary-darker text-white hover:bg-primary transition-colors"
                      >
                        <ChevronDown className="w-6 h-6" />
                      </button>
                    </div>
                    {/* Back of card */}
                    <div className="absolute w-full h-full backface-hidden bg-primary-darker rounded-lg shadow-lg p-4 md:p-6 flex flex-col items-center justify-center rotate-y-180">
                      <p className="text-white text-center font-body text-base md:text-lg leading-tight md:leading-normal mx-1 font-medium">
                        We select and purchase seasonal produce to ensure peak
                        flavor and nutrition year round; this enables us to come
                        up with unique delicacies featuring global cultures.
                      </p>
                      <button
                        onClick={() => setRobotFlipped(!robotFlipped)}
                        className="absolute bottom-4 right-4 p-2 rounded-full bg-white text-primary-darker hover:bg-background transition-colors"
                      >
                        <ChevronDown className="w-6 h-6 rotate-180" />
                      </button>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="relative h-[300px] perspective-1000"
                >
                  <div
                    className={`w-full h-full transition-transform duration-500 transform-style-3d ${
                      freightFlipped ? "rotate-y-180" : ""
                    }`}
                  >
                    {/* Front of card */}
                    <div className="absolute w-full h-full backface-hidden bg-background rounded-lg shadow-lg p-4 md:p-6 flex flex-col items-center justify-center">
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="h-16 w-16 md:h-24 md:w-24 mb-4 flex items-center justify-center bg-primary-darker/10 rounded-full p-3">
                          <Users
                            className="h-24 w-24 text-primary-darker mb-4"
                            strokeWidth={1.2}
                          />
                        </div>
                        <h4 className="text-2xl font-heading font-bold text-text text-center">
                          Sustainable Practices
                        </h4>
                        <div className="mt-3 w-16 h-1 bg-primary-darker rounded-full"></div>
                      </div>
                      <button
                        onClick={() => setFreightFlipped(!freightFlipped)}
                        className="absolute bottom-4 right-4 p-2 rounded-full bg-primary-darker text-white hover:bg-primary transition-colors"
                      >
                        <ChevronDown className="w-6 h-6" />
                      </button>
                    </div>
                    {/* Back of card */}
                    <div className="absolute w-full h-full backface-hidden bg-primary-darker rounded-lg shadow-lg p-4 md:p-6 flex flex-col items-center justify-center rotate-y-180">
                      <p className="text-white text-center font-body text-base md:text-lg leading-tight md:leading-normal mx-1 font-medium">
                        We support environmentally friendly farming practices
                        and sustainable cooking to ensure that we preserve
                        nature and strengthen our bond with our local community.
                      </p>
                      <button
                        onClick={() => setFreightFlipped(!freightFlipped)}
                        className="absolute bottom-4 right-4 p-2 rounded-full bg-white text-primary-darker hover:bg-background transition-colors"
                      >
                        <ChevronDown className="w-6 h-6 rotate-180" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
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
          <div className="w-full h-[50vh] relative overflow-hidden">
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
                emissions, we're focusing on the...
              </motion.h1>
            </div>
          </div>

          <div className="flex flex-col gap-10 mt-16 mb-16 sustainable-transport-section">
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.2 }}
                className="text-center mb-10 sustainable-transport-heading"
              >
                <h3 className="text-3xl font-heading font-bold text-text">
                  Future of Delivery
                </h3>
                <p>Watch as our drone demonstrates the delivery process</p>
              </motion.div>

              <div className="w-full relative" ref={containerRef}>
                {/* Background Images */}
                <div className="absolute inset-0">
                  <img
                    src="/img/suburbs.png"
                    alt="Suburbs"
                    className="w-full h-full object-cover opacity-20"
                  />
                </div>

                {/* Moving vehicle */}
                <motion.div
                  className="absolute top-0 -translate-y-1/2 z-10 w-16 h-16 md:w-24 md:h-24 flex items-center justify-center"
                  initial={{ x: 0 }}
                  whileInView={{
                    x: containerRef.current
                      ? containerRef.current.offsetWidth - 100
                      : "90%",
                  }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    duration: 5,
                    ease: "linear",
                    repeat: 0,
                    delay: 0.5,
                  }}
                  style={{ x: circleX }}
                  ref={circleRef}
                >
                  <img
                    src="/img/drone.gif"
                    alt="Drone"
                    className="w-full h-full object-contain"
                  />
                </motion.div>

                {/* Checkpoint cards */}
                <div className="relative w-full flex flex-col md:flex-row justify-between px-4 mt-32 gap-8 md:gap-4">
                  {[
                    {
                      title: "Order Processing",
                      icon: (
                        <ShoppingCart className="h-8 w-8 md:h-12 md:w-12 text-primary-darker" />
                      ),
                      description:
                        "Our system quickly processes your order finds the optimal delivery route: our algorithms determine the most efficient path for the drone to reach you.",
                      image: "/img/bikedelivery.jpg",
                    },
                    {
                      title: "Drone Launch",
                      icon: (
                        <Send className="h-8 w-8 md:h-12 md:w-12 text-primary-darker" />
                      ),
                      description:
                        "Your package is carefully loaded onto one of our drones and after final safety checks, the drone takes off and navigates to deliver your food!",
                      image: "/img/robotdelivery.jpg",
                    },
                    {
                      title: "Delivery Complete",
                      icon: (
                        <PackageCheck className="h-8 w-8 md:h-12 md:w-12 text-primary-darker" />
                      ),
                      description:
                        "The drone arrives at your delivery spot, lowers your package, and confirms successful delivery. You will recieve a notification that your order has arrived.",
                      image: "/img/greenfreight.jpg",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      id={`card-${index}`}
                      className="w-full md:w-64 h-64 relative perspective-1000"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      ref={
                        index === 0
                          ? card1Ref
                          : index === 1
                          ? card2Ref
                          : card3Ref
                      }
                    >
                      <motion.div
                        className="w-full h-full transition-transform duration-500 transform-style-3d"
                        initial={{ rotateY: 0 }}
                        animate={{
                          rotateY: timelineCardFlipped[index] ? 180 : 0,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        {/* Front of card */}
                        <div className="absolute w-full h-full backface-hidden bg-background rounded-lg shadow-lg p-4 md:p-6 flex flex-col items-center justify-center">
                          <div className="flex flex-col items-center justify-center h-full">
                            <div className="h-16 w-16 md:h-24 md:w-24 mb-4 flex items-center justify-center bg-primary-darker/10 rounded-full p-3">
                              {item.icon}
                            </div>
                            <h4 className="text-lg md:text-xl font-heading font-bold text-text text-center">
                              {item.title}
                            </h4>
                            <div className="mt-3 w-16 h-1 bg-primary-darker rounded-full"></div>
                          </div>
                          <button
                            onClick={() => handleTimelineCardFlip(index)}
                            className={`absolute bottom-4 right-4 p-2 rounded-full transition-colors ${
                              animationComplete
                                ? "bg-primary-darker text-white hover:bg-primary"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                            disabled={!animationComplete}
                          >
                            <ChevronDown className="w-5 h-5" />
                          </button>
                        </div>
                        {/* Back of card */}
                        <div className="absolute w-full h-full backface-hidden bg-primary-darker rounded-lg shadow-lg p-4 md:p-6 flex flex-col items-center justify-center rotate-y-180">
                          <p className="text-white text-center font-body text-base md:text-lg leading-tight md:leading-normal mx-1 font-medium">
                            {item.description}
                          </p>
                          <button
                            onClick={() => handleTimelineCardFlip(index)}
                            className={`absolute bottom-4 right-4 p-2 rounded-full transition-colors ${
                              animationComplete
                                ? "bg-white text-primary-darker hover:bg-background"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                            disabled={!animationComplete}
                          >
                            <ChevronDown className="w-5 h-5 rotate-180" />
                          </button>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
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

      {/* Kitchen Section */}

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
              <div className="flex flex-col md:flex-row items-center justify-center max-w-full overflow-clip relative">
                {/* Info Box */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="w-full md:w-1/3 bg-background-dim rounded-lg shadow-md p-6 flex flex-col justify-center items-center md:items-start z-10"
                >
                  <h3 className="text-xl font-heading font-bold text-primary-darker mb-3">
                    {selected !== null ? PIE_DATA[selected].label : "Our Plate"}
                  </h3>
                  <p className="text-text">
                    {selected !== null
                      ? PIE_DATA[selected].description
                      : "Our plate represents a balanced approach to plant-based nutrition. Each section plays a vital role in providing essential nutrients for optimal health. Click on any section to learn more about its importance."}
                  </p>
                </motion.div>

                {/* Plate Visualization - 2D Plate */}
                <div className="w-full md:w-2/3 flex items-center justify-center min-h-[100px]">
                  <TwoDPlate
                    onSelect={setSelected}
                    selectedIndex={selected ?? undefined}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
        src="/img/farmtofork.jpg"
        alt="Menu Background"
        layout="fill"
        objectFit="cover"
        style={{ filter: "brightness(0.4)" }}
        priority
      />
    </motion.div>
  );
}
export default MissionPage;
