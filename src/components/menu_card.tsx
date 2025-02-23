import React from 'react';
import Image from 'next/image';

// Type definitions
type MenuCardProps = {
  title: string;
  subtitle: string;
  price?: string;
  calories?: string;
  imageUrl: string;
  tags?: string[];
  className?: string;
};

// Utility function to combine class names
const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

export const MenuCard: React.FC<MenuCardProps> = ({
  title,
  subtitle,
  price,
  calories,
  imageUrl,
  tags = [],
  className
}) => {
  return (
    <div className={cn("w-full group/card", className)}>
      <div
        className="cursor-pointer overflow-hidden relative card rounded-lg shadow-xl bg-background flex flex-col h-full"
      >
        {/* Image Section */}
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover/card:scale-105"
          />
        </div>
        
        {/* Content Section */}
        <div className="p-4 flex flex-col gap-2">
          <h3 className="font-heading text-xl">{title}</h3>
          <p className="text-sm text-gray-600">{subtitle}</p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-primary text-text text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* Meta Information */}
          <div className="flex justify-between mt-4 text-sm text-gray-600">
            {price && <span>{price}</span>}
            {calories && <span>{calories} calories</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;