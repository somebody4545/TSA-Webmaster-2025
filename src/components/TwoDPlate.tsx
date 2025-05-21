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

	// Function to determine the rendering order based on hover/selected state
	const getSliceRenderingOrder = () => {
		const defaultOrder = [...Array(PIE_DATA.length).keys()]; // [0, 1, 2, 3]

		if (hoveredIndex !== null) {
			// Move hovered slice to the end so it renders last (on top)
			return [...defaultOrder.filter((i) => i !== hoveredIndex), hoveredIndex];
		} else if (actualSelected !== null) {
			// Move selected slice to the end so it renders last (on top)
			return [...defaultOrder.filter((i) => i !== actualSelected), actualSelected];
		}

		return defaultOrder;
	};

	return (
		<div className="relative w-full h-full flex items-center justify-center plate-3d-container" style={{ isolation: "isolate" }}>
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
					const i = orderIndex; // The actual slice index
					const slice = PIE_DATA[i];
					const startAngle = (i * Math.PI) / 2;
					const endAngle = ((i + 1) * Math.PI) / 2;
					const midAngle = (startAngle + endAngle) / 2;

					// Calculate points for the slice
					const x1 = Math.cos(startAngle);
					const y1 = Math.sin(startAngle);
					const x2 = Math.cos(endAngle);
					const y2 = Math.sin(endAngle);

					// Determine if this slice should be extruded
					const isActive = actualSelected === i || actualHovered === i;

					// Create the paths for the main slice and potentially the side faces for extrusion
					const mainPath = `
            M 0 0
            L ${x1} ${y1}
            A 1 1 0 0 1 ${x2} ${y2}
            Z
          `;

					// Side faces for extrusion effect (only visible when extruded)
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
								// Ensure smooth transition back to original state
								scale: { type: "spring", stiffness: 400, damping: 20 }
							}}
							style={{ cursor: "pointer" }}
							onClick={() => handleSelect(i)}
						>
							{/* Main top face */}
							<path d={mainPath} fill={slice.color} className={isActive ? "pie-slice-extruded" : ""} />

							{/* Side faces for extrusion effect (only visible when extruded) */}
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

							{/* Label */}
							<motion.g
								className="pie-label"
								// Remove redundant animation here and let it inherit from parent
								style={{
									pointerEvents: "none",
								}}
							>
								{/* Adding a background shape to improve text contrast */}
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
							</motion.g>
						</motion.g>
					);
				})}
			</svg>
		</div>
	);
};

export default TwoDPlate;
