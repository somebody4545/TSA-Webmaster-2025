"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

interface MenuItem {
  title: string;
  subtitle: string;
  imageUrl: string;
  cuisine?: string;
  price: string;
  calories: string;
  tags?: string[];
}

function MenuCarousel({ items }: { items: MenuItem[] }) {
  if (items.length === 1) {
    return (
      <div className="relative w-full mx-auto h-[450px] py-4 sm:py-8">
        <div className="relative flex items-center justify-center h-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="absolute w-[80%] sm:w-[70%] md:w-[50%] h-[350px] rounded-xl bg-white shadow-xl flex flex-col transition-all duration-500 ease-in-out text-black translate-x-0 scale-100 z-30 opacity-100"
          >
            <Link
              href={`/${items[0].title.replace(/\s+/g, "-").toLowerCase()}`}
              className="block h-full text-black"
            >
              <div className="flex flex-col h-full p-6">
                <div className="relative w-full h-1/2 overflow-hidden rounded-lg mb-4">
                  <img
                    src={items[0].imageUrl}
                    alt={items[0].title}
                    className="w-full h-full object-cover"
                  />
                  {items[0].cuisine && (
                    <div className="absolute top-2 right-2 bg-primary text-black text-xs px-2 py-1 rounded-full">
                      {items[0].cuisine}
                    </div>
                  )}
                </div>
                <div className="flex flex-col flex-grow">
                  <h3 className="text-xl font-bold font-heading text-black">
                    {items[0].title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {items[0].subtitle}
                  </p>

                  <div className="flex justify-between items-center mt-auto">
                    <p className="font-bold text-black">{items[0].price}</p>
                    <p className="text-sm text-gray-700">
                      {items[0].calories} cal
                    </p>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-1">
                    {items[0].tags &&
                      items[0].tags.slice(0, 2).map((tag, j) => (
                        <span
                          key={j}
                          className="bg-primary text-black text-xs px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="relative w-full mx-auto h-[450px] py-4 sm:py-8">
      <div className="relative flex items-center justify-center h-full">
        {items.map((item, i) => {
          const position = items.length === 2
            ? i === index
              ? "translate-x-[-20%] scale-100 z-30 opacity-100"
              : "translate-x-[20%] scale-90 z-20 opacity-20"
            : i === index
              ? "translate-x-0 scale-100 z-30 opacity-100"
              : i === (index + 1) % items.length
                ? "translate-x-[40%] sm:translate-x-[60%] md:translate-x-[75%] scale-90 z-20 opacity-20"
                : i === (index - 1 + items.length) % items.length
                  ? "translate-x-[-40%] sm:translate-x-[-60%] md:translate-x-[-75%] scale-90 z-20 opacity-20"
                  : "translate-x-0 scale-75 z-10 opacity-0";

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{
                opacity: items.length === 2
                  ? 1
                  : i === index
                    ? 1
                    : i === (index + 1) % items.length ||
                      i === (index - 1 + items.length) % items.length
                      ? 0.2
                      : 0,
              }}
              transition={{ duration: 0.7 }}
              className={`absolute w-[80%] sm:w-[70%] md:w-[50%] h-[350px] rounded-xl bg-white shadow-xl flex flex-col transition-all duration-500 ease-in-out text-black ${position}`}
            >
              <Link
                href={`/${item.title.replace(/\s+/g, "-").toLowerCase()}`}
                className="block h-full text-black"
              >
                <div className="flex flex-col h-full p-6">
                  <div className="relative w-full h-1/2 overflow-hidden rounded-lg mb-4">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-xl font-bold font-heading text-black">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {item.subtitle}
                    </p>

                    <div className="flex justify-between items-center mt-auto">
                      <p className="font-bold text-black">{item.price}</p>
                      <p className="text-sm text-gray-700">
                        {item.calories} cal
                      </p>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-1">
                      {item.tags &&
                        item.tags.slice(0, 2).map((tag, j) => (
                          <span
                            key={j}
                            className="bg-primary text-black text-xs px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {items.length > 1 && (
        <div className="absolute lg:left-0 lg:right-0 left-[-20px] right-[-20px] top-1/2 -translate-y-1/2 flex justify-between z-40 px-4 pointer-events-none">
          <motion.button
            onClick={prevSlide}
            className="btn btn-circle btn-primary btn-shine text-background hover:scale-110 transition-transform duration-200 pointer-events-auto shadow-md"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </motion.button>
          <motion.button
            onClick={nextSlide}
            className="btn btn-circle btn-primary btn-shine text-background hover:scale-110 transition-transform duration-200 pointer-events-auto shadow-md"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </motion.button>
        </div>
      )}

      {items.length > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${i === index ? "bg-primary" : "bg-gray-300"
                }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MenuCarousel;
