"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import GlobalCuisineMap from "@/components/GlobalCuisineMap";
import { ChefHat, Clock, Users, Heart, Leaf, Award } from "lucide-react";

export default function OurStoryPage() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const isTimelineVisible = useInView(timelineRef, { once: true, amount: 0.2 });

  const timelineItems = [
    {
      year: "2014",
      title: "Our Humble Beginnings",
      description:
        "We started as a small food truck serving plant-based dishes at local farmers' markets.",
      icon: <Clock size={24} />,
      image: "/img/foodplatter1.png",
    },
    {
      year: "2016",
      title: "First Restaurant",
      description:
        "After growing popularity, we opened our first brick-and-mortar restaurant focusing on seasonal ingredients.",
      icon: <ChefHat size={24} />,
      image: "/img/kitchenteam.jpg",
    },
    {
      year: "2018",
      title: "Community Growth",
      description:
        "We began hosting cooking classes and community events to share our passion for plant-based cuisine.",
      icon: <Users size={24} />,
      image: "/img/farmer.jpg",
    },
    {
      year: "2020",
      title: "Sustainable Practices",
      description:
        "We implemented zero-waste policies and strengthened our partnerships with local organic farms.",
      icon: <Leaf size={24} />,
      image: "/img/zerowastecooking.jpg",
    },
    {
      year: "2023",
      title: "Global Recognition",
      description:
        "Our dedication to sustainability and culinary excellence earned us national awards and recognition.",
      icon: <Award size={24} />,
      image: "/img/seasonalingredients.jpg",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full min-h-[600px] max-h-[90vh] h-[90vh] flex flex-col justify-center items-center px-16 z-10 overflow-clip">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/img/kitchenteam.jpg')",
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
            Our <span className="text-primary">Story</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white max-w-2xl"
          >
            From a single food truck to a celebrated culinary destination
          </motion.p>
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

      {/* Our Mission */}
      <div className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2"
            >
              <h2 className="text-3xl font-heading font-bold text-text mb-6">
                Our Mission
              </h2>
              <p className="text-text mb-4">
                At our core, we believe in the power of plant-based cuisine to
                nourish both people and the planet. Our journey began with a
                simple vision: to create delicious, innovative vegetarian dishes
                that would inspire people to embrace more plant-forward eating.
              </p>
              <p className="text-text mb-4">
                We source our ingredients directly from local organic farms,
                ensuring that every dish we serve is not only nutritious and
                flavorful but also environmentally sustainable. Through our
                cooking, we celebrate the rich diversity of global culinary
                traditions while honoring the seasons and our local food
                ecosystem.
              </p>
              <p className="text-text">
                Every meal we serve is a testament to our commitment to culinary
                excellence, environmental stewardship, and community well-being.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2 relative h-[400px]"
            >
              <Image
                src="/img/farmtofork.jpg"
                alt="Farm to fork philosophy"
                fill
                className="object-cover rounded-lg shadow-md"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="py-16 bg-background-dim" ref={timelineRef}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl font-heading font-bold text-text mb-4"
            >
              Our Journey
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-text max-w-2xl mx-auto"
            >
              The story of how we grew from a small food truck to a beloved
              restaurant committed to sustainable dining
            </motion.p>
          </div>

          <div className="max-w-4xl mx-auto">
            {timelineItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isTimelineVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`flex ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                } mb-12 last:mb-0 max-md:flex-col max-md:mb-16`}
              >
                <div className="w-full md:w-1/2 md:pr-8 md:pl-8 flex flex-col items-center md:items-start mb-4 md:mb-0">
                  <div className="flex items-center mb-2">
                    <div className="bg-primary-darker text-white rounded-full p-3 mr-3">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-primary-darker">
                      {item.year}
                    </h3>
                  </div>
                  <h4 className="text-xl font-heading font-bold text-text mb-2">
                    {item.title}
                  </h4>
                  <p className="text-text">{item.description}</p>
                </div>
                <div className="w-full md:w-1/2 h-[250px] relative rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl font-heading font-bold text-text mb-4"
            >
              Our Values
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-text max-w-2xl mx-auto"
            >
              The principles that guide everything we do
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Sustainability",
                description:
                  "We're committed to minimizing our environmental impact through zero-waste practices, energy efficiency, and sustainable sourcing.",
                icon: <Leaf className="h-10 w-10 text-primary-darker" />,
              },
              {
                title: "Community",
                description:
                  "We believe in building relationships with local farmers, producers, and customers to create a resilient local food system.",
                icon: <Users className="h-10 w-10 text-primary-darker" />,
              },
              {
                title: "Innovation",
                description:
                  "We continuously explore new ingredients, techniques, and ideas to create memorable plant-based dining experiences.",
                icon: <ChefHat className="h-10 w-10 text-primary-darker" />,
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-background-dim p-8 rounded-lg shadow-md"
              >
                <div className="bg-primary bg-opacity-20 rounded-full p-4 inline-block mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-heading font-bold text-text mb-3">
                  {value.title}
                </h3>
                <p className="text-text">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Global Cuisine Map Section */}
      <GlobalCuisineMap />

      {/* Team Quote Section */}
      <div className="py-16 bg-primary-darker text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <Heart className="h-12 w-12 text-white mx-auto" />
            </motion.div>
            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-xl md:text-2xl font-body italic mb-6"
            >
              &ldquo;Our team is united by a shared passion for creating
              delicious, plant-forward cuisine that nourishes our community and
              respects our planet. Every dish we serve is a reflection of our
              commitment to culinary excellence and environmental
              stewardship.&rdquo;
            </motion.blockquote>
            <p className="text-lg">— The Maitso Team</p>
          </div>
        </div>
      </div>
    </div>
  );
}
