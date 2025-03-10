import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

type MenuCardProps = {
  title: string;
  subtitle: string;
  price?: string;
  calories?: string;
  imageUrl: string;
  tags?: string[];
  className?: string;
};

const cn = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' ');

export const MenuCard = React.memo(({
  title,
  subtitle,
  price,
  calories,
  imageUrl,
  tags = [],
  className
}: MenuCardProps) => (
  <div className={cn("w-full group/card", className)}>
    <motion.div
      className="cursor-pointer overflow-hidden relative card rounded-lg shadow-xl bg-background flex flex-col h-full"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="relative h-32 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover/card:scale-105"
        />
      </motion.div>

      <div className="p-4 flex flex-col gap-2">
        <motion.h3
          className="font-heading text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          {title}
        </motion.h3>
        <motion.p
          className="text-sm text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
              <motion.span
                key={index}
                className="px-2 py-1 bg-primary text-text text-xs rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        )}

        {(price || calories) && (
          <div className="flex justify-between mt-4 text-sm text-gray-600">
            {price && <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.25 }}
            >{price}</motion.span>}
            {calories && <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >{calories} calories</motion.span>}
          </div>
        )}
      </div>
    </motion.div>
  </div>
));

MenuCard.displayName = 'MenuCard';
export default MenuCard;
