import React from "react";
import menuData from "../../../data/menu-data.json";
import NotFound from "@/app/not-found";

interface MenuItemPageProps {
  params: Promise<{ title: string }>;
}

const menuItemPage = async ({ params }: MenuItemPageProps) => {
  const { title } = await params;
  const formattedTitle = title.replace(/-/g, " ");
  const item = menuData.find(
      (menuItem) => menuItem.title.toLocaleLowerCase() === formattedTitle
  );
  if (!item) {
    return <NotFound />;
  }

  return (
      <div className="flex flex-col items-center">
        <div
            className={
                "w-full h-[30vh] top-0 left-0 bg-cover bg-center bg-[url(" +
                item.imageUrl +
                ")]"
            }
        ></div>
        <div className="p-10 max-w-screen-2xl lg:w-2/3 flex flex-col justify-center h-full text-center lg:text-left mx-auto bg-background shadow-md mt-[-5vh]">
          <h1 className="text-4xl font-heading mb-0">{item.title}</h1>
          <h2 className="mb-5">{item.subtitle}</h2>
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
          {item.ingredients ? (
              <>
                <h1 className="text-2xl font-heading mb-2">Ingredients</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  {item.ingredients.map((ingredient, index) => (
                      <div
                          key={index}
                          className="bg-primary shadow-md p-4 rounded-lg"
                      >
                        <p>{ingredient}</p>
                      </div>
                  ))}
                </div>
              </>
          ) : null}
          <p>Price: {item.price}</p>
        </div>
      </div>
  );
};

export default menuItemPage;