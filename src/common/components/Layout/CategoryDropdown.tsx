"use client";
import { useState, useRef, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { MdArrowDropDown } from "react-icons/md";

interface CategoryDropdownProps {
  categories: { name: string; _id: string }[];
  setMenuOpen?: Dispatch<SetStateAction<boolean>>;
}

export const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  categories,
  setMenuOpen,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    router.push(`/products?category=${encodeURIComponent(option)}`);
    setMenuOpen?.(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative inline-block text-left"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="flex items-center cursor-pointer space-x-1 font-medium hover:opacity-90">
        <span className="w-fit lg:text-md lg:font-semibold">
          Shop By Category
        </span>
        <MdArrowDropDown size={28} />
      </button>

      <div
        className={`absolute z-20 mt-2 w-56 border border-gray-200 rounded-md shadow-2xl transition-all duration-200 transform origin-top ${
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        } bg-white`}
      >
        <ul className="text-sm text-gray-700">
          {categories?.map((cat) => (
            <li
              key={cat.name}
              onClick={() => handleSelect(cat._id)}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-200 hover:rounded-t-md ${
                selected === cat._id
                  ? "text-red-600 border-l-4 border-red-500 bg-gray-200 rounded-t-md"
                  : ""
              }`}
            >
              {cat.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
