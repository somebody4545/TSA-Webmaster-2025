"use client";
import { useEffect, useState } from "react";
import menuData from "../../data/menu-data.json";

interface Nutrition {
  calories: string;
  totalFat: string;
  saturatedFat: string;
  transFat: string;
  cholesterol: string;
  sodium: string;
  totalCarbohydrates: string;
  dietaryFiber: string;
  sugars: string;
  protein: string;
  vitaminD: string;
  calcium: string;
  iron: string;
  potassium: string;
}

interface ClientNutritionModalProps {
  nutrition: Nutrition;
}

const nutritionLabel: React.FC<ClientNutritionModalProps> = ({ nutrition }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  return (
    <div className="w-full text-center">
      <button
        onClick={openModal}
        className="text-center text-green-900 p-2 hover:underline hover:cursor-pointer"
      >
        View full Nutritional info
      </button>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="bg-background shadow-lg p-6 relative w-11/12 max-w-md max-h-screen m-2x overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-0 right-4 text-text hover:text-primary-darkest text-2xl font-bold"
            >
              ×
            </button>
            <h2 className="text-2xl font-heading mb-4">Nutritional Info</h2>
            <div>
              {Object.entries(nutrition).map(([key, value]) => {
                const formattedKey = key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase());
                return (
                  <div key={key}>
                    <hr className="border border-black" />
                    <div className="flex flex-row text-left p-1 justify-between">
                      <span>{formattedKey}</span>
                      <span>{value}</span>
                    </div>
                  </div>
                );
              })}
              <hr className="border border-black" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default nutritionLabel;
