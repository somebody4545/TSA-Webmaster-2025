"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MenuCard from '@/components/menu_card';

const menuCategories = ["Vegan", "Gluten Free"];

const sampleMenuItems = [
  {
    title: "General Tso's Tofu",
    subtitle: "with Quinoa & Broccoli",
    price: "$22.99",
    calories: "640",
    imageUrl: "/img/menu/general-tso.jpg",
    tags: ["Vegan", "High Protein", "Spicy"],
    category: "Dinner"
  },
  // Add more menu items as needed
];

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="min-h-screen bg-background">
      {/* Promo Banner 
      <div className="w-full bg-[#f3ffa1] py-2 text-center">
        <p className="text-sm">
          Maybe somethign here just going off purple carrot?{' '}
        </p>
      </div> */}

      {/* Hero Section */}
      <div className="relative bg-[#e6f7f7] px-6 py-6 flex items-center justify-center" 
      style={{ backgroundImage: 'url(/img/menu_img.png)', backgroundSize: 'cover', backgroundPosition: 'center', height: '90vh' }}>
        <div className="w-full md:w-1/2 space-y-5 text-left -ml-4">
          <div className="bg-white bg-opacity-0 p-6 rounded-lg">
            <motion.h1 
              className="text-5xl md:text-6xl font-sans tracking-tight text-black"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Fresh, Vegetarian,<br />and Perfect!
            </motion.h1>
            <motion.p 
              className="text-xl text-black-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Easy recipes and ingredients delivered right to your door. Make meals you'll love.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Your existing Category Filter */}
      <div className="flex justify-center gap-4 py-8">
        {menuCategories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full transition-all ${
              activeCategory === category 
                ? 'bg-accent text-text' 
                : 'bg-secondary hover:bg-accent/80'
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Your existing Menu Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleMenuItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <MenuCard {...item} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;