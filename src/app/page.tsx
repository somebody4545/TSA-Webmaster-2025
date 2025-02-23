  "use client";
  import Image from "next/image";
  import { motion } from "framer-motion";
  import Marquee from "react-fast-marquee";

  export default function Home() {
    return (
      <>
        <div className="bg-secondary text-black relative min-h-[500px] max-h-[80vh] h-[700px] flex flex-col justify-center items-center px-16 z-10 overflow-clip">
          <div className="-z-10 opacity-25">
            <Image
              src="/img/backgrounds/-8.png"
              alt="Left Leaf"
              className="absolute left-0 top-1/2 max-lg:-top-32 max-lg:rotate-[24deg] max-lg:left-0 transform -translate-y-1/2 max-lg:translate-y-0"
              width={300}
              height={300}
              style={{ filter: "brightness(0)" }}
            />
            <Image
              src="/img/backgrounds/-8.png"
              alt="Right Leaf"
              className="absolute right-0 top-1/2 max-lg:bottom-20 rotate-180 max-lg:rotate-[204deg] max-lg:-right-10 transform -translate-y-1/2 max-lg:translate-y-0"
              width={300}
              height={300}
              style={{ filter: "brightness(0)" }}
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
        <div className="bg-background lg:h-96 w-full text-text p-16 z-20" style={{ boxShadow: "0 -10px 30px rgba(0, 0, 0, 0.3)" }}>
          <div className="flex flex-col lg:flex-row-reverse flex-1 h-full max-w-screen-2xl mx-auto gap-16">
            <div className='w-full lg:w-full flex flex-col justify-center h-full text-center max-w-[66vw] mx-auto'>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.h2
                  className="text-3xl font-heading"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  What We're About
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  At Maitso, we believe in providing a unique plant-based dining experience that celebrates the diversity of global cuisines. Our mission is to offer delicious and sustainable food options that are good for you and the planet.
                </motion.p>
                <button className="btn btn-primary mt-4 rounded-full max-w-max">
                  Read More
                </button>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="bg-accent lg:h-96 w-full text-black p-16 z-20" style={{ boxShadow: "0 -10px 30px rgba(0, 0, 0, 0.3)" }}>
          <div className="flex flex-col lg:flex-row flex-1 h-full max-w-screen-2xl mx-auto gap-16">
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
        <div className="bg-primary lg:h-96 w-full overflow-clip text-black p-16 z-20" style={{ boxShadow: "0 -10px 30px rgba(0, 0, 0, 0.3)" }}>
          <div className="flex flex-col lg:flex-row-reverse flex-1 h-full max-w-screen-2xl mx-auto gap-16">
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
                <button className="btn btn-secondary text-black mt-4 rounded-full max-w-max">
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
        <div className="bg-background lg:min-h-96 w-full text-text py-16 z-20" style={{ boxShadow: "0 -10px 30px rgba(0, 0, 0, 0.3)" }}>
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
              className="mx-16"
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
              <Marquee className="flex mt-8 flex-1 py-8" gradient={false} speed={50}>
                <div className="flex space-x-8 md:w-screen md:w-screen-2xl min-w-screen h-24 mr-8">
                  <div className="w-1/5 h-full flex flex-col items-center justify-center max-w-[300px] md:max-w-full">
                    <img src="/img/news.png" alt="News 1" className="max-h-full max-w-full aspect-auto" style={{ filter: "brightness(0)" }} />
                  </div>
                  <div className="w-1/5 h-full flex flex-col items-center justify-center max-w-[300px] md:max-w-full">
                    <img src="/img/news1.png" alt="News 2" className="max-h-full max-w-full aspect-auto" style={{ filter: "brightness(0)" }} />
                  </div>
                  <div className="w-1/5 h-full flex flex-col items-center justify-center max-w-[300px] md:max-w-full">
                    <img src="/img/news5.png" alt="News 6" className="max-h-full max-w-full aspect-auto" style={{ filter: "brightness(0)" }} />
                  </div>
                  <div className="w-1/5 h-full flex flex-col items-center justify-center max-w-[300px] md:max-w-full">
                    <img src="/img/news2.png" alt="News 3" className="max-h-full max-w-full aspect-auto" style={{ filter: "brightness(0)" }} />
                  </div>
                  <div className="w-1/5 h-full flex flex-col items-center justify-center max-w-[300px] md:max-w-full">
                    <img src="/img/news3.png" alt="News 4" className="max-h-full max-w-full aspect-auto" style={{ filter: "brightness(0)" }} />
                  </div>
                  <div className="w-1/5 h-full flex flex-col items-center justify-center max-w-[300px] md:max-w-full">
                    <img src="/img/news4.png" alt="News 5" className="max-h-full max-w-full aspect-auto" style={{ filter: "brightness(0)" }} />
                  </div>
                </div>
              </Marquee>  </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Marquee className="flex mt-8 flex-1 py-8" gradient={false} speed={50} direction="right">
                <div className="flex space-x-8 min-w-screen mr-8 text-text text-left">
                  <div className="w-1/5 min-w-[200px]">
                    <div className="card bg-secondary shadow-xl h-full">
                      <div className="card-body">
                        <h2 className="card-title">John Doe</h2>
                        <p>"The best plant-based dining experience I've ever had!"</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/5 min-w-[200px]">
                    <div className="card bg-secondary shadow-xl h-full">
                      <div className="card-body">
                        <h2 className="card-title">Jane Smith</h2>
                        <p>"Absolutely delicious and sustainable food options."</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/5 min-w-[200px]">
                    <div className="card bg-secondary shadow-xl h-full">
                      <div className="card-body">
                        <h2 className="card-title">Alice Johnson</h2>
                        <p>"A unique plant-based dining experience that celebrates global cuisines."</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/5 min-w-[200px]">
                    <div className="card bg-secondary shadow-xl h-full">
                      <div className="card-body">
                        <h2 className="card-title">Bob Brown</h2>
                        <p>"I love the variety of plant-based options available."</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/5 min-w-[200px]">
                    <div className="card bg-secondary shadow-xl h-full">
                      <div className="card-body">
                        <h2 className="card-title">Emily Davis</h2>
                        <p>"The gift cards are perfect for any occasion!"</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Marquee>
            </motion.div>  </div>
        </div>
        <div className="bg-accent w-full text-text py-16 z-20" style={{ boxShadow: "0 -10px 30px rgba(0, 0, 0, 0.3)" }}>
          <div className="flex flex-col h-full w-full text-center items-center justify-center">
            <motion.h2
              className="text-3xl font-heading"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Locations
            </motion.h2>
            <motion.p
              className="mx-16"
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
