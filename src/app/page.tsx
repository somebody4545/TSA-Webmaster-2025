"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <div className="bg-secondary text-background relative min-h-[500px] max-h-[80vh] h-[700px] flex flex-col justify-center items-center px-16 z-10 overflow-clip">
        <div className="-z-10 opacity-25">
          <Image
            src="/img/backgrounds/-8.png"
            alt="Left Leaf"
            className="absolute left-0 top-1/2 max-lg:-top-32 max-lg:rotate-[24deg] max-lg:left-0 transform -translate-y-1/2 max-lg:translate-y-0"
            width={300}
            height={300}
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <Image
            src="/img/backgrounds/-8.png"
            alt="Right Leaf"
            className="absolute right-0 top-1/2 max-lg:bottom-20 rotate-180 max-lg:rotate-[204deg] max-lg:-right-10 transform -translate-y-1/2 max-lg:translate-y-0"
            width={300}
            height={300}
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </div>
        <motion.h1
          className="text-4xl font-heading"
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
          /ˈmaɪtsoʊ/
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
          1. Green in Malagasy. <br />2. A plant-based experience from every cuisine.
        </motion.p>
      </div>
      <div className="bg-accent lg:h-96 w-full text-background p-16 z-20" style={{ boxShadow: "0 -10px 30px rgba(0, 0, 0, 0.3)" }}>
        <div className="flex flex-col lg:flex-row flex-1 h-full max-w-screen-2xl mx-auto gap-16">
          <div className='w-full lg:w-1/3 flex flex-col justify-center h-full'>
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
              <button className="btn btn-primary mt-4 rounded-full max-w-32">
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
    </>
  );
}
