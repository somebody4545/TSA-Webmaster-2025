"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MenuCard from '@/components/menu_card';

const menuCategories = ["Vegan", "Gluten Free"];

const sampleMenuItems = [
  {
    "title": "General Tso's Tofu",
    "subtitle": "with Quinoa & Broccoli",
    "price": "$22.99",
    "calories": "640",
    "imageUrl": "/img/menu/general-tso.jpg",
    "tags": ["Vegan", "High Protein", "Spicy"],
    "category": "Dinner"
  },
  {
    "title": "Mediterranean Bowl",
    "subtitle": "with Falafel & Hummus",
    "price": "$19.99",
    "calories": "580",
    "imageUrl": "/img/menu/mediterranean-bowl.jpg",
    "tags": ["Vegetarian", "Healthy", "Gluten-Free"],
    "category": "Lunch"
  },
  {
    "title": "Grilled Lettuce Wrap",
    "subtitle": "with Cottage Cheese & Wild Rice",
    "price": "$26.99",
    "calories": "520",
    "imageUrl": "/img/menu/lettucewrap.jpg",
    "tags": ["Low Carb", "Omega-3"],
    "category": "Dinner"
  },
  {
    "title": "Buddha Bowl",
    "subtitle": "with Sweet Potato & Kale",
    "price": "$18.99",
    "calories": "490",
    "imageUrl": "/img/menu/buddha-bowl.jpg",
    "tags": ["Vegan", "Gluten-Free", "Superfood"],
    "category": "Lunch"
  },
  {
    "title": "Paneer Tikka Masala",
    "subtitle": "with Basmati Rice & Naan",
    "price": "$23.99",
    "calories": "720",
    "imageUrl": "/img/menu/tikka-masala.jpg",
    "tags": ["Indian", "Spicy", "Popular"],
    "category": "Dinner"
  },
  {
    "title": "Avocado Toast",
    "subtitle": "with Poached Eggs & Microgreens",
    "price": "$14.99",
    "calories": "420",
    "imageUrl": "/img/menu/avocado-toast.jpg",
    "tags": ["Vegetarian", "Breakfast", "High Protein"],
    "category": "Breakfast"
  },
  {
    "title": "Poke Bowl",
    "subtitle": "with Vegetables & Mango",
    "price": "$24.99",
    "calories": "550",
    "imageUrl": "/img/menu/poke-bowl.jpg",
    "tags": [ "Hawaiian", "Gluten-Free"],
    "category": "Lunch"
  },
  {
    "title": "Mushroom Risotto",
    "subtitle": "with Truffle Oil & Parmesan",
    "price": "$21.99",
    "calories": "680",
    "imageUrl": "/img/menu/mushroom-risotto.jpg",
    "tags": ["Vegetarian", "Italian", "Creamy"],
    "category": "Dinner"
  },
  {
    "title": "Acai Bowl",
    "subtitle": "with Fresh Berries & Granola",
    "price": "$15.99",
    "calories": "390",
    "imageUrl": "/img/menu/acai-bowl.jpg",
    "tags": ["Vegan", "Breakfast", "Superfood"],
    "category": "Breakfast"
  },
  {
    "title": "Korean BBQ Bowl",
    "subtitle": "with Bulgogi & Kimchi",
    "price": "$25.99",
    "calories": "690",
    "imageUrl": "/img/menu/korean-bbq.jpg",
    "tags": ["Korean", "Spicy", "High Protein"],
    "category": "Dinner"
  },
  {
    "title": "Green Goddess Salad",
    "subtitle": "with Grilled Chicken & Avocado",
    "price": "$17.99",
    "calories": "440",
    "imageUrl": "/img/menu/green-goddess.jpg",
    "tags": ["Healthy", "Low Carb", "High Protein"],
    "category": "Lunch"
  },
  {
    "title": "Breakfast Burrito",
    "subtitle": "with Eggs & Black Beans",
    "price": "$13.99",
    "calories": "580",
    "imageUrl": "/img/menu/breakfast-burrito.jpg",
    "tags": ["Mexican", "Breakfast", "High Protein"],
    "category": "Breakfast"
  },
  {
    "title": "Pad Thai",
    "subtitle": "with Tofu & Peanuts",
    "price": "$20.99",
    "calories": "610",
    "imageUrl": "/img/menu/pad-thai.jpg",
    "tags": ["Thai", "Spicy", "Vegetarian"],
    "category": "Dinner"
  },
  {
    "title": "Quinoa Power Bowl",
    "subtitle": "with Roasted Vegetables",
    "price": "$18.99",
    "calories": "520",
    "imageUrl": "/img/menu/quinoa-bowl.jpg",
    "tags": ["Vegan", "High Protein", "Gluten-Free"],
    "category": "Lunch"
  },
  {
    "title": "Miso Ramen",
    "subtitle": "with Soft-Boiled Egg & Nori",
    "price": "$19.99",
    "calories": "590",
    "imageUrl": "/img/menu/miso-ramen.jpg",
    "tags": ["Japanese", "Soup", "Comfort Food"],
    "category": "Dinner"
  }
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


      <div className="relative bg-[#e6f7f7] px-6 py-6 flex items-center justify-center" 
      style={{ backgroundImage: 'url(/img/menu_hero.png)', backgroundSize: 'cover', backgroundPosition: 'center', height: '90vh' }}>
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
              Increaseing your love for vegetarian or sum thing bro idk.
            </motion.p>
          </div>
        </div>
      </div>


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