import React, { useState } from "react";
import { motion } from "framer-motion";

export const PIE_DATA = [
  {
    color: "#7A53AC",
    label: "Fruits",
    description: "Fruits provide vitamins, minerals, and natural sweetness.",
  },
  {
    color: "#F69F58",
    label: "Grains",
    description: "Grains are a source of energy and important nutrients.",
  },
  {
    color: "#9EC172",
    label: "Vegetables",
    description: "Vegetables are rich in fiber, vitamins, and minerals.",
  },
  {
    color: "#D7545F",
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

    const sliceIndex = PIE_DATA.findIndex((_, i) => isPointInSlice(x, y, i));
    setHoveredIndex(sliceIndex !== -1 ? sliceIndex : null);
  };

  const getSliceRenderingOrder = () => {
    const defaultOrder = [...Array(PIE_DATA.length).keys()];

    if (hoveredIndex !== null) {
      return [...defaultOrder.filter((i) => i !== hoveredIndex), hoveredIndex];
    } else if (actualSelected !== null) {
      return [...defaultOrder.filter((i) => i !== actualSelected), actualSelected];
    }

    return defaultOrder;
  };

  // Add Safari detection
  const [isSafari, setIsSafari] = useState<boolean>(false);

  React.useEffect(() => {
    // Check if browser is Safari
    const isSafariBrowser = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    setIsSafari(isSafariBrowser);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center plate-3d-container" style={{ isolation: "isolate" }}>
      {isSafari && (
        <div
          className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none text-white text-xl max-sm:text-md"
          style={{ zIndex: 2, padding: "20% 20%" }}
        >
          <div className="flex items-center justify-center">Vegetables</div>
          <div className="flex items-center justify-center">Protein</div>
          <div className="flex items-center justify-center">Grains</div>
          <div className="flex items-center justify-center">Fruits</div>
        </div>
      )}
      <svg
        viewBox="-1.125 -1.125 2.25 2.25"
        className="w-full h-full max-w-[600px] max-h-[600px] plate-3d"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredIndex(null)}
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        style={{ filter: "drop-shadow(0px 10px 5px rgba(0,0,0,0.15))" }}
      >
        {getSliceRenderingOrder().map((orderIndex) => {
          const i = orderIndex;
          const slice = PIE_DATA[i];
          const startAngle = (i * Math.PI) / 2;
          const endAngle = ((i + 1) * Math.PI) / 2;
          const midAngle = (startAngle + endAngle) / 2;

          // Calculate points for the slice
          const x1 = Math.cos(startAngle);
          const y1 = Math.sin(startAngle);
          const x2 = Math.cos(endAngle);
          const y2 = Math.sin(endAngle);

          const isActive = actualSelected === i || actualHovered === i;

          const mainPath = `
            M 0 0
            L ${x1} ${y1}
            A 1 1 0 0 1 ${x2} ${y2}
            Z
          `;

          const sidePath1 = `
            M ${x1} ${y1}
            A 1 1 0 0 1 ${x2} ${y2}
            L ${x2} ${y2}
            A 1 1 0 0 0 ${x1} ${y1}
          `;
          return (
            <motion.g
              key={i}
              initial={{ scale: 1, z: 0 }}
              animate={{
                z: isActive ? 30 : 0,
                scale: isActive ? 1.05 : 1,
              }}
              whileHover={{
                scale: 1.1,
                z: 35,
              }}
              transition={{
                duration: 0.3,
                type: "spring",
                stiffness: 300,
                scale: { type: "spring", stiffness: 400, damping: 20 }
              }}
              style={{ cursor: "pointer" }}
              onClick={() => handleSelect(i)}
            >
              <path d={mainPath} fill={slice.color} className={isActive ? "pie-slice-extruded" : ""} />

              {isActive && (
                <motion.path
                  d={`M 0 0 L ${x1} ${y1} L ${x1} ${y1} L 0 0 Z`}
                  fill={slice.color}
                  animate={{
                    opacity: [0, 0.7],
                    pathLength: 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="pie-slice-side"
                />
              )}

              {isActive && (
                <motion.path
                  d={`M 0 0 L ${x2} ${y2} L ${x2} ${y2} L 0 0 Z`}
                  fill={slice.color}
                  animate={{
                    opacity: [0, 0.7],
                    pathLength: 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="pie-slice-side"
                />
              )}

              {isActive && (
                <motion.path
                  d={sidePath1}
                  fill={slice.color}
                  animate={{
                    opacity: [0, 0.8],
                    pathLength: 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="pie-slice-side"
                />
              )}

              <motion.g
                className="pie-label"
                style={{
                  pointerEvents: "none",
                }}
              >
                {!isSafari && (
                  <text
                    x={Math.cos(midAngle) * 0.5}
                    y={Math.sin(midAngle) * 0.5}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize="0.1"
                    fontWeight="bold"
                    fontFamily="Inter, sans-serif"
                    style={{
                      pointerEvents: "none",
                      textRendering: "geometricPrecision",
                    }}
                  >
                    {slice.label}
                  </text>
                )}
              </motion.g>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
};

export default TwoDPlate;
