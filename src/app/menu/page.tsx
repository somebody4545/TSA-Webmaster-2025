"use client";
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import MenuCard from "@/components/MenuCard";
import items from "../../../data/menu-data.json";
import Link from "next/link";

const tags = [
  "Vegan",
  "Gluten Free",
  "Low Carb",
  "Spicy",
  "High Protein",
];

const categories = [
  "Breakfast",
  "Lunch",
  "Dinner",
];

const cuisines = [
  "Chinese",
  "Mediterranean",
  "American",
  "Indian",
  "Italian",
  "Korean",
  "Mexican",
  "Thai",
  "Japanese",
];

const Page = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);

  const filterMenuItems = useMemo(() => {
    return items.filter((item) => {
      const tagMatches = selectedTags.every((tag) => item.tags.includes(tag));
      const categoryMatches = selectedCategory
        ? item.categories.includes(selectedCategory)
        : true;
      const cuisineMatches = selectedCuisine ? item.cuisine === selectedCuisine : true;
      return tagMatches && categoryMatches && cuisineMatches;
    });
  }, [selectedTags, selectedCategory, selectedCuisine]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prevSelectedTags) => {
      if (prevSelectedTags.includes(tag)) {
        return prevSelectedTags.filter((t) => t !== tag);
      } else {
        return [...prevSelectedTags, tag];
      }
    });
  };

  const selectCategory = (category: string | null) => {
    setSelectedCategory((prevCategory) => (prevCategory === category ? null : category));
  };

  const selectCuisine = (cuisine: string) => {
    setSelectedCuisine((prevCuisine) => (prevCuisine === cuisine ? null : cuisine));
  };

  return (
    <div className="min-h-screen bg-background">
      <div
        className="relative bg-[#e6f7f7] px-6 py-6 flex items-center justify-center"
        style={{
          backgroundImage: "url(/img/menu_hero.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "90vh",
        }}
      >
        <div className="w-full md:w-1/2 space-y-5 text-left -ml-4">
          <div className="bg-white bg-opacity-0 rounded-lg">
            <motion.h1
              className="text-4xl font-heading xl:text-5xl font-sans tracking-tight text-black px-24"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Fresh, Vegetarian,
              <br />
              and Perfect!
            </motion.h1>
            <motion.p
              className="text-xl text-black-200 px-24"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Embrace fresh, vibrant flavors!
            </motion.p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center gap-4 py-4">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full transition-all ${
              selectedCategory === category
                ? "bg-accent text-text"
                : "bg-secondary hover:bg-accent/80"
            }`}
            onClick={() => selectCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Cuisine Filter */}
      <div className="flex justify-center gap-4 py-4">
        {cuisines.map((cuisine) => (
          <button
            key={cuisine}
            className={`px-4 py-2 rounded-full transition-all ${
              selectedCuisine === cuisine
                ? "bg-accent text-text"
                : "bg-secondary hover:bg-accent/80"
            }`}
            onClick={() => selectCuisine(cuisine)}
          >
            {cuisine}
          </button>
        ))}
      </div>

      {/* Tags Filter */}
      <div className="flex justify-center gap-4 py-4">
        <div className="flex flex-wrap justify-center gap-2 px-4">
          {tags.map((tag) => (
            <button
              key={tag}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedTags.includes(tag)
                  ? "bg-accent text-text"
                  : "bg-secondary hover:bg-accent/80"
              }`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filterMenuItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/${item.title.replace(/\s+/g, "-").toLowerCase()}`}>
                <MenuCard {...item} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
