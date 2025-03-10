"use client";
import React, { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import MenuCard from "@/components/MenuCard";
import items from "../../../data/menu-data.json";
import Link from "next/link";

const tags = ["Vegan", "Gluten Free", "Low Carb", "Spicy", "High Protein"];
const categories = ["Breakfast", "Lunch", "Dinner"];
const cuisines = ["Chinese", "Mediterranean", "American", "Indian", "Italian", "Korean", "Mexican", "Thai", "Japanese"];

const Page = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterMenuItems = useMemo(() =>
    items.filter(item => {
      const tagMatches = selectedTags.every(tag => item.tags.includes(tag));
      const categoryMatches = !selectedCategory || item.categories?.includes(selectedCategory);
      const cuisineMatches = !selectedCuisine || item.cuisine === selectedCuisine;
      return tagMatches && categoryMatches && cuisineMatches;
    }),
    [selectedTags, selectedCategory, selectedCuisine]);

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  }, []);

  const selectCategory = useCallback((category: string | null) => {
    setSelectedCategory(prev => prev === category ? null : category);
  }, []);

  const selectCuisine = useCallback((cuisine: string) => {
    setSelectedCuisine(prev => prev === cuisine ? null : cuisine);
  }, []);

  const toggleFilters = useCallback(() => {
    setIsFilterOpen(prev => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div
        className="relative min-h-[900px] max-lg:min-h-[400px] bg-background px-6 py-6 flex items-center justify-center shadow-md z-30"
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
              className="text-3xl font-heading xl:text-5xl font-sans tracking-tight text-black md:px-24 px-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Fresh, Vegetarian,
              <br />
              and Perfect!
            </motion.h1>
            <motion.p
              className="text-xl text-black-200 md:px-24 px-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Embrace fresh, vibrant flavors!
            </motion.p>
          </div>
        </div>
      </div>

      <div className="flex max-lg:flex-col lg:flex-row" id="menu">
        <div className="lg:w-1/5 overflow-y-scroll min-w-96 px-12 max-lg:py-4 lg:pb-16 sticky top-20 lg:top-20 h-min max-h-[calc(100vh-4rem)] z-20 bg-background max-lg:shadow-lg scrollbar scrollbar-w-2 scrollbar-thumb-primary-darker hover:scrollbar-thumb-primary-darkest active:scrollbar-thumb-primary-superdark">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-2xl lg:py-8">Filters</h2>
            <button
              className="lg:hidden bg-primary text-text px-4 py-2 rounded-full"
              onClick={toggleFilters}
            >
              {isFilterOpen ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          <div className={`lg:block ${isFilterOpen ? "block" : "hidden"}`}>
            <p className="max-lg:pt-8 font-bold">Meals</p>
            <div className="flex gap-2 py-4">
              {categories.map(category => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full transition-all ${selectedCategory === category
                      ? "bg-primary text-text"
                      : "bg-secondary hover:bg-primary/80"
                    }`}
                  onClick={() => selectCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <p className="font-bold">Cuisines</p>
            <div className="flex gap-4 py-4">
              <div className="flex flex-wrap gap-2">
                {cuisines.map(cuisine => (
                  <button
                    key={cuisine}
                    className={`px-4 py-2 rounded-full transition-all ${selectedCuisine === cuisine
                        ? "bg-primary text-text"
                        : "bg-secondary hover:bg-primary/80"
                      }`}
                    onClick={() => selectCuisine(cuisine)}
                  >
                    {cuisine}
                  </button>
                ))}
              </div>
            </div>

            <p className="font-bold">Dietary Choices</p>
            <div className="flex gap-4 py-4">
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <button
                    key={tag}
                    className={`px-4 py-2 rounded-full transition-all ${selectedTags.includes(tag)
                        ? "bg-primary text-text"
                        : "bg-secondary hover:bg-primary/80"
                      }`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 w-4/5">
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
    </div>
  );
};

export default Page;
