"use client";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

export const SearchInput = () => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const origin = window.location.origin;
      const searchParams = new URLSearchParams();
      searchParams.set("search", inputValue.trim());
      const newUrl = `${origin}/?${searchParams.toString()}`;
      window.location.href = newUrl;
    }
  };

  return (
    <div className="flex items-center border border-gray-200 hover:border-gray-400 rounded-md w-full">
      <input
        type="text"
        placeholder="Search for products..."
        onKeyDown={handleKeyDown}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        className="flex-1 px-3 py-2 outline-none"
      />
      <button
        onClick={() => {
          const origin = window.location.origin;
          const searchParams = new URLSearchParams();
          searchParams.set("search", inputValue.trim());
          const newUrl = `${origin}/?${searchParams.toString()}`;
          window.location.href = newUrl;
        }}
        className="px-3 text-blue-400"
      >
        <FiSearch />
      </button>
    </div>
  );
};
