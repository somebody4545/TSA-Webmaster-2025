"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Marquee from "react-fast-marquee";
import { useRef, useState } from "react";
import Link from "next/link";
import menuData from "../../data/menu-data.json";
import MenuCarousel from "@/components/Carousel";

const TESTIMONIALS = [
  {
    name: "John Doe",
    quote: "The best plant-based dining experience I've ever had!",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    location: "New York"
  },
  {
    name: "Jane Smith",
    quote: "Absolutely delicious and sustainable food options.",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    rating: 5,
    location: "Los Angeles"
  },
  {
    name: "Alice Johnson",
    quote: "A unique plant-based dining experience that celebrates global cuisines.",
    image: "https://randomuser.me/api/portraits/women/31.jpg",
    rating: 4,
    location: "Chicago"
  },
  {
    name: "Bob Brown",
    quote: "I love the variety of plant-based options available.",
    image: "https://randomuser.me/api/portraits/men/21.jpg",
    rating: 5,
    location: "Miami"
  },
  {
    name: "Emily Davis",
    quote: "The gift cards are perfect for any occasion!",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    rating: 5,
    location: "Austin",
  },
];

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
        src="/img/backgrounds/bg.jpg"
        alt="Main Background"
        layout="fill"
        objectFit="cover"
        style={{ filter: "brightness(0.2)" }}
      />
    </motion.div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: typeof TESTIMONIALS[0] }) {
  return (
    <div className="card w-[350px] mx-auto transform transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-y-2">
      <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl shadow-lg hover:shadow-xl overflow-hidden h-full">
        <div className="card-body p-6 flex flex-col">
          <div className="flex items-center mb-4">
            <div className="relative">
              <img
                src={testimonial.image}
                alt={`${testimonial.name}'s picture`}
                className="rounded-full w-16 h-16 border-2 border-background object-cover"
              />
              <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="green" stroke="none">
                  <path d="M9 16.2l-3.5-3.5c-.39-.39-1.01-.39-1.4 0-.39.39-.39 1.01 0 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7c.39-.39.39-1.01 0-1.4-.39-.39-1.01-.39-1.4 0L9 16.2z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <h2 className="card-title text-lg font-bold">{testimonial.name}</h2>
              <div className="text-sm opacity-75">{testimonial.location}</div>
            </div>
          </div>
          <div className="flex items-center mb-3">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill={i < testimonial.rating ? "black" : "none"}
                stroke="black"
                strokeWidth="1.5"
                className="mr-1"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <div className="relative">
            <p className="text-base italic font-medium leading-snug">{testimonial.quote}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div className="bg-black text-background text-xl relative min-h-[675px] max-h-[90vh] h-[90vh] flex flex-col justify-center items-center px-16 z-10 overflow-clip">
      <ParallaxBackground />
      <motion.div
        className="-z-10 opacity-25"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src="/img/backgrounds/-8.png"
          alt="Left Leaf"
          className="absolute left-0 top-1/2 max-lg:-top-32 max-lg:rotate-[24deg] max-lg:left-0 transform -translate-y-1/2 max-lg:translate-y-0 transition-all duration-500"
          width={300}
          height={300}
          style={{ filter: "brightness(0) invert(1)" }}
        />
        <Image
          src="/img/backgrounds/-8.png"
          alt="Right Leaf"
          className="absolute right-0 lg:top-1/2 max-lg:-bottom-32 rotate-180 max-lg:rotate-[204deg] max-lg:-right-10 transform -translate-y-1/2 max-lg:translate-y-0 transition-all duration-500"
          width={300}
          height={300}
          style={{ filter: "brightness(0) invert(1)" }}
        />
      </motion.div>
      <motion.h1
        className="text-5xl font-heading text-primary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Maitso
      </motion.h1>
      <motion.p
        className="text-center relative -top-4 text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Dine-in & Carry-out<br />
      </motion.p>
      <motion.p
        className="text-center mt-4 italic text-xl"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 0.6, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        /ˈmaɪtsoʊ/ <br />
      </motion.p>
      <motion.p
        className="text-center italic pb-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 0.6, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        adj/noun
      </motion.p>
      <motion.p
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        1. Green in Malagasy. <br /><span className="font-bold">2. A plant-based experience from every cuisine.</span>
      </motion.p>

      {/* Reservation CTA Button */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <Link href="/reserve">
          <button className="btn btn-primary btn-shine rounded-full px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform">
            Reserve a Table
          </button>
        </Link>
      </motion.div>

      <motion.div
        className="absolute bottom-8 animate-bounce cursor-pointer"
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
  );
}

function AboutSection() {
  return (
    <div
      className="bg-background outline-background-dim outline outline-4 lg:h-[700px] w-full text-text p-16 z-20"
      style={{ boxShadow: "0 -10px 30px rgba(0, 0, 0, 0.3)" }}
    >
      <div className="flex flex-col lg:flex-row flex-2 h-full max-w-screen-2xl mx-auto gap-16">
        <div className="w-full max-lg:max-w-[300px] mx-auto lg:w-1/3 flex justify-center items-center h-full aspect-square">
          <motion.div
            className="relative aspect-square"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
          >
            <motion.img
              src="/img/hero_image.png"
              alt="About Us"
              className="object-cover w-full h-full rounded-full"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center h-full text-center lg:text-left mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              className="text-3xl font-heading mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              What We&apos;re About
            </motion.h2>
            <motion.p
              className="text-base"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              At Maitso, we believe in providing a unique plant-based dining experience that celebrates the diversity of global cuisines. Our mission is to offer delicious and sustainable food options that are good for you and the planet.
            </motion.p>
            <Link href="/mission">
              <button className="btn btn-primary btn-shine mt-4 rounded-full max-w-max shadow-md">
                Read More
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function MenuSection() {
  console.log("Menu data length:", menuData.length);
  console.log("First item in menu data:", menuData[0]?.title);

  const menuItems = menuData

  return (
    <div className="bg-black lg:min-h-[44rem] w-full text-background sm:p-8 md:p-12 p-16 z-20" style={{ boxShadow: "0 -10px 30px rgba(0, 0, 0, 0.22)" }}>
      <div className="flex flex-col h-full max-w-screen-2xl mx-auto">
        {/* Text and button section - centered */}
        <div className="w-full flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <motion.h2
              className="text-2xl md:text-3xl font-heading mb-3"
              initial={{ opacity: 0, y: -15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Our Menu
            </motion.h2>
            <motion.p
              className="mb-6 px-4"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              From entrees to desserts, we have a variety of plant-based options for you to enjoy.
              Come and explore our delicious offerings from a variety of cuisines.
            </motion.p>
            <Link href="/menu">
              <button className="btn btn-primary btn-shine rounded-full shadow-lg">
                View Full Menu
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Carousel section - full width */}
        <div className="w-full text-center lg:text-left flex justify-center">
          <motion.div
            className="w-full max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <MenuCarousel items={menuItems} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function GiftCardSection() {
  return (
    <div className="bg-background outline-background-dim outline outline-4 lg:h-[36rem] w-full overflow-clip text-black p-16 z-20" style={{ boxShadow: "0 -10px 30px rgba(0, 0, 0, 0.3)" }}>
      <div className="flex flex-col-reverse lg:flex-row-reverse flex-1 h-full max-w-screen-2xl mx-auto gap-16">
        <div className='w-full lg:w-1/2 flex flex-col justify-center h-full text-center lg:text-left'>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              className="text-3xl font-heading"
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Gift Cards
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Whether it&apos;s Christmas, a birthday, or you&apos;re just feeling generous, our gift cards are perfect for any occasion. Give the gift of delicious plant-based food today!
            </motion.p>
            <a href="/gifts">
              <button className="btn btn-primary btn-shine text-black mt-4 rounded-full max-w-max shadow-lg">
                Purchase Gift Cards
              </button>
            </a>
          </motion.div>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center h-full">
          <motion.div
            className="w-full h-full flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/img/giftcards.png"
              alt="Gift Cards"
              width={1000}
              height={1000}
              className="rounded-xl shadow-xl object-cover w-full h-full"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  return (
    <div className="bg-background outline-background-dim lg:min-h-96 w-full text-text py-16 z-20" style={{ boxShadow: "0 -10px 30px rgba(0, 0, 0, 0.3)" }}>
      <div className="flex flex-col h-full w-full text-center">
        <motion.h2
          className="text-3xl font-heading"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Testimonials
        </motion.h2>
        <motion.p
          className="mx-16 text-base"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >(Note, this section is for competition display only and is not factual)<br /><br />
          Don&apos;t just take our word for it. News outlets and customers alike have been raving about us.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Marquee className="flex mt-8 flex-1 py-8" gradient={false} speed={50} autoFill={true}>
            <img src="/img/news.png" alt="News 1" className="h-16 px-8" style={{ filter: "brightness(0)" }} />
            <img src="/img/news1.png" alt="News 2" className="h-16 px-8" style={{ filter: "brightness(0)" }} />
            <img src="/img/news5.png" alt="News 6" className="h-16 px-8" style={{ filter: "brightness(0)" }} />
            <img src="/img/news2.png" alt="News 3" className="h-16 px-8" style={{ filter: "brightness(0)" }} />
            <img src="/img/news3.png" alt="News 4" className="h-16 px-8" style={{ filter: "brightness(0)" }} />
            <img src="/img/news4.png" alt="News 5" className="h-16 px-8" style={{ filter: "brightness(0)" }} />

          </Marquee>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Marquee className="mt-8 py-8" gradient={false} speed={60} direction="right" autoFill={true}>
            <div className="flex space-x-8 ml-8 h-64 text-left">
              {TESTIMONIALS.map((testimonial, index) => (
                <TestimonialCard key={index} testimonial={testimonial} />
              ))}
            </div>
          </Marquee>
        </motion.div>
      </div>
    </div>
  );
}

function GallerySection() {
  const images = [
    {
      src: "/img/gallery/gallery1.png",
      alt: "Plant-based dish 1",
      className: "col-span-2 row-span-1 md:col-span-2 lg:col-span-2"
    },
    {
      src: "/img/gallery/gallery2.png",
      alt: "Plant-based dish 2",
      className: "col-span-1 row-span-1 md:col-span-1 lg:col-span-1"
    },
    {
      src: "/img/gallery/gallery3.png",
      alt: "Plant-based dish 3",
      className: "col-span-2 row-span-1 md:col-span-2 lg:col-span-2"
    },
    {
      src: "/img/gallery/gallery4.png",
      alt: "Plant-based dish 4",
      className: "col-span-1 row-span-1 md:col-span-1 lg:col-span-1"
    },
    {
      src: "/img/gallery/gallery7.png",
      alt: "Plant-based dish 5",
      className: "col-span-2 row-span-1 md:col-span-2 lg:col-span-2"
    },
    {
      src: "/img/gallery/gallery6.png",
      alt: "Plant-based dish 6",
      className: "col-span-1 row-span-1 md:col-span-1 lg:col-span-1"
    },
    {
      src: "/img/gallery/gallery5.png",
      alt: "Plant-based dish 7",
      className: "col-span-1 row-span-1 md:col-span-1 lg:col-span-1"
    },
    {
      src: "/img/gallery/gallery10.png",
      alt: "Plant-based dish 8",
      className: "col-span-1 row-span-1 md:col-span-1 lg:col-span-1"
    },
    {
      src: "/img/gallery/gallery9.jpg",
      alt: "Plant-based dish 9",
      className: "col-span-1 row-span-1 md:col-span-1 lg:col-span-1"
    },
    {
      src: "/img/gallery/gallery8.png",
      alt: "Plant-based dish 10",
      className: "col-span-2 row-span-1 md:col-span-2 lg:col-span-2"
    },
    {
      src: "/img/gallery/gallery11.jpg",
      alt: "Plant-based dish 11",
      className: "col-span-1 row-span-1 md:col-span-1 lg:col-span-1"
    },
  ];

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
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12
      }
    }
  };

  return (
    <section className="w-full bg-black py-16 px-4 md:px-16" style={{ boxShadow: "0 -10px 30px rgba(0,0,0,0.3)" }}>
      <motion.h2
        className="text-4xl font-heading text-white mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        Gallery
      </motion.h2>
      <motion.div
        className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            className={`overflow-hidden rounded-2xl shadow-lg bg-[#181818] flex items-center justify-center h-[150px] sm:h-[180px] md:h-[200px] ${img.className}`}
            variants={itemVariants}
            custom={idx}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={400}
              height={400}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
              style={{ fontFamily: 'Inter, sans-serif' }}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <MenuSection />
      <GiftCardSection />
      <TestimonialsSection />
      <GallerySection />
    </>
  );
}
