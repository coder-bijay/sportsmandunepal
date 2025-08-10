"use client";
import React, { useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";

interface QuantitySelectorProps {
  min?: number;
  max?: number;
  initial?: number;
  onChange?: (value: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  min = 1,
  max = 10,
  initial = 1,
  onChange,
}) => {
  const [quantity, setQuantity] = useState(initial);

  const handleDecrease = () => {
    if (quantity > min) {
      const newValue = quantity - 1;
      setQuantity(newValue);
      onChange?.(newValue);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      const newValue = quantity + 1;
      setQuantity(newValue);
      onChange?.(newValue);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Decrease Button */}
      <button
        onClick={handleDecrease}
        disabled={quantity === min}
        className={`p-2 rounded-md cursor-pointer border border-gray-300 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <BiMinus className="w-4 h-4" />
      </button>

      {/* Quantity Display */}
      <span className="p-2 border border-gray-300 rounded-md min-w-[40px] text-center">
        {quantity}
      </span>

      {/* Increase Button */}
      <button
        onClick={handleIncrease}
        disabled={quantity === max}
        className={`p-2 rounded-md cursor-pointer border border-gray-300 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <BiPlus className="w-4 h-4" />
      </button>
    </div>
  );
};

export default QuantitySelector;
