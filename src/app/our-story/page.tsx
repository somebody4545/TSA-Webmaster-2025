"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import GlobalCuisineMap from "@/components/GlobalCuisineMap";
import {
  ChefHat,
  Clock,
  Users,
  Leaf,
  Award,
  X,
  ChevronRight,
  Sparkles,
  ChevronDown,
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

export default function OurStoryPage() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const isTimelineVisible = useInView(timelineRef, { once: true, amount: 0.2 });
  const [selectedChef, setSelectedChef] = useState<number | null>(null);

  // Add state for flipping value cards
  const [valueCardsFlipped, setValueCardsFlipped] = useState({
    sustainability: false,
    community: false,
    innovation: false,
  });

  // Chef profiles
  const chefs = [
    {
      name: "Zuri Brown",
      title: "Executive Chef",
      bio: "I learned cooking from my grandmother when I lived in New Orleans, where I learned that food is about stories and soul rather than just smell and taste. After a decade of working in traditional kitchens, I grew extremely irritated with how so many companies and restaurants grew disconnected with the roots of cultures they steal food from. Now I get to reinvent the classic dishes from cuisines all around the world while harnessing techniques I picked up through my travels.",
      image: "/img/chef-1.png",
      specialty: "Global fusion cuisine",
    },
    {
      name: "Jordan Lee",
      title: "Advanced Chef",
      bio: "Baking was my form of rebellions as my parents wanted me to be a doctor. After countless years of  culinary schools and hundreds of kitchen burns later, I found my home here. I am extremely passionate about the use of chemistry and the various other sciences that are present in the art of cooking. My philosophy? Don't overthink it. The more and more experimentation you do, the better it turns out! We have to explore to find out more, which is something that I will hold with me forever.",
      image: "/img/chef-2.jpg",
      specialty: "Innovative plant-based desserts",
    },
    {
      name: "Jabari Jefferson",
      title: "Chef de Cuisine",
      bio: "I've had my hands in the dirt and soil since I was a kid, as I worked in my parents farm. Before cooking professionally, I studied agriculture in Mexico, where I learned about the unique attributes of each individual type of plant. Through this, I learned about the power of patience and the importance of preserving the Earth. I am extremely grateful about the amount of time and opportunities I have had to explore global cuisines and have to implemented in my cooking. This is something that I am passionate about, and could not be any more happy to be a part of.",
      image: "/img/chef-3.jpg",
      specialty: "Farm-to-table cuisine",
    },
  ];

  const timelineItems = [
    {
      year: "2014",
      title: "Our Humble Beginnings",
      description:
        "We started as a small food truck serving plant-based dishes at local farmers' markets. This is where our mission first emerged of showcasing global cultures in a sustainable way, through a plant-based lens.",
      icon: <Clock size={24} />,
      image: "/img/foodtruck.png",
    },
    {
      year: "2016",
      title: "First Restaurant",
      description:
        "After growing in popularity at a rate we never expected, we opened our first brick-and-mortar restaurant focusing on seasonal ingredients. This is something we stood by ever since, a core part of our mission: showcasing global cultures.",
      icon: <ChefHat size={24} />,
      image: "/img/kitchenteam.jpg",
    },
    {
      year: "2018",
      title: "Community Growth",
      description:
        "We began hosting cooking classes and community events to share our passion for plant-based cuisine to spread our mission with the rest of the world.",
      icon: <Users size={24} />,
      image: "/img/zerowastecooking.jpg",
    },
    {
      year: "2020",
      title: "Sustainable Practices",
      description:
        "We implemented zero-waste policies and strengthened our partnerships with local organic farms while also developing an innovative delivery that minimizes emission from transportation.",
      icon: <Leaf size={24} />,
      image: "/img/sustainable.webp",
    },
    {
      year: "2023",
      title: "Global Recognition",
      description:
        "Our dedication to sustainability and culinary excellence earned us national awards and recognition for our hard work focused on changing the narrative around plant-based cuisine.",
      icon: <Award size={24} />,
      image: "/img/globe.webp",
    },
    {
      year: "2025",
      title: "Future Vision",
      description:
        "In the near future, we plan on opening new locations and launching a culinary institute focused on  plant-based cooking techniques to spread our mission with the rest of the world.",
      icon: <Sparkles size={24} />,
      image: "/img/farmtofork.jpg",
      isFuture: true,
    },
  ];

  // Function to toggle card flip state
  const toggleValueCard = (
    card: "sustainability" | "community" | "innovation"
  ) => {
    setValueCardsFlipped((prev) => ({
      ...prev,
      [card]: !prev[card],
    }));
  };

  return (
    <div className="min-h-screen">
      <style>{styles}</style>
      {/* Hero Section with Parallax */}
      <div
        ref={heroRef}
        className="relative w-full min-h-[600px] max-h-[90vh] h-[90vh] flex flex-col justify-center items-center px-16 z-10 overflow-hidden"
      >
        <ParallaxBackground />
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
      {/* Values Section with flip cards */}
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
                id: "sustainability",
                title: "Sustainability",
                description:
                  "We prioritize the health of the planet and the health of our community through the use of eco friendly materials, ingredients, and cooking practices. Through our partnership with local farms and environmentally friendly organizations, we aim to change the world.",
                icon: (
                  <Leaf
                    className="h-24 w-24 text-primary-darker"
                    strokeWidth={1.2}
                  />
                ),
                isFlipped: valueCardsFlipped.sustainability,
                toggle: () => toggleValueCard("sustainability"),
              },
              {
                id: "community",
                title: "Community",
                description:
                  "We build strong relationships with our community and farmers through our commitment to sustainability and our dedication to uplifting other members in the community focused on our mission. We hope to provide a platform to help promote green ideas.",
                icon: (
                  <Users
                    className="h-24 w-24 text-primary-darker"
                    strokeWidth={1.2}
                  />
                ),
                isFlipped: valueCardsFlipped.community,
                toggle: () => toggleValueCard("community"),
              },
              {
                id: "innovation",
                title: "Innovation",
                description:
                  "We explore innovative technologies and cooking techniques in order to create an immersive green experience for our customers. With our integration of innovative technology like drones, we hope to set an example for other resturants to follow.",
                icon: (
                  <ChefHat
                    className="h-24 w-24 text-primary-darker"
                    strokeWidth={1.2}
                  />
                ),
                isFlipped: valueCardsFlipped.innovation,
                toggle: () => toggleValueCard("innovation"),
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative h-[300px] perspective-1000"
              >
                <div
                  className={`w-full h-full transition-transform duration-500 transform-style-3d ${
                    value.isFlipped ? "rotate-y-180" : ""
                  }`}
                >
                  {/* Front of card */}
                  <div className="absolute w-full h-full backface-hidden bg-background-dim rounded-lg shadow-lg p-4 md:p-6 flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="h-16 w-16 md:h-24 md:w-24 mb-4 flex items-center justify-center bg-primary/10 rounded-full p-3">
                        {value.icon}
                      </div>
                      <h3 className="text-xl font-heading font-bold text-text mb-3 text-center">
                        {value.title}
                      </h3>
                      <div className="mt-3 w-16 h-1 bg-primary-darker rounded-full"></div>
                    </div>
                    <button
                      onClick={value.toggle}
                      className="absolute bottom-4 right-4 p-2 rounded-full bg-primary-darker text-white hover:bg-primary transition-colors"
                    >
                      <ChevronDown className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Back of card */}
                  <div className="absolute w-full h-full backface-hidden bg-primary-darker rounded-lg shadow-lg p-4 md:p-6 flex flex-col items-center justify-center rotate-y-180">
                    <p className="text-white text-center font-body text-base md:text-lg leading-tight md:leading-normal mx-1 font-medium mb-10">
                      {value.description}
                    </p>
                    <button
                      onClick={value.toggle}
                      className="absolute bottom-4 right-4 p-2 rounded-full bg-white text-primary-darker hover:bg-background transition-colors"
                    >
                      <ChevronDown className="w-6 h-6 rotate-180" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {/* Founder Story Section */}
      <div className="py-16 bg-background-light">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-heading font-bold text-text mb-12 text-center"
          >
            Our Founders Story
          </motion.h2>

          <div className="flex flex-col lg:flex-row items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="lg:w-2/5 w-full mb-8 lg:mb-0"
            >
              <div className="relative h-[300px] sm:h-[350px] md:h-[400px] w-full lg:w-[90%] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/img/founder.png"
                  alt="Founder of Green Plate"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                  className="object-cover object-center"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:w-3/5"
            >
              <h3 className="text-2xl font-heading font-bold text-primary-darker mb-4">
                Alex Rivera
              </h3>
              <p className="text-lg text-text mb-6">
                Maitso began with a passion for exploring and a respect for
                global traditions. I grew up with a curiosity about different
                cultures, finding my discipline and purpose when I joined the
                army, where I learned the value of teamwork, resilience, and
                attention to detail.
              </p>
              <p className="text-lg text-text mb-6">
                After completing my military service, I started on a journey
                that took me across continents. Visiting countries from Thailand
                to Italy, I immersed myself in local cultures, learning cooking
                techniques that were handed down through generations.
              </p>
              <p className="text-lg text-text mb-6">
                These experiences showed me the universal language of food and
                of its ability to bring people together across cultural
                boundaries. I came home with a vision to create a restaurant
                that honored these traditions while re-imagining them in a
                sustainable, plant-focused setting. That&apos;s how Maitso was
                born.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
      {/* Meet Our Chefs Section */}
      <div className="py-16 bg-background-dim">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-heading font-bold text-text mb-12 text-center"
          >
            Meet Our Culinary Team
          </motion.h2>

          <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
            {chefs.map((chef, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="w-full md:w-[calc(33.333%-2rem)] rounded-xl overflow-hidden shadow-lg bg-background cursor-pointer"
                onClick={() => setSelectedChef(index)}
                whileHover={{
                  y: -5,
                  boxShadow:
                    "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
              >
                <div className="relative h-64">
                  <Image
                    src={chef.image}
                    alt={chef.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-xl font-heading font-bold">
                      {chef.name}
                    </h3>
                    <p className="text-primary text-sm">{chef.title}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-primary-darker font-medium mb-2">
                    Specialty: {chef.specialty}
                  </p>
                  <p className="text-text line-clamp-3">{chef.bio}</p>
                  <button className="mt-4 text-primary-darker hover:underline flex items-center">
                    Read more <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {/* Global Cuisine Map Section - Keep this untouched as requested */}
      <GlobalCuisineMap />
      {/* Interactive Timeline Section - Moved to bottom */}
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
              restaurant committed to sustainable dining.
            </motion.p>
          </div>

          {/* Interactive Timeline */}
          <div className="max-w-4xl mx-auto relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-darker opacity-30 max-md:hidden"></div>

            {timelineItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isTimelineVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="mb-16 last:mb-0 relative"
              >
                <div
                  className={`flex md:items-center max-md:flex-col ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Text Content */}
                  <div
                    className={`md:w-1/2 ${
                      index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                    } max-md:mb-4`}
                  >
                    <div
                      className={`flex items-center mb-2 ${
                        index % 2 === 0 ? "md:justify-end" : "md:justify-start"
                      } max-md:justify-start`}
                    >
                      <div
                        className={`text-white rounded-full p-3 mr-3 ${
                          item.isFuture
                            ? "bg-primary animate-pulse"
                            : "bg-primary-darker"
                        }`}
                      >
                        {item.icon}
                      </div>
                      <h3
                        className={`text-2xl font-heading font-bold ${
                          item.isFuture ? "text-primary" : "text-primary-darker"
                        }`}
                      >
                        {item.year}
                        {item.isFuture && (
                          <span className="ml-2 text-sm font-normal italic">
                            (Coming Soon)
                          </span>
                        )}
                      </h3>
                    </div>
                    <h4 className="text-xl font-heading font-bold text-text mb-2">
                      {item.title}
                    </h4>
                    <p className="text-text">{item.description}</p>
                  </div>
                  {/* Image */}
                  <div className="md:w-1/2">
                    <div
                      className={`h-[250px] relative rounded-lg overflow-hidden shadow-md ${
                        item.isFuture ? "border-2 border-primary" : ""
                      }`}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className={`object-cover ${
                          item.isFuture ? "opacity-80" : ""
                        }`}
                      />
                      {item.isFuture && (
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/20"></div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {/* Chef Detail Modal */}
      <AnimatePresence>
        {selectedChef !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80"
            onClick={() => setSelectedChef(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl bg-background rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/80 z-10 transition-colors duration-200"
                onClick={() => setSelectedChef(null)}
              >
                <X size={24} />
              </button>

              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 relative h-64 md:h-auto">
                  <Image
                    src={chefs[selectedChef].image}
                    alt={chefs[selectedChef].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-6 md:p-8">
                  <h3 className="text-2xl font-heading font-bold text-text mb-1">
                    {chefs[selectedChef].name}
                  </h3>
                  <p className="text-primary-darker mb-4">
                    {chefs[selectedChef].title}
                  </p>
                  <div className="bg-primary-darker/10 px-4 py-3 rounded-lg mb-4">
                    <p className="font-medium">
                      Specialty: {chefs[selectedChef].specialty}
                    </p>
                  </div>
                  <p className="text-text mb-4">{chefs[selectedChef].bio}</p>
                  <p className="text-text"></p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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
        src="/img/kitchenteam.jpg"
        alt="Menu Background"
        layout="fill"
        objectFit="cover"
        style={{ filter: "brightness(0.4)" }}
        priority
      />
    </motion.div>
  );
}
