"use client";

import React from "react";
import { motion } from "framer-motion";
import { IProduct } from "../interface";
import { ProductCard } from "./ProductCard";

interface AnimatedProductGridProps {
  products: IProduct[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 20 },
  },
};

export const AnimatedProductGrid: React.FC<AnimatedProductGridProps> = ({
  products,
}) => {
  if (!products || products.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[140px] text-gray-500">
        No products found.
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="flex flex-wrap"
    >
      {products.map((product, index) => (
        <motion.div key={product._id ?? index} variants={itemVariants}>
          <ProductCard
            slug={product.slug}
            coverImage={product.coverImage}
            price={product.price}
            name={product.name}
            discount={product.discount}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AnimatedProductGrid;
