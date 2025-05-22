import React from "react";
import menuData from "../../../data/menu-data.json";
import NotFound from "@/app/not-found";
import NutritionLabel from "@/components/NutritionLabel";
import Carousel from "@/components/Carousel";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import SustainabilityGraphic from "@/components/SustainabilityGraphic";
interface MenuItemPageProps {
  params: Promise<{ title: string }>;
}

const menuItemPage = async ({ params }: MenuItemPageProps) => {
  const { title } = await params;
  const formattedTitle = title.replace(/-/g, " ");
  const item = menuData.find(
    (menuItem) => menuItem.title.toLowerCase() === formattedTitle.replace(/%26/g, "&")
  );
  if (!item) {
    return <><p>{formattedTitle}</p>
    <NotFound />
    </>;
  }

  const allowedKeys = ["calories", "totalFat", "totalCarbohydrates", "protein"];

  const similarRecipes = menuData.filter(
    (menuItem) =>
      menuItem.title.toLocaleLowerCase() !== formattedTitle &&
      (menuItem.cuisine === item.cuisine ||
        menuItem.tags.filter((tag) => item.tags.includes(tag)).length > 2)
  );

  return (
    <div className="flex flex-col items-center relative">
      <div className="w-full h-96 top-0 left-0 max-h-[50vh] overflow-hidden relative">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-[130%] h-[130%] object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>
      <div className="z-10 p-5 lg:mb-5 lg:p-10 max-w-screen-xl w-full flex flex-col justify-center h-full text-center lg:text-left mx-auto bg-background shadow-md mt-[-5vh]">
        <Link href="/menu" className="text-left flex items-center text-text hover:underline">
          <ChevronLeft /> Back to Menu
        </Link>
        <h1 className="font-heading mb-5 flex flex-col lg:flex-row lg:items-baseline lg:justify-between text-center justify-center lg:text-left">
          <div>
            <span className="text-3xl">{item.title}</span>
            <div>{item.subtitle}</div>
          </div>
          <span className="text-xl">{item.price}</span>
        </h1>

        {item.description ? <p className="mb-5">{item.description}</p> : null}
        <div className="flex flex-wrap gap-2 mb-4 justify-center lg:justify-start">
          {item.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary text-text text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex w-full mb-4 flex-col lg:flex-row lg:items-start items-center">
          {item.ingredients ? (
            <div className="w-full lg:w-3/4 mb-4">
              <h1 className="text-2xl font-heading mb-2">Ingredients</h1>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center lg:justify-start">
                {item.ingredients.map((ingredient, index) => (
                  <div key={index} className="p-2">
                    <span className="flex items-center gap-1">
                      <span className="text-primary"><ChevronRight /></span>
                      {ingredient}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          {item.nutrition ? (
            <div className="w-full lg:w-1/4">
              <h1 className="text-2xl font-heading mb-2">
                Nutrition
                <span className="text-[16px] font-body"> (per serving)</span>
              </h1>
              {Object.entries(item.nutrition)
                .filter(([key]) => allowedKeys.includes(key))
                .map(([key, value]) => {
                  const capitalizedKey =
                    key.charAt(0).toUpperCase() +
                    key.replace(/([A-Z])/g, " $1").slice(1);
                  return (
                    <div key={key}>
                      <hr className="border border-black" />
                      <div className="flex flex-row text-left p-1 justify-between">
                        <span>{capitalizedKey}</span>
                        <span>{value}</span>
                      </div>
                    </div>
                  );
                })}
              <hr className="border border-black" />
              <NutritionLabel nutrition={item.nutrition} />
            </div>
          ) : null}
        </div>
        {similarRecipes.length > 0 ? (
          <>
            <h2 className="text-2xl font-heading">{item.categories.includes("Drinks") ? "Pairs Well With" : "Similar Dishes"}</h2>

            <div className="w-3/4 mx-auto">
              <Carousel items={similarRecipes} />
            </div>
          </>
        ) : null}
        {item.sustainability ? (
          <SustainabilityGraphic sustainability={item.sustainability}/>
        ) : null}
      </div>
    </div>
  );
};

export default menuItemPage;
