"use client";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";

interface SustainabilityGraphicProps {
  carbonFootprint: string;
  waterUsage: string;
  energyUsed: string;
  sourcing: string;
  transport: string;
  ingredients: string;
  preparation: string;
}
function SustainabilityGraphic({
  sustainability,
}: {
  sustainability: SustainabilityGraphicProps;
}) {
  const links = ["sourcing", "transport", "ingredients", "preparation"];
  const [openStates, setOpenStates] = useState<boolean[]>(
    Array(links.length).fill(false)
  );
  const toggleInfo = (index: number) => {
    setOpenStates((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };
  return (
    <>
      <div className="flex flex-col lg:flex-row lg:justify-between w-full mt-16">
        <h2 className="text-2xl font-heading">Sustainability & Energy Use</h2>
        <motion.div
          className="bg-white border-2 border-primary-darkest shadow-lg rounded-xl px-4 py-1 text-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h2 className="font-heading">Impact Estimate:</h2>
          <span className="text-text">Carbon Footprint:</span>{" "}
          {sustainability.carbonFootprint}
          <br />
          <span className="text-text">Water Usage:</span>{" "}
          {sustainability.waterUsage}
          <br />
          <span className="text-text">Energy Usage:</span>{" "}
          {sustainability.energyUsed}
        </motion.div>
      </div>
      <div className="w-11/12 flex flex-row flex-wrap gap-4 mx-auto mt-10">
        {links.map((link, index) => (
          <React.Fragment key={link}>
            <div className="relative flex flex-col items-center gap-4 w-full lg:flex-1">
              <motion.div
                className="bg-white relative overflow-hidden aspect-square border-primary-darkest hover:cursor-pointer border-2 rounded-xl shadow-lg p-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => {
                  toggleInfo(index);
                }}
                onMouseLeave={() => {
                  toggleInfo(index);
                }}
              >
                <Image
                  width={500}
                  height={500}
                  src={`/img/menu/sustainability-graphic/${link}.svg`}
                  alt={"Graphic of " + link}
                  className={`w-full h-full transition-all duration-300 ${openStates[index] ? "blur-sm" : ""}`}
                  key={link}
                />
                <motion.div
                  className="text-lg lg:top-0 top-1/2 absolute w-full h-full bg-opacity-75 bg-white left-0 p-2 "
                  initial={{ y: "100%" }}
                  animate={{ y: openStates[index] ? 0 : "100%" }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-heading text-center">
                    {link.charAt(0).toUpperCase() + link.slice(1)}
                  </h2>
                  <p>
                    {sustainability[link as keyof SustainabilityGraphicProps]
                      .split("\n")
                      .map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                  </p>
                </motion.div>
              </motion.div>
            </div>
            {index != links.length - 1 ? (
              <ChevronRight
                key={"chevron" + index}
                className="self-center text-transparent size-11 lg:text-primary-darkest"
              />
            ) : null}
          </React.Fragment>
        ))}
      </div>
    </>
  );
}

export default SustainabilityGraphic;
