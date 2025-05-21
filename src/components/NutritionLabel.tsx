"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface NutritionData {
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

interface NutritionLabelProps {
  nutrition: NutritionData;
}

const NutritionLabel: React.FC<NutritionLabelProps> = ({ nutrition }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  const formatNutritionKey = (key: string): string => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <div className="w-full text-center">
      <button
        onClick={() => toggleModal(true)}
        className="btn btn-primary font-normal max-h-min py-0 btn-shine rounded-full shadow-sm mt-3"
      >
        View full Nutritional info
      </button>
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.7)", zIndex: 50 }}
            onClick={() => toggleModal(false)}
          >
            <div
              className="bg-background rounded-lg shadow-xl p-6 relative w-11/12 max-w-md max-h-screen m-2x overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => toggleModal(false)}
                className="absolute top-4 right-4 p-1 rounded-full bg-background-dim hover:bg-background-dimmer transition-colors"
              >
                <X className="w-5 h-5 text-text" />
              </button>
              <h2 className="text-2xl font-heading mb-4">Nutritional Info</h2>
              <div>
                {Object.entries(nutrition).map(([key, value]) => (
                  <div key={key}>
                    <hr className="border border-black" />
                    <div className="flex flex-row text-left p-1 justify-between">
                      <span>{formatNutritionKey(key)}</span>
                      <span>{value}</span>
                    </div>
                  </div>
                ))}
                <hr className="border border-black" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NutritionLabel;
