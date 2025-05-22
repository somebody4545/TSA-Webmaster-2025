"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { CircleFlag } from "react-circle-flags";

type LocationId = string | null;

type Location = {
  id: string;
  name: string;
  position: { left: string; top: string };
  cuisine: string;
  description: string;
  signatureDish: string;
  menuReference: string;
  countryCode: string;
};

const GlobalCuisineMap = () => {
  const [activePopup, setActivePopup] = useState<LocationId>(null);

  const locations: Location[] = [
    {
      id: "thailand",
      name: "Thailand",
      position: { left: "74%", top: "46%" },
      cuisine: "Thai Cuisine",
      description:
        "Our Thai-inspired dishes focus on fresh herbs, aromatic spices, and the perfect balance of sweet, sour, salty, and spicy flavors. We utilize traditional techniques like mortar and pestle grinding to release the full spectrum of flavors.",
      signatureDish:
        "Thai Green Curry with seasonal vegetables and coconut milk",
      menuReference: "Thai Green Curry",
      countryCode: "th",
    },
    {
      id: "mexico",
      name: "Mexico",
      position: { left: "17%", top: "42%" },
      cuisine: "Mexican Cuisine",
      description:
        "We honor Mexican culinary traditions by hand-pressing corn tortillas and incorporating indigenous ingredients like heirloom corn, chiles, beans, and squash. Our dishes celebrate the diverse regional cooking styles from Oaxaca to Yucatán.",
      signatureDish: "BBQ pulled jackfruit tacos with slaw and avocado crema",
      menuReference: "Jackfruit Tacos",
      countryCode: "mx",
    },
    {
      id: "italy",
      name: "Italy",
      position: { left: "49%", top: "37%" },
      cuisine: "Italian Cuisine",
      description:
        "Our Italian-inspired kitchen follows the principles of 'cucina povera' - simple food with high-quality ingredients. We make fresh pasta daily and follow traditional slow-cooking methods that have been perfected over generations.",
      signatureDish:
        "Creamy mushroom risotto with seasonal mushrooms and herbs",
      menuReference: "Mushroom Risotto",
      countryCode: "it",
    },
    {
      id: "greece",
      name: "Greece",
      position: { left: "52%", top: "37%" },
      cuisine: "Greek Cuisine",
      description:
        "Our Greek-inspired dishes celebrate the Mediterranean diet's emphasis on olive oil, fresh vegetables, and herbs. We honor traditional preparation methods that have been passed down through generations to create authentic flavors.",
      signatureDish: "Mezze platter with hummus, dolmas, and warm pita",
      menuReference: "Mediterranean Mezze Platter",
      countryCode: "gr",
    },
    {
      id: "peru",
      name: "Peru",
      position: { left: "25%", top: "60%" },
      cuisine: "Peruvian Cuisine",
      description:
        "Our Peruvian-inspired dishes showcase the country's incredible biodiversity and multicultural influences. We incorporate native quinoa, peppers, and root vegetables into vibrant, nutritious meals that highlight Peru's unique culinary heritage.",
      signatureDish:
        "Protein-packed quinoa with seasonal vegetables and citrus dressing",
      menuReference: "Quinoa Power Salad",
      countryCode: "pe",
    },
    {
      id: "india",
      name: "India",
      position: { left: "67%", top: "43%" },
      cuisine: "Indian Cuisine",
      description:
        "Our Indian culinary approach celebrates regional diversity, from the robust flavors of Punjab to the coconut-infused dishes of Kerala. We grind our spice blends in-house and use traditional cooking methods like slow clay pot cooking.",
      signatureDish:
        "Plant-based curry with aromatic spices and seasonal vegetables",
      menuReference: "Plant-Based Buddha Bowl",
      countryCode: "in",
    },
    {
      id: "japan",
      name: "Japan",
      position: { left: "83%", top: "35%" },
      cuisine: "Japanese Cuisine",
      description:
        "Our approach to Japanese cuisine focuses on seasonality, simplicity, and precision. We practice traditional fermentation techniques for miso and pickles, and our knife skills honor the Japanese dedication to craftsmanship.",
      signatureDish:
        "Delicate plant-based chocolate mousse with matcha influence",
      menuReference: "Chocolate Avocado Mousse",
      countryCode: "jp",
    },
  ];

  const activeLocation = activePopup
    ? locations.find((loc) => loc.id === activePopup)
    : null;

  return (
    <div className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading font-bold text-text text-center mb-12">
          Global Culinary Influences
        </h2>

        <div className="relative w-full max-w-4xl mx-auto">
          <div className="relative" style={{ zIndex: 1 }}>
            <img
              src="/img/worldmap.jpg"
              alt="World Map"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          {locations.map((location) => (
            <div
              key={location.id}
              className="absolute cursor-pointer"
              style={{
                left: location.position.left,
                top: location.position.top,
                zIndex: 10,
              }}
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActivePopup(location.id)}
              >
                <CircleFlag
                  countryCode={location.countryCode}
                  height="30"
                  width="30"
                  title={location.name}
                />
              </motion.div>
            </div>
          ))}

          <AnimatePresence>
            {activeLocation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 flex items-center justify-center p-4"
                style={{ backgroundColor: "rgba(0,0,0,0.7)", zIndex: 50 }}
                onClick={() => setActivePopup(null)}
              >
                <div
                  className="bg-background rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center">
                        <CircleFlag
                          countryCode={activeLocation.countryCode}
                          height="40"
                          width="40"
                          className="mr-3"
                        />
                        <h3 className="text-2xl font-heading font-bold text-text">
                          {activeLocation.name}
                        </h3>
                      </div>
                      <button
                        onClick={() => setActivePopup(null)}
                        className="p-1 rounded-full bg-background-dim hover:bg-background-dimmer transition-colors"
                      >
                        <X className="w-5 h-5 text-text" />
                      </button>
                    </div>

                    <h4 className="text-lg font-heading font-semibold text-text mb-2">
                      {activeLocation.cuisine}
                    </h4>

                    <p className="text-black mb-4">
                      {activeLocation.description}
                    </p>

                    <div className="bg-background-dim p-4 rounded-lg">
                      <span className="block text-sm font-medium text-text mb-1">
                        Signature Dish:
                      </span>
                      <p className="text-black italic">
                        {activeLocation.signatureDish}
                      </p>
                      <p className="mt-2 text-sm text-primary-darker font-semibold">
                        Try our{" "}
                        <span className="font-bold">
                          {activeLocation.menuReference}
                        </span>{" "}
                        from our menu!
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8 text-center text-black max-w-2xl mx-auto">
          <p>
            Click on a country flag to discover how we've incorporated authentic
            cooking techniques and flavors from culinary traditions around the
            world.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GlobalCuisineMap;
