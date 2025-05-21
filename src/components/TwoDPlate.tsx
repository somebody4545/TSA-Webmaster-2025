import React, { useState } from "react";
import { motion } from "framer-motion";

export const PIE_DATA = [
  {
    color: "#5f4994", // purple
    label: "Fruits",
    description: "Fruits provide vitamins, minerals, and natural sweetness.",
  },
  {
    color: "#e7731e", // orange
    label: "Grains",
    description: "Grains are a source of energy and important nutrients.",
  },
  {
    color: "#74b743", // green
    label: "Vegetables",
    description: "Vegetables are rich in fiber, vitamins, and minerals.",
  },
  {
    color: "#d61d23", // red
    label: "Protein",
    description: "Protein is essential for muscle and tissue repair.",
  },
];

interface TwoDPlateProps {
  onSelect?: (idx: number | null) => void;
  selectedIndex?: number | null;
}

const TwoDPlate: React.FC<TwoDPlateProps> = ({ onSelect, selectedIndex }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  // Allow parent to control selection, or use local state
  const actualSelected = selectedIndex !== undefined ? selectedIndex : selected;
  const actualHovered = hoveredIndex;

  const handleSelect = (idx: number) => {
    if (actualSelected === idx) {
      setSelected(null);
      if (onSelect) onSelect(null);
    } else {
      setSelected(idx);
      if (onSelect) onSelect(idx);
    }
  };

  // Function to check if a point is inside a slice
  const isPointInSlice = (x: number, y: number, index: number) => {
    const angle = Math.atan2(y, x);
    const normalizedAngle = (angle + Math.PI * 2) % (Math.PI * 2);
    const startAngle = (index * Math.PI) / 2;
    const endAngle = ((index + 1) * Math.PI) / 2;
    return normalizedAngle >= startAngle && normalizedAngle < endAngle;
  };

  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    const svg = event.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 4 - 2;
    const y = ((event.clientY - rect.top) / rect.height) * 4 - 2;

    // Find which slice contains the point
    const sliceIndex = PIE_DATA.findIndex((_, i) => isPointInSlice(x, y, i));
    setHoveredIndex(sliceIndex !== -1 ? sliceIndex : null);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox="-2 -2 4 4"
        className="w-full h-full max-w-[900px] max-h-[900px]"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {PIE_DATA.map((slice, i) => {
          const startAngle = (i * Math.PI) / 2;
          const endAngle = ((i + 1) * Math.PI) / 2;
          const midAngle = (startAngle + endAngle) / 2;

          // Calculate points for the slice
          const x1 = Math.cos(startAngle);
          const y1 = Math.sin(startAngle);
          const x2 = Math.cos(endAngle);
          const y2 = Math.sin(endAngle);

          // Calculate the pop-out distance
          const isActive = actualSelected === i || actualHovered === i;
          const popDistance = isActive ? 0.2 : 0;

          // Create the path for the slice
          const path = `
            M 0 0
            L ${x1} ${y1}
            A 1 1 0 0 1 ${x2} ${y2}
            Z
          `;

          return (
            <motion.g
              key={i}
              initial={{ x: 0, y: 0 }}
              animate={{
                x: Math.cos(midAngle) * popDistance,
                y: Math.sin(midAngle) * popDistance,
              }}
              transition={{ duration: 0.2 }}
              style={{ cursor: "pointer" }}
              onClick={() => handleSelect(i)}
            >
              <path d={path} fill={slice.color} />
              {/* Label */}
              <text
                x={Math.cos(midAngle) * 0.5}
                y={Math.sin(midAngle) * 0.5}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="0.3"
                fontWeight="bold"
                style={{
                  pointerEvents: "none",
                  textShadow: "0 0 2px rgba(0,0,0,0.5)",
                }}
              >
                {slice.label}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
};

export default TwoDPlate;
