import { useState, useRef } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { useEffect } from "react";

type SelectDropdownProps = {
  label: string;
  options: string[];
  onSelect: (value: string) => void;
  selected?: string;
  className?: string;
};

export const SelectDropdown: React.FC<SelectDropdownProps> = ({
  label,
  options,
  onSelect,
  selected,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative inline-block text-left"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`flex items-center cursor-pointer space-x-1 font-medium ${className} hover:opacity-90`}
      >
        <span className="w-fit">{label}</span>
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
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-200 hover:rounded-t-md ${
                selected === option
                  ? "text-red-600 border-l-4 border-red-500 bg-gray-200 rounded-t-md"
                  : ""
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
