"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Marquee from "react-fast-marquee";
import { useRef } from "react";

function ParallaxBackground() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 600]); // Adjust for desired parallax depth

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

export default function Home() {
  return (
    <>
      {/* Background Section */}
      <div className="bg-secondary text-background text-xl relative min-h-[500px] max-h-[90vh] h-[90vh] flex flex-col justify-center items-center px-16 z-10 overflow-clip">
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
        // style={{ textShadow: "0 0 40px green" }}
        >
          Maitso
        </motion.h1>
        <motion.p
          className="text-center mt-4 italic text-xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 0.6, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          /ˈmaɪtsoʊ/ <br />
        </motion.p>
        <motion.p className="text-center italic pb-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 0.6, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          noun
        </motion.p>
        <motion.p className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          1. Green in Malagasy. <br /><span className="font-bold">2. A plant-based experience from every cuisine.</span>
        </motion.p>
      </div>

      {/* About Section */}
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
                src="/img/about.png"
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
                What We're About
              </motion.h2>
              <motion.p
                className="text-base"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                At Maitso, we believe in providing a unique plant-based dining experience that celebrates the diversity of global cuisines. Our mission is to offer delicious and sustainable food options that are good for you and the planet.
              </motion.p>
              <button className="btn btn-primary mt-4 rounded-full max-w-max shadow-md">
                Read More
              </button>
            </motion.div>
          </div>
        </div>
      </div>
      {/* Page Section */}
      <div className="bg-black lg:h-[44rem] w-full text-background p-16 z-20" style={{ boxShadow: "0 -10px 30px rgba(0, 0, 0, 0.22)" }}>
        <div className="flex flex-col-reverse lg:flex-row flex-1 h-full max-w-screen-2xl mx-auto gap-16">
          <div className='w-full lg:w-1/3 flex flex-col justify-center h-full max-lg:text-center'>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2
                className="text-3xl font-heading"
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                Our Menu
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                From entrees to desserts, we have a variety of plant-based options for you to enjoy. Come and explore our delicious offerings from a variety of cuisines.
              </motion.p>
              <button className="btn btn-primary mt-4 rounded-full max-w-32 shadow-lg">
                View Menu
              </button>
            </motion.div>
          </div>
          <div className="w-full lg:w-2/3 flex flex-col justify-center h-full p-32 bg-black">
            <motion.p
              className="text-3xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              insert a carousel or smth
            </motion.p>
          </div>
        </div>
      </div>

      {/* Gift Cards Section */}
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
                Whether it's Christmas, a birthday, or you're just feeling generous, our gift cards are perfect for any occasion. Give the gift of delicious plant-based food today!
              </motion.p>
              <button className="btn btn-primary text-black mt-4 rounded-full max-w-max shadow-lg">
                Purchase Gift Cards
              </button>
            </motion.div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col justify-center h-full">
            <Image
              src="/img/giftcards.png"
              alt="Gift Cards"
              className="mx-auto lg:mx-0"
              width={400}
              height={300}
            />
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-background outline-background-dim outline outline-4 lg:min-h-96 w-full text-text py-16 z-20" style={{ boxShadow: "0 -10px 30px rgba(0, 0, 0, 0.3)" }}>
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
          >
            Don't just take our word for it. News outlets and customers alike have been raving about us.
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
              <div className="flex space-x-8 ml-8 h-52 text-left">
                {[
                  {
                    name: "John Doe",
                    quote: "The best plant-based dining experience I've ever had!",
                    image: "https://randomuser.me/api/portraits/men/32.jpg",
                  },
                  {
                    name: "Jane Smith",
                    quote: "Absolutely delicious and sustainable food options.",
                    image: "https://randomuser.me/api/portraits/women/32.jpg",
                  },
                  {
                    name: "Alice Johnson",
                    quote: "A unique plant-based dining experience that celebrates global cuisines.",
                    image: "https://randomuser.me/api/portraits/women/31.jpg",
                  },
                  {
                    name: "Bob Brown",
                    quote: "I love the variety of plant-based options available.",
                    image: "https://randomuser.me/api/portraits/men/21.jpg",
                  },
                  {
                    name: "Emily Davis",
                    quote: "The gift cards are perfect for any occasion!",
                    image: "https://randomuser.me/api/portraits/women/2.jpg",
                  },
                ].map((testimonial, index) => (
                  <div key={index} className="card bg-primary shadow-lg rounded-xl h-full w-[350px] mx-auto transform transition-transform duration-300 ease-in-out hover:scale-95">
                    <div className="card-body flex items-center">
                      <img
                        src={testimonial.image}
                        alt={`${testimonial.name}'s picture`}
                        className="rounded-full w-16 h-16 mb-4"
                      />
                      <h2 className="card-title text-base font-semibold">{testimonial.name}</h2>
                      <p className="text-sm">{testimonial.quote}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Marquee>
          </motion.div>
        </div>
      </div>

      {/* Locations Section */}
      <div className="bg-black w-full text-background py-48 z-0 relative overflow-hidden" style={{ boxShadow: "0 -10px 30px rgba(0, 0, 0, 0.3)" }}>
        <motion.div
          className="absolute inset-0 z-20 min-w-[125vw] min-h-[125vh]"
          style={{ filter: "brightness(0.2)" }}
          animate={{
            x: ["-1%", "0%", "-1%", "-2%", "-1%"],
            y: ["-1%", "0%", "-1%", "-2%", "-1%"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/img/backgrounds/location.jpeg"
            alt="Main Background"
            layout="fill"
            objectFit="cover"
          />
        </motion.div>
        <div className="flex flex-col h-full w-full text-center items-center justify-center relative z-30">
          <motion.h2
            className="text-3xl font-heading"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Locations
          </motion.h2>
          <motion.p
            className="mx-16 text-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            We're all over the United States! Find a location near you and come visit us today.
          </motion.p>
          <motion.button
            className="btn btn-primary text-text mt-4 rounded-full max-w-max"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Find a Location
          </motion.button>
        </div>
      </div>
    </>
  );
}
