"use client";
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import MenuCard from "@/components/MenuCard";

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

const items = [
  {
    title: "General Tso's Tofu",
    subtitle: "with Quinoa & Broccoli",
    price: "$22.99",
    calories: "640",
    imageUrl: "/img/menu/general-tso.jpg",
    tags: ["Vegan", "High Protein", "Spicy", "Gluten Free"],
    categories: ["Lunch", "Dinner"],
    cuisine: "Chinese",
  },
  {
    title: "Mediterranean Bowl",
    subtitle: "with Falafel & Hummus",
    price: "$19.99",
    calories: "580",
    imageUrl: "/img/menu/mediterranean-bowl.jpg",
    tags: ["Gluten Free", "Vegan", "High Protein"],
    categories: ["Lunch", "Dinner"],
    cuisine: "Mediterranean",
  },
  {
    title: "Grilled Lettuce Wrap",
    subtitle: "with Cottage Cheese & Wild Rice",
    price: "$26.99",
    calories: "520",
    imageUrl: "/img/menu/lettucewrap.jpg",
    tags: ["Low Carb", "Gluten Free", "High Protein"],
    categories: ["Lunch", "Dinner"],
    cuisine: "American",
  },
  {
    title: "Buddha Bowl",
    subtitle: "with Sweet Potato & Kale",
    price: "$18.99",
    calories: "490",
    imageUrl: "/img/menu/buddha-bowl.jpg",
    tags: ["Vegan", "Gluten Free", "Low Carb"],
    categories: ["Lunch"],
    cuisine: "American",
  },
  {
    title: "Paneer Tikka Masala",
    subtitle: "with Basmati Rice & Naan",
    price: "$23.99",
    calories: "720",
    imageUrl: "/img/menu/tikka-masala.jpg",
    tags: ["Spicy", "High Protein"],
    categories: ["Lunch", "Dinner"],
    cuisine: "Indian",
  },
  {
    title: "Avocado Toast",
    subtitle: "with Poached Eggs & Microgreens",
    price: "$14.99",
    calories: "420",
    imageUrl: "/img/menu/avocado-toast.jpg",
    tags: ["High Protein", "Low Carb"],
    categories: ["Breakfast"],
    cuisine: "American",
  },
  {
    title: "Poke Bowl",
    subtitle: "with Vegetables & Mango",
    price: "$24.99",
    calories: "550",
    imageUrl: "/img/menu/poke-bowl.jpg",
    tags: ["Gluten Free", "Low Carb"],
    categories: ["Lunch"],
    cuisine: "American",
  },
  {
    title: "Mushroom Risotto",
    subtitle: "with Truffle Oil & Parmesan",
    price: "$21.99",
    calories: "680",
    imageUrl: "/img/menu/mushroom-risotto.jpg",
    tags: ["Gluten Free"],
    categories: ["Dinner"],
    cuisine: "Italian",
  },
  {
    title: "Acai Bowl",
    subtitle: "with Fresh Berries & Granola",
    price: "$15.99",
    calories: "390",
    imageUrl: "/img/menu/acai-bowl.jpg",
    tags: ["Vegan", "Gluten Free"],
    categories: ["Breakfast"],
    cuisine: "American",
  },
  {
    title: "Korean BBQ Bowl",
    subtitle: "with Bulgogi & Kimchi",
    price: "$25.99",
    calories: "690",
    imageUrl: "/img/menu/korean-bbq.jpg",
    tags: ["Spicy", "High Protein", "Gluten Free"],
    categories: ["Lunch", "Dinner"],
    cuisine: "Korean",
  },
  {
    title: "Green Goddess Salad",
    subtitle: "with Grilled Chicken & Avocado",
    price: "$17.99",
    calories: "440",
    imageUrl: "/img/menu/green-goddess.jpg",
    tags: ["Low Carb", "High Protein", "Gluten Free"],
    categories: ["Lunch"],
    cuisine: "American",
  },
  {
    title: "Breakfast Burrito",
    subtitle: "with Eggs & Black Beans",
    price: "$13.99",
    calories: "580",
    imageUrl: "/img/menu/breakfast-burrito.jpg",
    tags: ["High Protein"],
    categories: ["Breakfast"],
    cuisine: "Mexican",
  },
  {
    title: "Pad Thai",
    subtitle: "with Tofu & Peanuts",
    price: "$20.99",
    calories: "610",
    imageUrl: "/img/menu/pad-thai.jpg",
    tags: ["Spicy", "Vegan", "High Protein"],
    categories: ["Lunch", "Dinner"],
    cuisine: "Thai",
  },
  {
    title: "Quinoa Power Bowl",
    subtitle: "with Roasted Vegetables",
    price: "$18.99",
    calories: "520",
    imageUrl: "/img/menu/quinoa-bowl.jpg",
    tags: ["Vegan", "High Protein", "Gluten Free", "Low Carb"],
    categories: ["Lunch"],
    cuisine: "American",
  },
  {
    title: "Miso Ramen",
    subtitle: "with Soft-Boiled Egg & Nori",
    price: "$19.99",
    calories: "590",
    imageUrl: "/img/menu/miso-ramen.jpg",
    tags: ["High Protein", "Spicy"],
    // This dish can be eaten at both Lunch and Dinner.
    categories: ["Lunch", "Dinner"],
    cuisine: "Japanese",
  },
  {
    title: "Chia Pudding",
    subtitle: "with Coconut Milk & Berries",
    price: "$12.99",
    calories: "320",
    imageUrl: "/img/menu/chia-pudding.jpg",
    tags: ["Vegan", "Gluten Free", "Low Carb"],
    categories: ["Breakfast"],
    cuisine: "American",
  },
  {
    title: "Falafel Wrap",
    subtitle: "with Tahini & Pickles",
    price: "$16.99",
    calories: "450",
    imageUrl: "/img/menu/falafel-wrap.jpg",
    tags: ["Vegan", "High Protein"],
    categories: ["Lunch"],
    cuisine: "Mediterranean",
  }
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
            <div className="bg-white bg-opacity-0 p-6 rounded-lg">
              <motion.h1
                  className="text-4xl font-heading xl:text-5xl font-sans tracking-tight text-black"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
              >
                Fresh, Vegetarian,
                <br />
                and Perfect!
              </motion.h1>
              <motion.p
                  className="text-xl text-black-200"
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
                  <MenuCard {...item} />
                </motion.div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default Page;
