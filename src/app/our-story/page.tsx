"use client";

import React, { useState, useRef, useEffect } from "react";
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
  Heart,
  Leaf,
  Award,
  X,
  Camera,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function OurStoryPage() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const isTimelineVisible = useInView(timelineRef, { once: true, amount: 0.2 });
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [selectedChef, setSelectedChef] = useState<number | null>(null);

  // Gallery images
  const galleryImages = [
    {
      src: "/img/kitchenteam.jpg",
      caption: "Our passionate kitchen team in action",
    },
    {
      src: "/img/farmtofork.jpg",
      caption: "Farm visit to select the freshest ingredients",
    },
    {
      src: "/img/seasonalingredients.jpg",
      caption: "Seasonal preparations with local produce",
    },
    {
      src: "/img/zerowastecooking.jpg",
      caption: "Our zero-waste cooking practices",
    },
    {
      src: "/img/farmer.jpg",
      caption: "Building relationships with local farmers",
    },
    {
      src: "/img/foodplatter1.png",
      caption: "A sample of our culinary creations",
    },
  ];

  // Chef profiles
  const chefs = [
    {
      name: "Alex Rivera",
      title: "Executive Chef",
      bio: "With over 15 years of culinary experience, Chef Alex specializes in transforming traditional dishes into plant-based masterpieces without sacrificing flavor or texture.",
      image: "/img/kitchenteam.jpg",
      specialty: "Global fusion cuisine",
    },
    {
      name: "Jordan Lee",
      title: "Pastry Chef",
      bio: "Chef Jordan brings creativity and precision to our pastry kitchen, creating memorable desserts that showcase the natural sweetness of plant-based ingredients.",
      image: "/img/seasonalingredients.jpg",
      specialty: "Innovative plant-based desserts",
    },
    {
      name: "Taylor Morgan",
      title: "Chef de Cuisine",
      bio: "Chef Taylor's background in sustainable agriculture informs their approach to menu development, ensuring that we honor seasonal rhythms and local ecosystems.",
      image: "/img/farmtofork.jpg",
      specialty: "Farm-to-table cuisine",
    },
  ];

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

  // Keyboard navigation for photo gallery
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;

      if (e.key === "Escape") {
        setActivePhotoIndex(null);
      } else if (e.key === "ArrowRight") {
        setActivePhotoIndex((prev) =>
          prev !== null ? (prev + 1) % galleryImages.length : null
        );
      } else if (e.key === "ArrowLeft") {
        setActivePhotoIndex((prev) =>
          prev !== null
            ? (prev - 1 + galleryImages.length) % galleryImages.length
            : null
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhotoIndex, galleryImages.length]);

  return (
    <div className="min-h-screen">
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
              className="w-full md:w-1/2 relative h-[400px] group cursor-pointer"
              onClick={() => setActivePhotoIndex(1)}
            >
              <Image
                src="/img/farmtofork.jpg"
                alt="Farm to fork philosophy"
                fill
                className="object-cover rounded-lg shadow-md transition-transform group-hover:scale-[1.03] duration-300"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg"></div>
              <div className="absolute bottom-4 right-4 bg-primary text-text p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Camera size={20} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Interactive Timeline Section */}
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
                {/* Timeline dot */}
                <motion.div
                  className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-primary-darker z-10"
                  initial={{ scale: 0 }}
                  animate={isTimelineVisible ? { scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: index * 0.2 + 0.3 }}
                ></motion.div>

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

                  {/* Image */}
                  <div
                    className="md:w-1/2 group cursor-pointer"
                    onClick={() => setActivePhotoIndex(index)}
                  >
                    <div className="h-[250px] relative rounded-lg overflow-hidden shadow-md">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-110 duration-500"
                      />
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                      <div className="absolute bottom-4 right-4 bg-primary text-text p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Camera size={20} />
                      </div>
                    </div>
                  </div>
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
                className="bg-background-dim p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 },
                }}
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

      {/* Photo Gallery Grid */}
      <div className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-heading font-bold text-text mb-4 text-center"
          >
            Our Visual Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-text max-w-2xl mx-auto text-center mb-12"
          >
            Explore moments from our culinary journey
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                onClick={() => setActivePhotoIndex(index)}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src={image.src}
                  alt={image.caption}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-primary text-text p-3 rounded-full">
                    <Camera size={24} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Global Cuisine Map Section - Keep this untouched as requested */}
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

      {/* Photo Lightbox Modal */}
      <AnimatePresence>
        {activePhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90"
            onClick={() => setActivePhotoIndex(null)}
          >
            <motion.button
              className="absolute top-6 right-6 text-white bg-black/50 p-2 rounded-full hover:bg-black/80 z-50 transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation();
                setActivePhotoIndex(null);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
            </motion.button>

            <motion.button
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black/80 z-50 transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation();
                setActivePhotoIndex((prev) =>
                  prev !== null
                    ? (prev - 1 + galleryImages.length) % galleryImages.length
                    : null
                );
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={24} />
            </motion.button>

            <motion.button
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black/80 z-50 transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation();
                setActivePhotoIndex((prev) =>
                  prev !== null ? (prev + 1) % galleryImages.length : null
                );
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={24} />
            </motion.button>

            <div
              className="relative w-full max-w-5xl max-h-[80vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full"
              >
                <div className="relative w-full aspect-[16/9] md:aspect-[3/2]">
                  <Image
                    src={galleryImages[activePhotoIndex].src}
                    alt={galleryImages[activePhotoIndex].caption}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="bg-black/60 p-4 absolute bottom-0 left-0 right-0 text-white text-center">
                  <p>{galleryImages[activePhotoIndex].caption}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
                  <p className="text-text">
                    Chef {chefs[selectedChef].name.split(" ")[0]} brings
                    creativity and passion to every dish, constantly researching
                    and developing new recipes that showcase the versatility of
                    plant-based ingredients. When not in the kitchen, you'll
                    find them at local farmers markets searching for seasonal
                    inspiration.
                  </p>
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