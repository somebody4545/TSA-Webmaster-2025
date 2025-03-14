"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import MenuCard from "@/components/MenuCard";
import menuItems from "../../../data/menu-data.json";
import { ChevronDown, ChevronUp, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

const DIETARY_TAGS = ["Vegan", "Gluten Free", "Low Carb", "Spicy", "High Protein"];
const MEAL_CATEGORIES = ["Breakfast", "Lunch", "Dinner"];
const CUISINE_TYPES = [
  "Chinese", "Mediterranean", "American", "Indian",
  "Italian", "Korean", "Mexican", "Thai", "Japanese",
];

const SORT_OPTIONS = [
  { id: 'default', label: 'Default', icon: <ArrowUpDown size={16} /> },
  { id: 'nameAsc', label: 'Name: A to Z', icon: <ArrowUp size={16} /> },
  { id: 'nameDesc', label: 'Name: Z to A', icon: <ArrowDown size={16} /> },
  { id: 'priceAsc', label: 'Price: Low to High', icon: <ArrowUp size={16} /> },
  { id: 'priceDesc', label: 'Price: High to Low', icon: <ArrowDown size={16} /> },
];

export default function MenuPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [sortOption, setSortOption] = useState('default');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const sortRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setShowSortDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToMenu = () => {
    const menuSection = document.getElementById("menu");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "instant" });
    }
  };

  // Filter and sort the menu items
  const processedMenuItems = useMemo(() => {
    // First filter items
    const filtered = menuItems.filter(item => {
      const matchesTags = selectedTags.length === 0 ||
        selectedTags.every(tag => item.tags?.includes(tag));
      const matchesCategory = !selectedCategory ||
        item.categories?.includes(selectedCategory);
      const matchesCuisine = !selectedCuisine ||
        item.cuisine === selectedCuisine;

      return matchesTags && matchesCategory && matchesCuisine;
    });

    return [...filtered].sort((a, b) => {
      switch (sortOption) {
        case 'nameAsc':
          return a.title.localeCompare(b.title);
        case 'nameDesc':
          return b.title.localeCompare(a.title);
        case 'priceAsc':
          return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
        case 'priceDesc':
          return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''));
        default:
          return 0;
      }
    });
  }, [selectedTags, selectedCategory, selectedCuisine, sortOption]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prevTags => {
      const newTags = prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag];
      scrollToMenu();
      return newTags;
    });
  };

  const toggleCategory = (category: string | null) => {
    setSelectedCategory(prev => {
      const newCategory = prev === category ? null : category;
      scrollToMenu();
      return newCategory;
    });
  };

  const toggleCuisine = (cuisine: string) => {
    setSelectedCuisine(prev => {
      const newCuisine = prev === cuisine ? null : cuisine;
      scrollToMenu();
      return newCuisine;
    });
  };

  const toggleFilterVisibility = () => setIsFilterExpanded(!isFilterExpanded);
  const toggleSortDropdown = () => setShowSortDropdown(!showSortDropdown);

  const handleSortChange = (option: string) => {
    setSortOption(option);
    setShowSortDropdown(false);
  };

  // Get current sort option label
  const currentSortOption = SORT_OPTIONS.find(option => option.id === sortOption) || SORT_OPTIONS[0];

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <div className="flex max-lg:flex-col lg:flex-row pb-16">
        <FilterSidebar
          selectedTags={selectedTags}
          selectedCategory={selectedCategory}
          selectedCuisine={selectedCuisine}
          isExpanded={isFilterExpanded}
          toggleTag={toggleTag}
          toggleCategory={toggleCategory}
          toggleCuisine={toggleCuisine}
          toggleVisibility={toggleFilterVisibility}
          sortOption={sortOption}
          showSortDropdown={showSortDropdown}
          toggleSortDropdown={toggleSortDropdown}
          handleSortChange={handleSortChange}
          currentSortOption={currentSortOption}
          sortRef={sortRef}
        />
        <div className="container mx-auto px-4 py-8 w-4/5">
          <div className="flex justify-between items-center mb-6">
            <div>
              <span className="text-gray-700">{processedMenuItems.length} items</span>
            </div>
          </div>

          {/* Menu grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processedMenuItems.map((item, index) => (
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

          {/* No results message */}
          {processedMenuItems.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3 className="text-xl font-semibold mb-2">No results found</h3>
              <p className="text-gray-600">Try adjusting your filters or sorting options</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <div
      className="relative min-h-[550px] max-h-[900px] max-lg:min-h-[400px] bg-background px-6 py-6 flex items-center justify-center shadow-md z-30"
      style={{
        backgroundImage: "url(/img/menu_hero.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "90vh",
      }}
    >
      <div className="w-full md:w-1/2 space-y-5 text-center">
        <div className="bg-white bg-opacity-0 rounded-lg">
          <motion.h1
            className="text-3xl font-heading xl:text-4xl font-sans tracking-tight text-black md:px-24 px-12"
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
      <motion.div
        className="absolute bottom-8 animate-bounce"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <p className="text-sm text-center">Scroll Down</p>
        <div className="flex justify-center items-center">
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
            className="feather feather-chevron-down"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </motion.div>
      <div className="absolute bottom-20" id="menu"></div>
    </div>
  );
}

interface FilterSidebarProps {
  selectedTags: string[];
  selectedCategory: string | null;
  selectedCuisine: string | null;
  isExpanded: boolean;
  toggleTag: (tag: string) => void;
  toggleCategory: (category: string | null) => void;
  toggleCuisine: (cuisine: string) => void;
  toggleVisibility: () => void;
  sortOption: string;
  showSortDropdown: boolean;
  toggleSortDropdown: () => void;
  handleSortChange: (option: string) => void;
  currentSortOption: typeof SORT_OPTIONS[0];
  sortRef: React.RefObject<HTMLDivElement | null>;
}

function FilterSidebar({
  selectedTags,
  selectedCategory,
  selectedCuisine,
  isExpanded,
  toggleTag,
  toggleCategory,
  toggleCuisine,
  toggleVisibility,
  sortOption,
  showSortDropdown,
  toggleSortDropdown,
  handleSortChange,
  currentSortOption,
  sortRef
}: FilterSidebarProps) {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="lg:w-1/5 overflow-y-auto min-w-96 px-12 max-lg:py-4 lg:pb-16 sticky top-20 lg:top-20 h-min max-h-[calc(100vh-4rem)] z-20 bg-background max-lg:shadow-lg scrollbar scrollbar-w-2 scrollbar-thumb-primary-darker hover:scrollbar-thumb-primary-darkest active:scrollbar-thumb-primary-superdark scrollbar-thin">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl lg:py-8">Filters</h2>
        <button
          className="lg:hidden bg-primary text-text px-4 py-2 rounded-full"
          onClick={toggleVisibility}
        >
          {isExpanded ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      <motion.div
        className={`lg:block ${isExpanded || isLargeScreen ? "block" : "hidden"}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isExpanded || isLargeScreen ? 1 : 0, y: isExpanded || isLargeScreen ? 0 : -20 }}
        transition={{ duration: 0.3 }}
      >
        <FilterSection title="Sort by">
          <div className="relative" ref={sortRef}>
            <button
              onClick={toggleSortDropdown}
              className="flex items-center space-x-2 px-4 py-2 min-w-56 justify-center bg-primary text-text rounded-full hover:bg-primary-darker transition-colors"
            >
              <span>Sort by: {currentSortOption.label}</span>
              {showSortDropdown ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            <AnimatePresence>
              {showSortDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50 overflow-hidden"
                >
                  <div className="py-1">
                    {SORT_OPTIONS.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleSortChange(option.id)}
                        className={`w-full text-left px-4 py-2 flex items-center space-x-2 hover:bg-gray-100 transition-colors ${sortOption === option.id ? 'bg-primary/10 font-medium' : ''
                          }`}
                      >
                        <span className="text-primary">{option.icon}</span>
                        <span>{option.label}</span>
                        {sortOption === option.id && (
                          <motion.span
                            layoutId="activeSortIndicator"
                            className="ml-auto text-primary"
                          >
                            ✓
                          </motion.span>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </FilterSection>

        <FilterSection title="Meals">
          <FilterButtonGroup
            items={MEAL_CATEGORIES}
            selectedItem={selectedCategory}
            onSelect={toggleCategory}
          />
        </FilterSection>

        <FilterSection title="Cuisines">
          <FilterButtonGroup
            items={CUISINE_TYPES}
            selectedItem={selectedCuisine}
            onSelect={toggleCuisine}
          />
        </FilterSection>

        <FilterSection title="Dietary Choices">
          <FilterButtonGroup
            items={DIETARY_TAGS}
            selectedItems={selectedTags}
            onSelect={toggleTag}
            multiSelect={true}
          />
        </FilterSection>
      </motion.div>
    </div>
  );
}

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
}

function FilterSection({ title, children }: FilterSectionProps) {
  return (
    <>
      <p className="max-lg:pt-8 font-bold">{title}</p>
      <div className="flex gap-4 py-4">
        <div className="flex flex-wrap gap-2">
          {children}
        </div>
      </div>
    </>
  );
}

interface FilterButtonGroupProps {
  items: string[];
  selectedItem?: string | null;
  selectedItems?: string[];
  onSelect: (item: any) => void;
  multiSelect?: boolean;
}

function FilterButtonGroup({
  items,
  selectedItem,
  selectedItems = [],
  onSelect,
  multiSelect = false
}: FilterButtonGroupProps) {
  const isSelected = (item: string) =>
    multiSelect ? selectedItems.includes(item) : selectedItem === item;

  return (
    <>
      {items.map(item => (
        <button
          key={item}
          className={`px-4 py-2 rounded-full transition-all ${isSelected(item)
            ? "bg-primary text-text"
            : "bg-secondary hover:bg-primary/80"
            }`}
          onClick={() => onSelect(item)}
        >
          {item}
        </button>
      ))}
    </>
  );
}

interface MenuGridProps {
  items: typeof menuItems;
}

function MenuGrid({ items }: MenuGridProps) {
  return (
    <div className="container mx-auto px-4 py-8 w-4/5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, index) => (
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
  );
}